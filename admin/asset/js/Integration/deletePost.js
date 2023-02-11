//popup
const popupBox = document.getElementById("popupBox")
const accessDeniedText = document.getElementById("accessDeniedText")
let postIdDeletion;

function openPopup(post_id){
    popupBox.classList.add("open-popup")
    localStorage.setItem("postIdDeletion", post_id)
    postIdDeletion = localStorage.getItem("postIdDeletion")
}
function closePopup(){
    popupBox.classList.remove("open-popup")
}


 
async function deletePost(){
    const getData = {
        method: "DELETE",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }
    
    let response = await fetch("https://rockassociates-api.herokuapp.com/deletePost/"+postIdDeletion, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (fetchedData.deletedPost){
      location = "viewAllPosts.html"   
    }

    else if (fetchedData.unauthorizedError){
        accessDeniedText.innerHTML = fetchedData.unauthorizedError;
        setTimeout(()=>{location = "viewAllPosts.html"}, 2500)   
    }
}


