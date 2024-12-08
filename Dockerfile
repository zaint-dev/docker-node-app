# Fase 1: Copilado de la aplicación
FROM node:18-alpine AS build
WORKDIR /app
# Copiar package.json y package-lock.json
COPY package*.json ./
# Instalar dependencias y limpiar la caché de npm
RUN npm install && npm cache clean --force
# Copiar el resto de los archivos
COPY . .

# Fase 2: Correr la aplicación
FROM node:18-alpine
WORKDIR /app
# Copiar los archivos de la fase 1
COPY --from=build /app .
# Exponer el puerto 3000
EXPOSE 3000
# Correr la aplicación
CMD ["node", "app.js"]
