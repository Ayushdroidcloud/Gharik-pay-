from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db():
    from models import User, Transaction, Announcement
    db.create_all()
