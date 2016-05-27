// JavaScript Document
var company={

    searchcompanies:function(keyword,screennum,pnum){
		
		    /*防止上次请求未完成时，又发送请求*/
			 if(flag){return}
			 flag=true;
			 
			if(!demoLast){

			    var urlhead='http://h5-share.com/';
				if(!iscollect){
					var _url='http://'+host+'/h5share.php/Home/Index/JDOU_case_search/';
                    var _data={
			          'keyword':keyword,
			          'screen':screennum,
			          'pnum':pnum
		           };
				}else{
					var _url='http://'+host+'/h5share.php/Home/Index/mycollection/';
					var _data={
			          'screen':screennum,
			          'pnum':pnum
		           };
				}

		        $.ajax({
			       url:_url,
			       type:'POST',
			       data:_data,
			       dataType:'json',
			       success:function(result){
					   flag=false;
					   pagenum++;
					if(result.status==1){
					
				       if(result.last==1){
						   demoLast=true;
						   $('.loading-more').hide();
					   }
					   var heartNum=1;
					   var heartWord='收藏';
					   if((result.allnum!='undefined')&&(result.allnum!='null')){
						   console.log($('.searchnum').html());
					      if($('.searchnum').html()==0){$('.searchnum').html(result.allnum);}
					   }
				       for(i=0;i<result.num;i++){
						   if(!iscollect){
							   heartNum=result.list[i].collection;
							   if(heartNum==1){
							      heartWord='已收藏';
							   }
						   }else{
						      heartWord='已收藏';
						   }
                           //result.list[i].weixinurl='http://www.h5-share.com/cases/'+parseUrl(result.list[i].weixinurl);
						   $('.demos').append(
                      	   '<div class="demo" data-id="'+result.list[i].id+'" title="'+result.list[i].title+'" data-company="'+result.list[i].company+'" data-description="'+result.list[i].description+'">'
						       +'<div class="demo-ti">'
                           	   +'<div class="demo-title">'+result.list[i].name+'</div>'
                         	   +'<div class="demo-image"><img src="'+urlhead+result.list[i].img+'" width="100%" height="auto" alt="'+result.list[i].description+'"></div>'
							   +'<a class="full jdou-btn" data-btn="'+result.list[i].id+'" target="_blank" href="'+result.list[i].weixinurl+'"></a>'
							   +'</div>'
                         	   +'<div class="demo-tool">'
                            	   +'<div class="demo-tag"><a>标签：</a><a href="http://www.h5-share.com/result.html?keyword='+encodeURI(thisnull(result.list[i].tag[0]))+'">'+thisnull(result.list[i].tag[0])+'</a><a href="http://www.h5-share.com/result.html?keyword='+encodeURI(thisnull(result.list[i].tag[1]))+'">'+thisnull(result.list[i].tag[1])+'</a></div>'
                            	   +'<div class="demo-collect"  onClick="heart(this,'+iscollect+')"><div class="heart heart'+heartNum+'"></div><div class="cword">'+heartWord+'</div></div>'
                         	   +'</div>'
                     	    +'</div>'
						   );
						
					   }
                       


					
					}else{
						if(!iscollect){
							$('.demos').append(
							'<div class="alert">'
							+'<p>对不起，没有相关搜索呢...</p>'
							+'<p>不过小编已经记下了，你下次来也许就能搜到了！</p>'
							+'<p>扫一扫(微信端长按)二维码，关注h5-share问小编~</p>'
							+'<img class="imgqr" src="http://h5-share.com/images/qrcode2.jpg">'
							+'</div>');
							demoLast=true;
						}else{
							$('.demos').append(
							'<div class="alert">'
							+'<p>空空如也...</p>'
							+'<p>赶紧收藏自己喜欢的案例吧~</p>'
							+'</div>');
							demoLast=true;
						}
					}   
					  
			        
			       
				   }
		       })
			   
			}else{
			   //$('.loading-more').hide();
			   //flag=false;
                if($('.alertp').length==0){$('.demos').append('<div style="clear:both"></div><p class="alertp">别拽啦，别拽啦！没啦，这是最后一页！</p>');}
			}

		
		
		
		
		
		
		
		

    },
    getcompany:function(){

    }

}