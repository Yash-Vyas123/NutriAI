const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function test() {
  try {
    const result = await model.generateContent('Hi');
    console.log('Gemini OK: ', result.response.text());
  } catch (err) {
    console.error('Gemini Failed: ', err.message);
    if (err.status === 429) console.log('Advice: Key is rate-limited.');
    if (err.status === 400) console.log('Advice: Model may not be supported or key is invalid.');
  }
}

test();
