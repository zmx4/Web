function upSize() {
    if (document.getElementById('img').width <= 395) {
        var x = parseInt(document.getElementById('img').width);
        x += 5;
        console.log(x);
        document.getElementById('img').width = x;
    }
}
function downSize() {
    if (document.getElementById('img').width >= 205) {
        var x = parseInt(document.getElementById('img').width);
        x -= 5;
        console.log(x);
        document.getElementById('img').width = x;
    }
}
function changeImg(path) {
    document.getElementById('img').src = path;
}
function checkusername(){
    var username=document.getElementById("username");
    console.log(username.value);
    // const reg=(str)=>/^\w{6,24}$/.test(str);
    var reg=(str)=>/^[A-Za-z][a-zA-Z0-9_]{3,15}$/.test(str);
    if(username.value=="")
    {
        var art=document.getElementById("alertusername");
        art.innerHTML="*用户名不能为空，请重新输入"
        art.style.color="red";
        return false;
    }
    else if(!reg(username.value))
    {
        var art=document.getElementById("alertusername");
        art.innerHTML="*用户名不符合要求，请重新输入"
        art.style.color="red";
        return false;
    }
    else
    {
        var art=document.getElementById("alertusername");
        art.innerHTML='<img src="images/right.jpg" />';
    }
    return true;
}
function checkuserpassword(){
    var userpassword=document.getElementById("userpassword");
    console.log(userpassword.value);
    const reg=(str)=>/^\w{6,24}$/.test(str);
    // var reg=(str)=>/^[A-Za-z][a-zA-Z0-9_]{3,15}$/.test(str);
    if(userpassword.value=="")
    {
        var art=document.getElementById("alertuserpassword");
        art.innerHTML="*密码不能为空，请重新输入"
        art.style.color="red";
        return false;
    }
    else if(!reg(userpassword.value))
    {
        var art=document.getElementById("alertuserpassword");
        art.innerHTML="*密码不符合要求，请重新输入"
        art.style.color="red";
        return false;
    }
    else
    {
        var art=document.getElementById("alertuserpassword");
        art.innerHTML='<img src="images/right.jpg" />';
    }
    return true;
}
function checkrepeat(){
    var userpassword=document.getElementById("userpassword");
    console.log(userpassword.value);
    var repeat=document.getElementById("userpasswordrepeat");
    if(userpassword.value!=repeat.value)
    {
        var art=document.getElementById("alertrepeat");
        art.innerHTML="*两次密码不一致，请重新输入"
        art.style.color="red";

        return false;
    }
    else
    {
        var art=document.getElementById("alertrepeat");
        art.innerHTML='<img src="images/right.jpg" />';
    }
    return true;
}