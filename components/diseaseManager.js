import CONFIG from './config.js';

class DiseaseManager {
    constructor() {
        this.currentDiseaseData = {};
        this.initializeEventListeners();
    }

    // Initialize event listeners for disease classification
    initializeEventListeners() {
        // Update confidence bar when confidence score changes
        const confidenceInput = document.getElementById('confidence-score');
        if (confidenceInput) {
            confidenceInput.addEventListener('input', () => {
                const confidence = parseFloat(confidenceInput.value) || 0;
                this.updateConfidenceBar(confidence);
            });
        }
    }

    // Collect disease data from form inputs
    collectDiseaseData() {
        const disease = document.getElementById('detected-disease')?.value;
        const confidence = parseFloat(document.getElementById('confidence-score')?.value);
        
        const hasData = disease && !isNaN(confidence);
        
        return { disease, confidence, hasData };
    }

    // Update confidence bar visualization
    updateConfidenceBar(confidence) {
        const fill = document.getElementById('confidence-fill');
        if (fill) {
            fill.style.width = (confidence * 100) + '%';
        }
    }

    // Simulate CNN disease classification results
    simulateCNNResults() {
        const selectedDisease = CONFIG.DISEASE_CLASSES[Math.floor(Math.random() * CONFIG.DISEASE_CLASSES.length)];
        const confidence = 0.7 + Math.random() * 0.25; // 70-95% confidence
        
        // Update form inputs
        const diseaseSelect = document.getElementById('detected-disease');
        const confidenceInput = document.getElementById('confidence-score');
        
        if (diseaseSelect) diseaseSelect.value = selectedDisease;
        if (confidenceInput) confidenceInput.value = confidence.toFixed(3);
        
        this.updateConfidenceBar(confidence);
        
        this.currentDiseaseData = {
            disease: selectedDisease,
            confidence: confidence
        };
        
        return {
            disease: selectedDisease,
            confidence: confidence,
            message: `🤖 <strong>CNN Analysis Complete:</strong> Detected ${selectedDisease.replace('_', ' ')} with ${(confidence * 100).toFixed(1)}% confidence.`
        };
    }

    // Get disease information for analysis
    getDiseaseInfo(diseaseName) {
        const diseaseInfo = {
            healthy: {
                description: "Healthy tomato plant with normal growth patterns",
                symptoms: "No visible symptoms",
                recommendations: "Continue current care routine"
            },
            early_blight: {
                description: "Fungal disease caused by Alternaria solani",
                symptoms: "Dark brown spots with concentric rings on lower leaves",
                recommendations: "Remove infected leaves, apply fungicide, improve air circulation"
            },
            late_blight: {
                description: "Destructive disease caused by Phytophthora infestans",
                symptoms: "Water-soaked lesions on leaves and stems, white fungal growth",
                recommendations: "Immediate fungicide application, remove infected plants, improve drainage"
            },
            leaf_mold: {
                description: "Fungal disease caused by Passalora fulva",
                symptoms: "Yellow spots on upper leaf surface, olive-green spores underneath",
                recommendations: "Reduce humidity, apply fungicide, improve ventilation"
            },
            septoria_leaf_spot: {
                description: "Fungal disease caused by Septoria lycopersici",
                symptoms: "Small circular spots with gray centers and dark borders",
                recommendations: "Remove infected leaves, apply fungicide, avoid overhead watering"
            },
            spider_mites: {
                description: "Tiny arachnids that feed on plant sap",
                symptoms: "Stippled leaves, fine webbing, leaf yellowing and dropping",
                recommendations: "Apply miticide, increase humidity, introduce beneficial insects"
            },
            target_spot: {
                description: "Fungal disease caused by Corynespora cassiicola",
                symptoms: "Target-like lesions with concentric rings",
                recommendations: "Remove infected leaves, apply fungicide, improve air circulation"
            },
            yellow_leaf_curl: {
                description: "Viral disease transmitted by whiteflies",
                symptoms: "Yellowing and curling of leaves, stunted growth",
                recommendations: "Control whiteflies, remove infected plants, use resistant varieties"
            },
            mosaic_virus: {
                description: "Viral disease affecting plant growth",
                symptoms: "Mottled leaves with light and dark green patches",
                recommendations: "Remove infected plants, control insect vectors, use virus-free seeds"
            },
            bacterial_spot: {
                description: "Bacterial disease caused by Xanthomonas spp.",
                symptoms: "Small, dark, water-soaked spots on leaves and fruits",
                recommendations: "Remove infected plants, apply copper-based bactericide, avoid overhead watering"
            }
        };

        return diseaseInfo[diseaseName] || {
            description: "Unknown disease",
            symptoms: "Unidentified symptoms",
            recommendations: "Consult with plant pathology expert"
        };
    }

    // Validate disease classification results
    validateDiseaseData(diseaseData) {
        const errors = [];
        
        if (!diseaseData.disease) {
            errors.push("Disease type not selected");
        }
        
        if (isNaN(diseaseData.confidence) || diseaseData.confidence < 0 || diseaseData.confidence > 1) {
            errors.push("Confidence score must be between 0 and 1");
        }
        
        if (!CONFIG.DISEASE_CLASSES.includes(diseaseData.disease)) {
            errors.push("Invalid disease type selected");
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

export default DiseaseManager; 