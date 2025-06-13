import CONFIG from './config.js';

class SensorManager {
    constructor() {
        this.currentSensorData = {};
        this.initializeEventListeners();
    }

    // Initialize event listeners for real-time sensor updates
    initializeEventListeners() {
        const sensorInputs = ['co2-reading', 'nh3-reading', 'ethanol-reading', 'h2s-reading', 'temp-reading', 'humidity-reading'];
        sensorInputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => {
                    const readings = this.collectSensorData();
                    if (readings.hasData) {
                        this.updateSensorStatus(readings);
                    }
                });
            }
        });
    }

    // Collect sensor data from form inputs
    collectSensorData() {
        const co2 = parseFloat(document.getElementById('co2-reading')?.value);
        const nh3 = parseFloat(document.getElementById('nh3-reading')?.value);
        const ethanol = parseFloat(document.getElementById('ethanol-reading')?.value);
        const h2s = parseFloat(document.getElementById('h2s-reading')?.value);
        const temperature = parseFloat(document.getElementById('temp-reading')?.value);
        const humidity = parseFloat(document.getElementById('humidity-reading')?.value);
        
        const hasData = !isNaN(co2) || !isNaN(nh3) || !isNaN(ethanol) || !isNaN(h2s) || !isNaN(temperature) || !isNaN(humidity);
        
        return { co2, nh3, ethanol, h2s, temperature, humidity, hasData };
    }

    // Update sensor input fields with provided readings
    updateSensorInputs(readings) {
        const mappings = {
            'co2-reading': readings.co2,
            'nh3-reading': readings.nh3,
            'ethanol-reading': readings.ethanol,
            'h2s-reading': readings.h2s,
            'temp-reading': readings.temperature,
            'humidity-reading': readings.humidity
        };

        Object.entries(mappings).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element && value !== undefined) {
                element.value = value.toFixed(1);
            }
        });
    }

    // Update sensor status indicators based on thresholds
    updateSensorStatus(readings) {
        const statusMappings = [
            { id: 'mq135-status', value: readings.co2, thresholds: CONFIG.SENSOR_THRESHOLDS.CO2 },
            { id: 'nh3-status', value: readings.nh3, thresholds: CONFIG.SENSOR_THRESHOLDS.NH3 },
            { id: 'mq3-status', value: readings.ethanol, thresholds: CONFIG.SENSOR_THRESHOLDS.ETHANOL },
            { id: 'mq136-status', value: readings.h2s, thresholds: CONFIG.SENSOR_THRESHOLDS.H2S },
            { id: 'temp-status', value: readings.temperature, thresholds: CONFIG.SENSOR_THRESHOLDS.TEMPERATURE },
            { id: 'humidity-status', value: readings.humidity, thresholds: CONFIG.SENSOR_THRESHOLDS.HUMIDITY }
        ];

        statusMappings.forEach(({ id, value, thresholds }) => {
            const element = document.getElementById(id);
            if (element && value !== undefined) {
                const status = this.getSensorStatus(value, thresholds);
                element.className = `sensor-status ${status}`;
            }
        });
    }

    // Determine sensor status based on thresholds
    getSensorStatus(value, thresholds) {
        if (thresholds.min !== undefined && thresholds.max !== undefined) {
            // Range-based thresholds (temperature, humidity)
            if (value < thresholds.min || value > thresholds.max) return 'status-danger';
            if (value < thresholds.warning_min || value > thresholds.warning_max) return 'status-warning';
        } else {
            // Single value thresholds (CO2, NH3, etc.)
            if (value > thresholds.danger) return 'status-danger';
            if (value > thresholds.warning) return 'status-warning';
        }
        return 'status-good';
    }

    // Simulate research data based on stress patterns
    simulateResearchData() {
        const stressTypes = ['healthy', 'drought_stress', 'pathogen_stress', 'nutrient_deficiency'];
        const selectedStress = stressTypes[Math.floor(Math.random() * stressTypes.length)];

        let readings;
        switch(selectedStress) {
            case 'healthy':
                readings = {
                    co2: 400 + (Math.random() - 0.5) * 50,
                    nh3: 2 + (Math.random() - 0.5) * 1,
                    ethanol: 5 + (Math.random() - 0.5) * 2,
                    h2s: 1 + (Math.random() - 0.5) * 0.5,
                    temperature: 22 + (Math.random() - 0.5) * 4,
                    humidity: 65 + (Math.random() - 0.5) * 15
                };
                break;
            case 'drought_stress':
                readings = {
                    co2: 450 + (Math.random() - 0.5) * 70,
                    nh3: 4 + (Math.random() - 0.5) * 2,
                    ethanol: 12 + (Math.random() - 0.5) * 5,
                    h2s: 3 + (Math.random() - 0.5) * 1,
                    temperature: 28 + (Math.random() - 0.5) * 6,
                    humidity: 45 + (Math.random() - 0.5) * 10
                };
                break;
            case 'pathogen_stress':
                readings = {
                    co2: 380 + (Math.random() - 0.5) * 60,
                    nh3: 8 + (Math.random() - 0.5) * 3,
                    ethanol: 18 + (Math.random() - 0.5) * 7,
                    h2s: 2 + (Math.random() - 0.5) * 1,
                    temperature: 24 + (Math.random() - 0.5) * 5,
                    humidity: 70 + (Math.random() - 0.5) * 12
                };
                break;
            case 'nutrient_deficiency':
                readings = {
                    co2: 420 + (Math.random() - 0.5) * 80,
                    nh3: 6 + (Math.random() - 0.5) * 2.5,
                    ethanol: 8 + (Math.random() - 0.5) * 3,
                    h2s: 1.5 + (Math.random() - 0.5) * 0.8,
                    temperature: 23 + (Math.random() - 0.5) * 4,
                    humidity: 60 + (Math.random() - 0.5) * 18
                };
                break;
        }

        this.currentSensorData = readings;
        this.updateSensorInputs(readings);
        this.updateSensorStatus(readings);
        
        return {
            readings,
            stressType: selectedStress,
            message: `🧪 <strong>Research Data Simulated:</strong> Generated ${selectedStress.replace('_', ' ')} pattern based on literature findings.`
        };
    }

    // Initialize sensor status with default values
    initializeSensorStatus() {
        const defaultReadings = {
            co2: 400, nh3: 2, ethanol: 5, h2s: 1, 
            temperature: 22, humidity: 65
        };
        this.updateSensorStatus(defaultReadings);
    }
}

export default SensorManager; 