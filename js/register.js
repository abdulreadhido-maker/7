const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("full_name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("كلمتا المرور غير متطابقتين");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name,
                username,
                email,
                password
            })
        });

        const data = await response.json();

        alert(data.message);

        if (data.success) {
            window.location.href = "login.html";
        }

    } catch (error) {
        console.error(error);
        alert("تعذر الاتصال بالخادم، تأكد أن backend يعمل على المنفذ 3000.");
    }
});
