import google.generativeai as genai
from IPython.display import Markdown
import os

GEMINI_API_KEY = "AIzaSyCGOYJNkoztEVxDN28qgzhe1VCb-RGSh6c"

model = genai.GenerativeModel('gemini-pro')

genai.configure(api_key = GEMINI_API_KEY)

prompt = "I have two databases Student where the fields are Student_id, Student_name and Grades where the fields are Student_id, Marks. Give me SQL Query to output name of all students with grade greater than 80."

response = model.generate_content(prompt)
print(response.text)