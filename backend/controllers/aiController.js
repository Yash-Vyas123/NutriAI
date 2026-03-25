const { GoogleGenerativeAI } = require('@google/generative-ai');
const HealthProfile = require('../models/HealthProfile');

// Only 'gemini-flash-latest' works for this key/setup.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-flash-latest',
  safetySettings: [
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
  ]
});

// Prompt context builder
const buildUserContext = (profile) => {
  return `Age: ${profile.age}, Gender: ${profile.gender}, BMI: ${profile.bmi}, Goal: ${profile.fitnessGoal}, Preference: ${profile.foodPreference}, Health: ${profile.healthConditions}. Target: ${profile.dailyCalories} kcal.`;
};

// Helper: robust JSON parser
const parseAIResponse = (text) => {
  try {
    const cleanText = text.replace(/```json|```/g, '').trim();
    const start = cleanText.indexOf('{');
    const end = cleanText.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end >= start) {
      return JSON.parse(cleanText.substring(start, end + 1));
    }
    return JSON.parse(cleanText);
  } catch (err) {
    console.error('AI Parsing Error:', text);
    throw new Error('AI returned an invalid format. Please try again.');
  }
};

// ─── AI Routes ───────────────────────────────────────────────────────────────

const getDailyPlan = async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Setup your profile first.' });

    const context = buildUserContext(profile);
    const prompt = `Act as an expert nutritionist. Create a personalized daily meal plan for the following user:
Context: ${context}

The response MUST BE ONLY A JSON object with EXACTLY this structure:
{
  "totalCalories": number,
  "totalProtein": number,
  "totalCarbs": number,
  "totalFats": number,
  "breakfast": { "name": "string", "calories": number, "description": "string", "items": ["string"], "protein": number, "carbs": number, "fats": number },
  "lunch": { "name": "string", "calories": number, "description": "string", "items": ["string"], "protein": number, "carbs": number, "fats": number },
  "dinner": { "name": "string", "calories": number, "description": "string", "items": ["string"], "protein": number, "carbs": number, "fats": number },
  "morningSnack": { "name": "string", "calories": number, "description": "string", "items": ["string"], "protein": number, "carbs": number, "fats": number },
  "eveningSnack": { "name": "string", "calories": number, "description": "string", "items": ["string"], "protein": number, "carbs": number, "fats": number }
}

Ensure the sum of meal calories matches 'totalCalories' and fits the target of ${profile.dailyCalories} kcal.
DO NOT include any explanation or markdown, ONLY provide the raw JSON.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json(parseAIResponse(text));
  } catch (err) {
    console.error('❌ Daily Plan AI Error:', err.message);
    if (err.status === 429) {
       return res.status(429).json({ message: 'The AI is a bit busy right now! Please try again in 1-2 minutes.' });
    }
    res.status(500).json({ message: 'Connection issue or invalid AI format. Please refresh.', error: err.message });
  }
};

const chatbot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Input required' });

    let profile = null;
    try { profile = await HealthProfile.findOne({ user: req.user.id }); } catch (e) {}

    let systemPrompt = `You are NutriBot, a premium expert nutritionist advisor. 
Keep your advice professional, encouraging, and scientifically accurate. 
Format your responses neatly using bullet points and short paragraphs. Avoid long blocks of text.
Use '•' for lists instead of '*'.`;

    if (profile) {
      systemPrompt += `\nUser Profile Context: ${buildUserContext(profile)}`;
    }

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${message}\nNutriBot Answer:`;
    const result = await model.generateContent(fullPrompt);
    const reply = result.response.text();
    
    if (!reply) throw new Error('AI returned an empty response.');
    
    res.json({ reply });
  } catch (err) {
    console.error('❌ Chatbot AI Error:', err.message);
    if (err.status === 429) {
       return res.status(429).json({ message: 'My brain is taking a quick break! (Too many requests). Please wait a minute and try again.' });
    }
    res.status(500).json({ message: 'Sorry, I am having trouble connecting right now.', error: err.message });
  }
};

const getWeeklyPlan = (req, res) => res.status(501).json({ message: 'Weekly plans coming soon!' });
const getGroceryList = (req, res) => res.status(501).json({ message: 'Grocery tracking coming soon!' });

module.exports = { getDailyPlan, getWeeklyPlan, getGroceryList, chatbot };

