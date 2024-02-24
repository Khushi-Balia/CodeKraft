from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from model.model import get_result , eval_query

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": '*'}})

# This 
@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()

        prompt = data.get('prompt', '')
        database_schema = data.get('database_schema', '')
        template = data.get('template', '')

        if not prompt:
            raise ValueError("Prompt is required.")
        
        print("Generating code...")
        code_text, pseudocode_text, description_text, similarity_score, language, metrics = get_result(prompt, database_schema, template)
        analysis_results = {
            'code': code_text,
            'pseudocode': pseudocode_text,
            'description': description_text,
            'similarity_score': similarity_score,
            'language': language,
            'metrics': metrics
        }

        print("Generation complete...")
        return jsonify(analysis_results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500 
    
@app.route('/api/eval', methods=['POST'])
def eval():
    try:       
        data = request.get_json() 

        code = data.get('code'  ,'')

        if not code:
            raise ValueError("Code is required.")

        print("Performing evaluation...")
        metrics, description_text = eval_query(code)

        evaluation_result = { 
            'description': description_text,
            'metrics': metrics
        }
        print("Evaluation complete...")
        return jsonify(evaluation_result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500 
if __name__ == '__main__':
    app.run(debug=True)