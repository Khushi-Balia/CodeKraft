from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from model import get_result

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        database_schema = data.get('database_schema', '')
        template = data.get('template', '')

        if not prompt:
            raise ValueError("Prompt is required.")

        code, pseudocode, description, similarity_score = get_result(prompt, database_schema, template)

        print("Generating code...")
        analysis_results = {
            'code': code,
            'pseudocode': pseudocode,
            'description': description,
            'similarity_score': similarity_score
        }

        print("Generation complete...")
        return jsonify(analysis_results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return a JSON error response

if __name__ == '__main__':
    app.run(debug=True)