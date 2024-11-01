// Verifica si el navegador soporta SpeechRecognition
const startButton = document.getElementById('startButton');
const transcription = document.getElementById('transcription');
const languageSelect = document.getElementById('languageSelect'); // Selector de idioma
let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
} else {
    transcription.textContent = "Your browser does not support real-time voice transcription.";
}

if (recognition) {
    recognition.continuous = true; // Mantener la transcripción continua
    recognition.interimResults = true; // Mostrar resultados intermedios

    startButton.addEventListener('click', () => {
        if (recognition) {
            // Establece el idioma según el selector
            recognition.lang = languageSelect.value; 
            recognition.start();
            transcription.textContent = "Listening, Escuchando...";
        }
    });

    // Evento cuando se detecta una nueva transcripción
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        transcription.textContent = transcript;
    };

    // Evento al detener el reconocimiento
    recognition.onspeechend = () => {
        recognition.stop();
        transcription.textContent += "\n(Transcripción finalizada)";
    };

    // Manejo de errores
    recognition.onerror = (event) => {
        transcription.textContent = "Transcription error, Error de Transcripción: " + event.error;
    };
} else {
    startButton.disabled = true;
}
