// Torrema JavaScript

console.log("مرحباً بك في Torrema");

// رسالة عند الضغط على زر ابدأ الآن
const heroButton = document.querySelector(".hero button");

if (heroButton) {
    heroButton.addEventListener("click", () => {
        alert("مرحباً بك في Torrema 🚀");
    });
}

// أزرار تسجيل الدخول وإنشاء الحساب
const loginBtn = document.querySelector(".login");
const registerBtn = document.querySelector(".register");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

if (registerBtn) {
    registerBtn.addEventListener("click", () => {
        window.location.href = "register.html";
    });
}

// تأثير بسيط على بطاقات الأقسام
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});

// تغيير لون الهيدر عند التمرير
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.background = "#000";
        header.style.boxShadow = "0 3px 10px rgba(0,0,0,.4)";
    } else {
        header.style.background = "#111";
        header.style.boxShadow = "none";
    }
});
