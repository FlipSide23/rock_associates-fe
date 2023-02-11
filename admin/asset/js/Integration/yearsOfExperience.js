const yearsOfExperience = document.getElementById("yearsOfExperience")
async function getExperience() {

    const getOptions = {
    
        method: 'GET',
        headers: {
        
         'auth-token': JSON.parse(localStorage.getItem('token'))
     
       },
    }



    let response = await fetch('https://rockassociates-api.herokuapp.com/getExperience', getOptions)
    const fetchAbout = await response.json();

    const experienceContent = fetchAbout.experienceContent

    yearsOfExperience.value = experienceContent.yearsOfExperience

}

getExperience()



// Edit about

const submitChangeRequest = document.getElementById("submitChangeRequest");
const popupBox = document.getElementById("popupBox")

submitChangeRequest.addEventListener("click", (event) =>{
    event.preventDefault();
    submitChangeRequest.value = "Loading..."
    updateExperience()
});

function updateExperience(){

        const data = {
            yearsOfExperience: yearsOfExperience.value
        }
 
    const sendData = {
        method: "PUT",
        body: JSON.stringify(data), 
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://rockassociates-api.herokuapp.com/updateExperience", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        popupBox.classList.add("open-popup")
        submitChangeRequest.value= "Edit Number"
    }

})
}

function closePopup(){
    popupBox.classList.remove("open-popup")
    history.go(0)
}

