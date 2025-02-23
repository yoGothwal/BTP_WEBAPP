from flask import Blueprint, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

# Initialize extensions
bcrypt = Bcrypt()
db = SQLAlchemy()

# Create a Blueprint for user management
user_blueprint = Blueprint('user', __name__)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

@user_blueprint.route('/all', methods=['GET'])
def get_all_users():
    # Fetch all users from the database
    users = User.query.all()

    # Create a list of user details (excluding passwords)
    user_list = []
    for user in users:
        user_list.append({
            "id": user.id,
            "name": user.name,
            "username": user.username,
            "email": user.email
        })

    return jsonify(user_list), 200
# Signup Endpoint
@user_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if user already exists
    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"message": "Username or email already exists"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create new user
    new_user = User(name=name, username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# Login Endpoint
@user_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Find user by username
    user = User.query.filter_by(username=username).first()

    # Check if user exists and password is correct
    if user and bcrypt.check_password_hash(user.password, password):
        session['user_id'] = user.id  # Store user ID in session
        print(session)
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401

# Logout Endpoint
@user_blueprint.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user ID from session
    print(session)
    return jsonify({"message": "Logged out successfully"}), 200