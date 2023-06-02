# Utilisez une image de base avec Node.js
FROM node:16-alpine

# Définissez le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copiez tous les fichiers du projet dans le répertoire de travail
COPY . .

# Installez les dépendances avec Yarn
RUN npm install
RUN npm i -g @quasar/cli

# Exposez le port 80 pour le serveur de développement de Quasar
EXPOSE 8081
EXPOSE 80

# Exécutez la commande de développement de Quasar avec Yarn
CMD quasar dev
