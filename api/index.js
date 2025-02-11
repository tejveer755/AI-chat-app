import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;


const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIResponse = async (prompt) => {
  try {
    const response = (await model.generateContent(prompt)).response;

    if (response?.candidates?.length > 0) {
      // Safely handle the text extraction
      const aiResponse = response.candidates[0].content.parts[0].text;
      return aiResponse;
    } else {
      // console.error("Invalid response from Gemini API:", response);
      return "Sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "An error occurred. Please try again later.";
  } 
};