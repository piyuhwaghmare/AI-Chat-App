require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    console.log("----------------------------------------");
    console.log("🔍 ASKING GOOGLE FOR AVAILABLE MODELS...");
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.log("❌ API KEY ERROR:", data.error.message);
            return;
        }

        console.log("✅ ACCESS GRANTED. Here are your available models:\n");
        
        // Filter for models that support "generateContent" (Chat)
        const chatModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
        
        chatModels.forEach(m => {
            console.log(`👉 Name: "${m.name.replace('models/', '')}"`);
            console.log(`   (Desc: ${m.displayName})`); 
        });

        console.log("\n👇 COPY ONE OF THE NAMES ABOVE INTO YOUR CODE!");

    } catch (error) {
        console.error("❌ Network Error:", error);
    }
    console.log("----------------------------------------");
}

listModels();