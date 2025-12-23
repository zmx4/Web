// 标签切换
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.timer-content');
    const buttons = document.querySelectorAll('.tab-button');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    if (tabName === 'clock') {
        startClock();
    }
    if (tabName === 'calendar') {
        renderCalendar();
    }
}

// ========== 计时器 ==========
let stopwatchInterval = null;
let stopwatchTime = 0;
let stopwatchRunning = false;

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        document.getElementById('stopwatch-start').disabled = true;
        document.getElementById('stopwatch-pause').disabled = false;
        
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatchDisplay();
        }, 10);
    }
}

function pauseStopwatch() {
    if (stopwatchRunning) {
        stopwatchRunning = false;
        clearInterval(stopwatchInterval);
        document.getElementById('stopwatch-start').disabled = false;
        document.getElementById('stopwatch-pause').disabled = true;
    }
}

function resetStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    updateStopwatchDisplay();
    document.getElementById('stopwatch-start').disabled = false;
    document.getElementById('stopwatch-pause').disabled = true;
}

function updateStopwatchDisplay() {
    const centiseconds = stopwatchTime % 100;
    const seconds = Math.floor(stopwatchTime / 100) % 60;
    const minutes = Math.floor(stopwatchTime / 6000) % 60;
    const hours = Math.floor(stopwatchTime / 360000);
    
    const display = document.getElementById('stopwatch-display');
    display.textContent = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(centiseconds).padStart(2, '0');
}

// ========== 倒计时 ==========
let countdownInterval = null;
let countdownTime = 60;
let countdownRunning = false;
let countdownRemaining = 60;

function startCountdown() {
    if (!countdownRunning) {
        countdownRunning = true;
        document.getElementById('countdown-start').disabled = true;
        document.getElementById('countdown-pause').disabled = false;
        document.getElementById('countdown-input').disabled = true;
        
        if (countdownRemaining === countdownTime) {
            countdownTime = parseInt(document.getElementById('countdown-input').value) || 60;
            countdownRemaining = countdownTime;
        }
        
        countdownInterval = setInterval(() => {
            countdownRemaining--;
            updateCountdownDisplay();
            
            if (countdownRemaining <= 0) {
                pauseCountdown();
                alert('倒计时结束！');
            }
        }, 1000);
    }
}

function pauseCountdown() {
    if (countdownRunning) {
        countdownRunning = false;
        clearInterval(countdownInterval);
        document.getElementById('countdown-start').disabled = false;
        document.getElementById('countdown-pause').disabled = true;
    }
}

function resetCountdown() {
    countdownRunning = false;
    clearInterval(countdownInterval);
    countdownTime = parseInt(document.getElementById('countdown-input').value) || 60;
    countdownRemaining = countdownTime;
    updateCountdownDisplay();
    document.getElementById('countdown-start').disabled = false;
    document.getElementById('countdown-pause').disabled = true;
    document.getElementById('countdown-input').disabled = false;
}

function updateCountdownDisplay() {
    const minutes = Math.floor(countdownRemaining / 60);
    const seconds = countdownRemaining % 60;
    
    const display = document.getElementById('countdown-display');
    display.textContent = 
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
}

// ========== 时钟 ==========
let clockInterval = null;

function startClock() {
    updateClock();
    if (clockInterval) {
        clearInterval(clockInterval);
    }
    clockInterval = setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const day = dayNames[now.getDay()];
    
    document.getElementById('clock-display').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('date-display').textContent = `${year}年${month}月${date}日 ${day}`;
}

// ========== 日历 ==========
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function renderCalendar() {
    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                       '七月', '八月', '九月', '十月', '十一月', '十二月'];
    
    document.getElementById('calendar-month').textContent = 
        `${currentYear}年 ${monthNames[currentMonth]}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    
    // 星期标题
    const dayHeaders = ['日', '一', '二', '三', '四', '五', '六'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day header';
        header.textContent = day;
        grid.appendChild(header);
    });
    
    // 上月日期
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = daysInPrevMonth - i;
        grid.appendChild(day);
    }
    
    // 当月日期
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        if (currentYear === today.getFullYear() && 
            currentMonth === today.getMonth() && 
            i === today.getDate()) {
            day.classList.add('today');
        }
        
        grid.appendChild(day);
    }
    
    // 下月日期
    const totalCells = grid.children.length - 7; // 减去标题行
    const remainingCells = 42 - totalCells - 7; // 6行 * 7列 - 已有的格子 - 标题行
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = i;
        grid.appendChild(day);
    }
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

// 初始化
updateCountdownDisplay();
