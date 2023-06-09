alarm = "";
objects = [];
status = ""
function modelLoaded(){
console.log("Model Loaded!")
status = true;
}

function preload(){
    alarm = loadSound("alarm.mp3");
}

function setup(){
canvas = createCanvas(400,400);
canvas.center();
video = createCapture(VIDEO);
video.size(400,400);
video.hide();
objectDetector=ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "status : Detecing Objects";
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}



function draw(){
    image(video, 0, 0, 400, 400);
    if(status != "")
    {
        objectDetector.detect(video,gotResult);
        for (i=0; i< objects.length; i++)
        {
            document.getElementById("status").innerHtML = "Status : Object Detected";
            
            fill("#F0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "Person found";
                console.log("stop");
                alarm.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Person not found";
                console.log("play");
                alarm.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("number_of_objects").innerHTML = "Person not found";
                console.log("play");
                alarm.play;
        }
    }
}


