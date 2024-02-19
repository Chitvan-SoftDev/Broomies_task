showSpinner()
fetch('/api/userDetails', { method: "get" })
    .then(response => response.json())
    .then(data => {
        hideSpinner()

        if (data.status != "error" && data.user) {
            
            document.getElementById('name').textContent = data.user.first_name + " " + data.user.last_name;
            document.getElementById('email').textContent = data.user.email;
            document.getElementById('username').textContent = data.user.username;


        } else {
            console.error('User data not available');
        }
    })
    .catch(error => {
        hideSpinner()

        console.error('Error fetching user data:', error);
    });
function showSpinner() {
    document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner() {
    document.querySelector('.spinner').style.display = 'none';
}