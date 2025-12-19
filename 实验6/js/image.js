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
function checkusername() {
    var username = document.getElementById("username");
    console.log(username.value);
    // const reg=(str)=>/^\w{6,24}$/.test(str);
    var reg = (str) => /^[A-Za-z][a-zA-Z0-9_]{3,15}$/.test(str);
    if (username.value == "") {
        var art = document.getElementById("alertusername");
        art.innerHTML = "*用户名不能为空，请重新输入"
        art.style.color = "red";
        return false;
    }
    else if (!reg(username.value)) {
        var art = document.getElementById("alertusername");
        art.innerHTML = "*用户名不符合要求，请重新输入"
        art.style.color = "red";
        return false;
    }
    else {
        var art = document.getElementById("alertusername");
        art.innerHTML = '<img src="images/right.jpg" />';
    }
    return true;
}
function checkuserpassword() {
    var userpassword = document.getElementById("userpassword");
    console.log(userpassword.value);
    const reg = (str) => /^\w{6,24}$/.test(str);
    // var reg=(str)=>/^[A-Za-z][a-zA-Z0-9_]{3,15}$/.test(str);
    if (userpassword.value == "") {
        var art = document.getElementById("alertuserpassword");
        art.innerHTML = "*密码不能为空，请重新输入"
        art.style.color = "red";
        return false;
    }
    else if (!reg(userpassword.value)) {
        var art = document.getElementById("alertuserpassword");
        art.innerHTML = "*密码不符合要求，请重新输入"
        art.style.color = "red";
        return false;
    }
    else {
        var art = document.getElementById("alertuserpassword");
        art.innerHTML = '<img src="images/right.jpg" />';
    }
    return true;
}
function checkrepeat() {
    var userpassword = document.getElementById("userpassword");
    console.log(userpassword.value);
    var repeat = document.getElementById("userpasswordrepeat");
    if (userpassword.value != repeat.value) {
        var art = document.getElementById("alertrepeat");
        art.innerHTML = "*两次密码不一致，请重新输入"
        art.style.color = "red";

        return false;
    }
    else {
        var art = document.getElementById("alertrepeat");
        art.innerHTML = '<img src="images/right.jpg" />';
    }
    return true;
}
function submitForm() {
    checkusername();
    checkuserpassword();
    checkrepeat();
    if (checkusername() && checkuserpassword() && checkrepeat()) {
        alert("提交成功！");
    }
    // alert("提交成功！");
}

function writeToDiv(element) {
    var div = document.getElementById("event");
    var str =
        console.log()
}
var handler1 = function (evt) {
    alert(evt.currentTarget.id + "的事件监听器程序！");
}
var handler2 = function () {
    alert(arguments[0].currentTarget.id + "阶段" + arguments[0].eventPhase + "的事件监听器程序！");
}
var clickhandle = function(evt){
    evt = evt || window.event;
    var phase = evt.eventPhase == 1 ? "捕获" : (evt.eventPhase == 2 ? "目标节点" : "冒泡");
    var tag = evt.currentTarget.tagName;
    document.getElementById("event").innerHTML += tag + "元素在" + phase + "阶段接收click事件输出的文本<br/>";
}
window.onload = function () {
    document.getElementById("tbtd1").addEventListener("click", clickhandle, true);
    document.getElementById("td").addEventListener("click", clickhandle, true);
    document.getElementById("btn").addEventListener("click", clickhandle, true);
    document.getElementById("btn").addEventListener("click", clickhandle, false);
    document.getElementById("td").addEventListener("click", clickhandle, false);
    document.getElementById("tbtd1").addEventListener("click", clickhandle, false);
}