// Creating a post

const submitProject = document.getElementById("submitProject");
const projectMessage = document.getElementById("projectMessage");

projectMessage.style.display = "none"

submitProject.addEventListener("click", (event) =>{
    event.preventDefault();
    projectMessage.style.display = "block"

    projectMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    createProject();
});


async function createProject(){
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
        projectMessage.innerHTML = "Please add a project image!"
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
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("http://localhost:5000/createProject", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        projectMessage.style.color = "green"
        projectMessage.innerHTML = fetchedData.successMessage
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
        projectMessage.innerHTML = "Something went wrong, we were unable to create this post!"
    }
})

    })
}