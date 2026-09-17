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
