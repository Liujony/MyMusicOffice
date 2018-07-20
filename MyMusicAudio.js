$(function(){

	var button_play=$(".bottom .Part1 .fa-play"),
		button_stop=$(".bottom .Part1 .fa-pause"),
		button_last=$(".bottom .Part1 .fa-step-backward"),
		button_next=$(".bottom .Part1 .fa-step-forward"),
		prograss=$(".bottom .Part2 .prograss"),
		music_mover=prograss.children(".mover"),
		time_now=$(".bottom .Part2 .time-now"),
		time_longth=$(".bottom .Part2 .time-longth"),
		button_bars=$(".bottom .Part3 .fa-bars"),
		volume=$(".bottom .Part3 .volumecontrol .volume"),
		volume_mover=volume.children(".mover"),
		audio=$(".bottom audio"),
		audioControl=audio[0],
		timeset,duration,currentTime;

	audioControl.volume=0.5;
	volume_mover.css("width",audioControl.volume*100+"%");
	if(audio.attr("src")!=""){
		time_longth.html(MMSS(audioControl.duration));
	}
	button_play.click(function(){
		if(audio.attr("src")!=""){
			$(this).css("display","none");
			button_stop.css("display","inline-block");
			audioControl.play();
			duration=audioControl.duration;
			// console.log(duration);
			time_longth.html(MMSS(duration));
			timeset=setInterval(function(){
				currentTime=audioControl.currentTime;
				music_mover.css("width",currentTime/duration*100+"%");
				time_now.html(MMSS(Math.floor(currentTime)));
				if(audioControl.ended){
					music_mover.css("width",0+"%");
					audioControl.currentTime=0;
					button_stop.triggerHandler("click");
					time_now.html("00:00");
				}
			},500);
		}
	});
	button_stop.click(function(){
		$(this).css("display","none");
		button_play.css("display","inline-block");
		audioControl.pause();
		clearInterval(timeset);
	});

	prograss.mousedown(function(){
		if(audio.attr("src")!=""){
			mouseDown($(this),"music",audioControl);
		}
	})

	volume.mousedown(function(){
		mouseDown($(this),"volume",audioControl);
	})

	function mouseDown(thisDom,type,controler){
		var Orimouse=window.event.pageX,
			Nowmouse=window.event.pageX,
			Longth=thisDom.innerWidth(),
			mover=thisDom.children(".mover"),
			moverLongth=Nowmouse - thisDom.offset().left,
			prograssPercent=moverLongth/Longth,
			playing;
		window.event.preventDefault();
		if(!audioControl.paused){
			audioControl.pause();
			playing=true;
		}
		mover.css("width",prograssPercent*100+"%");
		if(type=="music"){
			time_now.html(MMSS(getTime(time_longth.html())*prograssPercent));
		}
		if(type=="music"){
			controler.currentTime=getTime(time_longth.html())*prograssPercent;
		}else if(type=="volume"){
			controler.volume=prograssPercent;
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
				controler.currentTime=getTime(time_longth.html())*prograssPercent;
			}
			if(type=="music"){
				controler.currentTime=getTime(time_longth.html())*prograssPercent;
			}else if(type=="volume"){
				controler.volume=prograssPercent;
			}
		});
		$("body").mouseup(function(){
			if(playing){
				audioControl.play();
			}
			$("body").unbind("mousemove");
			$("body").unbind("mouseup");
		});
	}

	function MMSS(time){
		time=Math.floor(time);
		// console.log(time)
		var minute=Math.floor(time/60),
			second=0;
		minute=Math.floor(time/60);
		if(minute>=1){
			second=time-minute*60;
		}else{
			second=time;
		}
		var str=minute+":"+second;
		str=str.replace(/((?<!\d)\d(?!\d))/g,'0$1');
		// MM:SS
		return (str);
	}

	function getTime(time){
		var timearr=time.split(":",2),
			minute=parseInt(timearr[0]),
			second=parseInt(timearr[1]),
			timelong=minute*60+second;
		return timelong;
	}




});