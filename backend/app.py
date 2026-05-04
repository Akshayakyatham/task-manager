from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://Akshayakyatham:Akkiaishu@cluster0.bu0cskc.mongodb.net/taskmanager?retryWrites=true&w=majority"

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

mongo = PyMongo(app)

@app.route("/register", methods=["POST"])
def register():
    d = request.json
    mongo.db.users.insert_one({
        "name": d["name"],
        "email": d["email"],
        "password": d["password"],
        "role": d.get("role", "member")
    })
    return jsonify({"message": "ok"})

@app.route("/login", methods=["POST"])
def login():
    d = request.json

    user = mongo.db.users.find_one({
        "email": d["email"],
        "password": d["password"]
    })

    if not user:
        return jsonify({"message": "invalid"}), 401

    return jsonify({
        "user_id": str(user["_id"]),
        "role": user["role"]
    })

@app.route("/users", methods=["GET"])
def users():
    return jsonify([
        {"_id": str(u["_id"]), "name": u["name"], "role": u["role"]}
        for u in mongo.db.users.find()
    ])

@app.route("/tasks", methods=["POST"])
def create_task():
    title = request.form.get("title")
    assigned_to = request.form.get("assigned_to")
    file = request.files.get("file")

    data = {
        "title": title,
        "assigned_to": assigned_to,
        "status": "pending"
    }

    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        data["task_file"] = filename

    mongo.db.tasks.insert_one(data)

    return jsonify({"message": "ok"})

@app.route("/tasks", methods=["GET"])
def get_tasks():
    user_id = request.args.get("user_id")
    query = {"assigned_to": user_id} if user_id else {}

    return jsonify([
        {**t, "_id": str(t["_id"])}
        for t in mongo.db.tasks.find(query)
    ])

@app.route("/tasks/<id>", methods=["PUT"])
def update_task(id):
    status = request.form.get("status")
    file = request.files.get("file")

    update_data = {"status": status}

    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        update_data["submission_file"] = filename

    mongo.db.tasks.update_one(
        {"_id": ObjectId(id)},
        {"$set": update_data}
    )

    return jsonify({"message": "ok"})

@app.route("/download/<filename>")
def download_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/dashboard", methods=["GET"])
def dashboard():
    return jsonify({
        "total": mongo.db.tasks.count_documents({}),
        "done": mongo.db.tasks.count_documents({"status": "done"}),
        "pending": mongo.db.tasks.count_documents({"status": "pending"})
    })

if __name__ == "__main__":
    app.run(debug=True)