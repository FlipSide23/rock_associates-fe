async function manageServices(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllServices", getData)
    const fetchedData = await response.json()
    const services = fetchedData.allServices;

    for(let i=0; i<services.length; i++){
        const serviceArray = services[i];

        const service_id = serviceArray._id;
        const title = serviceArray.serviceTitle;
        const description = serviceArray.serviceDescription.slice(0, 600)+"...";


        const manageServices = document.getElementById("manageServices");
        
        const serviceTemplate = `
                <div class="serviceBoxes">
                    <div class="blogContent">
                        <h3> <a style="cursor: pointer; font-family: poppins;">${title}</a> </h3>
                        <hr>
                        <p class="ContentSection" style="font-family: calibri;">
                            ${description}
                        </p>

                        <button style="background: #cba10a; border-color: #cba10a; color: white; font-weight: bold;"><a href="updateService.html?serviceId=${service_id}">Update Service</a> </button> &nbsp;
                        <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${service_id}')">Delete Service</button>
                    </div>
                </div>
        `
        
        manageServices.innerHTML += serviceTemplate
    }
}


manageServices()


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

    let response = await fetch(`http://localhost:5000/deleteService?serviceId=${serviceIdDeletion}`, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.successMessage){ 
            location= "manageServices.html"
        }
    
}