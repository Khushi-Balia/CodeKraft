import google.generativeai as genai
from sentence_transformers import SentenceTransformer, util

GEMINI_API_KEY = ""
model = genai.GenerativeModel('gemini-pro')
genai.configure(api_key = GEMINI_API_KEY)

def get_similarity(prompt, description):
    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

    prompt_embedding = model.encode(prompt, convert_to_tensor=True)
    description_embedding = model.encode(description, convert_to_tensor=True)

    similarity_score = util.pytorch_cos_sim(prompt_embedding, description_embedding).item()

    return similarity_score

def get_result(user_prompt, database_schema = "", template = ""):

    if (GEMINI_API_KEY == ""):
        raise ValueError("Please set your API key.")

    # We have two things: user_prompt and database schema
    prompt = "Output code as requested here: " + user_prompt + "Consider the following database schema: " + database_schema + "Display the result uding this format: " + template

    code = model.generate_content(prompt)
    print(code.text)

    pseudocode_prompt = "Give me a pseudocode for the following code: " + code.text

    pseudocode = model.generate_content(pseudocode_prompt)
    print(pseudocode.text)

    description_prompt = "Give me a breif description of the following code: " + code.text

    description = model.generate_content(description_prompt)
    print(description.text)

    similarity_score = get_similarity(user_prompt, description.text)
    print(similarity_score)

    return code.text, pseudocode.text, description.text, similarity_score