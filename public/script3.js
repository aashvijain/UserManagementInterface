
// View Profile
document.getElementById('viewProfileBtn').addEventListener('click', async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('profileInfo').innerText = 'You need to log in first!';
        return;
    }

    try {
        const res = await fetch('/api/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.ok) {
            document.getElementById('profileInfo').innerText = `Name: ${data.name}, Email: ${data.email}`;
        } else {
            document.getElementById('profileInfo').innerText = data.msg || 'Failed to fetch profile';
        }
    } catch (error) {
        document.getElementById('profileInfo').innerText = 'Error: ' + error.message;
    }
});
