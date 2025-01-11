import dotenv from "dotenv";
dotenv.config();

import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { getVisaGeneralAdviceTemplate } from "../utils/templates.js";
import collection from "../config/embedded.js";

export const getVisaAdvice = async (req, res) => {
  try {
    // Extract user input from the request body
    const { name, nationality, intention, description } = req.body;

    // Validate required fields
    if (
      !name ||
      !nationality ||
      !intention ||
      !description
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Construct the user's query
    const question = `As a user, here is my profile: ${nationality}, ${intention}, ${description}. What documents are required?`;

    // Initialize the Google Generative AI model
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-1.5-flash",
    });

    // Initialize embeddings for vector search
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Set up vector search with MongoDB
    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection,
      indexName: "vector_index",
      textKey: "text",
      embeddingKey: "embedding",
    });

    // Perform a similarity search on the vector store
    const embeddingResults = await vectorStore.similaritySearch(question, 10);

    // Combine the embedding results into a single string
    const combinedEmbeddingResults = embeddingResults
      .map((doc) => doc.pageContent)
      .join("\n");

    // Generate the final response using the model
    const response = await model.invoke(
      getVisaGeneralAdviceTemplate(combinedEmbeddingResults, question, name)
    );

    // Send the response back to the client
    res.status(200).json({ response: response.content });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
