Générateur de lettre de motivation
======================

Ce référentiel contient une application Web qui permet aux utilisateurs de générer des lettres de motivation professionnelles en quelques secondes.

Commencer
---------------

1. Cloner le référentiel

     `git clone https://github.com/Adylitto/motiv`

1. Installez les dépendances

     `cd cover-letter-generator
installation npm`

1. Configurez les variables d'environnement Créez un fichier `.env` à la racine du projet et ajoutez votre clé API OpenAI :

     `OPEN_AI_KEY=votre_clé_api_ici`

1. Démarrez le serveur de développement

     `npm run dev`

1. Ouvrez l'application dans votre navigateur à `http://localhost:3000`

Usage
-----

1. Entrez le nom de votre entreprise, le nom, le poste, les compétences et les années d'expérience dans le formulaire.
2. Cliquez sur le bouton "Générer une lettre de motivation" pour générer votre lettre de motivation.
3. Cliquez sur le bouton "Copier dans le presse-papiers" pour copier la lettre de motivation générée dans votre presse-papiers.
4. Collez la lettre de motivation dans votre candidature.

Construit avec
----------

- [Next.js](https://nextjs.org/) - Un framework pour créer des applications React rendues par le serveur.
- [OpenAI](https://openai.com/) - Un laboratoire de recherche composé de la société à but lucratif OpenAI LP et de sa société mère, l'association à but non lucratif OpenAI Inc.