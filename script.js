/**
 * Christly Home - Authentication & Interactive Controller
 */

// Switch to Registration View
function showRegister() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const tabLogin = document.getElementById("tabLogin");
    const tabRegister = document.getElementById("tabRegister");

    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");

    if (tabLogin && tabRegister) {
        tabLogin.classList.remove("active");
        tabRegister.classList.add("active");
    }
    
    hideToast();
}

// Switch to Login View
function showLogin() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const tabLogin = document.getElementById("tabLogin");
    const tabRegister = document.getElementById("tabRegister");

    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");

    if (tabLogin && tabRegister) {
        tabRegister.classList.remove("active");
        tabLogin.classList.add("active");
    }
    
    hideToast();
}

// Show Toast Notification Banner
function showToast(message, type = "info") {
    const toast = document.getElementById("toastMessage");
    const toastText = document.getElementById("toastText");
    const toastIcon = document.getElementById("toastIcon");

    if (!toast || !toastText) {
        alert(message);
        return;
    }

    toast.className = `toast-message ${type}`;
    toastText.textContent = message;

    if (toastIcon) {
        if (type === "success") {
            toastIcon.className = "fa-solid fa-circle-check";
        } else if (type === "error") {
            toastIcon.className = "fa-solid fa-circle-exclamation";
        } else {
            toastIcon.className = "fa-solid fa-circle-info";
        }
    }

    toast.classList.remove("hidden");
}

function hideToast() {
    const toast = document.getElementById("toastMessage");
    if (toast) {
        toast.classList.add("hidden");
    }
}

// Password Visibility Toggle
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const icon = btn.querySelector("i");
    if (input.type === "password") {
        input.type = "text";
        if (icon) {
            icon.className = "fa-regular fa-eye-slash";
        }
    } else {
        input.type = "password";
        if (icon) {
            icon.className = "fa-regular fa-eye";
        }
    }
}

// Password Strength Checker
function checkPasswordStrength() {
    const password = document.getElementById("registerPassword")?.value || "";
    const strengthBar = document.getElementById("strengthBar");
    if (!strengthBar) return;

    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;

    strengthBar.style.width = strength + "%";

    if (strength <= 25) {
        strengthBar.style.backgroundColor = "#ef4444";
    } else if (strength <= 50) {
        strengthBar.style.backgroundColor = "#f59e0b";
    } else if (strength <= 75) {
        strengthBar.style.backgroundColor = "#3b82f6";
    } else {
        strengthBar.style.backgroundColor = "#10b981";
    }
}

// Shake animation for validation errors
function shakeElement(elemId) {
    const elem = document.getElementById(elemId);
    if (elem) {
        elem.classList.remove("shake-animation");
        void elem.offsetWidth; // trigger reflow
        elem.classList.add("shake-animation");
    }
}

// Registration Logic
function register() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("registerEmail").value.trim();
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let termsCheck = document.getElementById("termsCheck");

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        showToast("Please fill in all required fields", "error");
        shakeElement("registerForm");
        return;
    }

    if (!validateEmail(email)) {
        showToast("Please enter a valid email address", "error");
        shakeElement("registerForm");
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters long", "error");
        shakeElement("registerForm");
        return;
    }

    if (password !== confirmPassword) {
        showToast("Passwords do not match. Please verify.", "error");
        shakeElement("registerForm");
        return;
    }

    if (termsCheck && !termsCheck.checked) {
        showToast("Please agree to the Community Covenant", "error");
        shakeElement("registerForm");
        return;
    }

    showToast(`Welcome to Christly Home, ${name}! Registration successful.`, "success");
    
    // Auto transition to login after brief delay
    setTimeout(() => {
        showLogin();
        // Prefill login email
        const loginEmail = document.getElementById("loginEmail");
        if (loginEmail) loginEmail.value = email;
        showToast("Account created! Please sign in with your password.", "info");
    }, 1500);
}

// Login Logic
function login() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        showToast("Please enter your email and password", "error");
        shakeElement("loginForm");
        return;
    }

    if (!validateEmail(email)) {
        showToast("Please enter a valid email address", "error");
        shakeElement("loginForm");
        return;
    }

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.innerHTML = `<span>Signing in...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        loginBtn.disabled = true;
    }

    setTimeout(() => {
        if (loginBtn) {
            loginBtn.innerHTML = `<span>Sign In</span> <i class="fa-solid fa-arrow-right"></i>`;
            loginBtn.disabled = false;
        }
        showToast("Login Successful! Welcome back to Christly Home.", "success");
    }, 900);
}

// Email Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Extra Features for Demo
function forgotPassword() {
    const email = document.getElementById("loginEmail").value.trim();
    if (email) {
        showToast(`Password reset link sent to ${email}`, "info");
    } else {
        showToast("Please enter your email address first", "info");
        document.getElementById("loginEmail").focus();
    }
}

function socialLogin(provider) {
    showToast(`Connecting with ${provider}...`, "info");
    setTimeout(() => {
        showToast(`Signed in with ${provider} successfully!`, "success");
    }, 800);
}