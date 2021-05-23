$(document).ready(function(){
	$("#infile").on("change", function(){ handleFiles(this.files); } );
	const imgArray = [];
	var counter = 0;

	function handleFiles(files){

		if(!files.length){
			console.log('Empty');
		}else{
			for (let i = 0; i < files.length; i++){
				const img = document.createElement("img");
				img.src = URL.createObjectURL(files[i]);
				imgArray.push(URL.createObjectURL(files[i]));
				console.log('COMA');
				img.onload = function (){
					console.log('SUCCESS');
					$('#artboard').append('<div class="canvas canvas-item'+counter+'"></div>');
					var x = document.createElement("CANVAS");
					x.setAttribute("id","art"+counter)
					var ctx = x.getContext("2d");
					ctx.clearRect(0, 0, x.width, x.height);
					ctx.drawImage(img,5,5);
					$('#artboard .canvas-item'+counter).append(x).append('<a href="#" id="link'+counter+'" name="art'+counter+'">Add New tag</a> <input value="text" data="text1" name="art'+counter+'" type="text"/> ');
					ctx.fillText('text',10,10);
					URL.revokeObjectURL(this.src);
					overlayText(imgArray);
					addNewTag(imgArray);
					counter++;	
				}
			}
		}
	}

	function addNewTag(imgArray){
		$('a').click(function(e){
			e.preventDefault();
			const currId = $(this).attr('name');
			const currValue = currId.substring(3);
			const alink = $('.canvas-item'+currValue+' a').size();

			// const inputLength = $('.canvas-item'+currValue+' input').size()+1;
			// console.log('inputLength '+inputLength);
			// $('.canvas-item'+currValue).append('<input type="text" name="art'+currValue+'" data="text'+inputLength+'"/>');
			// overlayText(imgArray);
			console.log(alink);
		});
	}

	function overlayText(imgArray){
		const imgNow = document.createElement("img");
		$('input').keyup(function(){
			const currId = $(this).attr('name');
			const currValue = currId.substring(3);
			const currCanvas = document.getElementById(currId);
			imgNow.src = imgArray[currValue];
			var cctx = currCanvas.getContext('2d');
			cctx.clearRect(0, 0, currCanvas.width, currCanvas.height);
			cctx.drawImage(imgNow,5,5);
			$('.canvas-item'+currValue+' input').each(function(){
				const yValue = $(this).attr('data').substring(4);
				text_title = this.value;
				cctx.fillText(text_title,10,yValue*10);
			});
		});
	}

    // var canvasOffset=$("#canvas").offset();
    // var offsetX=canvasOffset.left;
    // var offsetY=canvasOffset.top;
    // var canvasWidth=canvas.width;
    // var canvasHeight=canvas.height;
    // var isDragging=false;

    // function handleMouseDown(e){
    //   canMouseX=parseInt(e.clientX-offsetX);
    //   canMouseY=parseInt(e.clientY-offsetY);
    //   // set the drag flag
    //   isDragging=true;
    // }

    // function handleMouseUp(e){
    //   canMouseX=parseInt(e.clientX-offsetX);
    //   canMouseY=parseInt(e.clientY-offsetY);
    //   // clear the drag flag
    //   isDragging=false;
    // }

    // function handleMouseOut(e){
    //   canMouseX=parseInt(e.clientX-offsetX);
    //   canMouseY=parseInt(e.clientY-offsetY);
    //   // user has left the canvas, so clear the drag flag
    //   //isDragging=false;
    // }

    // function handleMouseMove(e){
    //   canMouseX=parseInt(e.clientX-offsetX);
    //   canMouseY=parseInt(e.clientY-offsetY);
    //   // if the drag flag is set, clear the canvas and draw the image
    //   if(isDragging){
    //       ctx.clearRect(0,0,canvasWidth,canvasHeight);
    //       ctx.drawImage(img,canMouseX-64/2,canMouseY-64/2,64,64);
    //   }
    // }

    // $("#canvas").mousedown(function(e){handleMouseDown(e);});
    // $("#canvas").mousemove(function(e){handleMouseMove(e);});
    // $("#canvas").mouseup(function(e){handleMouseUp(e);});
    // $("#canvas").mouseout(function(e){handleMouseOut(e);});

}); // end $(function(){});
