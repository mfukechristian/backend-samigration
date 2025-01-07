import dotenv from "dotenv";
dotenv.config();
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const main = async () => {
  try {
    // Initialize the Google Generative AI model
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-1.5-flash",
    });

    // Make a query to the model
    const response = await model.invoke("Who is the current president of DRC?");

    // Log the response content
    console.log("AI Response:", response.content);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Run the main function
main();
