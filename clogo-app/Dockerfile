FROM node:20-alpine

WORKDIR /app

# 1. Copiar y preparar dependencias
COPY package*.json ./
COPY prisma ./prisma/

# 2. Instalar paquetes y construir el cliente de base de datos
RUN npm install
RUN npx prisma generate

# 3. Copiar el resto del código
COPY . .

# 4. Compilar la aplicación para producción
RUN npm run build

# 5. Exponer el puerto y arrancar
EXPOSE 3000
CMD ["npm", "run", "start"]