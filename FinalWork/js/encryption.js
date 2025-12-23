// 监听加密方式变化
document.getElementById('encryption-method').addEventListener('change', function() {
    const method = this.value;
    const shiftGroup = document.getElementById('shift-group');
    
    if (method === 'caesar') {
        shiftGroup.style.display = 'block';
    } else {
        shiftGroup.style.display = 'none';
    }
});

// ========== 反转加密 ==========
function reverseEncrypt(text) {
    return text.split('').reverse().join('');
}

function reverseDecrypt(text) {
    return text.split('').reverse().join('');
}

// ========== 凯撒密码 ==========
function caesarEncrypt(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, 26 - shift);
}

// ========== 摩斯密码 ==========
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
};

const morseReverse = Object.fromEntries(
    Object.entries(morseCode).map(([k, v]) => [v, k])
);

function morseEncrypt(text) {
    return text.toUpperCase().split('').map(char => 
        morseCode[char] || char
    ).join(' ');
}

function morseDecrypt(text) {
    return text.split(' ').map(code => 
        morseReverse[code] || code
    ).join('');
}

// ========== 表情符号加密 ==========
const emojiMap = {
    'A': '😀', 'B': '😁', 'C': '😂', 'D': '😃', 'E': '😄', 'F': '😅',
    'G': '😆', 'H': '😉', 'I': '😊', 'J': '😋', 'K': '😎', 'L': '😍',
    'M': '😘', 'N': '😗', 'O': '😙', 'P': '😚', 'Q': '🙂', 'R': '🤗',
    'S': '🤔', 'T': '😐', 'U': '😑', 'V': '😶', 'W': '🙄', 'X': '😏',
    'Y': '😣', 'Z': '😥', '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣',
    '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣',
    ' ': '　'
};

const emojiReverse = Object.fromEntries(
    Object.entries(emojiMap).map(([k, v]) => [v, k])
);

function emojiEncrypt(text) {
    return text.toUpperCase().split('').map(char => 
        emojiMap[char] || char
    ).join('');
}

function emojiDecrypt(text) {
    return text.split('').map(char => 
        emojiReverse[char] || char
    ).join('');
}

// ========== 主要功能 ==========
function encryptText() {
    const method = document.getElementById('encryption-method').value;
    const input = document.getElementById('input-text').value;
    const output = document.getElementById('output-text');
    
    if (!input.trim()) {
        alert('请输入要加密的文本！');
        return;
    }
    
    let result = '';
    
    switch(method) {
        case 'reverse':
            result = reverseEncrypt(input);
            break;
        case 'caesar':
            const shift = parseInt(document.getElementById('shift-value').value) || 3;
            result = caesarEncrypt(input, shift);
            break;
        case 'morse':
            result = morseEncrypt(input);
            break;
        case 'emoji':
            result = emojiEncrypt(input);
            break;
    }
    
    output.textContent = result;
}

function decryptText() {
    const method = document.getElementById('encryption-method').value;
    const input = document.getElementById('input-text').value;
    const output = document.getElementById('output-text');
    
    if (!input.trim()) {
        alert('请输入要解密的文本！');
        return;
    }
    
    let result = '';
    
    switch(method) {
        case 'reverse':
            result = reverseDecrypt(input);
            break;
        case 'caesar':
            const shift = parseInt(document.getElementById('shift-value').value) || 3;
            result = caesarDecrypt(input, shift);
            break;
        case 'morse':
            result = morseDecrypt(input);
            break;
        case 'emoji':
            result = emojiDecrypt(input);
            break;
    }
    
    output.textContent = result;
}

function clearText() {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').textContent = '';
}
