function ScrollBar(boxClass,scroll_boxClass,targetClass){
	this.box;this.scroll_box;this.target;this.scrollbarDom;
	this.box_height;
	this.scroll_box_heaght;
	this.target_height;
	
	this.init=function(){
		this.box=$(boxClass);
		this.scroll_box=$(scroll_boxClass);
		this.target=$(targetClass);

		this.scrollbar="<div class=\"scrollbar\"></div>";
		this.scroll_box.append(this.scrollbar);
		this.scrollbarDom=this.scroll_box.children(".scrollbar");

		this.target.css({
			"position":"relative",
		});
		this.scroll_box.css({
			"position":"absolute",
			"height":"100%",
			"width":"8px",
			"top":"0",
			"right":"0"
		});
		this.scrollbarDom.css({
			"position":"absolute",
			"width":"8px",
			"top":"0",
			"right":"0",
			"border-radius":"10px",
			"background-color":"#373737"
		});

		this.box_height=this.box.outerHeight();
		this.scroll_box_heaght=this.scroll_box.outerHeight();
		this.target_height=this.target.outerHeight();
		// console.log(this.target_height,this.box_height)
		// console.log(boxClass,this.target_height,this.box_height)
		if(this.target_height>this.box_height){
			this.add();
		}else{
			this.delete();
			this.scrollbarDom.css("height","0px");
		}
	}

	this.add=function(){
		var HeightPercent=this.box_height/this.target_height,
			scroll_box_heaght=this.scroll_box_heaght;
		// console.log(scroll_box_heaght)
		// console.log(scroll_box_heaght*HeightPercent+"px");
		this.scrollbarDom.css("height",scroll_box_heaght*HeightPercent+"px");
		this.drag();
		this.wheel();
	}

	this.delete=function(){
		var scrollbarDom=this.scrollbarDom,
			box=this.box;
		scrollbarDom.unbind("mousedown");
		box.unbind("mousewheel");
	}

	this.drag=function(){
		var scrollbarDom=this.scrollbarDom,
			scroll_box=this.scroll_box,
			target=this.target,
			box=this.box;

		// Click and Calculate
		scrollbarDom.mousedown(function(){
			originalPo=window.event.clientY;
			extralTargetHeight=target.outerHeight()-box.outerHeight();
			extralScrollHeight=scroll_box.outerHeight()-scrollbarDom.outerHeight();
			window.event.preventDefault();
			$("body").mousemove(function(){
				var originalTop=scrollbarDom.offset().top-scroll_box.offset().top,
				nowPo=window.event.clientY;
				var setScrollTop=originalTop+nowPo-originalPo,
					setTargetTop=setScrollTop/extralScrollHeight*extralTargetHeight;
				if(setScrollTop>0&&setScrollTop+scrollbarDom.outerHeight()<=scroll_box.outerHeight()){
					scrollbarDom.css("top",setScrollTop+"px");
					target.css("top",-setTargetTop+"px");
				}
				originalPo=nowPo;
			});
			$("body").mouseup(function(){
				$(this).unbind("mousemove");
			});
			
		});

	}

	this.wheel=function(){
		var scrollbarDom=this.scrollbarDom,
			scroll_box=this.scroll_box,
			target=this.target,
			box=this.box;
		box.mousewheel(function(event, delta, deltaX, deltaY){
			window.event.preventDefault();
			originalTop=scrollbarDom.offset().top-scroll_box.offset().top;
			extralTargetHeight=target.outerHeight()-box.outerHeight();
			extralScrollHeight=scroll_box.outerHeight()-scrollbarDom.outerHeight();
			if(delta>0){
				setScrollTop=originalTop-10;
				if(setScrollTop>=0){
					setTargetTop=setScrollTop/extralScrollHeight*extralTargetHeight;
					scrollbarDom.css("top",setScrollTop+"px");
					target.css("top",-setTargetTop+"px");
				}else{
					scrollbarDom.css("top",0+"px");
					target.css("top",0+"px");
				}
			}else{
				setScrollTop=originalTop+10;
				if(setScrollTop<=extralScrollHeight){
					setTargetTop=setScrollTop/extralScrollHeight*extralTargetHeight;
					scrollbarDom.css("top",setScrollTop+"px");
					target.css("top",-setTargetTop+"px");
				}else{
					scrollbarDom.css("top",extralScrollHeight+"px");
					target.css("top",-extralTargetHeight+"px");
				}
			}
		})
		// console.log(box[0]);
	}

}