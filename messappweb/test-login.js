process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function testLogin(email, password) {
    try {
        const res = await fetch("https://localhost:7137/api/Auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json().catch(() => null);
        return { status: res.status, data };
    } catch (e) {
        return { status: 500, error: e.message };
    }
}

async function run() {
    const adminRes = await testLogin("admin@gmail.com", "admin@123");
    console.log("Admin Login:", adminRes.status);
    
    if (adminRes.status === 200) {
        const token = adminRes.data.token;
        
        // Fetch users
        const usersRes = await fetch("https://localhost:7137/api/Users", {
            headers: { "Authorization": "Bearer " + token }
        });
        
        const users = await usersRes.json();
        const test4 = users.find(u => u.email === "test2@gmail.com");
        console.log("Found test4:", test4);
        
        if (!test4) {
            console.log("Creating test4 user...");
            const createRes = await fetch("https://localhost:7137/api/Users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    name: "Test User 4",
                    email: "test2@gmail.com",
                    password: "test2@123",
                    passwordHash: "test2@123",
                    roleId: 2, // 2 is probably user?
                    phoneNumber: "1234567894"
                })
            });
            console.log("Create user status:", createRes.status);
            const createData = await createRes.text();
            console.log("Create user data:", createData);
        }
    }
}
run();
