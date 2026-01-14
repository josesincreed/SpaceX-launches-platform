# =========================
# 1️⃣ Build stage
# =========================
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos dependencias primero (mejora cache)
COPY package.json package-lock.json ./

RUN npm ci

# Copiamos el resto del código
COPY . .

# Build de Vite (usa SWC internamente)
RUN npm run build

# =========================
# 2️⃣ Runtime stage
# =========================
FROM nginx:alpine

# Eliminamos config default de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos nuestra app buildada
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos configuración custom de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
