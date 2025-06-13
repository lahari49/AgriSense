import CONFIG from './config.js';
import SensorManager from './sensorManager.js';
import DiseaseManager from './diseaseManager.js';
import ChatManager from './chatManager.js';

class AgriSenseApp {
    constructor() {
        this.sensorManager = new SensorManager();
        this.diseaseManager = new DiseaseManager();
        this.chatManager = new ChatManager();
        
        this.initializeApp();
    }

    // Initialize the application
    initializeApp() {
        // Clear any stored security notices
        localStorage.removeItem('agrisense_security_notice');
        
        // Initialize sensor status with default values
        this.sensorManager.initializeSensorStatus();
        
        // Set up global event handlers
        this.setupGlobalEventHandlers();
        
        console.log('🌱 AgriSense Research System initialized successfully!');
    }

    // Set up global event handlers for buttons
    setupGlobalEventHandlers() {
        // Sensor simulation button
        const simulateSensorBtn = document.querySelector('button[onclick="simulateResearchData()"]');
        if (simulateSensorBtn) {
            simulateSensorBtn.onclick = () => this.handleSensorSimulation();
        }

        // CNN simulation button
        const simulateCNNBtn = document.querySelector('button[onclick="simulateCNNResults()"]');
        if (simulateCNNBtn) {
            simulateCNNBtn.onclick = () => this.handleCNNSimulation();
        }

        // Research analysis button
        const researchAnalysisBtn = document.querySelector('button[onclick="performResearchAnalysis()"]');
        if (researchAnalysisBtn) {
            researchAnalysisBtn.onclick = () => this.handleResearchAnalysis();
        }

        // Chat buttons
        const sendBtn = document.getElementById('send-button');
        if (sendBtn) {
            sendBtn.onclick = () => this.chatManager.sendMessage();
        }

        const clearBtn = document.querySelector('button[onclick="clearChat()"]');
        if (clearBtn) {
            clearBtn.onclick = () => this.chatManager.clearChat();
        }
    }

    // Handle sensor data simulation
    handleSensorSimulation() {
        const result = this.sensorManager.simulateResearchData();
        this.chatManager.addMessage(result.message, 'bot');
    }

    // Handle CNN results simulation
    handleCNNSimulation() {
        const result = this.diseaseManager.simulateCNNResults();
        this.chatManager.addMessage(result.message, 'bot');
    }

    // Handle research analysis
    handleResearchAnalysis() {
        const sensorData = this.sensorManager.collectSensorData();
        const diseaseData = this.diseaseManager.collectDiseaseData();
        const plantType = 'tomato';
        const context = document.getElementById('research-notes')?.value || '';

        this.chatManager.performResearchAnalysis(sensorData, diseaseData, plantType, context);
    }

    // Get current application state
    getCurrentState() {
        return {
            sensorData: this.sensorManager.collectSensorData(),
            diseaseData: this.diseaseManager.collectDiseaseData(),
            plantType: 'tomato',
            context: document.getElementById('research-notes')?.value || ''
        };
    }

    // Export data for research purposes
    exportResearchData() {
        const state = this.getCurrentState();
        const timestamp = new Date().toISOString();
        
        const exportData = {
            timestamp: timestamp,
            sessionId: this.generateSessionId(),
            ...state
        };

        // Create downloadable JSON file
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `agrisense_research_data_${timestamp.split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        this.chatManager.addMessage('📊 Research data exported successfully!', 'bot');
    }

    // Generate unique session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Validate all input data
    validateAllData() {
        const sensorData = this.sensorManager.collectSensorData();
        const diseaseData = this.diseaseManager.collectDiseaseData();
        
        const errors = [];
        
        if (!sensorData.hasData && !diseaseData.hasData) {
            errors.push('No sensor or disease data available for analysis');
        }
        
        if (diseaseData.hasData) {
            const validation = this.diseaseManager.validateDiseaseData(diseaseData);
            if (!validation.isValid) {
                errors.push(...validation.errors);
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Reset application to initial state
    resetApplication() {
        // Clear all form inputs
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'text' || input.type === 'number') {
                input.value = '';
            } else if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            }
        });

        // Reset sensor status
        this.sensorManager.initializeSensorStatus();
        
        // Clear chat
        this.chatManager.clearChat();
        
        // Reset confidence bar
        this.diseaseManager.updateConfidenceBar(0);
        
        this.chatManager.addMessage('🔄 Application reset to initial state.', 'bot');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make the app globally available for legacy onclick handlers
    window.agriSenseApp = new AgriSenseApp();
    
    // Legacy function mappings for backward compatibility
    window.simulateResearchData = () => window.agriSenseApp.handleSensorSimulation();
    window.simulateCNNResults = () => window.agriSenseApp.handleCNNSimulation();
    window.performResearchAnalysis = () => window.agriSenseApp.handleResearchAnalysis();
    window.clearChat = () => window.agriSenseApp.chatManager.clearChat();
    window.sendMessage = () => window.agriSenseApp.chatManager.sendMessage();
});

export default AgriSenseApp; 