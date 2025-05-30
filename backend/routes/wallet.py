from flask import Blueprint, request, jsonify
from models import User, Transaction
from utils.db import db
from utils.time import get_ist_time

wallet_bp = Blueprint("wallet", __name__, url_prefix="/wallet")

@wallet_bp.route("/transfer", methods=["POST"])
def transfer():
    data = request.get_json()
    sender_id = data.get("sender")
    receiver_id = data.get("receiver")
    amount = int(data.get("amount", 0))

    if amount <= 0:
        return jsonify({"error": "Amount must be positive"}), 400

    sender = User.query.filter_by(identifier=sender_id).first()
    receiver = User.query.filter_by(identifier=receiver_id).first()

    if not sender or not receiver:
        return jsonify({"error": "Sender or receiver not found"}), 404

    if sender.balance < amount:
        return jsonify({"error": "Insufficient funds"}), 400

    sender.balance -= amount
    receiver.balance += amount

    tx = Transaction(sender=sender_id, receiver=receiver_id, amount=amount, timestamp=get_ist_time())
    db.session.add(tx)
    db.session.commit()

    return jsonify({"message": "Transfer successful", "timestamp": str(tx.timestamp)})

@wallet_bp.route("/transactions/<identifier>", methods=["GET"])
def get_transactions(identifier):
    txs = Transaction.query.filter(
        (Transaction.sender == identifier) | (Transaction.receiver == identifier)
    ).order_by(Transaction.timestamp.desc()).all()

    tx_list = [{
        "sender": t.sender,
        "receiver": t.receiver,
        "amount": t.amount,
        "timestamp": str(t.timestamp)
    } for t in txs]

    return jsonify(tx_list)
