object = [];
status = '';
function preload() {
    video = createVideo('video.mp4');
}
function setup() {
    kagaz=createCanvas(700,380);
    kagaz.center();
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('igstatus').innerHTML = "Status : Detecting Objects";
    object_name  = document.getElementById('object_name').value;
}
function modelLoaded() {
    console.log('Model Loaded!');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results) {
    if (error) {
       console.log(error); 
    }
    else{console.log(results);
    object = results}
}
function draw() {
    image(video,0,0,700,380);
    if (status != '') {
        objectDetector.detect(video,gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("igstatus").innerHTML = 'Status = Object Detected';
            
            document.getElementById("no_o").innerHTML = 'Number of objects detected are : '+object.length;
            fill('white');
             
            text(object[i].label + ' ' + floor(object[i].confidence * 100) + '%', object[i].x, object[i].y);
            noFill();
            stroke('red');
            
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label == object_name) {
                video.stop();
objectDetector.detect(gotResult);
document.getElementById("igstatus").innerHTML=object_name+"Is Found";
                synth = window.speechSynthesis;
                utterThis = new
                SpeechSysnthesisUtterance(object_name + "Is Found");
                synth.speak(utterThis);
                
            }
            else{
                document.getElementById("igstatus").innerHTML=object_name+"Not Found";
            }
        }
    }
}
