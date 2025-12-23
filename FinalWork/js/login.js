function handleLogin(event) {
    event.preventDefault();
    
    // 清除之前的错误信息
    clearErrors();
    
    // 获取表单数据
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // 验证用户名
    if (!validateUsername(username)) {
        return false;
    }
    
    // 验证密码
    if (!validatePassword(password)) {
        return false;
    }
    
    // 模拟登录验证（在实际应用中，这里应该发送到服务器）
    if (authenticateUser(username, password)) {
        // 如果选择"记住我"，保存到localStorage
        if (remember) {
            localStorage.setItem('rememberedUser', username);
        } else {
            localStorage.removeItem('rememberedUser');
        }
        
        // 显示成功消息
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';
        
        // 模拟跳转（2秒后跳转到首页）
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
        
        return false;
    } else {
        showError('password-error', '用户名或密码错误！');
        return false;
    }
}

function validateUsername(username) {
    const usernameError = document.getElementById('username-error');
    
    if (username.length === 0) {
        showError('username-error', '用户名不能为空！');
        return false;
    }
    
    if (username.length < 3) {
        showError('username-error', '用户名长度不能少于3个字符！');
        return false;
    }
    
    if (username.length > 20) {
        showError('username-error', '用户名长度不能超过20个字符！');
        return false;
    }
    
    // 验证用户名格式（只允许字母、数字、下划线）
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        showError('username-error', '用户名只能包含字母、数字和下划线！');
        return false;
    }
    
    return true;
}

function validatePassword(password) {
    if (password.length === 0) {
        showError('password-error', '密码不能为空！');
        return false;
    }
    
    if (password.length < 6) {
        showError('password-error', '密码长度不能少于6个字符！');
        return false;
    }
    
    if (password.length > 30) {
        showError('password-error', '密码长度不能超过30个字符！');
        return false;
    }
    
    return true;
}

function authenticateUser(username, password) {
    // 从localStorage获取注册用户信息
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    // 检查用户是否存在且密码正确
    if (registeredUsers[username] && registeredUsers[username] === password) {
        return true;
    }
    
    // 演示账号（用于测试）
    if (username === 'admin' && password === 'admin123') {
        return true;
    }
    
    return false;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(elem => {
        elem.textContent = '';
        elem.style.display = 'none';
    });
    
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'none';
}

// 页面加载时检查是否有记住的用户
window.addEventListener('load', function() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
});

// 重置表单时清除错误信息
document.getElementById('login-form').addEventListener('reset', function() {
    setTimeout(clearErrors, 0);
});
