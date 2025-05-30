from flask import Blueprint, request, jsonify, send_file
import qrcode
import io

qr_bp = Blueprint("qr", __name__, url_prefix="/qr")

@qr_bp.route("/generate", methods=["POST"])
def generate_qr():
    data = request.get_json()
    identifier = data.get("identifier")

    if not identifier:
        return jsonify({"error": "Identifier required"}), 400

    img = qrcode.make(identifier)
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return send_file(buf, mimetype='image/png')
