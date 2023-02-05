// Email Subscribers

const submitRequest = document.getElementById("submitRequest");
const popupBoxUsers = document.getElementById("popupBoxUsers")

function closePopupUsers(){
    popupBoxUsers.classList.remove("open-popup")
    history.go(0)
}

submitRequest.addEventListener("click", (event) =>{
    event.preventDefault();

    submitRequest.value = "Loading..."

    emailSubscribers();
});


async function emailSubscribers(){
    const emailBody = document.getElementById("emailBody");

    const data = {
        emailBody: emailBody.value
    }    

    const sendData = {  
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("http://localhost:5000/emailRegisteredUsers", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        popupBoxUsers.classList.add("open-popup")
        submitRequest.value= "Send Email"
    }

})


}