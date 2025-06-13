# 🌱 AgriSense - Research-Grade Plant Stress Detection System

A comprehensive web application that combines gas sensor data with CNN disease classification to provide real-time plant stress detection and research-grade analysis through an intelligent chatbot interface.

## 🚀 Features

### 🔬 Multi-Sensor VOC Analysis
- **MQ-135 Sensor**: CO2 monitoring for stress detection
- **NH3 Sensor**: Ammonia detection for pathogen stress
- **MQ-3 Sensor**: Ethanol detection for drought stress
- **MQ-136 Sensor**: H2S detection for root problems
- **Environmental Sensors**: Temperature and humidity monitoring

### 🤖 CNN Disease Classification
- **10 Tomato Disease Classes**: Including healthy, early blight, late blight, leaf mold, and more
- **Confidence Scoring**: Real-time confidence visualization
- **Multi-modal Analysis**: Correlating visual symptoms with VOC patterns

### 💬 Intelligent Research Assistant
- **Gemini AI Integration**: Powered by Google's Gemini Pro model
- **Research-Grade Prompts**: Based on 20+ peer-reviewed papers
- **Real-time Analysis**: Instant correlation of sensor data with disease detection
- **Actionable Recommendations**: Practical advice for farmers and researchers

## 🛠️ Setup Instructions

### 1. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key for use in the application

### 2. Run the Application
1. Open `index.html` in your web browser
2. Enter your Gemini API key in the configuration section
3. Start using the system!

## 📊 How to Use

### Step 1: Configure the System
- Enter your Gemini API key
- Select your target plant (default: Tomato)
- Add any additional research context

### Step 2: Input Sensor Data
You can either:
- **Manual Entry**: Type sensor readings directly into the input fields
- **Simulate Data**: Click "🧪 Simulate Research Data" for realistic test data
- **Real Sensors**: Connect your actual gas sensors (requires hardware integration)

### Step 3: Input CNN Results
You can either:
- **Manual Entry**: Select detected disease and enter confidence score
- **Simulate Results**: Click "🤖 Simulate CNN Results" for test data
- **Real CNN**: Integrate with your trained CNN model

### Step 4: Get AI Analysis
- **Quick Analysis**: Click "🔬 Perform Research Analysis" for comprehensive analysis
- **Chat Interface**: Ask specific questions about your data
- **Real-time Insights**: Get instant correlations and recommendations

## 🧪 Research-Grade Features

### VOC Pattern Analysis
The system recognizes these stress indicators:
- **Drought Stress**: Elevated ethanol levels (>10 ppm)
- **Pathogen Stress**: Increased NH3 emissions (>5 ppm)
- **Root Problems**: Higher H2S concentrations (>2.5 ppm)
- **General Stress**: CO2 levels above 450 ppm

### Multi-modal Correlation
- Combines gas sensor data with visual disease detection
- Provides early warning (24-48 hours before visible symptoms)
- Improves accuracy through cross-validation

### Research-Based Thresholds
All sensor thresholds are based on peer-reviewed literature:
- Plant Physiology studies
- Precision Agriculture research
- VOC emission pattern analysis
- Early stress detection methodologies

## 💬 Chatbot Capabilities

### What You Can Ask
- "What do these VOC readings indicate about plant health?"
- "How do these gas patterns correlate with the detected disease?"
- "What are the early warning signs in this data?"
- "What recommendations do you have for treatment?"
- "Explain the research behind these sensor thresholds"

### Sample Queries
```
User: "My CO2 reading is 470 ppm and ethanol is 15 ppm. What does this mean?"

Assistant: "Based on your sensor readings, I'm detecting early drought stress indicators:
• CO2: 470 ppm (elevated - stress threshold: 450 ppm)
• Ethanol: 15 ppm (significantly elevated - drought indicator: >10 ppm)

This pattern suggests your plants are experiencing water stress, likely 24-48 hours before visible wilting symptoms appear. I recommend immediate irrigation and monitoring humidity levels."
```

## 🔧 Technical Details

### API Integration
- **Endpoint**: Google Gemini Pro API
- **Authentication**: API key-based
- **Rate Limits**: Subject to Google's API quotas
- **Error Handling**: Comprehensive error messages and retry logic

### Data Processing
- **Real-time Updates**: Sensor status indicators update automatically
- **Data Validation**: Input validation and error checking
- **Confidence Visualization**: Dynamic confidence bar updates
- **Research Context**: Incorporates additional context in analysis

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Typing Indicators**: Visual feedback during AI processing
- **Error Recovery**: Graceful handling of network issues
- **Accessibility**: Keyboard navigation and screen reader support

## 🎯 Use Cases

### For Researchers
- Validate sensor threshold hypotheses
- Correlate multi-modal data sources
- Generate research insights
- Document experimental findings

### For Farmers
- Early stress detection
- Preventive treatment planning
- Resource optimization
- Yield improvement strategies

### For Educators
- Teaching precision agriculture concepts
- Demonstrating sensor technology
- Research methodology training
- Data analysis practice

## 🔮 Future Enhancements

### Planned Features
- **Real-time Sensor Integration**: Direct hardware connectivity
- **Image Upload**: Upload plant photos for CNN analysis
- **Historical Data**: Track trends over time
- **Export Functionality**: Download analysis reports
- **Multi-language Support**: International accessibility

### Advanced Analytics
- **Machine Learning**: Custom model training
- **Predictive Analytics**: Future stress prediction
- **Comparative Analysis**: Benchmark against research data
- **Automated Alerts**: Threshold-based notifications

## 📚 Research Foundation

This system is built on research from:
- Plant VOC emission studies
- Early stress detection methodologies
- Multi-sensor fusion techniques
- CNN-based disease classification
- Precision agriculture applications

## 🤝 Contributing

We welcome contributions to improve the system:
- Bug reports and feature requests
- Research data validation
- UI/UX improvements
- Additional sensor integrations
- Documentation enhancements

## 📄 License

This project is open source and available under the MIT License.

---

**🌱 AgriSense** - Advancing precision agriculture through intelligent sensor fusion and AI-powered analysis. 