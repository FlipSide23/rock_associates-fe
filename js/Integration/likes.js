// Post Likes
const postLike = document.getElementById("postLike");
const popupBoxLikes = document.getElementById("popupBoxLikes")

postLike.addEventListener("click", (event) =>{
    event.preventDefault(); 

    like();
});

function closePopupSingleBlog(){
    popupBoxLikes.classList.remove("open-popup")
}


function goToLogin(){
    location = "login.html"
}


async function like(){

    const post__id = (await postDetails()).postInfo._id

    const sendData = {
        method: "POST",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    fetch("http://localhost:5000/likePost/"+post__id, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

   if(fetchedData.invalidToken){
    popupBoxLikes.classList.add("open-popup")
   }
})

}