// Updating user profile

function UpdateUserProfile(){
    const file = document.getElementById("file"); 
    let globalPreloader = document.getElementById("globalPreloaderIndex"); 
    globalPreloader.classList.add("open-globalPreloader")  

    const reader =  new FileReader();
     reader.readAsDataURL(file.files[0])
     reader.addEventListener("load",()=>{
    const finalUserImage = reader.result

    const data = {
      imageLink: finalUserImage
    }

    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://rockassociates.cyclic.app/updateProfilePicture", sendData)
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

    const sendData = {  
        method: "PUT",
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token"))})
    }

fetch("https://rockassociates.cyclic.app/deleteProfilePicture", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        // history.go(0)
    }
})

   }

