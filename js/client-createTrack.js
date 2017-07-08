var cPushArray = new Array();
var cStep = 0;
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
        if(cStep > 0){
            var canvasPic = new Image();
            canvasPic.src = cPushArray[cStep];
            canvasPic.onload = function () { 
                cClear();
                ctx.drawImage(canvasPic, 0, 0); 
            }
        }else{
            cClear();
        }
        
    }
}

function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { 
             cClear();
            ctx.drawImage(canvasPic, 0, 0); 
        }
    }
}

function cClear() {
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
	
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function gambar() {
    viewRouterBack();
}

function bindDraggableTrack(){
    cPushArray = new Array();
    cStep = 0;
    ctx;
    $('.draggableItem').draggable({ helper: "clone" });

    $('#myCanvas').droppable({
        drop: function( event, ui ) {
            var $canvas = $('#myCanvas') ;
            ctx = $canvas.get(0).getContext('2d') ;
            var $img = $(ui.helper) ;
            var imgpos = $img.offset() ;
            var cpos = $canvas.offset() ;
            ctx.drawImage($img.get(0),imgpos.left-cpos.left,
                          imgpos.top-cpos.top, $img.width(), $img.height()) ;
            cPush();
        }
    });
}