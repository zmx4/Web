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