const manageServices = document.getElementById("manageServices");
async function manageServicesFunction(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("https://rockassociates-api.herokuapp.com/getAllServices", getData)
    const fetchedData = await response.json()
    const services = fetchedData.allServices;

    if(services.length === 0){
        manageServices.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Services found!
            </div>
        
        `
    }

    else{

    for(let i=0; i<services.length; i++){
        const serviceArray = services[i];

        const service_id = serviceArray._id;
        const title = serviceArray.serviceTitle;
        const description = serviceArray.serviceDescription.slice(0, 600)+"...";

        
        const serviceTemplate = `
                <div class="serviceBoxes">
                    <div class="blogContent">
                        <h3> <a style="cursor: pointer; font-family: poppins;">${title}</a> </h3>
                        <hr>
                        <p class="ContentSection" style="font-family: calibri;">
                            ${description}
                        </p>

                        <button style="background: #28a745; border-color: #28a745; color: white; font-weight: bold;"><a style="color: white;" href="updateService.html?serviceId=${service_id}">Update Service</a> </button> &nbsp;
                        <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${service_id}')">Delete Service</button>
                    </div>
                </div>
        `
        
        manageServices.innerHTML += serviceTemplate
    }

}
}


manageServicesFunction()


//popup
const popupBox = document.getElementById("popupBox")
let serviceIdDeletion;

function openPopup(service_id){
    popupBox.classList.add("open-popup")
    localStorage.setItem("serviceIdDeletion", service_id)
    serviceIdDeletion = localStorage.getItem("serviceIdDeletion")
}
function closePopup(){
    popupBox.classList.remove("open-popup")
}

// Delete member

let deleteService= async() => {
    const deleteOptions = {
    
        method: 'DELETE',
        headers: {   
         'auth-token': JSON.parse(localStorage.getItem('token'))
     
       },
    }

    let response = await fetch(`https://rockassociates-api.herokuapp.com/deleteService?serviceId=${serviceIdDeletion}`, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.successMessage){ 
            location= "manageServices.html"
        }
    
}