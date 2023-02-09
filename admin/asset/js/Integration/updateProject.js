
const url = new URL(window.location.href);
const slug = url.searchParams.get('slug');   

async function getProjectDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }
    
    let response = await fetch(`http://localhost:5000/getSingleProject?slug=${slug}`, getData)
    console.log(response)
    const fetchedData = await response.json() 

    const singleProject = fetchedData.fetchedProject

    const projectImageDisplay = document.getElementById("projectImageDisplay")
    projectImageDisplay.src = singleProject.projectImage

    const projectTitle = document.getElementById("projectTitle")
    projectTitle.value = singleProject.title

    const projectDescription = document.getElementById("projectDescription")
    projectDescription.value = singleProject.description

    const projectCategory = document.getElementById("projectCategory")
    projectCategory.value = singleProject.category

    const projectEmployer = document.getElementById("projectEmployer")
    projectEmployer.value = singleProject.employer

    const projectYear = document.getElementById("projectYear")
    projectYear.value = singleProject.year

    const projectLocation = document.getElementById("projectLocation")
    projectLocation.value = singleProject.location

    const projectClient = document.getElementById("projectClient")
    projectClient.value = singleProject.client

    const projectActivities = document.getElementById("projectActivities")
    projectActivities.value = singleProject.activitiesPerformed

    const projectResult = document.getElementById("projectResult")
    projectResult.value = singleProject.result
}
getProjectDetails()


// Update Project

const submitProject = document.getElementById("submitProject");
const projectMessage = document.getElementById("projectMessage");

projectMessage.style.display = "none"

submitProject.addEventListener("click", (event) =>{
    event.preventDefault();
    projectMessage.style.display = "block"

    projectMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    updateProject();
});


async function updateProject(){
    const projectImage = document.getElementById("projectImage");
    const projectTitle = document.getElementById("projectTitle");
    const projectDescription = document.getElementById("projectDescription");
    const projectCategory = document.getElementById("projectCategory");
    const projectEmployer = document.getElementById("projectEmployer");
    const projectYear = document.getElementById("projectYear");
    const projectLocation = document.getElementById("projectLocation");
    const projectClient = document.getElementById("projectClient");
    const projectActivities = document.getElementById("projectActivities");
    const projectResult = document.getElementById("projectResult");

    if (!projectImage.files[0]) {
        projectMessage.style.color = "red"
        projectMessage.innerHTML = "Please add a project image or confirm the above one to be able to update a post!"
        return;
      }
    
    const reader =  new FileReader();
     reader.readAsDataURL(projectImage.files[0])
     reader.addEventListener("load",()=>{
    const finalProjectImage = reader.result

    const data = {
        title: projectTitle.value, 
        description: projectDescription.value, 
        category: projectCategory.options[projectCategory.selectedIndex].text, 
        employer: projectEmployer.value, 
        year: projectYear.value, 
        location: projectLocation.value, 
        client: projectClient.value, 
        activitiesPerformed: projectActivities.value, 
        result: projectResult.value,
        projectImage: finalProjectImage,
    }
        

    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch(`http://localhost:5000/updateProject?slug=${slug}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.projectUpdateSuccess){
        projectMessage.style.color = "green"
        projectMessage.innerHTML = fetchedData.projectUpdateSuccess
        location = "manageProjects.html"
    }

    else if (fetchedData.validationError){
        projectMessage.style.color = "red"
        projectMessage.innerHTML = fetchedData.validationError
    }

    else if (fetchedData.duplicationError){
        projectMessage.style.color = "red"
        projectMessage.innerHTML = fetchedData.duplicationError
    }

    else{
        projectMessage.style.color = "red"
        projectMessage.innerHTML = "Something went wrong, we were unable to create this Project!"
    }
})

    })
}