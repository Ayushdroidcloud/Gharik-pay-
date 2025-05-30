from flask import Blueprint, request, jsonify
from models import User, Transaction
from utils.db import db
from utils.time import get_ist_time

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

ADMIN_CODE = "181481"

@admin_bp.route("/login", methods=["POST"])
def admin_login():
    data = request.get_json()
    code = data.get("code")
    if code == ADMIN_CODE:
        return jsonify({"message": "Admin access granted"})
    return jsonify({"error": "Invalid admin code"}), 403

@admin_bp.route("/users", methods=["GET"])
def all_users():
    users = User.query.all()
    return jsonify([{
        "id": u.id,
        "identifier": u.identifier,
        "name": u.name,
        "balance": u.balance,
        "created_at": str(u.created_at)
    } for u in users])

@admin_bp.route("/transactions", methods=["GET"])
def all_transactions():
    txs = Transaction.query.order_by(Transaction.timestamp.desc()).all()
    return jsonify([{
        "sender": t.sender,
        "receiver": t.receiver,
        "amount": t.amount,
        "timestamp": str(t.timestamp)
    } for t in txs])

@admin_bp.route("/send", methods=["POST"])
def admin_send():
    data = request.get_json()
    to = data.get("to")
    amount = int(data.get("amount"))

    user = User.query.filter_by(identifier=to).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.balance += amount
    tx = Transaction(sender="ADMIN", receiver=to, amount=amount, timestamp=get_ist_time())
    db.session.add(tx)
    db.session.commit()
    return jsonify({"message": "Amount sent by admin"})
