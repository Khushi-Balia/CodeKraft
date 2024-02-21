import google.generativeai as genai
from sentence_transformers import SentenceTransformer, util
from bs4 import BeautifulSoup
import markdown
import os

current_dir = os.path.dirname(os.path.realpath(__file__))
config_path = os.path.join(current_dir, "config.txt")

# Obtain the API Key from config.txt file
if os.path.exists(config_path):
    GEMINI_API_KEY = open(config_path, "r").read()
else:
    raise ValueError("API key not found. Please set your config.txt file. Refer instructions present in README to create an API key and store it in config.txt file.")

# We use Gemini Pro for our implemetation
model = genai.GenerativeModel('gemini-pro')
genai.configure(api_key = GEMINI_API_KEY)

def remove_markdown(markdown_text):
    html = markdown.markdown(markdown_text)
    soup = BeautifulSoup(html, features="lxml")
    text_elements = soup.find_all(string=True)
    cleaned_text = "".join(text_elements)
    return cleaned_text

def remove_code_markdown(code):
    lines = code.split('\n')
    trimmed_code = '\n'.join(lines[1:-1])
    return trimmed_code

def get_similarity(prompt, description):

    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

    prompt_embedding = model.encode(prompt, convert_to_tensor=True)
    description_embedding = model.encode(description, convert_to_tensor=True)

    similarity_score = util.pytorch_cos_sim(prompt_embedding, description_embedding).item()

    return similarity_score

# This function returns the code, pseudocode, description and similarity score from the given prompt, database schema and template
def get_result(user_prompt, database_schema="", template=""):
    print("GR: 1")
    if GEMINI_API_KEY == "":
        raise ValueError("Please set your API key.")
    # We have two things: user_prompt and database schema
    prompt = (
        "Output code as requested here: "
        + user_prompt
        + "Consider the following database schema: "
        + database_schema
        + "Display the result using this format: "
        + template
    )
    code_result = model.generate_content(prompt)
    code_text = remove_code_markdown(code_result.text)  # Accessing text from parts

    pseudocode_prompt = "Give me a pseudocode for the following code: " + code_text
    pseudocode_result = model.generate_content(pseudocode_prompt)
    pseudocode_text = remove_markdown(pseudocode_result.text)  # Accessing text from parts
    # print(pseudocode_text)
    description_prompt = "Give me a brief description of the following code: " + code_text

    description_result = model.generate_content(description_prompt)
    description_text = remove_markdown(description_result.text)  # Accessing text from parts
    print("cleannn")

    # print(similarity_score)
    similarity_score = get_similarity(user_prompt, description_text)
    return code_text, pseudocode_text, description_text, similarity_score

# This function evaluates performance metrics 
def eval_query(query):
    prompt = "Give example, expected output and actual output as a json along with time and memory taken for the following code: " + query
    response = model.generate_content(prompt)
    eval = remove_markdown(response.text)
    return eval

# Uncomment the below code to run the standalone model
# code, pseudocode, description, similarity_score = get_result("Write a Flask API to retrive names of all female students with a score of 80 or more in English paper", database_schema="Student(sid, name, gender), Report(rid, sid, subject, marks)", template="")
# evaluation = eval_query(code)

# print("Code: ", code)
# print("Pseudocode: ", pseudocode)
# print("Description: ", description)
# print("Similarity Score: ", similarity_score)
# print("Evaluation: ", evaluation)