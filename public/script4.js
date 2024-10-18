
// Update Profile
document.getElementById('updateProfileForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('updateMsg').innerText = 'You need to log in first!';
        return;
    }

    try {
        const res = await fetch('/api/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, email })
        });

        const data = await res.json();
        if (res.ok) {
            document.getElementById('updateMsg').innerText = 'Profile updated successfully!' + 
            ' \n Username: ' + data.name + ' \n Email: ' + data.email + "\n Please log in again with the new information";
        } else {
            document.getElementById('updateMsg').innerText = data.msg || 'Failed to update profile';
        }
    } catch (error) {
        document.getElementById('updateMsg').innerText = 'Error: ' + error.message;
    }
});
