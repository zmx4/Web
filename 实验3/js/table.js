
function modifyTable() {
    var rowStr = document.getElementById("rowIdx").value;
    var colStr = document.getElementById("colIdx").value;
    var content = document.getElementById("newContent").value;
    var table = document.getElementById("myTable");

    if (rowStr == "" || colStr == "") {
        alert("请输入行号和列号");
        return;
    }

    var r = parseInt(rowStr);
    var c = parseInt(colStr);

    // 假设用户输入的是从1开始的行号和列号
    if (r < 1 || r > table.rows.length) {
        alert("行号不存在");
        return;
    }

    var targetRow = table.rows[r - 1];
    if (c < 1 || c > targetRow.cells.length) {
        alert("列号不存在");
        return;
    }

    targetRow.cells[c - 1].innerText = content;
}