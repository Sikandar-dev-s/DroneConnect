from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify
from flask_cors import CORS

from extensions import db, bcrypt
from routes.auth_routes import auth_bp

app = Flask(__name__)
CORS(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///droneconnect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'

# Init extensions
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

# Register routes
app.register_blueprint(auth_bp)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to DroneConnect API"})

@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    return jsonify({"msg": f"Welcome, user ID {user_id}!"})

# Create DB tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
