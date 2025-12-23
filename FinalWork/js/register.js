function handleRegister(event) {
    event.preventDefault();
    
    // 清除之前的错误信息
    clearErrors();
    
    // 获取表单数据
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const phone = document.getElementById('reg-phone').value.trim();
    const agreeTerms = document.getElementById('agree-terms').checked;
    
    // 验证所有字段
    let isValid = true;
    
    if (!validateUsername(username)) {
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        isValid = false;
    }
    
    if (!validatePassword(password)) {
        isValid = false;
    }
    
    if (!validateConfirmPassword(password, confirmPassword)) {
        isValid = false;
    }
    
    if (phone && !validatePhone(phone)) {
        isValid = false;
    }
    
    if (!agreeTerms) {
        showError('agree-terms-error', '请阅读并同意用户协议和隐私政策！');
        isValid = false;
    }
    
    if (!isValid) {
        return false;
    }
    
    // 检查用户名是否已存在
    if (checkUserExists(username)) {
        showError('reg-username-error', '该用户名已被注册！');
        return false;
    }
    
    // 保存用户信息到localStorage
    saveUser(username, password, email, phone);
    
    // 显示成功消息
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    
    // 3秒后跳转到登录页面
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);
    
    return false;
}

function validateUsername(username) {
    if (username.length === 0) {
        showError('reg-username-error', '用户名不能为空！');
        return false;
    }
    
    if (username.length < 3) {
        showError('reg-username-error', '用户名长度不能少于3个字符！');
        return false;
    }
    
    if (username.length > 20) {
        showError('reg-username-error', '用户名长度不能超过20个字符！');
        return false;
    }
    
    // 验证用户名格式（只允许字母、数字、下划线）
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        showError('reg-username-error', '用户名只能包含字母、数字和下划线！');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    if (email.length === 0) {
        showError('reg-email-error', '邮箱不能为空！');
        return false;
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('reg-email-error', '请输入有效的邮箱地址！');
        return false;
    }
    
    return true;
}

function validatePassword(password) {
    if (password.length === 0) {
        showError('reg-password-error', '密码不能为空！');
        return false;
    }
    
    if (password.length < 6) {
        showError('reg-password-error', '密码长度不能少于6个字符！');
        return false;
    }
    
    if (password.length > 30) {
        showError('reg-password-error', '密码长度不能超过30个字符！');
        return false;
    }
    
    // 验证密码强度（建议包含字母和数字）
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasLetter || !hasNumber) {
        showError('reg-password-error', '密码强度较弱，建议包含字母和数字！');
        // 仅警告，不阻止注册
    }
    
    return true;
}

function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword.length === 0) {
        showError('reg-confirm-password-error', '请确认密码！');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('reg-confirm-password-error', '两次输入的密码不一致！');
        return false;
    }
    
    return true;
}

function validatePhone(phone) {
    // 验证中国大陆手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showError('reg-phone-error', '请输入有效的手机号码！');
        return false;
    }
    
    return true;
}

function checkUserExists(username) {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    return username in registeredUsers;
}

function saveUser(username, password, email, phone) {
    // 获取现有用户
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    // 添加新用户（实际应用中应该对密码进行加密）
    registeredUsers[username] = password;
    
    // 保存用户信息
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // 保存额外信息（可选）
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    userInfo[username] = {
        email: email,
        phone: phone,
        registeredAt: new Date().toISOString()
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
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

// 重置表单时清除错误信息
document.getElementById('register-form').addEventListener('reset', function() {
    setTimeout(clearErrors, 0);
});

// 实时验证密码一致性
document.getElementById('reg-confirm-password').addEventListener('input', function() {
    const password = document.getElementById('reg-password').value;
    const confirmPassword = this.value;
    const errorElement = document.getElementById('reg-confirm-password-error');
    
    if (confirmPassword.length > 0 && password !== confirmPassword) {
        showError('reg-confirm-password-error', '两次输入的密码不一致！');
    } else {
        errorElement.style.display = 'none';
    }
});
