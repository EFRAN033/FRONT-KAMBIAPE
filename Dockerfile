# ==================================
# ETAPA 1: BUILD (Compilación de la aplicación)
# Se usa una imagen de Node.js, pero solo temporalmente.
# ==================================
FROM node:20-alpine AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar las dependencias
# Esto optimiza el cache de Docker: si estos archivos no cambian, esta capa no se reconstruye.
COPY package.json package-lock.json ./

# Instalamos las dependencias
# 'npm ci' es más rápido y asegura la versión del lock-file
RUN npm ci

# Copiamos el resto de los archivos (código fuente)
COPY . .

# Ejecutamos la compilación de producción con el comando de Vite
# El resultado se almacena en el subdirectorio /app/dist
RUN npm run build


# ==================================
# ETAPA 2: PRODUCTION (Servir con Nginx)
# La imagen final. Es muy pequeña porque solo tiene Nginx y los archivos compilados.
# ==================================
FROM nginx:stable-alpine AS production-stage

# 1. Copiamos nuestra configuración personalizada de Nginx
# Esta configuración es crítica para el routing de la SPA de Vue
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 2. Copiamos los archivos estáticos compilados desde la etapa anterior (la carpeta /app/dist)
# Los movemos al directorio de servicio de Nginx (/usr/share/nginx/html)
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto estándar 80 de Nginx
EXPOSE 80

# Comando para iniciar Nginx y servir los archivos
CMD ["nginx", "-g", "daemon off;"]