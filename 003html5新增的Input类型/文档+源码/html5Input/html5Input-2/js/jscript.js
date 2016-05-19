// JavaScript Document
/*var music=document.getElementById('music');*/
	var appMessageShareData;
	appMessageShareData = {
            title: '女生节-挑女神',
            desc: '女神等你来配对，配对成功，就有机会赢大礼哦！',
            link: window.location.href,
            imgUrl:'http://www.h5-share.com/v0.1/demo/d2/monkey/images/thumb.jpg',
			success: function () { 
                 addtime();
             },
          }; 
	
// var clientWidth = $(window).width();
// var clientHeight = $(window).height();
// $('.inner').css({'width': clientWidth, 'height': clientHeight + 'px'});	  
		  
var Page=function(time,name,thisgame){
   this.time=time;
   this.pageNum=0;
   this.flag={
       qifu:false,
	   start:false,
	   ranks:false
   }

   this.game=thisgame;
   this.name=name;
};

Page.prototype.init=function(){
  var time=this.time;
  var name=this.name;
  $('.loading').hide();	
  if(time==''||typeof time=='undefined'){      
	 if(isNull(localStorage.getItem('name'))){
	     $('.pingmu1').show();
	     
	 }else{
	     $('.pingmu2').show();
	 }
	   
  }else{
	 $('.whowho div').html(time); 
	 if(isNull(name)){
	    $('.whowho p').html('哇哦'); 
	 }else{
	    $('.whowho p').html(decodeURI(name)); 
	 }
     $('.pingmu13').show();
  }
  music.pause();
  music.play();
}

Page.prototype.metoo=function(){
	 if(isNull(localStorage.getItem('name'))){
	     this.pageup(1);
	 }else{	     
		 this.pageup(2);
	 }
}

Page.prototype.pageup=function(num){
	$('.pingmu').hide();
	$('.pingmu'+num).show();
}

Page.prototype.submit2=function(){
   yanzhengname('#name'); 
   yanzhengtel('#phone');
   yanzhengtel('#address');
   if($('#nameinfo').html()==''&&$('#phoneinfo').html()==''&&$('#addressinfo').html()==''){
	   localStorage.setItem('name',$('#name').val());
	   localStorage.setItem('phone',$('#phone').val());
	   localStorage.setItem('address',$('#address').val());
	   this.addaccount($('#name').val(),$('#phone').val(),$('#address').val());
   }

}

Page.prototype.showpop=function(o){
    $('.pop').hide();
	$(o).show();
}

Page.prototype.hidepop=function(o){
    $('.pop').hide();
}


var Game=function(){
	this.time=0;
	this.timerinter=null;
	this.level=0;
	//this.leveltime=new Array(1000,1000,1000,1000,1000,1000);//每关卡给的记忆时间
	// this.levelnum=new Array(4,6,16);//每关卡的卡牌个数
	this.levelnum=new Array(2,2,2);  //用于测试时每关卡的卡牌个数
	this.myDate=null;
	this.flag=false;
	
}


/*初始游戏*/
Game.prototype.init=function(){
	this.time=0;//总时间	
	this.level=0;
	timee=0.000;
	$('.card').removeClass('right1 right2 right3 right4 none gamecard show');
}

/**
   摆牌:
   input：level
   根据不同的level 给出牌的位置；
   并要显示让正确的牌露出来
   在看牌时间过去后
   开始该一关的翻牌
**/
Game.prototype.prepare=function(l){
	switch(l){
		case 1:
            /*var arrNum=[1,2,3,4];
			var rightarray=[1,1,4,4];*/
			var arrNum=[1,2];
			var rightarray=[1,1];
 		break;
		
		case 2:
            /*var arrNum=[5,6,7,8,9,10];
			var rightarray=[2,2,3,3,6,6];*/
			var arrNum=[5,6];
			var rightarray=[1,1];
  		break;
		
		case 3:
            /*var arrNum=[1,4,5,14,7,8,9,2,6,3,16,12,15,10,13,11];
			var rightarray=[5,5,5,5,1,1,1,1,1,1,4,4,2,2,2,2];*/
		 	 var arrNum=[1,2];
		 	 var rightarray=[1,1];
  	 		break;
			
		default:

	}
	this.getcard(arrNum,rightarray,l)
}

Game.prototype.getcard=function(arrNum,rightarray,l){
    $('.card').removeClass('gamecard');
	for(i=0;i<arrNum.length;i++){
	   $('.level'+l+' .card.c'+arrNum[i]).addClass('gamecard');
	}
	var righta=randArray(rightarray);
	for(i=0;i<arrNum.length;i++){
	   $('.level'+l+' .card.c'+arrNum[i]).addClass('right'+righta[i]);
	   $('.level'+l+' .card.c'+arrNum[i]).data('right',righta[i]);
	}
	this.flopthis(l);
}



/**
   翻牌:
   input：level
   绑定事件，也就是说只能在翻牌事件中，用户才能点击
   翻牌开始时记录时间，结束后停止记录时间
   判断用户翻得牌是否正确：正确--则翻出正确面，正确个数+1，若正确个数为2，则该关结束，进入下一关；错误--正确面消失，正确个数--
**/
Game.prototype.flopthis=function(l){

	var rightNum=0;//记录right数
	var thisgame=this;
	var precard='';
	thisgame.flag=false;
	var levelnum=this.levelnum;
	$('.level'+l+' .gamecard').each(function() {
		$(this).bind('touchstart',function(e){
		   e.preventDefault();
		   if($(this).hasClass('none')){ return}
		   if($(this).hasClass('show')){ return}
		   if(thisgame.flag){ return}
		   thisgame.flag=true; 
		   $(this).addClass('show');	 
           if(rightNum==0){//第一次翻牌
		       rightNum=$(this).data('right');
			   //precard=this;
			   //$(this).addClass('precard');
			   thisgame.flag=false;
		   }else{
		      if($(this).data('right')==rightNum){
				  //setTimeout(function(){
					  $('.level'+l+' .gamecard.show').addClass('none');
					  rightNum=0;
					  thisgame.flag=false;
					  if($('.level'+l+' .gamecard.none').length==levelnum[l-1]){ 
					    setTimeout(function(){ thisgame.levelup()},500)
					  }
				  //},500);
				  
			  }else{
				 setTimeout(function(){
			       $('.level'+l+' .gamecard').removeClass('show');
				   rightNum=0;
				   thisgame.flag=false;
				 },500); 
			  }
		   }
		  
		})	
	});
}


/**
   关卡:
   input：level
   升级要进行的操作
   判断是否为最后一级：是--结束页， 否--到下一级
   将game中的计数level值++
   跳转页面
**/
Game.prototype.levelup=function(){
	var thisgame=this;
	this.level++;
	var level=this.level;
	if(level==4){
       thisgame.finished()
	}else{
		this.prepare(level);
		$('.level').removeClass('active');
		$('.level'+level).addClass('active');
		page.pageup(level+3);
	}
	
}


Game.prototype.start=function(){
	this.init();
	// $('.pingmu4 .hdgz').hide();
	$('.pingmu4 .start').hide();
    this.levelup();
	this.myDate=new Date();
	this.time=this.myDate.getTime();
	timmer();	
}


function randArray(data){
    var arrlen = data.length;
    var try1 = new Array();
    for(var i = 0;i < arrlen; i++){
        try1[i] = i;
    }
    var try2 = new Array();
    for(var i = 0;i < arrlen; i++){
        try2[i] = try1.splice(Math.floor(Math.random() * try1.length),1);
    }
    var try3 = new Array();
    for(var i = 0; i < arrlen; i++){
        try3[i] = data[try2[i]];
    }
    return try3;
} 


var timee=0.000;
var timeout;
function timmer(){
   timeout=setTimeout(function(){
	  timee=timee+0.100;
	  $('.level.active .inner2 span').html(timee.toString().substr(0,5));
	  timmer();
	},100)
} 

 function yanzhengname(o){ 
    if($(o).val()==''){
       $('#nameinfo').html('名字不能为空');
      }
    if($(o).val()!=null&&$(o).val()!=''){
       $('#nameinfo').html('');
    }
  }

  var rey=/^((1(([3][0-9]|[5][012356789])|(47)|[7][678]|[8][0123456789]))\d{8}|((170([0]|[5]|[9]))\d{7}))$/;
  function yanzhengtel(o){ 
    if(($(o).val()!='')&&($(o).val().match(rey)==null)){
     $('#phoneinfo').html('手机号有误');
    } 
    if($(o).val()==''){
       $('#phoneinfo').html('手机号不能为空');
      }
    if($(o).val().match(rey)!=null){
       $('#phoneinfo').html('');
    }
  }

  function yanzhengaddr(o){ 
    if($(o).val()==''){
       $('#addressinfo').html('地址不能为空');
      }
    if($(o).val()!=null&&$(o).val()!=''){
       $('#addressinfo').html('');
    }
  }
  

(function($){
			$.fn.extend({
				setClass:function(o){
					o=$.extend({
						removeClass :null,
						addClass :null,
						delayTime:5000
					},o||{})
					var _self=$(this);
                    setTimeout(function(){
					  _self.removeClass(o.removeClass);                  
                      _self.addClass(o.addClass);
                    },o.delayTime);				
				}
			})
		})(jQuery)	


function isAndroid(){
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  return isAndroid;
}

//http://www.h5-share.com/v0.1/demo/d2/monkey/images/thumb.jpg



/************************* 微信分享功能 ********************************/			
    var host=window.location.host;
	function sharethis(){
	var server = 'http://www.h5-share.com/h5share.php/Home/Share/JDOU_shareWx_niu/';
	var currenturl = window.location.href;
	 var postData={ url:currenturl}
           /* $.ajax({
                type: "POST",
                url: server,
                data: postData,
                async: true,
                dataType: "json",
                success: function (result) {
                        //分享功能 s
                        wx.config({
                            debug: false,
                            appId: result.appId,
                            timestamp: result.timestamp,
                            nonceStr: result.nonceStr,
                            signature: result.signature,
                            jsApiList: [
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo'
                            ]
                        });
                        wechatReady();
                },
                error: function () {
                  //window.alert("系统错误，请稍后再试");
                }
            });*/
	
	}
	

      function wechatReady() {     
            wx.ready(function () { 
            //alert(appMessageShareData.link);
          wx.onMenuShareAppMessage(appMessageShareData);
                wx.onMenuShareTimeline(appMessageShareData);
                wx.onMenuShareQQ(appMessageShareData);
                wx.onMenuShareWeibo(appMessageShareData);
            })     
            wx.error(function (res) {
               // alert(res.errMsg);
            });
        }
		
		sharethis();


/*解析url字符串*/	
	function getJsUrl(url){
			var pos,str,para,parastr; 
            var array =[]
            str = url; 
            parastr = str.split("?")[1]; 
			if(typeof parastr=='undefined'){ 
			  return 'undefined'
			}else{
			  var arr = parastr.split("&");
              for (var i=0;i<arr.length;i++){
              array[arr[i].split("=")[0]]=arr[i].split("=")[1];}
              return array;
			}

          }
		  
		  
	function isNull(o){		
	   if(o==''||o==undefined||o==null){
	      return true;
	   }else{
	      return false;
	   }
	}
	
	/*创建用户*/
	Page.prototype.addaccount=function(name,tel,address) {
		/*var thispage=this;
		if(thispage.flag.qifu){ return}	
		thispage.flag.qifu=true;	
		var _url='http://'+host+'/codes/bankofchina/bankgame/game.php/Home/Index/JDOU_user/';
		var _data={
			'nickname':name,
			'tel':tel,
			'addr':address
		};
		$.ajax({
			url:_url,
			type:'POST',
			data:_data,
			dataType:'json',
			success:function(json){
				if(json.status==1){*/

                    thispage.pageup(2);

				    // thispage.flag.qifu=false;				
				/*}		
			}
		})*/
    }
	
	/*开始游戏*/
	Page.prototype.start=function(){
	    var thispage=this;
		if(thispage.flag.start){ return}
		thispage.flag.start=true;
		var _url='http://'+host+'/codes/bankofchina/bankgame/game.php/Home/Index/JDOU_game/';
		var _data={
			'tel':localStorage.getItem('phone')
		};
		/*$.ajax({
			url:_url,
			type:'POST',
			data:_data,
			dataType:'json',
			success:function(json){				
				var json=json;
				thispage.flag.start=false;				
				if(json.status==1){
					if(json.gnum!=0){*/
					    thispage.game.start();
						/*localStorage.setItem('gid',json.gid)
					}else{
					    if(json.isshare==1){//分享过了
							//alert('你玩儿的够多的啦，明天再来吧~')
							page.showpop('.alert');
						}else{
						   //alert('分享一次，多次机会哦~')
						   page.showpop('.alert');
						}
					}
										
				}else{
					//alert('你玩儿的够多的啦，明天再来吧~');
				    page.showpop('.alert');
				}
			}
		})*/

    } 
	
	/*游戏结束*/
	Game.prototype.finished=function(){
	  /* clearTimeout(timeout);
       var thisgame=this;
	   thisgame.myDate=new Date();
	   var timee=thisgame.myDate.getTime()-thisgame.time;
        var _url='http://'+host+'/codes/bankofchina/bankgame/game.php/Home/Index/JDOU_game_finished/';
		var _data={
			'tel':localStorage.getItem('phone'),
			'points':timee,
			'gid':localStorage.getItem('gid')
		};
		$.ajax({
			url:_url,
			type:'POST',
			data:_data,
			dataType:'json',
			success:function(json){				
				var json=json;				
				if(json.status==1){*/
					page.pageup(3); //游戏结束页即游戏结束跳转到的页面

					$('.tonggaun p').html(cutNum(timee));
					appMessageShareData.link='http://www.h5-share.com/BOC/2016Spring/index.html?time='+cutNum(timee)+'&name='+encodeURI(localStorage.getItem('name'));
		            sharethis(); 
				/*}
			}
		})*/

    }  

    $('.again').click(function(){
		window.location.reload();
    });	 
	
	
	Page.prototype.ranks=function(){
		
		/*var thispage=this;
		if(thispage.flag.ranks){ return}
		thispage.flag.ranks=true;
		var _url='http://'+host+'/codes/bankofchina/bankgame/game.php/Home/Index/JDOU_ranking/';
		var _data={};
		$.ajax({
			url:_url,
			type:'POST',
			data:_data,
			dataType:'json',
			success:function(json){				
				var json=json;
				$('.pingmu11 .content').html('');
				$(json).each(function (index, value) {
					var gettime=cutNum(value.goodpoints/1000);
					console.log(value.ynickname);
				     $('.pingmu11 .content').append(
					   '<p><span>第'+(index+1)+'名</span><span> '+gettime+'秒</span><span> '+value.ynickname+'</span><span> '+value.ytel+'</span></p>'
					 );
				});				
				thispage.pageup(11);
				thispage.flag.ranks=false;
			}
		})	*/
	}
	
	
	function addtime(){
		/*if(isNull(localStorage.getItem('phone'))){ return}
        var _url='http://'+host+'/codes/bankofchina/bankgame/game.php/Home/Index/JDOU_invited/';
		var _data={
			'tel':localStorage.getItem('phone')
		};
		$.ajax({
			url:_url,
			type:'POST',
			data:_data,
			dataType:'json',
			success:function(json){				
				var json=json;				
				if(json.status==1){
					//alert('分享成功！');
				}else{
					//alert('分享失败');
				}
			}
		})	*/
	}

	/* 分享引导页 start */
	$('.shareBtn').click(function(){
		$('.innerScore').hide();
		$('.share').show();
	});

	$('.share').click(function(){
		$('.share').hide();
		$('.innerScore').show();
	});
	/* 分享引导页 end */

	/*brand start*/
	$('.arrows').click(function(){
		$('.pingmu10').hide();
		$('.pingmu11').show();
	});
	/*brand end*/

	function cutNum(o){
		var thisnum=new Number(o);
		result=thisnum.toFixed(3);	
		return result.toString().substr(0,5)
	}
	
	function musicthis(o){
	   if($(o).hasClass('roate')){
	       $(o).removeClass('roate');
		   music.pause();
	   }else{
	       $(o).addClass('roate');
		   music.play();	   
	   }
	}