const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function check() {
  const modelsToTry = [
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro',
    'gemini-pro',
    'gemini-flash-latest'
  ];

  for (const m of modelsToTry) {
     try {
       const model = genAI.getGenerativeModel({ model: m });
       const result = await model.generateContent('hi');
       console.log('✅ Success with ', m);
       return;
     } catch (e) {
       console.log('❌ Failed with ', m, ' : ', e.status || e.message);
     }
  }
}

check();
