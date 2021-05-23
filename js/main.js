$(document).ready(function(){
	$("#infile").on("change", function(){ handleFiles(this.files); } );
	const imgArray = [];
	var counter = 0;
	var canvasGallery = 0;
	var canWidth = 0;

	const winWidth = $(window).width();
    if(winWidth < 734){
    	canWidth = 300
    }else{
    	canWidth = 600;
    }

	$('.control .left').click(function(){
		const canSize = $('#artboard .canvas').size();
		if($(this).hasClass('disable')){
			console.log('Button disable')
		}
		else if($('#artboard').css('left') == '0px' ){
			console.log('No more left');
			$('.control .left').addClass('disable');
		}else{
			$('#artboard').animate({
				left: '+='+canWidth+'px'
			},500);	
			$('.control .right').removeClass('disable');
		}
	});
	$('.control .right').click(function(){
		const canSize = $('#artboard .canvas').size();
		const slideLimit = canWidth * canSize - canWidth;
		console.log(slideLimit);
		if($(this).hasClass('disable')){
			console.log('Button disable')
		}
		else if($('#artboard').css('left') == '-'+slideLimit+'px' ){
			$('.control .right').addClass('disable');
		}else{
			$('#artboard').animate({
				left: '-='+canWidth+'px'
			},500);
			$('.control .left').removeClass('disable');
		}
	});



	function handleFiles(files){
		if(!files.length){
			console.log('Empty');
		}else{
			if(files.length == 1 && canvasGallery == 0){
				canvasGallery = canvasGallery + files.length;
				$('#artboard').width(canWidth*canvasGallery);
			}
			else if(files.length > 0 || canvasGallery == 0){
				canvasGallery = canvasGallery + files.length;
				$('#artboard').width(canWidth*canvasGallery);
				$('.control .right').removeClass('disable');
			}
			else if(files.length > 0 || canvasGallery >0){
				canvasGallery = canvasGallery + files.length;
				$('#artboard').width(canWidth*canvasGallery);
			}
			else if(files.length == 1){ 
				canvasGallery++;
			}

			for (let i = 0; i < files.length; i++){
				const img = document.createElement("img");
				img.src = URL.createObjectURL(files[i]);
				imgArray.push(URL.createObjectURL(files[i]));
				$('.pagination ul').append('<li><img src="'+URL.createObjectURL(files[i])+'"/></li>')
				img.onload = function (){
					$('#artboard').append('<div class="canvas canvas-item'+counter+'"></div>');
					var x = document.createElement("CANVAS");
					x.setAttribute("id","art"+counter);
					var ctx = x.getContext("2d");
					ctx.canvas.height = 400;
					ctx.canvas.width = canWidth;
					ctx.clearRect(0, 0, x.width, x.height);
					ctx.drawImage(img,5,5);
					$('#artboard .canvas-item'+counter).append(x).append('<a href="#" class="add-new-tag" id="link'+counter+'" name="art'+counter+'">Add New tag</a> <span class="input-container"><input placeholder="Tag" value="Tag" data="text1" name="art'+counter+'" type="text"/></span> ');
					ctx.font = "20px Arial";
					ctx.fillText('Tag',10,385);
					URL.revokeObjectURL(this.src);
					overlayText(imgArray);
					addNewTag(imgArray,"#link"+counter);
					counter++;	
				}
			}
		}
	}

	function addNewTag(imgArray,elID){
		$(elID).click(function(e){
			e.preventDefault();
			const currId = $(this).attr('name');
			const currValue = currId.substring(3);
			const alink = $('.canvas-item'+currValue+' input').size()+1;
			$('.canvas-item'+currValue).append('<div class="additional-tag"><span class="input-container"><input placeholder="Tag" type="text" name="art'+currValue+'" data="text'+alink+'"/></span><a class="delete-tag" href="#">Delete tag</a></div>');
			overlayText(imgArray);
			deleteTag('.canvas-item'+currValue);
		});
	}

	function deleteTag(className){
		$('.delete-tag').click(function(e){
			e.preventDefault();
			$(this).parent('.additional-tag').remove();
			console.log(className);
			$(className+' input').each(function(index){
				$(this).attr("data", "text" + ++index);
			});
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
				cctx.fillText(text_title,10,405 - yValue*20);
			});
		});
	}

}); 
