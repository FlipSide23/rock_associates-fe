const tokenAvailable = JSON.parse(localStorage.getItem("token"))
if (tokenAvailable){
    location = "index.html"
}

const resetPasswordForm = document.getElementById("resetPasswordForm");

const resetPasswordSubmitData = document.getElementById("resetPasswordSubmitData");

const resetPasswordMessage = document.getElementById("resetPasswordMessage");
resetPasswordMessage.style.display = "none";

resetPasswordSubmitData.addEventListener("click", (event) =>{
    event.preventDefault();
       
    resetPasswordSubmitData.innerHTML = `<img src="../../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    resetPassword();
});


function resetPassword(){
    
    const resetPassword = document.getElementById("resetPassword");
    const resetRepeatPassword = document.getElementById("resetRepeatPassword");

    const data = {
        password: resetPassword.value,
        repeatPassword: resetRepeatPassword.value
    }


    const sendData = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8', "auth_token": JSON.parse(localStorage.getItem("forgotPasswordToken"))})
    }

fetch("https://rockassociates-api.herokuapp.com/newPassword", sendData)
.then(response => response.json())
.then((newPasswordFetchedData)=>{
    console.log(newPasswordFetchedData)

    if (newPasswordFetchedData.tokenError){
        resetPasswordMessage.style.display = "block";
        resetPasswordMessage.style.color = "red"
        resetPasswordMessage.innerHTML = newPasswordFetchedData.tokenError
        resetPasswordSubmitData.innerHTML= "Reset Password"
    }

    else if (newPasswordFetchedData.newPasswordSuccess){
        resetPasswordMessage.style.display = "block";
        resetPasswordMessage.style.color = "green"
        resetPasswordSubmitData.innerHTML= "Reset Password"
        resetPasswordMessage.innerHTML = newPasswordFetchedData.newPasswordSuccess

        resetPasswordForm.reset()

        setTimeout(()=>{location="login.html"}, 2000)
    }

    else if(newPasswordFetchedData.validationError){
        resetPasswordMessage.style.display = "block";
        resetPasswordMessage.style.color = "red"
        resetPasswordSubmitData.innerHTML= "Reset Password"
        resetPasswordMessage.innerHTML = newPasswordFetchedData.validationError
    }

    else {
        resetPasswordMessage.style.display = "block";
        resetPasswordMessage.style.color = "red"
        resetPasswordSubmitData.innerHTML= "Reset Password"
        resetPasswordMessage.innerHTML = "Something went wrong, we were unable to reset your password!"
    }
})

}