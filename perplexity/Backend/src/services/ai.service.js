import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

export async function testAi() {
    model.invoke("write a hello program in js")
        .then((response) => {
            console.log(response.text);
        })
}