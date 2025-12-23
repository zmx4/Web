// ========== Base64 编码/解码 ==========
function base64Encode(text) {
    try {
        return btoa(unescape(encodeURIComponent(text)));
    } catch (e) {
        throw new Error('Base64 编码失败');
    }
}

function base64Decode(text) {
    try {
        return decodeURIComponent(escape(atob(text)));
    } catch (e) {
        throw new Error('Base64 解码失败，请检查输入是否为有效的Base64字符串');
    }
}

// ========== URL 编码/解码 ==========
function urlEncode(text) {
    try {
        return encodeURIComponent(text);
    } catch (e) {
        throw new Error('URL 编码失败');
    }
}

function urlDecode(text) {
    try {
        return decodeURIComponent(text);
    } catch (e) {
        throw new Error('URL 解码失败');
    }
}

// ========== Unicode 编码/解码 ==========
function unicodeEncode(text) {
    return text.split('').map(char => {
        const code = char.charCodeAt(0).toString(16).toUpperCase();
        return '\\u' + code.padStart(4, '0');
    }).join('');
}

function unicodeDecode(text) {
    try {
        return text.replace(/\\u([0-9a-fA-F]{4})/g, (match, code) => {
            return String.fromCharCode(parseInt(code, 16));
        });
    } catch (e) {
        throw new Error('Unicode 解码失败');
    }
}

// ========== 十六进制 编码/解码 ==========
function hexEncode(text) {
    return text.split('').map(char => {
        const hex = char.charCodeAt(0).toString(16).toUpperCase();
        return hex.padStart(2, '0');
    }).join(' ');
}

function hexDecode(text) {
    try {
        const hexArray = text.split(' ').filter(h => h.length > 0);
        return hexArray.map(hex => {
            return String.fromCharCode(parseInt(hex, 16));
        }).join('');
    } catch (e) {
        throw new Error('十六进制解码失败，请检查输入格式');
    }
}

// ========== 主要功能 ==========
function encode() {
    const type = document.getElementById('encoding-type').value;
    const input = document.getElementById('encoding-input').value;
    const output = document.getElementById('encoding-output');
    
    if (!input.trim()) {
        alert('请输入要编码的文本！');
        return;
    }
    
    try {
        let result = '';
        
        switch(type) {
            case 'base64':
                result = base64Encode(input);
                break;
            case 'url':
                result = urlEncode(input);
                break;
            case 'unicode':
                result = unicodeEncode(input);
                break;
            case 'hex':
                result = hexEncode(input);
                break;
        }
        
        output.textContent = result;
        output.style.color = '#333';
    } catch (e) {
        output.textContent = '错误：' + e.message;
        output.style.color = '#dc3545';
    }
}

function decode() {
    const type = document.getElementById('encoding-type').value;
    const input = document.getElementById('encoding-input').value;
    const output = document.getElementById('encoding-output');
    
    if (!input.trim()) {
        alert('请输入要解码的文本！');
        return;
    }
    
    try {
        let result = '';
        
        switch(type) {
            case 'base64':
                result = base64Decode(input);
                break;
            case 'url':
                result = urlDecode(input);
                break;
            case 'unicode':
                result = unicodeDecode(input);
                break;
            case 'hex':
                result = hexDecode(input);
                break;
        }
        
        output.textContent = result;
        output.style.color = '#333';
    } catch (e) {
        output.textContent = '错误：' + e.message;
        output.style.color = '#dc3545';
    }
}

function clearEncoding() {
    document.getElementById('encoding-input').value = '';
    document.getElementById('encoding-output').textContent = '';
}

function copyOutput() {
    const output = document.getElementById('encoding-output');
    const text = output.textContent;
    
    if (!text) {
        alert('没有可复制的内容！');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        alert('已复制到剪贴板！');
    }).catch(() => {
        // 兼容性备选方案
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            alert('已复制到剪贴板！');
        } catch (e) {
            alert('复制失败，请手动复制');
        }
        
        document.body.removeChild(textarea);
    });
}
