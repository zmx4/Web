window.onload=function(){
	var divheader1=function(){
		alert("是否访问临沂大学主页由用户选择！");
	}
	var divheader2=function(){
		var x = document.getElementById("here");
		x.innerHTML="欢迎继续留在本网页！"
	}

    var ahandle=function() {
		var evt = arguments[0];
		var rtnval=confirm("确定要访问临沂大学主页吗?");
		if(rtnval){
			evt.stopPropagation();
		}
		else{
			evt.preventDefault();
		}
	} 
	document.getElementById("a").addEventListener("click",divheader1,true);
	document.getElementById("a").addEventListener("click",divheader2,false);
    document.getElementById("lyulink").addEventListener("click",ahandle,false);
	// document.getElementById("sbmbtn").addEventListener("click",handler);
}