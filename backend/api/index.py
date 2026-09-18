"""Vercel Python entrypoint for the Django application."""

from portfolio_api.wsgi import application

# Vercel accepts `app` for generic WSGI functions. Keep Django's conventional
# `application` name above as well.
app = application
