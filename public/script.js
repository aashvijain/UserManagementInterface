// Register User
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const res = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            document.getElementById('registerMsg').innerText = 'Registration successful!';
        } else {
            document.getElementById('registerMsg').innerText = data.msg || 'Registration failed';
        }
    } catch (error) {
        document.getElementById('registerMsg').innerText = 'Error: ' + error.message;
    }
});


