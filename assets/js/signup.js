
signUpForm.addEventListener("submit", () => {
    if (!first_name.value || !last_name.value || !email.value || !username.value || !password.value || !confirm_password.value) {
        error.style.display = 'block'
        success.style.display = 'none'
        error.innerText = "Please fill all the required fields."
    } else if (password.value !== confirm_password.value) {
        error.style.display = 'block'
        success.style.display = 'none'
        error.innerText = "Password doesn't match."
    }
    else if(!isValidEmail(email.value.trim())){
        error.style.display = 'block'
        success.style.display = 'none'
        error.innerText = "Enter a valid Email"
    }
    else {
        const signup = {
            first_name: first_name.value.trim(),
            last_name: last_name.value.trim(),
            email: email.value.trim(),
            username: username.value.trim(),
            password: password.value.trim(),

        }
        fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(signup),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(data => {
                if (data.status == "error") {
                    error.style.display = 'block'
                    success.style.display = 'none'
                    error.innerText = data.error
                } else {
                    success.style.display = 'block'
                    error.style.display = 'none'
                    success.innerText = data.success

                }
            })
    }
})
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}