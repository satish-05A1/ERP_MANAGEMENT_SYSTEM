const loggedInUser =
JSON.parse(
    localStorage.getItem("loggedInUser")
);
if(!loggedInUser){
    const currentPage = window.location.pathname;
    if(!currentPage.includes("login.html") && !currentPage.includes("register.html")){
        window.location.href =
        "../../modules/users/login.html";
    }
}

function register() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (!username || !email || !password) {
        alert("Please fill all fields");
        return;
    }
    
    fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            role: "USER"
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Registration failed");
        }
        return response.json();
    })
    .then(data => {
        alert("User registered successfully! Please login.");
        window.location.href = "login.html";
    })
    .catch(error => {
        alert("Registration failed: " + error.message);
        console.log(error);
    });
}
