
const url = new URL(window.location.href);
const slug = url.searchParams.get('slug');
let totalPosts;

async function postDetails(){ 

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch(`http://localhost:5000/getSinglePost?slug=${slug}`, getData)
    const fetchedData = await response.json() 
    const singlePost = fetchedData.fetchedPost;

    localStorage.setItem("postId", singlePost._id)

    const singleBlogTitle = document.getElementById("singleBlogTitle")
    singleBlogTitle.innerHTML = singlePost.title

    const singleBlogContentParagraph = document.getElementById("singleBlogContentParagraph")
    singleBlogContentParagraph.innerHTML = singlePost.postBody

    const postPictureSource = document.getElementById("postPictureSource")
    postPictureSource.src = singlePost.postImage

    const authorImageLink = document.getElementById("authorImageLink")
    authorImageLink.src = singlePost.postCreator.imageLink

    const authorNameSingleBlog = document.getElementById("authorNameSingleBlog")
    authorNameSingleBlog.innerHTML = singlePost.postCreator.firstName +' '+ singlePost.postCreator.lastName;

    const dateCreatedSingleBlog = document.getElementById("dateCreatedSingleBlog")
    dateCreatedSingleBlog.innerHTML = `${singlePost.createdAt} `

    const countLikes = document.getElementById("countLikes")
    countLikes.innerHTML = `${singlePost.likes_count} `

    // Change like text
    const postLike = document.getElementById("postLike")
    if(fetchedData.fetchedPostDetails.liked_by_current_user == true){
        postLike.innerHTML = "Unlike"
    }

    // Change the picture above the comment body

    const commentorAvatar = document.getElementById("commentorAvatar")
	const Token = JSON.parse(localStorage.getItem("token"))
	if (!Token){
		commentorAvatar.innerHTML = `<img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar"/>`
	   }
    else{

        const userGetData = {
            method: "GET",
            headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
        }

        let userResponse = await fetch("http://localhost:5000/loggedInUser", userGetData)
        const userFetchedData = await userResponse.json()
        console.log(userFetchedData)

        if(userFetchedData.successMessage){
            if(userFetchedData.loggedInUser.imageLink){
                const commentorPicture = userFetchedData.loggedInUser.imageLink
                commentorAvatar.innerHTML = 
                `<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
            }
    
            else{
                commentorAvatar.innerHTML = 
                ` <div class="authorImageCharts" id="authorImageCharts">
                ${userFetchedData.loggedInUser.firstName.charAt(0)+userFetchedData.loggedInUser.lastName.charAt(0)}
                </div>`
            }
        }
    }


    return {"postInfo": singlePost, "otherPostDetails": fetchedData.fetchedPostDetails};
}

postDetails()


// Get related posts

let singlePostsContainer = document.getElementById("singlePostsContainer");
async function getRelatedPosts(){

    const postsCount = (await postDetails()).otherPostDetails.totalPosts

    let response = await fetch(`http://localhost:5000/getAllPosts?perPage=${postsCount}`)    
    const allPosts = await response.json();
    let relatedPosts = allPosts.allAvailablePosts; 
    let posts = relatedPosts.filter(post => post.slug !== slug);
    console.log(posts)

    if(posts.length === 0){
        singlePostsContainer.innerHTML = `
            <div class="noPostFound">
                No Post found
            </div>
        
        `
    }

    else{
        for(let i=0;i<posts.length;i++){
    
            let postsArray = posts[i];

            let title = postsArray.title;
            let postImage   = postsArray.postImage;
            let postId = postsArray._id
            let slug = postsArray.slug;
            let createdAt = postsArray.createdAt;

            let postTemplate = `
        
            <article class="post" id="${postId}">
                <figure class="post-thumb"><img src="${postImage}" alt=""><a href="blog-single.html?slug=${slug}" class="overlay-box"><span class="icon fa fa-link"></span></a></figure>
                <div class="text"><a href="blog-single.html?slug=${slug}">${title}</a></div>
                <div class="post-info">${createdAt}</div>
            </article>
            
            `

            singlePostsContainer.innerHTML += postTemplate;
            
        
        }

}

    }

getRelatedPosts();



