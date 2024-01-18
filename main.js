

Webcam.set({
    width:350,
    height:300,
    imageFormat:"png",
    pngQuality:90
});
camera = document.getElementById("camera");
Webcam.attach("#camera")

function takesnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'/>";
})
}

console.log("ml5 version: ",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Yn-Cjk9zb/model.json",modelLoaded)
function modelLoaded(){
    console.log("Modelo 100% carregado :)")
}

function Speak(){
    synth = window.speechSynthesis
    speakdata1 ="você me parece " + previsao1
    speakdata2 ="pórem tu também me parece estar " + previsao2
    utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2)
    synth.speak(utterThis)
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult)
}

function gotResult(error, results){
    if (error) {
        console.error(error)
    }
    else{
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        previsao1 = results[0].label;
        previsao2 = results[1].label;
        Speak()

        if(results[0].label == "Alegria"){
            document.getElementById("updateEmoji").innerHTML = "&#128512;";
        }
        if(results[0].label == "Tristeza"){
            document.getElementById("updateEmoji").innerHTML = "&#128546;";
        }
        if(results[0].label == "Raiva"){
            document.getElementById("updateEmoji").innerHTML = "&#128545;";
        }

        if(results[1].label == "Alegria"){
            document.getElementById("updateEmoji2").innerHTML = "&#128512;";
        }
        if(results[1].label == "Tristeza"){
            document.getElementById("updateEmoji2").innerHTML = "&#128546;";
        }
        if(results[1].label == "Raiva"){
            document.getElementById("updateEmoji2").innerHTML = "&#128545;";
        }
    }
    
}
