import CONFIG from './config.js';

class ChatManager {
    constructor() {
        this.isProcessing = false;
        this.initializeEventListeners();
    }

    // Initialize chat event listeners
    initializeEventListeners() {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter' && !this.isProcessing) {
                    this.sendMessage();
                }
            });
        }
    }

    // Send message to chat
    sendMessage() {
        if (this.isProcessing) return;
        
        const input = document.getElementById('chat-input');
        const message = input?.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        this.sendToGemini(message);
    }

    // Add message to chat interface
    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-header">${sender === 'user' ? 'You' : 'Research Assistant'}</div>
            <div class="message-content">${content}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Show typing indicator
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-header">Research Assistant</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Remove typing indicator
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Clear chat history
    clearChat() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        messagesContainer.innerHTML = `
            <div class="message bot-message">
                <div class="message-header">Research Assistant</div>
                <div class="message-content">
                    🌱 <strong>Welcome to AgriSense Research System!</strong><br><br>
                    I'm your specialized research assistant trained on plant stress detection literature. I can analyze:
                    <br>• <strong>Gas Sensor Data:</strong> VOC emissions from MQ-135, MQ-3, MQ-136 sensors
                    <br>• <strong>CNN Results:</strong> Disease classification with confidence scores
                    <br>• <strong>Multi-modal Analysis:</strong> Correlating gas patterns with visual symptoms
                    <br>• <strong>Research Insights:</strong> Based on 20+ peer-reviewed papers
                    <br><br>Enter your sensor readings and CNN results, then ask me for analysis! 🔬
                </div>
            </div>
        `;
    }

    // Send message to Gemini API
    async sendToGemini(userMessage, sensorData = {}, diseaseData = {}, plantType = '', context = '') {
        this.isProcessing = true;
        
        // Build research-grade prompt
        let researchPrompt = this.buildResearchPrompt(userMessage, sensorData, diseaseData, plantType, context);

        try {
            const response = await fetch(`${CONFIG.API_ENDPOINT}?key=${CONFIG.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: researchPrompt
                        }]
                    }]
                })
            });

            this.removeTypingIndicator();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates[0]) {
                const botResponse = data.candidates[0].content.parts[0].text;
                this.addMessage(botResponse, 'bot');
            } else if (data.error) {
                this.addMessage(`❌ API Error: ${data.error.message || 'Unknown error occurred'}`, 'bot');
            } else {
                this.addMessage('❌ Error: Unable to get response from Gemini API. Please check your API key and try again.', 'bot');
            }
        } catch (error) {
            this.removeTypingIndicator();
            console.error('Error:', error);
            
            if (error.message.includes('HTTP error')) {
                this.addMessage('❌ API Error: Please check your Gemini API key and ensure it\'s valid.', 'bot');
            } else {
                this.addMessage('❌ Network error. Please check your internet connection and try again.', 'bot');
            }
        } finally {
            this.isProcessing = false;
        }
    }

    // Build research prompt for Gemini API
    buildResearchPrompt(userMessage, sensorData, diseaseData, plantType, context) {
        let prompt = `You are an expert AgriSense research assistant specializing in plant stress detection through VOC analysis and disease classification. 

CURRENT DATA:
`;

        if (sensorData.hasData) {
            prompt += `🔬 GAS SENSOR READINGS:
• MQ-135 CO2: ${sensorData.co2 || 'N/A'} ppm
• NH3: ${sensorData.nh3 || 'N/A'} ppm  
• MQ-3 Ethanol: ${sensorData.ethanol || 'N/A'} ppm
• MQ-136 H2S: ${sensorData.h2s || 'N/A'} ppm
• Temperature: ${sensorData.temperature || 'N/A'}°C
• Humidity: ${sensorData.humidity || 'N/A'}%

`;
        }

        if (diseaseData.hasData) {
            prompt += `🤖 CNN DISEASE CLASSIFICATION:
• Detected Disease: ${diseaseData.disease}
• Confidence Score: ${(diseaseData.confidence * 100).toFixed(1)}%

`;
        }

        prompt += `TARGET PLANT: ${plantType}
${context ? `ADDITIONAL CONTEXT: ${context}` : ''}

RESEARCH KNOWLEDGE BASE:
- VOC patterns indicate stress types: Ethanol↑ = drought stress, NH3↑ = pathogen stress, H2S↑ = root problems
- Gas sensor thresholds: CO2 >450ppm (stress), Ethanol >10ppm (drought), NH3 >5ppm (disease)
- Multi-modal correlation: Visual symptoms + VOC patterns improve accuracy
- Early detection: VOC changes occur 24-48h before visible symptoms

USER QUERY: ${userMessage}

Provide research-grade analysis with:
1. Data interpretation based on sensor readings
2. Stress type identification from VOC patterns  
3. Correlation with CNN disease results
4. Actionable recommendations
5. Research insights and references

Response should be academic but practical for farmers.`;

        return prompt;
    }

    // Perform research analysis with current data
    performResearchAnalysis(sensorData, diseaseData, plantType, context) {
        if (!sensorData.hasData && !diseaseData.hasData) {
            this.addMessage('⚠️ Please enter sensor readings or CNN results before performing analysis.', 'bot');
            return;
        }

        let analysisRequest = "🔬 **Research Analysis Request:**\n\n";
        
        if (sensorData.hasData) {
            analysisRequest += `**VOC Sensor Readings:**\n`;
            analysisRequest += `• MQ-135 CO2: ${sensorData.co2} ppm\n`;
            analysisRequest += `• NH3: ${sensorData.nh3} ppm\n`;
            analysisRequest += `• MQ-3 Ethanol: ${sensorData.ethanol} ppm\n`;
            analysisRequest += `• MQ-136 H2S: ${sensorData.h2s} ppm\n`;
            analysisRequest += `• Temperature: ${sensorData.temperature}°C\n`;
            analysisRequest += `• Humidity: ${sensorData.humidity}%\n\n`;
        }
        
        if (diseaseData.hasData) {
            analysisRequest += `**CNN Classification:**\n`;
            analysisRequest += `• Detected: ${diseaseData.disease}\n`;
            analysisRequest += `• Confidence: ${(diseaseData.confidence * 100).toFixed(1)}%\n\n`;
        }
        
        if (context) {
            analysisRequest += `**Additional Context:** ${context}\n\n`;
        }
        
        analysisRequest += "Please provide comprehensive research-grade analysis correlating VOC patterns with visual symptoms.";
        
        this.addMessage(analysisRequest, 'user');
        this.sendToGemini(analysisRequest, sensorData, diseaseData, plantType, context);
    }
}

export default ChatManager; 