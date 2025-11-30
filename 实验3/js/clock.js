window.onload = function () {
    var t = new Date();
    document.getElementById("date").innerHTML = t.toLocaleDateString();
    var b1 = document.getElementById('b1');
    var b2 = document.getElementById('b2');
    var ti = document.getElementById('texti');
    var timer = null;
    b1.onclick = function () { timer = window.setInterval(times, 1000); }
    b2.onclick = function () { window.clearInterval(timer); }
    function times() {
        var t2 = new Date();
        ti.value = t2.toLocaleTimeString();
    }
}