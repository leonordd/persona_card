var utterance = new SpeechSynthesisUtterance();
var wordIndex = 0;
var global_words = [];
utterance.lang = 'en-UK';
utterance.rate = 1;
// var currentTime = performance.now();
var TIMINGS = {}; // Object to store the timings

// Function to set the desired voice
function setVoice() {
    var voices = speechSynthesis.getVoices();
    var desiredVoice = voices.find(voice => voice.name === "Microsoft Emily Online (Natural) - English (Ireland)");
    if (desiredVoice) {
        utterance.voice = desiredVoice;
    } else {
        console.error("Desired voice not found");
    }
}

// Ensure voices are loaded
speechSynthesis.onvoiceschanged = function() {
    setVoice();
};

document.getElementById('playbtn').onclick = function(){
    // currentTime = performance.now();
    wordIndex = 0; // Reset word index for new speech
    TIMINGS = {}; // Reset timings for new speech
    var text = document.getElementById('textarea').value;
    var words = text.split(" ");
    global_words = words;
    // Draw the text in a div
    drawTextInPanel(words);
    utterance.text = text;
    speechSynthesis.speak(utterance);
};

utterance.onboundary = function(event){
    if (event.name === 'word') {
        var currentTime = performance.now(); // Use performance.now() for a high-resolution timestamp
        // Estimate the end time based on the speech rate and word length
        // This is a very rough estimation and might not be accurate
        var wordDurationEstimate = global_words[wordIndex].length * 1000 / (utterance.rate * 5); // Adjust the multiplier as needed to fit your observations
        TIMINGS[global_words[wordIndex]] = {
            start: currentTime,
            end: currentTime + wordDurationEstimate
        };

        // Update the display
        document.getElementById("word").innerHTML = global_words[wordIndex];
        try {
            document.getElementById("word_span_" + wordIndex).style.color = "blue";
        } catch(e) {}

        wordIndex++;
    }
};

utterance.onend = function(){
    document.getElementById("word").innerHTML = "";
    wordIndex = 0;
    document.getElementById("panel").innerHTML = "";
    // Pretty print the TIMINGS object to the pre#timings HTML node
    document.getElementById("timings").textContent = JSON.stringify(TIMINGS, null, 2);
};

function drawTextInPanel(words_array){
    console.log("Drawing text in panel");
    var panel = document.getElementById("panel");
    panel.innerHTML = ''; // Clear previous content
    for(var i = 0; i < words_array.length; i++){
        var html = '<span id="word_span_' + i + '">' + words_array[i] + '</span>&nbsp;';
        panel.innerHTML += html;
    }
}

/* OLD
var utterance = new SpeechSynthesisUtterance();
var wordIndex = 0;
var global_words = [];
utterance.lang = 'en-UK';
utterance.rate = 1;

// Function to set the desired voice
function setVoice() {
    var voices = speechSynthesis.getVoices();
    var desiredVoice = voices.find(voice => voice.name === "Microsoft Emily Online (Natural) - English (Ireland)");
    if (desiredVoice) {
        utterance.voice = desiredVoice;
    } else {
        console.error("Desired voice not found");
    }
}

// Ensure voices are loaded
speechSynthesis.onvoiceschanged = function() {
    setVoice();
};

document.getElementById('playbtn').onclick = function(){
    var text    = document.getElementById('textarea').value;
    var words   = text.split(" ");
    global_words = words;
    // Draw the text in a div
    drawTextInPanel(words);
    spokenTextArray = words;
    utterance.text = text;
    speechSynthesis.speak(utterance);
};

utterance.onboundary = function(event){
  	var e = document.getElementById('textarea');
  	var word = getWordAt(e.value,event.charIndex);
    // Show Speaking word : x
  	document.getElementById("word").innerHTML = word;
    //Increase index of span to highlight
    console.info(global_words[wordIndex]);
    
    try{
    	document.getElementById("word_span_"+wordIndex).style.color = "blue";
    }catch(e){}
    
    wordIndex++;
};

utterance.onend = function(){
		document.getElementById("word").innerHTML = "";
    wordIndex = 0;
    document.getElementById("panel").innerHTML = "";
};

// Get the word of a string given the string and the index
function getWordAt(str, pos) {
    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;

    // Search for the word's beginning and end.
    var left = str.slice(0, pos + 1).search(/\S+$/),
        right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
        return str.slice(left);
    }
    // Return the word, using the located bounds to extract it from the string.
    return str.slice(left, right + pos);
}

function drawTextInPanel(words_array){
console.log("Dibujado");
		var panel = document.getElementById("panel");
  	for(var i = 0;i < words_array.length;i++){
    	var html = '<span id="word_span_'+i+'">'+words_array[i]+'</span>&nbsp;';
    	panel.innerHTML += html;
    }
}
*/