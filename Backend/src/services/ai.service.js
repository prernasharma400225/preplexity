import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage, trimMessages } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: 'mistral-small-latest',
  apiKey: process.env.MISTRAL_API_KEY
})

export async function generateResponse(messages){
  const responce = await geminiModel.invoke(messages.map(msg => {
    if (msg.role === "user"){
      return new HumanMessage(msg.content)
    } else if (msg.role === "ai"){
      return new AIMessage(msg.content)
    }
  }
))
  return responce.text;
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