// Creating a post

const submitRequest = document.getElementById("submitRequest");
const addStaffMessage = document.getElementById("addStaffMessage");

addStaffMessage.style.display = "none"

submitRequest.addEventListener("click", (event) =>{
    event.preventDefault();
    addStaffMessage.style.display = "block"

    addStaffMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    addMember();
});


async function addMember(){
    const image = document.getElementById("image");
    const position = document.getElementById("position");
    const names = document.getElementById("names");

    if (!image.files[0]) {
        addStaffMessage.style.color = "red"
        addStaffMessage.innerHTML = "Please add an image!"
        return;
      }
    
    const reader =  new FileReader();
     reader.readAsDataURL(image.files[0])
     reader.addEventListener("load",()=>{
    const finalImage = reader.result

    const data = {
        position: position.value, 
        name: names.value,
        image: finalImage,
    }    

    const sendData = {  
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://rockassociates.cyclic.app/addMember", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        addStaffMessage.style.color = "green"
        addStaffMessage.innerHTML = fetchedData.successMessage
        // location = "viewAllPosts.html"
    }

    else if (fetchedData.validationError){
        addStaffMessage.style.color = "red"
        addStaffMessage.innerHTML = fetchedData.validationError
    }

    else{
        addStaffMessage.style.color = "red"
        addStaffMessage.innerHTML = "Something went wrong, we were unable to add this staff member!"
    }
})

    })
}