var cPushArray = new Array();
var cStep = -1;
var ctx;
// ctx = document.getElementById('myCanvas').getContext("2d");
	
function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('myCanvas').toDataURL());
}

function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

function cClear() {
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
	
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function gambar() {
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    // begin custom shape
    context.beginPath();
    context.moveTo(170, 80);
    context.bezierCurveTo(130, 100, 130, 150, 230, 150);
    context.bezierCurveTo(250, 180, 320, 180, 340, 150);
    context.bezierCurveTo(420, 150, 420, 120, 390, 100);
    context.bezierCurveTo(430, 40, 370, 30, 340, 50);
    context.bezierCurveTo(320, 5, 250, 20, 250, 50);
    context.bezierCurveTo(200, 5, 150, 20, 170, 80);
	
	// complete custom shape
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = 'blue';
    context.stroke();
}

function bindDraggableTrack(){
    $('.draggableItem').draggable({
        stop: function() {
            var $canvas = $('#myCanvas') ;
            var ctx = $canvas.get(0).getContext('2d') ;
            var $img = $(this);
            var imgpos = $img.offset() ;
            var cpos = $canvas.offset() ;
            ctx.drawImage($img.get(0),imgpos.left-cpos.left,
                          imgpos.top-cpos.top);
        }
    });
}