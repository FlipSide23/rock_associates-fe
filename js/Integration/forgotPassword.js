
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

const forgotPasswordSubmitData = document.getElementById("forgotPasswordSubmitData");

const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");
forgotPasswordMessage.style.display = "none";

forgotPasswordSubmitData.addEventListener("click", (event) =>{
    event.preventDefault();

    forgotPasswordSubmitData.innerHTML = `<img src="../../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    forgotPassword();
});


function forgotPassword(){
    
    const forgotPasswordEmail = document.getElementById("forgotPasswordEmail");

    const data = {
        email: forgotPasswordEmail.value,
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("http://localhost:5000/forgotPassword", sendData)
.then(response => response.json())
.then((forgotPasswordFetchedData)=>{
    console.log(forgotPasswordFetchedData)

    if (forgotPasswordFetchedData.invalidEmail){
        forgotPasswordMessage.style.display = "block";   
        forgotPasswordMessage.style.color = "red"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.invalidEmail
        forgotPasswordSubmitData.innerHTML= "Reset Password"
    }

    else if (forgotPasswordFetchedData.resetSuccess){
        forgotPasswordMessage.style.display = "block";   
        forgotPasswordMessage.style.color = "green"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.resetSuccess
        forgotPasswordSubmitData.innerHTML= "Reset Password"
        localStorage.setItem("token", JSON.stringify(forgotPasswordFetchedData.forgotPasswordResetToken))

        setTimeout(()=>{forgotPasswordForm.reset()}, 2000)
    }

    else if (forgotPasswordFetchedData.unverifiedEmail){
        forgotPasswordMessage.style.display = "block";   
        forgotPasswordMessage.style.color = "red"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.unverifiedEmail
        forgotPasswordSubmitData.innerHTML= "Reset Password"
    }

    else if(forgotPasswordFetchedData.validationError){
        forgotPasswordMessage.style.display = "block";   
        forgotPasswordMessage.style.color = "red"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.validationError
        forgotPasswordSubmitData.innerHTML= "Reset Password"
    }

    else {
        forgotPasswordMessage.style.display = "block";   
        forgotPasswordMessage.style.color = "red"
        forgotPasswordMessage.innerHTML = forgotPasswordFetchedData.errorMessage
        forgotPasswordSubmitData.innerHTML= "Reset Password"
    }
})

}