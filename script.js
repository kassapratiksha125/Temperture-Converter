<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Temperature Converter</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="converter-card">
            <h1>Temperature Converter</h1>
            <p class="subtitle">Convert between Celsius, Fahrenheit, and Kelvin</p>
            
            <div class="input-group">
                <label for="temperature">Enter Temperature</label>
                <input 
                    type="text" 
                    id="temperature" 
                    placeholder="Enter temperature value"
                    autocomplete="off"
                >
                <span class="error-message" id="errorMessage"></span>
            </div>

            <div class="radio-group">
                <label class="radio-label">
                    <input type="radio" name="unit" value="celsius" checked>
                    <span class="radio-custom"></span>
                    Celsius (°C)
                </label>
                <label class="radio-label">
                    <input type="radio" name="unit" value="fahrenheit">
                    <span class="radio-custom"></span>
                    Fahrenheit (°F)
                </label>
                <label class="radio-label">
                    <input type="radio" name="unit" value="kelvin">
                    <span class="radio-custom"></span>
                    Kelvin (K)
                </label>
            </div>

            <button class="convert-btn" id="convertBtn">Convert</button>

            <div class="result-container" id="resultContainer">
                <h2>Converted Results</h2>
                <div class="result-grid" id="resultGrid"></div>
            </div>
        </div>

        <footer>
            <p>Developed by Pratiksha Shriniwas Kassa
                AICTE Oasis Infobyte Intership
            </p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>s
