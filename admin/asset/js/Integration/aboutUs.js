const aboutUs = document.getElementById("aboutUs")
async function getAbout() {

    const getOptions = {
    
        method: 'GET',
        headers: {
        
         'auth-token': JSON.parse(localStorage.getItem('token'))
     
       },
    }



    let response = await fetch('https://rockassociates-api.herokuapp.com/getAbout', getOptions)
    const fetchAbout = await response.json();

    const aboutContent = fetchAbout.aboutContent

    aboutUs.innerHTML = aboutContent.about

}

getAbout()



// Edit about

const submitChangeRequest = document.getElementById("submitChangeRequest");
const popupBox = document.getElementById("popupBox")

submitChangeRequest.addEventListener("click", (event) =>{
    event.preventDefault();
    submitChangeRequest.value = "Loading..."
    updateAbout()
});

function updateAbout(){

        const data = {
            about: aboutUs.value
        }
 
    const sendData = {
        method: "PUT",
        body: JSON.stringify(data), 
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://rockassociates-api.herokuapp.com/updateAbout", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        popupBox.classList.add("open-popup")
        submitChangeRequest.value= "Edit About Text"
    }

})
}

function closePopup(){
    popupBox.classList.remove("open-popup")
    history.go(0)
}

