# 🚀 SpaceX Launches Platform

## 📌 Descripción general

**SpaceX Launches Platform** es una plataforma cloud-native, cuyo objetivo es demostrar el diseño e implementación de una solución moderna en AWS capaz de:

- Ingerir datos externos de forma automática
- Normalizar y persistir información de manera idempotente
- Exponer datos listos para ser consumidos por un frontend moderno
- Escalar y evolucionar hacia una arquitectura basada en contenedores
- Implementar CI/CD end-to-end con infraestructura como código

La plataforma consume datos públicos de la **API oficial de SpaceX** y permite explorar lanzamientos históricos y futuros mediante filtros, visualizaciones y métricas.

---

## 🏗️ Arquitectura de la solución

La solución implementa una **arquitectura híbrida en AWS**, combinando serverless y contenedores, siguiendo un patrón **monorepo bien organizado**.


### Componentes principales

- **Backend Serverless**
  - AWS Lambda
  - Amazon DynamoDB
  - Amazon API Gateway (REST)
  - Amazon EventBridge
  - Definido y desplegado con **AWS SAM**

- **Frontend**
  - React + TypeScript + SWC
  - Visualización de datos y KPIs
  - Containerizado con Docker
  - Desplegado en **Amazon ECS Fargate**
  - Imágenes almacenadas en **Amazon ECR**
  - Expuesto mediante **Application Load Balancer**

- **Infraestructura como Código (IaC)**
  - AWS SAM → recursos serverless
  - CloudFormation → ECR, ECS, ALB

- **CI/CD**
  - GitHub Actions
  - Tests, build, deploy backend y frontend totalmente automatizados

La integración entre backend y frontend se realiza mediante una **API REST desacoplada**, expuesta por API Gateway.

---

## 🗄️ Modelo de datos – DynamoDB

### Tabla: `spacex_launches`

**Clave primaria**
- Partition Key (PK): `launch_id`

**Atributos**
- `launch_id`
- `mission_name`
- `mission_purpose`
- `rocket_name`
- `launch_date` (ISO 8601)
- `status` (`SCHEDULED | SUCCESS | FAILED`)
- `launchpad`
- `payloads` (list)
- `last_updated` (ISO 8601)

### Global Secondary Indexes (GSIs)

1. **GSI_Status**
   - PK: `status`
   - SK: `launch_date`
   - Consulta por estado

2. **GSI_Rocket**
   - PK: `rocket_name`
   - SK: `launch_date`
   - Consulta por cohete

3. **GSI_Launchpad**
   - PK: `launchpad`
   - SK: `launch_date`
   - Consulta por plataforma

4. **GSI_LaunchDate**
   - PK: `launch_date`
   - SK: `launch_id`
   - Consulta por fecha exacta

📌 No se utilizan **Scan** para filtros.  
📌 Todas las consultas se realizan con **Query sobre GSIs** para eficiencia.

---

## 🔁 Ingesta automática de datos

### Ejecución programada
- Se ejecuta **automáticamente cada 6 horas**
- Orquestada mediante **Amazon EventBridge**
- EventBridge invoca la Lambda de ingesta
- También puede ejecutarse manualmente vía API Gateway

### Estrategia de datos

#### 📚 Lanzamientos históricos
- 20 lanzamientos por año
- Rango: **2022 → 2008**
- Incluye SUCCESS y FAILED
- Evita sesgos y sobrecarga

#### 🚀 Lanzamientos futuros
- Filtro:
  - `upcoming = true`
  - `date_utc > now`
- Ordenados ascendentemente
- Solo lanzamientos futuros reales

---

## 🔎 Normalización de estados

Fuente única de verdad:

- `SUCCESS` → `launch.success == true`
- `FAILED` → `launch.success == false`
- `SCHEDULED` → `launch.upcoming == true`

Regla de normalización aplicada:

├── infrastructure/ # Infraestructura ECS / ECR (CloudFormation)
├── .github/ # CI/CD (GitHub Actions)
└── README.md

## strip() + upper()


Esto garantiza:
- Queries determinísticas
- Consistencia entre backend, DB y frontend
- Correcto funcionamiento de los GSIs

---

## 📡 API – Lambda de Consulta

### Endpoints disponibles

| Endpoint | GSI |
|--------|-----|
| GET /api/v1/launches | Scan limitado |
| GET /api/v1/launches/status/{status} | GSI_Status |
| GET /api/v1/launches/rocket/{rocket} | GSI_Rocket |
| GET /api/v1/launches/launchpad/{launchpad} | GSI_Launchpad |
| GET /api/v1/launches/date/{launch_date} | GSI_LaunchDate |

Características técnicas:
- Uso de `boto3.dynamodb.conditions.Key`
- Routing por `pathParameters`
- `unquote_plus` para decodificación
- CORS habilitado en API Gateway y Lambdas

---

## 🧪 Estrategia de testing

- Tests unitarios completos con **pytest**
- Uso de **unittest.mock**
- No se depende de AWS real
- Tests rápidos y deterministas

Cobertura:
- Lambda ingest
- Lambda query
- Cliente SpaceX API
- Repositorios DynamoDB
- Handlers
- Modelos de dominio

Durante los tests se refactorizó el código para:
- Evitar inicialización de boto3 en imports
- Mejorar testabilidad y robustez

---

## 🐳 Frontend & Docker

- React + TypeScript + SWC
- Build con Vite
- Docker multi-stage:
  - Build con Node.js
  - Servido estático con Nginx
- `docker-compose.yml` incluido para ejecución local

---

## 🚀 CI/CD

Pipeline implementado con **GitHub Actions**:

- Ejecuta tests backend
- Despliega Lambdas automáticamente con **AWS SAM**
- Construye imagen Docker del frontend
- Publica imagen en **Amazon ECR**
- Despliega frontend en **ECS Fargate**
- Rolling deployment automático

---

## 📌 **El despliegue de Lambdas se realiza automáticamente vía CI/CD usando AWS SAM.**

## ✅ Conclusión

Este proyecto demuestra:

- Diseño backend sólido  
- Uso correcto de servicios AWS  
- Arquitectura cloud-native real  
- CI/CD end-to-end  
- Buen criterio técnico y escalabilidad futura  

## AUTOR: Jose David Parra Uribe





```
SpaceX-launches-platform
├─ backend
│  ├─ spacex-backend
│  │  ├─ .pytest_cache
│  │  │  ├─ CACHEDIR.TAG
│  │  │  ├─ README.md
│  │  │  └─ v
│  │  │     └─ cache
│  │  │        ├─ lastfailed
│  │  │        └─ nodeids
│  │  ├─ events
│  │  │  └─ ingest-event.json
│  │  ├─ pytest.ini
│  │  ├─ README.md
│  │  ├─ samconfig.toml
│  │  ├─ src
│  │  │  ├─ ingest
│  │  │  │  ├─ app.py
│  │  │  │  ├─ dynamodb_repository.py
│  │  │  │  ├─ models.py
│  │  │  │  ├─ requirements.txt
│  │  │  │  ├─ spacex_client.py
│  │  │  │  └─ __init__.py
│  │  │  └─ query
│  │  │     ├─ app.py
│  │  │     ├─ dynamodb_query_repository.py
│  │  │     ├─ requirements.txt
│  │  │     └─ __init__.py
│  │  ├─ swagger-ui
│  │  │  ├─ app.py
│  │  │  ├─ openapi.yaml
│  │  │  └─ requirements.txt
│  │  ├─ template.yaml
│  │  ├─ tests
│  │  │  ├─ conftest.py
│  │  │  ├─ integration
│  │  │  │  └─ __init__.py
│  │  │  ├─ requirements.txt
│  │  │  ├─ unit
│  │  │  │  ├─ test_dynamodb_repository.py
│  │  │  │  ├─ test_ingest_handler.py
│  │  │  │  ├─ test_models.py
│  │  │  │  ├─ test_query_dynamodb_repository.py
│  │  │  │  ├─ test_query_handler.py
│  │  │  │  ├─ test_spacex_client.py
│  │  │  │  └─ __init__.py
│  │  │  └─ __init__.py
│  │  └─ __init__.py
│  └─ tests
├─ frontend
│  └─ spacex-frontend
│     ├─ docker-compose.yml
│     ├─ Dockerfile
│     ├─ eslint.config.js
│     ├─ index.html
│     ├─ nginx.conf
│     ├─ package-lock.json
│     ├─ package.json
│     ├─ README.md
│     ├─ src
│     │  ├─ api
│     │  │  └─ spacexApi.ts
│     │  ├─ App.tsx
│     │  ├─ components
│     │  │  ├─ charts
│     │  │  │  ├─ LaunchesByStatusChart.tsx
│     │  │  │  └─ LaunchesByYearChart.tsx
│     │  │  ├─ Filters.tsx
│     │  │  ├─ IngestionCountdown.tsx
│     │  │  ├─ LaunchCard.tsx
│     │  │  ├─ LaunchList.tsx
│     │  │  ├─ LaunchTable.tsx
│     │  │  ├─ layout
│     │  │  │  ├─ Footer.tsx
│     │  │  │  └─ Header.tsx
│     │  │  └─ Loader.tsx
│     │  ├─ main.tsx
│     │  ├─ models
│     │  │  └─ Launch.ts
│     │  ├─ pages
│     │  │  ├─ About.tsx
│     │  │  └─ Home.tsx
│     │  └─ router
│     │     └─ AppRouter.tsx
│     ├─ tsconfig.app.json
│     ├─ tsconfig.json
│     ├─ tsconfig.node.json
│     └─ vite.config.ts
├─ infrastructure
│  └─ ecs
│     ├─ alb.yaml
│     ├─ aws
│     ├─ ecr.yaml
│     ├─ ecs-cluster.yaml
│     ├─ iam.yaml
│     ├─ logs.yaml
│     ├─ service.yaml
│     └─ task-definition.yaml
└─ README.md

```