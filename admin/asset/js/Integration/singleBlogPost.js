async function getSinglePost(postId){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/getSinglePost/"+postId, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)


    if (fetchedData.fetchedPost){
        location = "singleBlog"
        localStorage.setItem("postId", fetchedData.fetchedPost._id)
    }
}


const postId = localStorage.getItem("postId")

async function postDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://ernestruzindana-be.cyclic.app/getSinglePost/"+postId, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const singlePost = fetchedData.fetchedPost;

    const singleBlogTitle = document.getElementById("singleBlogTitle")
    singleBlogTitle.innerHTML = singlePost.title

    const singleBlogContentParagraph = document.getElementById("singleBlogContentParagraph")
    singleBlogContentParagraph.innerHTML = singlePost.postBody

    const headerPictureSource = document.getElementById("headerPictureSource")
    headerPictureSource.src = singlePost.headerImage
}

postDetails()


