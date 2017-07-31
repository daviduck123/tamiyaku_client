var cPushArray = new Array();
var cStep = 0;
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

/*
    var canvas = new fabric.Canvas('myCanvas', { selection: false });
    var grid = 50 ;

    // create grid

    for (var i = 0; i < (300 / grid); i++) {
      canvas.add(new fabric.Line([ i * grid, 0, i * grid, 300], { stroke: '#ccc', selectable: false }));
      canvas.add(new fabric.Line([ 0, i * grid, 300, i * grid], { stroke: '#ccc', selectable: false }))
    }

    // snap to grid

    canvas.on('object:moving', function(options) { 
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
      });
    });
*/

    $('#myCanvas').droppable({
        drop: function( event, ui ) {
            //300x300
            //30x30
            var $canvas = $('#myCanvas') ;
            ctx = $canvas.get(0).getContext('2d') ;
            var $img = $(ui.helper) ;
            
            var imgpos = $img.offset() ;
            var cpos = $canvas.offset() ;

            var left = imgpos.left-cpos.left;
            var top = imgpos.top-cpos.top;

/*
            var posisiLeft = (300 / 50) + left;
            var posisiTop = (300 / 50) + top;
*/
            ctx.drawImage($img.get(0),
                left,
                top, $img.width(), $img.height()) ;
            cPush();
        }
    });
}