import os

# Replace with your actual PostgreSQL URL from Render
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost/dbname")

SECRET_KEY = os.getenv("SECRET_KEY", "gharik-secret")

class Config:
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = SECRET_KEY
