## This is a simple Market Research Assistant Application. 
it leverages Langchain, OpenAI, SERPAPI to generate:
 - A doughnut chart of how the market share is distributed between the given competitors.
 - A list of all the products/activities and the net income through those activities over the past year.

## How to run the Frontend via Docker:

- change to the frontend folder
- Building the docker image:
```
docker build -t involve-ai/frontend:latest .
```
- Running the container:
```
docker run -d --name involve-frontend -p 3000:80 --env-file ./.env -t involve-ai/frontend:latest
```

## How to run the Backend via Docker:

- change to the backend folder
- Building the docker image:
```
docker build -t involve-ai/backend:latest .
```
- Running the container:
```
docker run -d --name involve-backend -p 3002:3002 -t involve-ai/backend:latest
```

## Running the complete setup

We can run the complete setup via docker-compose, run:
```
docker-compose up
```

We need to set the OPENAI and SERPAPI keys in the docker-compose file. You can change the backend url as well through the compose file.

## Video DEMO

[./market_research_demo.mp4]