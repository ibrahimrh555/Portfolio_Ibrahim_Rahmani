# Portfolio API

Backend Django REST du portfolio d'Ibrahim Rahmani.

## Démarrage local

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

- API : http://127.0.0.1:8000/api/
- Administration : http://127.0.0.1:8000/admin/

Le frontend utilise `VITE_API_URL`, par exemple `http://127.0.0.1:8000/api`.

## Déploiement gratuit

| Partie | Hébergement | Prix |
|---|---|---:|
| Frontend React | GitHub Pages | 0 $ |
| Backend Django | Vercel Hobby | 0 $ |
| PostgreSQL | Neon Free | 0 $ |

### 1. Base Neon

Créer un projet sur [Neon](https://neon.com/) et copier sa chaîne de connexion poolée :

```text
postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
```

Ne jamais enregistrer cette valeur dans Git.

### 2. Projet Vercel

Importer le dépôt GitHub dans Vercel avec ces réglages :

```text
Project Name: portfolio-ibrahim-api
Root Directory: backend
Framework Preset: Other
Production Branch: main
```

Le fichier `backend/vercel.json` configure la fonction Django. Vercel détecte `manage.py`, installe `requirements.txt` et collecte automatiquement les fichiers statiques.

Ajouter les variables suivantes dans Vercel pour Production, Preview et Development :

```text
DATABASE_URL=<URL Neon>
SECRET_KEY=<clé aléatoire longue>
DEBUG=False
ALLOWED_HOSTS=.vercel.app
CORS_ALLOWED_ORIGINS=https://ibrahimrh555.github.io
CSRF_TRUSTED_ORIGINS=https://portfolio-ibrahim-api.vercel.app
```

Après le premier déploiement, remplacer `portfolio-ibrahim-api.vercel.app` par le véritable domaine Vercel si nécessaire.

### 3. Migrations et administrateur

Dans GitHub, ouvrir `Settings > Secrets and variables > Actions`, puis créer les secrets :

```text
NEON_DATABASE_URL=<URL Neon>
DJANGO_SECRET_KEY=<même SECRET_KEY que Vercel>
DJANGO_SUPERUSER_USERNAME=<nom administrateur>
DJANGO_SUPERUSER_EMAIL=<email administrateur>
DJANGO_SUPERUSER_PASSWORD=<mot de passe fort>
```

Exécuter ensuite `Actions > Migrate Neon database > Run workflow` sur `main`. Ce workflow applique les migrations et crée l'administrateur lors de la première exécution.

### 4. GitHub Pages

Créer ou modifier la variable GitHub Actions :

```text
VITE_API_URL=https://portfolio-ibrahim-api.vercel.app/api
```

Relancer ensuite `Validate and deploy portfolio` sur `main`.
