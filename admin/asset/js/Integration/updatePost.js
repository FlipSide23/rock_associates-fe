async function getSinglePost(post_id){
    document.title = "Loading..."
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
    
    let response = await fetch("https://ernestruzindana-be.cyclic.app/getSinglePost/"+post_id, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (fetchedData.fetchedPost){
        localStorage.setItem("post_id", fetchedData.fetchedPost._id)
        localStorage.setItem("postBody", fetchedData.fetchedPost.postBody)
        location = "updatePost"
    }
}



// Getting a post

function hideupdatePostLoader(){
    updatePost_preloader.classList.remove("show")
}


const post_id = localStorage.getItem("post_id")

async function getPostDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
    
    let response = await fetch("https://ernestruzindana-be.cyclic.app/getSinglePost/"+post_id, getData)
    console.log(response)
    const fetchedData = await response.json()
    hideupdatePostLoader()
    document.title = "Rock Associates Company Ltd | Dashboard"

    const singlePost = fetchedData.fetchedPost

    const updatePostImage = document.getElementById("updatePostImage")
    updatePostImage.src = singlePost.postImage
    
    const updateHeaderImage = document.getElementById("updateHeaderImage")
    updateHeaderImage.src = singlePost.headerImage

    const postTitleDetails = document.getElementById("postTitleDetails")
    postTitleDetails.value = singlePost.title

    const postBodyDetails = document.getElementById("updatePost")
    postBodyDetails.innerHTML = singlePost.postBody
}
getPostDetails()

const getBody = localStorage.getItem("postBody");





// Updating Post
const submitBlog = document.getElementById("submitBlog");
const blogMessage = document.getElementById("blogMessage");

blogMessage.style.display = "none"

submitBlog.addEventListener("click", (event) =>{
    event.preventDefault();
    blogMessage.style.display = "block"

    blogMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    UpdatePost();
});


function UpdatePost(){
    const postImage = document.getElementById("postImage");
    const headerImage = document.getElementById("headerImage");
    const postTitleDetails = document.getElementById("postTitleDetails");
    const summernote = document.getElementById("updatePost");
    

    if (!postImage.files[0]) {
        blogMessage.style.color = "red"
        blogMessage.innerHTML = "Please add a new post image or confirm the previous one to be able to edit a post!"
        return;
      }

      if (!headerImage.files[0]) {
        blogMessage.style.color = "red"
        blogMessage.innerHTML = "Please add a new header image or confirm the previous one to be able to edit a post!"
        return;
    }

    const reader =  new FileReader();
     reader.readAsDataURL(postImage.files[0])
     reader.addEventListener("load",()=>{
        const finalPostImage = reader.result

    const reader2 =  new FileReader();
     reader2.readAsDataURL(headerImage.files[0])
     reader2.addEventListener("load",()=>{
        const finalHeaderImage = reader2.result

    const data = {
        title: postTitleDetails.value, 
        postBody: summernote.innerHTML,
        postImage: finalPostImage,
        headerImage: finalHeaderImage,
    }
        

    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://ernestruzindana-be.cyclic.app/updatePost/"+post_id, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.postUpdateSuccess){
        blogMessage.style.color = "green"
        blogMessage.innerHTML = fetchedData.postUpdateSuccess

        const updatePostImage = document.getElementById("updatePostImage");
        updatePostImage.src = fetchedData.updatedPost.postImage


        const updateHeaderImage = document.getElementById("updateHeaderImage");
        updateHeaderImage.src = fetchedData.updatedPost.headerImage

        setTimeout(()=>{location = "viewAllPosts"}, 2000)
    }

    else if(fetchedData.postUpdateError){
        blogMessage.style.color = "red"
        blogMessage.innerHTML = fetchedData.postUpdateError
    }

    else{
        blogMessage.style.color = "red"
        blogMessage.innerHTML = fetchedData.message 
    }
  
      })
    })
  })
}




// functioning the update text editor to be able to update post
var colorPalette = ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'];
var forePalette = $('.fore-palette');
var backPalette = $('.back-palette');

for (var i = 0; i < colorPalette.length; i++) {
  forePalette.append('<a href="#" data-command="forecolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
  backPalette.append('<a href="#" data-command="backcolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
}

$('.toolbar a').click(function(e) {
  var command = $(this).data('command');
  if (command == 'h1' || command == 'h2' || command == 'p') {
    document.execCommand('formatBlock', false, command)
  }
  if (command == 'forecolor' || command == 'backcolor') {
    document.execCommand($(this).data('command'), false, $(this).data('value'))
  }
    if (command == 'createlink' || command == 'insertimage') {
  url = prompt('Enter the link here: ','http:\/\/'); document.execCommand($(this).data('command'), false, url);
  }
  document.execCommand($(this).data('command'), false, null)
});



    





