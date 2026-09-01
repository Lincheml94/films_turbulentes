# Ceci est une base de site avec un environnement Node.js et mysql, conténeurisé avec Docker
# Copier le contenu de ce dossier dans un repository GitHub
# Lancer la commande : docker compose -f docker-compose.dev.yaml up -d
# Lancer la commande sudo chown -R $USER:$USER . et déplacer le dossier "mysql" qui se trouve dans "code", en dehors de ce même dossier
# Ouvrir le projet dans le conteneur App
# Pour installer React, lancer la commande npm create vite ("." pour nom de projet, React, RSC)
# Pour installer les dépendances Vite, lancer la commande npm install
# Pour installer Biome, lancer la commande npm install -D -E @biomejs/biome
# Remplacer le fichier vite.config.ts 
# Lancer le serveur de développement de Vite avec la commande npm run dev
# Sortir du conteneur et déplacer dans le dossier "code" les dossiers "server, "models", les fichiers .env.development, _vite.config.ts (remplacer le contenu du fichier vite.config.ts par celui-ci et le supprimer)
# Rouvrir le conteneur, pour créer une application Node.js, lancer la commande npm install tsx
# Pour créer un serveur express, lancer les commandes npm install express et npm install -D @types/express
# Enlever les commentaires des fichiers index.ts et server.ts
# Ajouter dans les scripts "server" et "start" dans le fichier "package.json" :  
# "server": "npx tsx watch --env-file .env.development server/index.ts",
# "start": "NODE_ENV=production npx tsx watch --env-file .env server/index.ts",
# créer la route API de homepage (router et controller, et importer la router dans server.ts)

# Tester l'API de homepage avec flashpost : http://127.0.0.1:3000/api
