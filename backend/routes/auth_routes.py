from flask import Blueprint, request, jsonify
from models.user import User
from extensions import db, bcrypt
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
import datetime

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# ----------------- Register -----------------
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409

    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201

# ----------------- Login -----------------
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(
            identity=user.id,
            expires_delta=datetime.timedelta(hours=1)
        )
        return jsonify({"access_token": access_token}), 200

    return jsonify({"msg": "Invalid credentials"}), 401

# ----------------- Get Profile -----------------
@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "email": user.email,
        "name": user.name or "",
        "experience": user.experience or "",
        "drone_type": user.drone_type or "",
        "about": user.about or ""
    })

# ----------------- Update Profile -----------------
@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()
    user.name = data.get('name', "")
    user.experience = data.get('experience', "")
    user.drone_type = data.get('drone_type', "")
    user.about = data.get('about', "")

    db.session.commit()
    return jsonify({"msg": "Profile updated successfully"})
