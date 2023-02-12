// Post Likes
const popupBoxLikes = document.getElementById("popupBoxLikes")
const postLike = document.getElementById("postLike");
const popupBoxCommentLikes = document.getElementById("popupBoxCommentLikes")

postLike.addEventListener("click", (event) =>{
    event.preventDefault(); 

    like();
});

function closePopupSingleBlog(){
    popupBoxLikes.classList.remove("open-popup")
}

function closePopupCommentLikes(){
    popupBoxCommentLikes.classList.remove("open-popup")
}


function goToLogin(){
    location = "login"
}


async function like(){
    const post__id = localStorage.getItem("postId")

    const sendData = {
        method: "POST",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    fetch("https://rockassociates-api.herokuapp.com/likePost/"+post__id, sendData)
    .then(response => response.json())
    .then((fetchedData)=>{
        console.log(fetchedData)

    if(fetchedData.invalidToken){
        popupBoxLikes.classList.add("open-popup")
    }
    })   

}

async function likeComment(commentId){

    const sendData = {
        method: "POST",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    fetch("https://rockassociates-api.herokuapp.com/likeComment/"+commentId, sendData)
    .then(response => response.json())
    .then((fetchedData)=>{
        console.log(fetchedData)

    if(fetchedData.invalidToken){
        popupBoxCommentLikes.classList.add("open-popup")
    }
    })   

}






