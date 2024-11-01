// Verifica si el navegador soporta SpeechRecognition
const startButton = document.getElementById('startButton');
const transcription = document.getElementById('transcription');
const languageSelect = document.getElementById('languageSelect');
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

    // Cambia el idioma según el selector
    languageSelect.addEventListener('change', () => {
        recognition.lang = languageSelect.value;
    });

    // Inicia la transcripción al hacer clic en el botón
    startButton.addEventListener('click', () => {
        recognition.lang = languageSelect.value; // Configura el idioma antes de comenzar
        recognition.start();
        transcription.textContent = "Listening, Escuchando...";
    });

    // Evento cuando se detecta una nueva transcripción
    recognition.onresult = (event) => {
        let transcript = ''; // Reinicia el contenido de la transcripción temporal
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        transcription.textContent = transcript; // Muestra solo la última transcripción
    };

    // Evento al detener el reconocimiento
    recognition.onspeechend = () => {
        recognition.stop();
        transcription.textContent += "\n(Transcripción finalizada)";
    };

    // Manejo de errores
    recognition.onerror = (event) => {
        transcription.textContent = "Transcription error, Error de transcripción: " + event.error;
    };
} else {
    startButton.disabled = true;
}
