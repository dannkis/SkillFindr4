# SkillFindr 4

## Description
Frontend of an LLM-driven chatbot, that is meant to be used within IBM's SkillsBuild system.

## Technology Stack
- Next.js
- Node.js
- JavaScript (ES6)
- IBM Plex (typography)
- IBM Carbon React Library (@carbon/react)
- IBM Carbon Icons React Library (@carbon/icons-react)
- Ollama (for testing LLM integration)

## Setup
For testing purpose, I have chosen OLLAMA to test out the LLM integration with the frontend chatbot. In this case, if you want to replicate LLM behaviour into the chatbot itself, make sure you have OLLAMA installed with your LLM of choice downloaded. 

Now, for the APIs to work you need to create a **.env** inside the **skillfindr** folder. There you have to assign the values for:

`OLLAMA_API_URL`

`OLLAMA_MODEL`

In my testing, I used llama3.2 model, where the .env values look something like:

`OLLAMA_API_URL=http://localhost:11434/api/chat`

`OLLAMA_MODEL=llama3.2`

## Installation
After cloning the github repo, inside the unzipped folder run:

`cd skillfindr`

`npm install`

## Deployment

`npm run dev`

## License

This project is licensed under the Apache License 2.0 – see the [LICENSE](LICENSE) file for details.
