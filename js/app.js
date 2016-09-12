/**
* Created by EdwardChor on 11/09/2016.
*/
var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.WebkitAudioContext)();
var analyser1 = audioCtx.createAnalyser();
var analyser2=audioCtx.createAnalyser();
var myAudio = document.querySelector("#music");

var canvas1=document.querySelector("#cvs1");
var canvas1Ctx=canvas1.getContext("2d");
var canvas2=document.querySelector("#cvs2");
var canvas2Ctx=canvas2.getContext("2d");

var source = audioCtx.createMediaElementSource(myAudio);

source.connect(analyser1);
analyser1.connect(analyser2);
analyser2.connect(audioCtx.destination);

var WIDTH1=canvas1.width;
var HEIGHT1=canvas1.height;

analyser1.fftSize = 1024;
var bufferLength1 = analyser1.fftSize;
console.log(bufferLength1);
var dataArray1 = new Float32Array(bufferLength1);

canvas1Ctx.clearRect(0, 0, WIDTH1, HEIGHT1);

function draw1() {
    drawVisual = requestAnimationFrame(draw1);
    analyser1.getFloatTimeDomainData(dataArray1);

    canvas1Ctx.fillStyle = 'rgb(200, 200, 200)';
    canvas1Ctx.fillRect(0, 0, WIDTH1, HEIGHT1);
    canvas1Ctx.lineWidth = 2;
    canvas1Ctx.strokeStyle = 'rgb(0, 0, 0)';
    canvas1Ctx.beginPath();

    var sliceWidth1 = WIDTH1 * 1.0 / bufferLength1;
    var x = 0;


    // console.log(dataArray1);

    for(var i = 0; i < bufferLength1; i++) {
        var v = dataArray1[i] * 200.0;
        var y = HEIGHT1/2 + v;

        if(i === 0) {
            canvas1Ctx.moveTo(x, y);
        } else {
            canvas1Ctx.lineTo(x, y);
        }
        x += sliceWidth1;
    }

    canvas1Ctx.lineTo(canvas1.width, canvas1.height/2);
    canvas1Ctx.stroke();
}

draw1();


analyser2.fftSize = 2048;
var bufferLength = analyser2.frequencyBinCount;
console.log(bufferLength);
var dataArray = new Float32Array(bufferLength);


var WIDTH=canvas2.width;
var HEIGHT=canvas2.height;

canvas2Ctx.clearRect(0, 0, WIDTH, HEIGHT);

console.log(bufferLength);
function draw() {
    drawVisual = requestAnimationFrame(draw);
    analyser2.getFloatFrequencyData(dataArray);
    canvas2Ctx.fillStyle = 'rgb(50, 50, 50)';
    canvas2Ctx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    console.log(dataArray);
    for (var i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] + 140) * 2;
        canvas2Ctx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ',50,50)';
        canvas2Ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
    }
}

draw();
