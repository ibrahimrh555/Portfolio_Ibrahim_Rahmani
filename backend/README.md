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

Architecture utilisée :

| Partie | Hébergement | Prix |
|---|---|---:|
| Frontend React | GitHub Pages | 0 $ |
| Backend Django | Render Web Service Free | 0 $ |
| PostgreSQL | Neon Free | 0 $ |

### 1. Créer la base Neon

1. Créer un projet sur [Neon](https://neon.com/).
2. Copier la chaîne de connexion PostgreSQL en sélectionnant une connexion poolée si elle est proposée.
3. Vérifier que l'URL se termine par `sslmode=require`.

Exemple de format (ne jamais enregistrer la vraie valeur dans Git) :

```text
postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
```

### 2. Déployer l'API sur Render

Créer un Blueprint Render depuis le fichier `render.yaml`. Celui-ci crée uniquement le Web Service gratuit et demande la valeur de `DATABASE_URL` pendant le déploiement.

Variables configurées par le Blueprint :

- `SECRET_KEY` : générée automatiquement par Render ;
- `DATABASE_URL` : chaîne de connexion copiée depuis Neon ;
- `DEBUG=False` ;
- `ALLOWED_HOSTS=portfolio-ibrahim-api.onrender.com` ;
- `CORS_ALLOWED_ORIGINS=https://ibrahimrh555.github.io` ;
- `CSRF_TRUSTED_ORIGINS=https://portfolio-ibrahim-api.onrender.com`.

Si Render attribue un autre nom au service, mettre à jour `ALLOWED_HOSTS` et `CSRF_TRUSTED_ORIGINS` avec le vrai domaine Render.

### 3. Créer l'administrateur

Depuis le Shell Render :

```bash
python manage.py createsuperuser
```

L'administration sera disponible sur :

```text
https://portfolio-ibrahim-api.onrender.com/admin/
```

### 4. Connecter GitHub Pages

Dans `Settings > Secrets and variables > Actions > Variables`, créer :

```text
VITE_API_URL=https://portfolio-ibrahim-api.onrender.com/api
```

Puis relancer le workflow GitHub Actions afin de reconstruire le frontend avec l'URL publique de l'API.
