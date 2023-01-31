
const url = new URL(window.location.href);
const slug = url.searchParams.get('slug');
let totalPosts;

async function postDetails(){ 

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch(`https://rockassociates.cyclic.app/getSinglePost/${slug}`, getData)
    const fetchedData = await response.json() 
    const singlePost = fetchedData.fetchedPost;

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

    totalPosts= fetchedData.fetchedPostDetails.totalPosts;
    return totalPosts;
}

postDetails()



// Get related posts

let singlePostsContainer = document.getElementById("singlePostsContainer");
async function getRelatedPosts(){

    const postsCount = await postDetails()

    let response = await fetch(`https://rockassociates.cyclic.app/getAllPosts?perPage=${postsCount}`)    
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