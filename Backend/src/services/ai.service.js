import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAi() {
    model.invoke("What is AI explain under 100 words?")
    .then((response) => {
        console.log(response.text);
        
    })
}

import { ChatGoogle } from "@langchain/google";

const llm = new ChatGoogle({
  apiKey: "your-api-key",
  model: "gemini-2.5-flash",
});