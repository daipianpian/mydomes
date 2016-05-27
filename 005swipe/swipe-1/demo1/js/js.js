function install(){
	var boxw=$(window).width();
	var boxh=$(window).height();
	var x=boxw/276;
	var y=boxh/436;
	var z;
	var wrapw;
	var wraph;
	if(x>=y){z=y; wraph=436; wrapw=boxw/z;}
	else if(x<y){z=x; wrapw=276; wraph=boxh/z;}
	metas = document.getElementById("jdouview");
	metas.content="width=276, initial-scale="+z+", maximum-scale="+z+", user-scalable=no";
	$('#pingmuwrap').css({'width':wrapw+'px','height':wraph+'px'});
	$('.jdou-container').css({'width':'276px','height':'436px','position':'relative','overflow':'hidden','margin':'auto','margin-top':(wraph-436)/2+'px'});
	$('.pingmu').css({'width':'100%','height':'100%','left':'0px'});
}