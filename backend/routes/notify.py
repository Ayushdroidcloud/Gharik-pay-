from flask import Blueprint, request, jsonify
from utils.db import db
from models import Announcement
from utils.time import get_ist_time

notify_bp = Blueprint("notify", __name__, url_prefix="/notify")

@notify_bp.route("/create", methods=["POST"])
def create_announcement():
    data = request.get_json()
    title = data.get("title")
    content = data.get("content")

    if not title or not content:
        return jsonify({"error": "Missing fields"}), 400

    ann = Announcement(title=title, content=content, timestamp=get_ist_time())
    db.session.add(ann)
    db.session.commit()
    return jsonify({"message": "Announcement created"})

@notify_bp.route("/get", methods=["GET"])
def get_announcements():
    anns = Announcement.query.order_by(Announcement.timestamp.desc()).all()
    return jsonify([{
        "title": a.title,
        "content": a.content,
        "timestamp": str(a.timestamp)
    } for a in anns])
