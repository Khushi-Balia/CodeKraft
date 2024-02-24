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
def get_result(input_prompt, database_schema="", template=""):
    if GEMINI_API_KEY == "":
        raise ValueError("Please set your API key.")
    
    # We have user_prompt, database_schema and template as inputs to the model. However, database_schema and template are optional.
    if (input_prompt == ""):
        raise ValueError("Prompt is required.")
    else:
        user_prompt = "Output code for this prompt: " + input_prompt

    if (database_schema == ""):
        db_prompt = ""
    else:
        db_prompt = "Consider the following database schema: " + database_schema
    
    if (template == ""):
        template_prompt = ""
    else:
        template_prompt = "Display the result using this format: " + template

    # We combine all the prompts into one prompt
    prompt = (
        user_prompt
        + db_prompt
        + template_prompt
    )

    code_result = model.generate_content(prompt)
    code_text = remove_code_markdown(code_result.text)

    pseudocode_prompt = "Give me a pseudocode for this code: " + code_text
    pseudocode_result = model.generate_content(pseudocode_prompt)
    pseudocode_text = remove_code_markdown(remove_markdown(pseudocode_result.text))

    description_prompt = "Give me a short explaination of this code: " + code_text
    description_result = model.generate_content(description_prompt)
    description_text = remove_markdown(description_result.text)

    similarity_score = get_similarity(user_prompt, description_text)

    language_prompt = "What language is this code written in? Output in one word only" + code_text
    language_result = model.generate_content(language_prompt)
    language = remove_markdown(language_result.text)

    performance_prompt = " Give Time taken in seconds and Memory taken in MBs, and run a few tests for this code and check it with the expected output: " + code_text
    performance_result = model.generate_content(performance_prompt)
    metrics = remove_code_markdown(remove_markdown(performance_result.text))

    return code_text, pseudocode_text, description_text, similarity_score, language, metrics

# This function evaluates performance metrics 
def eval_query(code_text):
    if GEMINI_API_KEY == "":
        raise ValueError("Please set your API key.")
    
    performance_prompt = " Give Time taken in seconds and Memory taken in MBs, and run a few unit tests for this code and check it with the output: " + code_text
    performance_result = model.generate_content(performance_prompt)
    metrics = remove_code_markdown(remove_markdown(performance_result.text))

    description_prompt = "Give me a short explaination of this code: " + code_text
    description_result = model.generate_content(description_prompt)
    description_text = remove_markdown(description_result.text)

    return metrics, description_text

# Uncomment the below code to run the standalone model
# code, pseudocode, description, similarity_score, language, metrics = get_result("Write a SQL query to retrieve names of all female students with a score of 80 or above in English subject", database_schema="Student(sid, name, gender), Report(rid, sid, subject, marks)", template="")

# print("#############################################################")
# print("Code: ", code)
# print("#############################################################")
# print("Pseudocode: ", pseudocode)
# print("#############################################################")
# print("Description: ", description)
# print("#############################################################")
# print("Similarity Score: ", similarity_score)
# print("#############################################################")
# print("Language: ", language)
# print("#############################################################")
# print("Performance Metrics: ", metrics)
# print("#############################################################")