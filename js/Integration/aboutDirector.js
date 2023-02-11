const popupBoxDirector = document.getElementById("popupBoxDirector")
const popupBoxSuccess = document.getElementById("popupBoxSuccess")
const sendEmailToDirector = document.getElementById("sendEmailToDirector")
const emailBody = document.getElementById("emailBody");

function openPopupDirector(){
    popupBoxDirector.classList.add("open-popupResult")
}

function closePopupDirector(){
    popupBoxDirector.classList.remove("open-popupResult")
}


sendEmailToDirector.addEventListener("click", (event) =>{
    event.preventDefault();

    sendEmailToDirector.innerHTML = `<img align-self: center;" src="../../images/icons/Spinner.gif" alt="Loading..." width="30px" height="30px"> Send Email`

    emailDirector();
});


async function emailDirector(){

    const data = {
        emailToDirector: emailBody.value
    }    

    const sendData = {  
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://rockassociates-api.herokuapp.com/emailDirector", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        popupBoxSuccess.classList.add("open-popup")
        sendEmailToDirector.innerHTML= "Send Email"
    }

})


}


function closePopupSuccess(){
    popupBoxSuccess.classList.remove("open-popup")
    popupBoxDirector.classList.remove("open-popupResult")
    emailBody.value = ""
}