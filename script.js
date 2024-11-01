// Verifica si el navegador soporta SpeechRecognition
const startButton = document.getElementById('startButton');
const transcription = document.getElementById('transcription');
let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
} else {
    transcription.textContent = "Your browser does not support real-time voice transcription.";
}

if (recognition) {
    recognition.lang = 'en-EN'; // Establece el idioma a ingles
    recognition.lang = 'es-ES'; // Establece el idioma a español
    recognition.continuous = true; // Mantener la transcripción continua
    recognition.interimResults = true; // Mostrar resultados intermedios

    startButton.addEventListener('click', () => {
        if (recognition) {
            recognition.start();
            transcription.textContent = "Escuchando...";
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
        transcription.textContent = "Transcription error: " + event.error;
    };
} else {
    startButton.disabled = true;
}
