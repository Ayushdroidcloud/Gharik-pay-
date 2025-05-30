from flask import Flask
from flask_cors import CORS
from utils.db import db, init_db
from routes.auth import auth_bp
from routes.wallet import wallet_bp
from routes.admin import admin_bp
from routes.qr import qr_bp
from routes.notify import notify_bp

app = Flask(__name__)
CORS(app)

app.config.from_pyfile("config.py")
db.init_app(app)

# Register routes
app.register_blueprint(auth_bp)
app.register_blueprint(wallet_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(qr_bp)
app.register_blueprint(notify_bp)

# Home route
@app.route("/")
def home():
    return {"message": "Gharik Wallet API Running 🎉"}

# Initialize DB
with app.app_context():
    init_db()

if __name__ == "__main__":
    app.run()
