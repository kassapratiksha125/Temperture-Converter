// Get DOM elements
const temperatureInput = document.getElementById('temperature');
const convertBtn = document.getElementById('convertBtn');
const resultArea = document.getElementById('resultArea');
const resultsDiv = document.getElementById('results');
const errorMessage = document.getElementById('error');

// Conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5/9 + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

// Validate input
function validateInput(value) {
    if (value.trim() === '') {
        return { valid: false, message: 'Please enter a temperature value' };
    }
    
    if (isNaN(value)) {
        return { valid: false, message: 'Please enter a valid number' };
    }
    
    const num = parseFloat(value);
    const selectedUnit = document.querySelector('input[name="unit"]:checked').value;
    
    // Check for absolute zero violations
    if (selectedUnit === 'celsius' && num < -273.15) {
        return { valid: false, message: 'Temperature cannot be below -273.15°C (absolute zero)' };
    }
    
    if (selectedUnit === 'fahrenheit' && num < -459.67) {
        return { valid: false, message: 'Temperature cannot be below -459.67°F (absolute zero)' };
    }
    
    if (selectedUnit === 'kelvin' && num < 0) {
        return { valid: false, message: 'Temperature cannot be below 0 K (absolute zero)' };
    }
    
    return { valid: true, message: '' };
}

// Display error
function showError(message) {
    errorMessage.textContent = message;
    temperatureInput.classList.add('error');
}

// Clear error
function clearError() {
    errorMessage.textContent = '';
    temperatureInput.classList.remove('error');
}

// Format number to 2 decimal places
function formatNumber(num) {
    return Math.round(num * 100) / 100;
}

// Perform conversion
function convertTemperature() {
    clearError();
    
    const inputValue = temperatureInput.value;
    const validation = validateInput(inputValue);
    
    if (!validation.valid) {
        showError(validation.message);
        resultArea.classList.remove('show');
        return;
    }
    
    const temperature = parseFloat(inputValue);
    const selectedUnit = document.querySelector('input[name="unit"]:checked').value;
    
    let celsius, fahrenheit, kelvin;
    
    // Convert based on selected unit
    if (selectedUnit === 'celsius') {
        celsius = temperature;
        fahrenheit = celsiusToFahrenheit(celsius);
        kelvin = celsiusToKelvin(celsius);
    } else if (selectedUnit === 'fahrenheit') {
        fahrenheit = temperature;
        celsius = fahrenheitToCelsius(fahrenheit);
        kelvin = fahrenheitToKelvin(fahrenheit);
    } else if (selectedUnit === 'kelvin') {
        kelvin = temperature;
        celsius = kelvinToCelsius(kelvin);
        fahrenheit = kelvinToFahrenheit(kelvin);
    }
    
    // Display results
    displayResults(celsius, fahrenheit, kelvin, selectedUnit);
}

// Display conversion results
function displayResults(celsius, fahrenheit, kelvin, inputUnit) {
    resultsDiv.innerHTML = '';
    
    // Only show conversions for units that weren't the input
    if (inputUnit !== 'celsius') {
        const celsiusDiv = createResultItem('Celsius', `${formatNumber(celsius)} °C`);
        resultsDiv.appendChild(celsiusDiv);
    }
    
    if (inputUnit !== 'fahrenheit') {
        const fahrenheitDiv = createResultItem('Fahrenheit', `${formatNumber(fahrenheit)} °F`);
        resultsDiv.appendChild(fahrenheitDiv);
    }
    
    if (inputUnit !== 'kelvin') {
        const kelvinDiv = createResultItem('Kelvin', `${formatNumber(kelvin)} K`);
        resultsDiv.appendChild(kelvinDiv);
    }
    
    resultArea.classList.add('show');
}

// Create result item element
function createResultItem(label, value) {
    const div = document.createElement('div');
    div.className = 'result-item';
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'result-label';
    labelSpan.textContent = label;
    
    const valueSpan = document.createElement('span');
    valueSpan.className = 'result-value';
    valueSpan.textContent = value;
    
    div.appendChild(labelSpan);
    div.appendChild(valueSpan);
    
    return div;
}

// Event listeners
convertBtn.addEventListener('click', convertTemperature);

temperatureInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertTemperature();
    }
});

temperatureInput.addEventListener('input', () => {
    if (errorMessage.textContent) {
        clearError();
    }
});

// Clear results when unit changes
document.querySelectorAll('input[name="unit"]').forEach(radio => {
    radio.addEventListener('change', () => {
        resultArea.classList.remove('show');
        clearError();
    });
});
