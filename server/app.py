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

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        database_schema = data.get('database_schema', '')
        template = data.get('template', '')
        print(template)
        print(prompt)
        if not prompt:
            raise ValueError("Prompt is required.")
        
        print("Generating code...")
        code, pseudocode, description, similarity_score = get_result(prompt, database_schema, template)
        print(" hehheh")
        analysis_results = {
            'code': code,
            'pseudocode': pseudocode,
            'description': description,
            'similarity_score': similarity_score,
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
        print("//////2225555/////////////////////////////////////////")
        print(code)
        analysis_code_txt= eval_query(code)

        # print("Generating code22...")
       
        # print("uuuprituuuuu")
        # print(analysis_results.code)
        # print(analysis_results.pseudocode)
        analysis_code = { 
            "code" : analysis_code_txt
        }
        print("Generation complete2...")
        return jsonify(analysis_code)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500 
if __name__ == '__main__':
    app.run(debug=True)