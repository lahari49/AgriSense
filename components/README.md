# AgriSense Modular Components

This directory contains the modular components for the AgriSense Research System, organized for better maintainability and scalability.

## 📁 Component Structure

```
components/
├── config.js          # Configuration and API settings
├── sensorManager.js   # Gas sensor data management
├── diseaseManager.js  # CNN disease classification
├── chatManager.js     # AI chat interface
├── app.js            # Main application orchestrator
├── styles.css        # All CSS styling
└── README.md         # This documentation
```

## 🔧 Components Overview

### 1. **config.js** - Configuration Management
- **Purpose**: Centralized configuration for API keys, thresholds, and system settings
- **Key Features**:
  - Gemini API configuration (updated to `gemini-2.0-flash`)
  - Sensor threshold values based on research literature
  - Disease class definitions
  - Plant type configurations

### 2. **sensorManager.js** - Sensor Data Management
- **Purpose**: Handles all gas sensor-related functionality
- **Key Features**:
  - Real-time sensor data collection
  - Status indicator updates based on thresholds
  - Research data simulation with stress patterns
  - Event listener management for sensor inputs

### 3. **diseaseManager.js** - Disease Classification
- **Purpose**: Manages CNN disease classification results
- **Key Features**:
  - Disease data collection and validation
  - Confidence bar visualization
  - CNN results simulation
  - Disease information database

### 4. **chatManager.js** - AI Chat Interface
- **Purpose**: Handles the AI research assistant chat functionality
- **Key Features**:
  - Message handling and display
  - Gemini API integration
  - Research prompt building
  - Typing indicators and animations

### 5. **app.js** - Main Application
- **Purpose**: Orchestrates all components and manages application state
- **Key Features**:
  - Component initialization and coordination
  - Global event handler management
  - Data export functionality
  - Application state management

### 6. **styles.css** - Styling
- **Purpose**: All CSS styling for the application
- **Key Features**:
  - Responsive design
  - Modern UI components
  - Animation and transitions
  - Mobile-friendly layouts

## 🚀 Usage

### Basic Setup
1. Include the CSS file in your HTML:
```html
<link rel="stylesheet" href="components/styles.css">
```

2. Import the main application:
```html
<script type="module" src="components/app.js"></script>
```

### API Configuration
Update your Gemini API key in `config.js`:
```javascript
GEMINI_API_KEY: 'YOUR_API_KEY_HERE'
```

### Adding New Sensors
1. Update sensor thresholds in `config.js`
2. Add sensor card HTML in your main file
3. Update `sensorManager.js` with new sensor logic

### Adding New Diseases
1. Add disease class to `config.js`
2. Update disease information in `diseaseManager.js`
3. Add disease option to HTML select element

## 🔄 Migration from Monolithic

The modular version maintains backward compatibility with the original monolithic structure:

- All original `onclick` handlers still work
- Same HTML structure and IDs
- Identical functionality and features
- Enhanced with additional features (data export, validation, etc.)

## 📊 New Features

### Data Export
```javascript
window.agriSenseApp.exportResearchData()
```
Exports current session data as JSON file for research purposes.

### System Reset
```javascript
window.agriSenseApp.resetApplication()
```
Resets all inputs and chat to initial state.

### Data Validation
```javascript
window.agriSenseApp.validateAllData()
```
Validates all input data and returns validation results.

## 🛠️ Development

### Adding New Components
1. Create new component file in `components/` directory
2. Export the component class/function
3. Import and initialize in `app.js`
4. Add any necessary CSS to `styles.css`

### Testing Components
Each component can be tested independently:
```javascript
import SensorManager from './sensorManager.js';
const sensorManager = new SensorManager();
// Test sensor functionality
```

## 📝 Notes

- **API Model**: Updated to use `gemini-2.0-flash` for better performance
- **Modularity**: Each component has a single responsibility
- **Maintainability**: Easy to update individual components without affecting others
- **Scalability**: New features can be added as separate components
- **Compatibility**: Maintains full backward compatibility with original version

## 🔗 Dependencies

- Modern browser with ES6 module support
- Gemini API access
- No external libraries required (vanilla JavaScript)

## 📞 Support

For issues or questions about the modular structure, refer to the main project documentation or create an issue in the project repository. 