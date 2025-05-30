from utils.db import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    identifier = db.Column(db.String(100), unique=True, nullable=False)  # email or phone
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    balance = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.now)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(100))
    receiver = db.Column(db.String(100))
    amount = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, default=datetime.now)

class Announcement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text)
    file_url = db.Column(db.String(500), nullable=True)
    posted_at = db.Column(db.DateTime, default=datetime.now)
