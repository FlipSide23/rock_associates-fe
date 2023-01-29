//popup
const popupBox = document.getElementById("popupBox")
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
    document.title = "Loading..."
    const getData = {
        method: "DELETE",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
    
    let response = await fetch("https://ernestruzindana-be.cyclic.app/deletePost/"+postIdDeletion, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (fetchedData.deletedPost){
      location = "viewAllPosts"   
    }
}


