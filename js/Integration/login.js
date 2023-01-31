const loginForm = document.getElementById("loginForm");
const user_email = document.getElementById("email");
const user_password = document.getElementById("password");
const submit = document.getElementById("submit");
const loginMessage = document.getElementById("loginMessage");


loginMessage.style.display = "none"

// const MyToken = JSON.parse(sessionStorage.getItem("token"))
// if (MyToken){
//     location = "../index"
// }

submit.addEventListener("click", (event)=>{
    event.preventDefault();
    submit.innerHTML = `<img src="../../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    login();
});

function login(){
    const data = {
        email: user_email.value,
        password: user_password.value
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

    const cookies = document.cookie;
    console.log(cookies);

    fetch("https://rockassociates.cyclic.app/loginUser", sendData)
    .then(response => response.json())
    .then((fetchedData)=>{
        console.log(fetchedData)
    
        if (fetchedData.invalidEmail){
            loginMessage.style.display = "block";
            loginMessage.style.color = "red"
            loginMessage.innerHTML = fetchedData.invalidEmail
            submit.innerHTML = "Login"
        }

        else if (fetchedData.invalidPassword){
            loginMessage.style.display = "block";
            loginMessage.style.color = "red"
            loginMessage.innerHTML = fetchedData.invalidPassword
            submit.innerHTML = "Login"
        }

        else if (fetchedData.successMessage){
            localStorage.setItem("token", JSON.stringify(fetchedData.Access_Token))
            location = "index.html"
        }

        else{
            loginMessage.style.display = "block";
            loginMessage.style.color = "red"
            loginMessage.innerHTML = "Something went wrong, we were unable to register this account!"
            submit.innerHTML = "Login"
        }

    })

}