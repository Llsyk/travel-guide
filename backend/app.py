from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import torch
import cv2
import os
import json

app = Flask(__name__)
CORS(app)

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

REACT_PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", "web"))

# Change from src/data to public
REACT_SRC_DATA = os.path.abspath(os.path.join(REACT_PROJECT_ROOT, "public", "locations.json"))

UPLOAD_FOLDER = os.path.abspath(os.path.join(REACT_PROJECT_ROOT, "public", "uploads"))

DEPTH_FOLDER = os.path.abspath(os.path.join(REACT_PROJECT_ROOT, "public", "depth_maps"))

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DEPTH_FOLDER, exist_ok=True)

# Load AI Model
device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
midas = torch.hub.load("intel-isl/MiDaS", "MiDaS_small").to(device).eval()
transform = torch.hub.load("intel-isl/MiDaS", "transforms").small_transform

def process_depth(input_path, output_path):
    """Generate a depth map from an image and save it."""
    img = cv2.imread(input_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    input_batch = transform(img_rgb).to(device)
    with torch.no_grad():
        prediction = midas(input_batch)
        prediction = torch.nn.functional.interpolate(
            prediction.unsqueeze(1), size=img.shape[:2], mode="bicubic", align_corners=False,
        ).squeeze()
    depth_map = prediction.cpu().numpy()
    depth_map = cv2.normalize(depth_map, None, 0, 255, cv2.NORM_MINMAX)
    depth_map = cv2.GaussianBlur(depth_map, (5, 5), 0)
    cv2.imwrite(output_path, depth_map.astype("uint8"))

@app.route('/api/add-location', methods=['POST'])
def add_location():
    """Add a new location or update an existing one."""
    try:
        data = json.loads(request.form.get('data'))
        file = request.files.get('image')

        # 1️⃣ Save Files
        filename = f"{data['id']}_orig.jpg"
        depth_filename = f"{data['id']}_depth.png"
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        process_depth(os.path.join(UPLOAD_FOLDER, filename), os.path.join(DEPTH_FOLDER, depth_filename))

        # 2️⃣ Load locations.json
        with open(REACT_SRC_DATA, 'r', encoding='utf-8') as f:
            locations = json.load(f)

        # 3️⃣ Update specific ID
        found = False
        for loc in locations:
            if loc['id'] == data['id']:
                loc["thumbnail"] = f"/uploads/{filename}"
                loc["depthMap"] = f"/depth_maps/{depth_filename}"
                found = True
                break

        if not found:
            return jsonify({"error": "Location ID not found"}), 404

        # 4️⃣ Write back updated JSON
        with open(REACT_SRC_DATA, 'w', encoding='utf-8') as f:
            json.dump(locations, f, indent=2)

        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/depth_maps/<path:filename>')
def serve_depth_maps(filename):
    print("Serving:", os.path.join(DEPTH_FOLDER, filename))
    return send_from_directory(DEPTH_FOLDER, filename)

@app.route('/uploads/<path:filename>')
def serve_uploads(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    app.run(port=5000, debug=True)