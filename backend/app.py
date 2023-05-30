from flask import Flask, request, jsonify
from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.llms import OpenAI
from langchain import PromptTemplate
from flask_cors import CORS

import os
import json

# set below if you do not want to set the API keys in the system environment
# os.environ["OPENAI_API_KEY"] = ""
# os.environ["SERPAPI_API_KEY"] = ""
app = Flask(__name__)
CORS(app)

def get_competition_template(companies):
  return """
      For the following query, respond as follows:
      [{"market1":"name1", "companies":[{"company":"value","share":"value"}, {"company": "value","share":"value"},...]}, ...]

      If you do not know the answer, respond as follows:
      {"market":"", "companies":[]}

      Lets think step by step.
      The output should always be a valid json
      Below is the query:
      query: what markets do """+companies+""" compete in and what percentage of those market do they control
      """

def get_product_template(company):
  return """
  For the following query, respond as follows:
  [{"activity": "activity1", "revenue": "revenue1"}, ...]

  If you do not know the answer, respond as follows:
  [{}]
  Lets think step by step.
  The output should always be a valid json
  Below is the query:
  query: what are the top 3 things that contributed to the revenue of """+company+""" last year
  """

@app.route('/market_details', methods = ["GET"])
def get_market_share_details():
  # setting the temperature to 0.8 so that the LLM can be more creative
  llm = OpenAI(temperature=0.8)
  tools = load_tools(["serpapi", "llm-math"], llm=llm)
  # setting the agent to ZERO SHOT type, would be better to set it to a FEW SHOT type and provide example with more time
  agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)
  competitors = request.args["company"].split(",")
  competition = json.loads(agent.run(get_competition_template(request.args["company"])))
  
  activity = []

  for company in competitors:
    try:
      company_activities = json.loads(agent.run(get_product_template(company)))
      for act in company_activities:
        act["company"] = company
        activity.append(act)
    except:
      # ideally I would like to report any json parse issues to understand if the LLM is producing non json output
      # would be useful to track to tune the temperature hyper-parameter
      pass
  
  response = {}
  response["market_split"] = competition
  response["activities"] = activity
  return jsonify(response)

# API call to behave like a liveness check
@app.route('/ping', methods=["GET"])
def ping():
  return "pong"

if __name__ == "__main__":
  app.run(debug=True)