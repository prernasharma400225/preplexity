import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: 'mistral-small-latest',
  apiKey: process.env.MISTRAL_API_KEY
})

const searchInternetTool = tool(
  searchInternet,
  {
    name: "searchInternet",
    description: "Use this tool to get the latest information from the internet.",
    Schema: z.object({
      query: z.string().describe("The search query to look up on the internet.")
    }),
  }
)

const agent = createAgent({
  model : geminiModel,
  tools: [searchInternetTool],
})

export async function generateResponse(messages){

  const responce = await agent.invoke({
    messages: [
      new SystemMessage(`
        You are a helpful and precise assistant for answering question,
        If you donn't know the answer, say you don't know, If the question reqires up-to-date information, use the "searchInternet" tool to get the latest information.` ),
      
    ...(messages.map(msg => {
    if (msg.role === "user"){
      return new HumanMessage(msg.content)
    } else if (msg.role === "ai"){
      return new AIMessage(msg.content)
    }
  }
))]
})
  return responce.messages[responce.messages.length - 1].text;
}

export async function generateChatTitle(message){

  const response = await mistralModel.invoke([
    new SystemMessage(`You are a helpful assistant that generates concise and relevant titles for chat conversations.
      
      User will provide you with the  first message of a chat converstio, and you will genrate  a title that captures th eessence of the converstion in 2-4 words. The title should be clear, relevent, and engaging, giving users a quick understanding of the chat's topic.
        `),
      new HumanMessage(`Generate a concise and relevant title for a chat conversation based on the following first message: "${message}". `)
  ])

  return response.text;

}


// export async function testAi() {
//     model.invoke("What is AI explain under 100 words?")
//     .then((response) => {
//         console.log(response.text);
        
//     })
// }

// import { ChatGoogle } from "@langchain/google";

// const llm = new ChatGoogle({
//   apiKey: "your-api-key",
//   model: "gemini-2.5-flash",
// });