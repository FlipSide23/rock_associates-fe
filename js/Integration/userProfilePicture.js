// Updating user profile
let globalPreloader = document.getElementById("globalPreloaderIndex");
function UpdateUserProfile(){
    const file = document.getElementById("file"); 
    globalPreloader.classList.add("open-globalPreloader")  

    const reader =  new FileReader();
     reader.readAsDataURL(file.files[0])
     reader.addEventListener("load",()=>{
    const finalUserImage = reader.result

    const data = {
      imageLink: finalUserImage,
      ImagePresent: true
    }

    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://rockassociates-api.herokuapp.com/updateProfilePicture", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        globalPreloader.classList.remove("open-globalPreloader")  
        history.go(0)
    }
})

   })

}


async function deleteUserProfilePicture(){
    globalPreloader.classList.add("open-globalPreloader")
    const data = {
        imageLink: "https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg",
        ImagePresent: false
    }

    const sendData = {  
        method: "DELETE",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://rockassociates-api.herokuapp.com/deleteProfilePicture", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        history.go(0)
    }
})

   }

