// Configuration and API settings
const CONFIG = {
    // API Configuration
    GEMINI_API_KEY: 'AIzaSyDy1TwCnw4t9gY3EiIIJcVKFc-_rJUXd4g',
    GEMINI_MODEL: 'gemini-2.0-flash',
    API_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    
    // Sensor Thresholds (based on research literature)
    SENSOR_THRESHOLDS: {
        CO2: { warning: 430, danger: 480 },
        NH3: { warning: 4, danger: 7 },
        ETHANOL: { warning: 10, danger: 15 },
        H2S: { warning: 1.8, danger: 2.5 },
        TEMPERATURE: { min: 15, max: 30, warning_min: 18, warning_max: 26 },
        HUMIDITY: { min: 40, max: 80, warning_min: 50, warning_max: 75 }
    },
    
    // Disease Classes
    DISEASE_CLASSES: [
        'healthy', 'early_blight', 'late_blight', 'leaf_mold', 'septoria_leaf_spot',
        'spider_mites', 'target_spot', 'yellow_leaf_curl', 'mosaic_virus', 'bacterial_spot'
    ],
    
    // Plant Types
    PLANT_TYPES: [
        { value: 'tomato', label: '🍅 Tomato (Research Focus)' }
    ]
};

export default CONFIG; 