from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from utils.db import db
from datetime import datetime

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    identifier = data.get("identifier")
    name = data.get("name")
    password = data.get("password")

    if not identifier or not password or not name:
        return jsonify({"error": "Missing fields"}), 400

    if User.query.filter_by(identifier=identifier).first():
        return jsonify({"error": "User already exists"}), 409

    hashed_pw = generate_password_hash(password)
    user = User(identifier=identifier, name=name, password=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Signup successful!"})

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    identifier = data.get("identifier")
    password = data.get("password")

    user = User.query.filter_by(identifier=identifier).first()
    if user and check_password_hash(user.password, password):
        return jsonify({"message": "Login successful", "user": {
            "identifier": user.identifier,
            "name": user.name,
            "balance": user.balance
        }})
    return jsonify({"error": "Invalid credentials"}), 401
