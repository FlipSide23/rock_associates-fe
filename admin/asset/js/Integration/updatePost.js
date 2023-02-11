const url = new URL(window.location.href);
const slug = url.searchParams.get('slug');   

async function getPostDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }
    
    let response = await fetch(`https://rockassociates-api.herokuapp.com/getSinglePost?slug=${slug}`, getData)
    console.log(response)
    const fetchedData = await response.json() 

    const singlePost = fetchedData.fetchedPost

    const updatePostImage = document.getElementById("updatePostImage")
    updatePostImage.src = singlePost.postImage

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

    blogMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    UpdatePost();
});


function UpdatePost(){
    const postImage = document.getElementById("postImage");
    const postTitleDetails = document.getElementById("postTitleDetails");
    const summernote = document.getElementById("updatePost");
    

    if (!postImage.files[0]) {
        blogMessage.style.color = "red"
        blogMessage.innerHTML = "Please add a new post image or confirm the previous one to be able to edit a post!"
        return;
      }

    const reader =  new FileReader();
     reader.readAsDataURL(postImage.files[0])
     reader.addEventListener("load",()=>{
        const finalPostImage = reader.result

    const data = {
        title: postTitleDetails.value, 
        postBody: summernote.innerHTML,
        postImage: finalPostImage
    }
        

    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch(`https://rockassociates-api.herokuapp.com/updatePost?slug=${slug}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.postUpdateSuccess){
        blogMessage.style.color = "green"
        blogMessage.innerHTML = fetchedData.postUpdateSuccess

        const updatePostImage = document.getElementById("updatePostImage");
        updatePostImage.src = fetchedData.updatedPost.postImage

        setTimeout(()=>{location = "viewAllPosts.html"}, 2000)
    }

    else if(fetchedData.unauthorizedError){
        blogMessage.style.color = "red"
        blogMessage.innerHTML = fetchedData.unauthorizedError
    }

    else if(fetchedData.postUpdateError){
        blogMessage.style.color = "red"
        blogMessage.innerHTML = fetchedData.postUpdateError
    }

    else{
        blogMessage.style.color = "red"
        blogMessage.innerHTML = "Something went wrong, we were unable to update this post!"
    }
  
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



    





