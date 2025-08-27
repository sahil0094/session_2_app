from flask import Flask, render_template, request, jsonify, send_from_directory
import os

app = Flask(
    __name__,
    static_folder="static",
    template_folder="templates"
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    uploaded_file = request.files["file"]
    if uploaded_file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Read content to determine size without saving to disk
    contents = uploaded_file.read()
    file_size_bytes = len(contents)

    return jsonify({
        "name": uploaded_file.filename,
        "size": file_size_bytes,
        "type": uploaded_file.mimetype or "application/octet-stream"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
