# SpaceX Launches Platform

Plataforma full-stack para la gestión y consulta de lanzamientos de SpaceX, construida con una arquitectura moderna basada en **frontend web**, **backend serverless** e **infraestructura como código**.

Este repositorio contiene únicamente la **estructura inicial del proyecto** y sirve como punto de partida para el desarrollo.

---

## 📁 Estructura del proyecto

```text
spacex-launches-platform/
│
├── backend/                  # Backend serverless (AWS SAM)
│   ├── template.yaml         # Definición de infraestructura (CloudFormation / SAM)
│   ├── src/
│   │   ├── ingest/           # Lambdas de ingesta de datos
│   │   └── query/            # Lambdas de consulta
│   └── tests/                # Pruebas unitarias
│
├── frontend/                 # Frontend web (React)
│
├── infrastructure/           # Infraestructura adicional
│   └── ecs/                  # Recursos ECS / Fargate (si aplica)
│
├── .github/
│   └── workflows/            # Pipelines CI/CD (GitHub Actions)
│
└── README.md

```
SpaceX-launches-platform
├─ backend
│  ├─ spacex-backend
│  │  ├─ events
│  │  │  └─ event.json
│  │  ├─ hello_world
│  │  │  ├─ app.py
│  │  │  ├─ requirements.txt
│  │  │  └─ __init__.py
│  │  ├─ README.md
│  │  ├─ samconfig.toml
│  │  ├─ template.yaml
│  │  ├─ tests
│  │  │  ├─ integration
│  │  │  │  ├─ test_api_gateway.py
│  │  │  │  └─ __init__.py
│  │  │  ├─ requirements.txt
│  │  │  ├─ unit
│  │  │  │  ├─ test_handler.py
│  │  │  │  └─ __init__.py
│  │  │  └─ __init__.py
│  │  └─ __init__.py
│  ├─ src
│  │  ├─ ingest
│  │  └─ query
│  ├─ template.yaml
│  └─ tests
├─ frontend
├─ infrastructure
│  └─ ecs
└─ README.md

```
