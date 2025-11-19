// Quick test script to list available Gemini models
// Run with: node test-gemini-models.js YOUR_API_KEY

const apiKey = process.argv[2];

if (!apiKey) {
  console.error('Usage: node test-gemini-models.js YOUR_API_KEY');
  process.exit(1);
}

async function listModels() {
  console.log('Fetching available Gemini models...\n');
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      const error = await response.text();
      console.error(error);
      return;
    }
    
    const data = await response.json();
    
    console.log('Available models:\n');
    data.models?.forEach(model => {
      if (model.supportedGenerationMethods?.includes('generateContent')) {
        console.log(`✅ ${model.name}`);
        console.log(`   Display name: ${model.displayName}`);
        console.log(`   Description: ${model.description}`);
        console.log('');
      }
    });
  } catch (error) {
    console.error('Failed to fetch models:', error);
  }
}

listModels();

