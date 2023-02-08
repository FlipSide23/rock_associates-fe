// Add a staff member

const submitCreateRequest = document.getElementById("submitCreateRequest");
const addServiceMessage = document.getElementById("addServiceMessage");

addServiceMessage.style.display = "none"

submitCreateRequest.addEventListener("click", (event) =>{
    event.preventDefault();
    addServiceMessage.style.display = "block"

    addServiceMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    addService();
});


async function addService(){
    const serviceTitle = document.getElementById("serviceTitle");
    const serviceDescription = document.getElementById("serviceDescription");

    const data = {
        serviceTitle: serviceTitle.value, 
        serviceDescription: serviceDescription.value,
    }    

    const sendData = {  
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("http://localhost:5000/addService", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        addServiceMessage.style.color = "green"
        addServiceMessage.innerHTML = fetchedData.successMessage
        setTimeout(()=>{location = "manageServices.html"}, 2000)
    }

    else if (fetchedData.validationError){
        addServiceMessage.style.color = "red"
        addServiceMessage.innerHTML = fetchedData.validationError
    }

    else{
        addServiceMessage.style.color = "red"
        addServiceMessage.innerHTML = "Something went wrong, we were unable to create this service!"
    }

    })
}