previsao1=""
previsao2=""
Webcam.set({
width:350,
height:300,
imageFormat:"png",
pngQuality:90
})
camera=document.getElementById("camera")
Webcam.attach("#camera")
function takeSnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="image" src="'+data_uri+'">'
})
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fgt-q5TYw/model.json",modelLoad)
function modelLoad(){
    console.log("modeloCarregado")
}
function speak() {
    var synth = window.speechSynthesis
    speakData1="a primeira previsao é"+previsao1
    speakData2="a segunda previsao é"+previsao2
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
  synth.speak(utterThis);
}
function check() {
    var img=document.getElementById("image")
    classifier.classify(img,gotResult)
}
function gotResult(error,results) {
if(error){
    console.log(error)
}
else{
    console.log(results)
    document.getElementById("resultEmotionName").innerHTML=results[0].label
    document.getElementById("resultEmotionName2").innerHTML=results[1].label
    previsao1=results[0].label
    previsao2=results[1].label
    speak()
    if(results[0].label=="feliz"){
        document.getElementById("UpdateEmoji").innerHTML="🙂"
    }
    if(results[0].label=="triste"){
        document.getElementById("UpdateEmoji").innerHTML="😥"
    }
    if(results[0].label=="bravo"){
        document.getElementById("UpdateEmoji").innerHTML="😠"
    }
    if(results[1].label=="feliz"){
        document.getElementById("UpdateEmoji2").innerHTML="🙂"
    }
    if(results[1].label=="triste"){
        document.getElementById("UpdateEmoji2").innerHTML="😥"
    }
    if(results[1].label=="bravo"){
        document.getElementById("UpdateEmoji2").innerHTML="😠"
    }
}
}