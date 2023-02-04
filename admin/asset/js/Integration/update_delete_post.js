


async function update_delete_post(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllPosts?perPage=1000000", getData)
    const fetchedData = await response.json()

    document.title = "Rock Associates Company Ltd | Dashboard"
    const posts = fetchedData.allAvailablePosts;

    for(let i=0; i<posts.length; i++){
        const postArray = posts[i];

        const title = postArray.title;
        const body = postArray.postBody.slice(0, 600)+"...";
        const image = postArray.postImage;
        const slug = postArray.slug;
        const post_id = postArray._id;
        const date = postArray.createdAt
        const authorName = postArray.postCreator.firstName+' '+postArray.postCreator.lastName
        const authorImage = postArray.postCreator.imageLink 

        var authorImageTemplate;
        if(authorImage){
           authorImageTemplate = 
           `<img src="${authorImage}" alt="" class="AuthorImage" id="authorProfilePicture">`
        }
             
        else{
            authorImageTemplate = 
           ` <div class="authorImageCharts" id="authorImageCharts">
              ${postArray.postCreator.firstName.charAt(0)+postArray.postCreator.lastName.charAt(0)}
           </div>`
        }

        const updateDeletePost = document.getElementById("updateDeletePost");
        
        const postTemplate = `
                <div class="blogBoxes blogBox1">
                    <div class="blogImage">
                        <img src="${image}" alt="" >
                    </div>
                    <div class="blogContent">
                        <h3> <a style="cursor: pointer; font-family: poppins;">${title}</a> </h3>
                        <hr>
                        <div class="blogAuthor">
                            ${authorImageTemplate}
                            <small><a href="" class="AuthorName">${authorName}</a></small>
                            <small> /${date}</small>
                        </div>
                        <p class="ContentSection" style="font-family: calibri;">
                            ${body}
                        </p>

                        
                        
                        <button style="background: #cba10a; border-color: #cba10a; color: white; font-weight: bold;"><a href="updatePost.html?slug=${slug}">Update post</a></button> &nbsp;
                        <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${post_id}')">Delete post</button>
                    </div>
                </div>
        `
        
        updateDeletePost.innerHTML += postTemplate
    }
}


update_delete_post()





