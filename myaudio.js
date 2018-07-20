// Audio player
$(function(){

	var playstop=$(".article-choose.music .playorstop"),
		musicprograss=$(".article-choose.music .musicprograss"),
		volumeprograss=$(".article-choose.music .volumeprograss"),
		audioplayer,timeset,playing,
		musicmover,volumemover,prograssLongth,timelongOwn;
		// 点击播放或暂停
	playstop.click(function(){
		playorstopButton($(this))
	});
		// 拉动和点击进度条
	musicprograss.mousedown(function(){
		if(audioplayer!=$(this).parent().prev()[0]){
			var functionAudio=null;
		}else{
			var functionAudio=audioplayer;
		}
		mouseDown($(this),"music",functionAudio);
	});
		// 拉动和点击声音条
	volumeprograss.mousedown(function(){
		if(audioplayer!=$(this).parent().prev()[0]){
			var functionAudio=null;
		}else{
			var functionAudio=audioplayer;
		}
		mouseDown($(this),"volume",functionAudio);
	});

	function playorstopButton(button){
		if(audioplayer!=button.parent().prev()[0]){
			if(timeset!=null){
				var Oriplaystop=$(audioplayer.tagName).siblings(".audioControl").children(".playorstop");
				Oriplaystop.addClass("stop");
				Oriplaystop.removeClass("play");
				Oriplaystop.children(".fa-play").css("display","inline");
				Oriplaystop.children(".fa-pause").css("display","none");
				clearInterval(timeset);
				audioplayer.pause();
			}
			audioplayer=button.parent().prev()[0];
			musicprograss=button.siblings(".musicprograss");
			volumeprograss=button.siblings(".volumeprograss");
			musicmover=musicprograss.children(".mover");
			volumemover=volumeprograss.children(".mover");
			playing=button.siblings(".playing");
			prograssLongth=musicprograss.innerWidth();
			timelongOwn=playing.html();
			audioplayer.currentTime=getTime(timelongOwn);
			audioplayer.volume=volumemover.innerWidth()/volumeprograss.innerWidth();
		}
		if(button.hasClass("stop")){
			button.removeClass("stop");
			button.addClass("play");
			button.children(".fa-play").css("display","none");
			button.children(".fa-pause").css("display","inline");
			var duration=audioplayer.duration,
				durationFloor=Math.floor(audioplayer.duration),
				currentTime;
			timeset=setInterval(function(){
				currentTime=audioplayer.currentTime;
				musicmover.css("width",currentTime/duration*100+"%");
				playing.html(HHMMSS(Math.floor(currentTime)));
				if(audioplayer.ended){
					musicmover.css("width",0+"%");
					audioplayer.currentTime=0;
					button.triggerHandler("click");
					playing.html("00:00:00");
				}
			},500);
			audioplayer.play();
		}else{
			button.addClass("stop");
			button.removeClass("play");
			button.children(".fa-play").css("display","inline");
			button.children(".fa-pause").css("display","none");
			clearInterval(timeset);
			audioplayer.pause();
		}
	}

	function mouseDown(thisDom,type,functionAudio){
		var Orimouse=window.event.pageX,
			Nowmouse=window.event.pageX,
			Longth=thisDom.innerWidth(),
			mover=thisDom.children(".mover"),
			moverLongth=Nowmouse - thisDom.offset().left,
			prograssPercent=moverLongth/Longth,
			timelong,playing;
		window.event.preventDefault();
		mover.css("width",prograssPercent*100+"%");
		if(type=="music"){
			timelong=thisDom.siblings(".time").html();
			playing=thisDom.siblings(".playing");
			playing.html(HHMMSS(getTime(timelong)*prograssPercent));
		}
		if(functionAudio!=null){
			if(type=="music"){
				functionAudio.currentTime=getTime(timelong)*prograssPercent;
			}else if(type=="volume"){
				functionAudio.volume=prograssPercent;
			}
		}
		$("body").mousemove(function(){
			Nowmouse=window.event.pageX;
			moverLongth+=Nowmouse - Orimouse;
			Orimouse=Nowmouse;
			if(moverLongth>Longth){
				moverLongth=Longth;
			}else if(moverLongth<0){
				moverLongth=0;
			}
			window.event.preventDefault();
			prograssPercent=moverLongth/Longth;
			mover.css("width",prograssPercent*100+"%");
			if(type=="music"){
				timelong=thisDom.siblings(".time").html();
				playing=thisDom.siblings(".playing");
				playing.html(HHMMSS(getTime(timelong)*prograssPercent));
			}
			if(functionAudio!=null){
				if(type=="music"){
					functionAudio.currentTime=getTime(timelong)*prograssPercent;
				}else if(type=="volume"){
					functionAudio.volume=prograssPercent;
				}
			}
		});
		$("body").mouseup(function(){
			$("body").unbind("mousemove");
			$("body").unbind("mouseup");
		});
	}

	function HHMMSS(time){
		time=Math.floor(time);
		var hour=Math.floor(time/3600),
			minute=0,
			second=0;
		if(hour>=1){
			minute=Math.floor((time-hour*3600)/60);
			if(minute>=1){
				second=time-hour*3600-minute*60;
			}else{
				second=time;
			}
		}else{
			hour=0;
			minute=Math.floor(time/60);
			if(minute>=1){
				second=time-hour*3600-minute*60;
			}else{
				second=time;
			}
		}
		var str=hour+":"+minute+":"+second;
		str=str.replace(/((?<!\d)\d(?!\d))/g,'0$1');
		// HH:MM:SS
		return (str);
	}
	
	function getTime(time){
		var timearr=time.split(":",3),
			hour=parseInt(timearr[0]),
			minute=parseInt(timearr[1]),
			second=parseInt(timearr[2]),
			timelong=hour*3600+minute*60+second;
		return timelong;
	}
});
	
	
	

	