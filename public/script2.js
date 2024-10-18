// Login User
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            document.getElementById('loginMsg').innerText = 'Login successful!';
            localStorage.setItem('token', data.token);  // Save JWT token to local storage
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('loginMsg').innerText = data.msg || 'Login failed';
        }
    } catch (error) {
        document.getElementById('loginMsg').innerText = 'Error: ' + error.message;
    }
});