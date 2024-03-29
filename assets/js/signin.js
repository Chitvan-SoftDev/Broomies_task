
signInForm.addEventListener("submit", () => {
    if (!email.value || !password.value) {
        error.style.display = 'block'
        success.style.display = 'none'
        error.innerText = "Please fill all the required fields."
    } else if (!isValidEmail(email.value.trim())) {
        error.style.display = 'block'
        success.style.display = 'none'
        error.innerText = "Enter a valid Email"
    } else {
        showSpinner()
        const signin = {

            email: email.value.trim(),
            password: password.value.trim(),

        }
        fetch("/api/signin", {
            method: "POST",
            body: JSON.stringify(signin),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => response.json())
            .then(data => {
                hideSpinner()

                if (data.status == "error") {
                    error.style.display = 'block'
                    error.innerText = data.error
                } else {
                    window.location = "/"
                }
            })
    }
})
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function showSpinner() {
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}



function hideSpinner() {
    document.querySelector('.spinner').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}