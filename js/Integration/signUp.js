
const signupForm = document.getElementById("signupForm");

const submitData = document.getElementById("submitData");

const signupMessage = document.getElementById("signupMessage");
signupMessage.style.display = "none";

submitData.addEventListener("click", (event) =>{
    event.preventDefault(); 
    submitData.style.textAlign = "center" 
    submitData.innerHTML = `<img src="../../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    singup();
});


function singup(){
    const first_name = document.getElementById("firstName");
    const last_name = document.getElementById("lastName");
    const user_email = document.getElementById("email");
    const user_password = document.getElementById("password");
    const user_repeatPassword = document.getElementById("repeatPassword");

    const data = {
        firstName: first_name.value, 
        lastName: last_name.value,
        email: user_email.value,
        password: user_password.value,
        repeatPassword: user_repeatPassword.value
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("http://localhost:5000/createUser", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.message){
        signupMessage.style.display = "block"; 
        signupMessage.style.color = "red"
        signupMessage.innerHTML = fetchedData.message
        submitData.innerHTML = "Create an account"
    }

    else if (fetchedData.successMessage){
        signupMessage.style.display = "block"; 
        signupMessage.style.color = "green"
        signupMessage.innerHTML = fetchedData.successMessage
        submitData.innerHTML = "Create an account"
        signupForm.reset()
        setTimeout(()=>{location = "login.html"}, 3000)
    }

    else if (fetchedData.validationError){
        signupMessage.style.display = "block"; 
        signupMessage.style.color = "red"
        signupMessage.innerHTML = fetchedData.validationError
        submitData.innerHTML = "Create an account"
    }

    else {
        signupMessage.style.display = "block"; 
        signupMessage.style.color = "red"
        signupMessage.innerHTML = "Something went wrong, we were unable to register this account!"
        submitData.innerHTML = "Create an account"
    }
})

}