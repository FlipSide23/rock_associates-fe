


async function manageProjects(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllProjects", getData)
    const fetchedData = await response.json()

    const projects = fetchedData.allAvailableProjects;

    for(let i=0; i<projects.length; i++){
        const projectArray = projects[i];

        const title = projectArray.title;
        const description = projectArray.description.slice(0, 600)+"...";
        const image = projectArray.projectImage;
        const slug = projectArray.slug;
        const project_id = projectArray._id;
    
        const allProjectsContainer = document.getElementById("allProjectsContainer");
        
        const projectTemplate = `
                <div class="blogBoxes blogBox1">
                    <div class="blogImage">
                        <img src="${image}" alt="" >
                    </div>
                    <div class="blogContent">
                        <h3> <a style="cursor: pointer; font-family: poppins;">${title}</a> </h3>
                        <hr>
                        <p class="ContentSection" style="font-family: calibri;">
                            ${description}
                        </p>

                        
                        
                        <button style="background: #28a745; border-color: #28a745; color: white; font-weight: bold;"><a style="color: white;" href="updateProject.html?slug=${slug}">Update Project</a></button> &nbsp;
                        <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${project_id}')">Delete Project</button>
                    </div>
                </div>
        `
        
        allProjectsContainer.innerHTML += projectTemplate
    }
}


manageProjects()



//popup
const popupBox = document.getElementById("popupBox")
let projectIdDeletion;

function openPopup(project_id){
    popupBox.classList.add("open-popup")
    localStorage.setItem("projectIdDeletion", project_id)
    projectIdDeletion = localStorage.getItem("projectIdDeletion")
}
function closePopup(){
    popupBox.classList.remove("open-popup")
}


 
async function deleteProject(){
    const getData = {
        method: "DELETE",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }
    
    let response = await fetch("http://localhost:5000/deleteProject/"+projectIdDeletion, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (fetchedData.deletedProject){
      location = "manageProjects.html"   
    }

}



