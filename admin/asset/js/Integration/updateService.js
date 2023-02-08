const url = new URL(window.location.href);
const serviceId = url.searchParams.get('serviceId');

async function ServiceDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch(`http://localhost:5000/getSingleService?serviceId=${serviceId}`, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const singleService = fetchedData.singleService;

    const serviceTitle = document.getElementById("serviceTitle")
    serviceTitle.value = singleService.serviceTitle

    const serviceDescription = document.getElementById("serviceDescription")
    serviceDescription.value = singleService.serviceDescription

}

ServiceDetails()



// Update Service

const updateService = document.getElementById("updateService");
const updateServiceMessage = document.getElementById("updateServiceMessage");

updateServiceMessage.style.display = "none"

updateService.addEventListener("click", (event) =>{
    event.preventDefault();
    updateServiceMessage.style.display = "block"

    updateServiceMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    updateServices();
});


async function updateServices(){
    const serviceDescription = document.getElementById("serviceDescription");
    const serviceTitle = document.getElementById("serviceTitle");

    const data = {
        serviceDescription: serviceDescription.value, 
        serviceTitle: serviceTitle.value,
    }    

    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch(`http://localhost:5000/updateService?serviceId=${serviceId}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        updateServiceMessage.style.color = "green"
        updateServiceMessage.innerHTML = fetchedData.successMessage
        setTimeout(()=>{location = "manageServices.html"}, 2000)
    }

    else if (fetchedData.validationError){
        updateServiceMessage.style.color = "red"
        updateServiceMessage.innerHTML = fetchedData.validationError
    }

    else{
        updateServiceMessage.style.color = "red"
        updateServiceMessage.innerHTML = "Something went wrong, we were unable to add this staff Service!"
    }

    })
}


