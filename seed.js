const main = async () => {
    try {
        console.log('Seeding Admin User...');
        const email = 'admin@ordersphere.com';
        const password = 'password123';

        const regRes = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name: 'Admin User' })
        });

        const data = await regRes.json();

        if (regRes.status === 201) {
            console.log('SUCCESS: User created.');
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        } else if (regRes.status === 409) {
            console.log('User already exists. You can log in with:');
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        } else {
            console.error('Failed to seed user:', data);
        }

    } catch (e) {
        console.error('Seed Failed:', e);
    }
};
main();
