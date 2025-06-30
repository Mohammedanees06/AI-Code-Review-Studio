require("dotenv").config();

let ai;

(async () => {
  const { GoogleGenAI } = await import("@google/genai");

  ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });
})();

module.exports = {
  getAI: () => ai,
};
