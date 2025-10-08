const axios = require('axios');

exports.chat = async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `You are an AI tutor for EduVerse 3D, helping students from classes 1-10 learn through simple, friendly explanations. 
    Keep your answers concise, age-appropriate, and encouraging. Use examples and analogies when helpful.
    ${context ? `Context: The student is learning about ${context}` : ''}`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    
    res.json({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);
    
    // Fallback response if API fails
    res.json({
      response: "I'm having trouble connecting right now. Please try asking your question again in a moment!",
      timestamp: new Date().toISOString()
    });
  }
};
