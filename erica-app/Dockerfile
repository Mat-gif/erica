# Utiliser l'image node comme image de base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Exposer le port sur lequel l'application tourne
EXPOSE 8080

# Démarrer l'application
CMD ["npm", "run", "dev", "--", "--host"]
