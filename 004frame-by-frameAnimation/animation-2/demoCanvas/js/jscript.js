// JavaScript Document
var pagenum;
var flag=false;
var page={
	init:function(){
		$('.loading').hide();
		$('#pingmu0').show();
		$('#pingmu0').addClass('active');
		pagenum=0;
		$('.answer').bind("click", function(){
			question.judge(this);
		});
	},
	up:function(n){
		$('.pingmu').hide();
		$('#pingmu'+n).show();
		$('.pingmu').removeClass('active');
		$('#pingmu'+n).addClass('active');
	}
}

var question={
	marks:0,
	judge:function(o){
		if(flag){return}
		flag=true;
		var result=$(o).data('ans');
		if(result==1){//right
			question.right(o);
		}else{//wrong
			question.wrong(o);
		}
	},
	right:function(o){
		$(o).addClass('right');
		question.marks++;
		setTimeout(function(){
			flag=false; 
			pagenum++;
            if(pagenum==7){question.end()}			
			page.up(pagenum);
		},800);
	},
	wrong:function(o){
		$(o).addClass('wrong');
		setTimeout(function(){
			flag=false;  
			pagenum++;
            if(pagenum==7){question.end()}				
			page.up(pagenum);
		},1200);
	},
	start:function(o){
		pagenum++;
		page.up(pagenum);
	},
	end:function(){
        $('.result').addClass('mark'+question.marks);
	},
	restart:function(){
		pagenum=1;
		question.marks=0;
        $('.answer').removeClass('right');
		$('.answer').removeClass('wrong');
		page.up(pagenum);
	}
}



