const { getAI } = require('../services/ai.service');

module.exports.getAiReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Prompt is required',
    });
  }

  try {
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      systemInstruction: `
      You're a professional code reviewer. Review the code shared by the user.
      
      Focus your feedback on:
      - Errors or Bugs (e.g. runtime errors, exceptions)
      - Suggestions to improve code quality, clarity, and performance
      - Best Practices based on language conventions
      
      Structure your response like this:
      1. **Problems** – Mention any issues like bugs or bad patterns
      2. **Suggestions** – Recommend better naming, structure, or error handling
      3. **Correct Version (if needed)** – Show improved code with explanations
      
      Keep it clear and developer-friendly. Avoid long explanations unless necessary. Do not just say “code is fine”; always try to add helpful feedback.
      `,
      
      
      contents: [
        {
          role: 'user',
          parts: [{ text: `Please review the following code:\n\n${code}` }],
        },
      ],
    });

    res.json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error('AI error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
