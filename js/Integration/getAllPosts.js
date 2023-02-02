// Get all posts

let pageCount;
let searchKeyword;
let postsContainer = document.getElementById("postsContainer");
async function getAllPosts(){

    const url = new URL(window.location.href);
    const getPageNumber = url.searchParams.get('page');
    getPageNumber ? pageCount = parseInt(getPageNumber) : pageCount = 1;
    searchKeyword = url.searchParams.get('keyword');

    let query = `?page=${pageCount}`;
    if (searchKeyword) {
        query += `&keyword=${searchKeyword}`;

    }
  
    let response = await fetch(`http://localhost:5000/getAllPosts`+query)    
    const allPosts = await response.json(); 
    let posts = allPosts.allAvailablePosts;
    console.log(posts) 
    window.scrollTo(0, 0); 
    if(posts.length === 0){
        postsContainer.innerHTML = `
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
            let createdAt = postsArray.createdAt;
            let slug = postsArray.slug;
            let comments_count = postsArray.comments_count;
            let likes_count = postsArray.likes_count;
            let postCreator = postsArray.postCreator.firstName +' '+ postsArray.postCreator.lastName;

            let postTemplate = `
        
            <div class="news-block col-lg-6 col-md-12 col-sm-12" id="${postId}">
                <div class="inner-box">
                    <div class="image">
                        <a href="blog-single.html?slug=${slug}"><img src="${postImage}" alt="" /></a>
                    </div>
                    <div class="lower-content">
                        <ul class="post-meta">
                            <li>${postCreator}</li>
                            <li>${createdAt}</li>
                        </ul>
                        <h3><a href="blog-single.html?slug=${slug}">${title}</a></h3>
                        <div style="display: flex; justify-content: space-between;">
                            <a href="blog-single.html?slug=${slug}" class="read-more">Read More</a>
                            <div class="blogReactions" style="display: flex; justify-content: space-between; gap: 10px;">
                            <span><i class="fa fa-thumbs-up"></i>(${likes_count})</span> 
                            <span><i class="fa fa-comments"></i>(${comments_count})</span> 
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            `

            postsContainer.innerHTML += postTemplate;
            
        
        }

}

//posts pagination

let blogPagination = document.getElementById("blogPagination");
let pageCountValue = document.getElementById("pageCountValue");
let numberOfPosts = document.getElementById("numberOfPosts");
let totalPages = allPosts.paginationDetails.totalPages;
let currentPage = allPosts.paginationDetails.currentPage;
let totalPosts = allPosts.paginationDetails.total;
pageCountValue.innerHTML = currentPage;
totalPosts>1 ? numberOfPosts.innerHTML = `${totalPosts} posts` : `${totalPosts} post` ;


function pagination(totalPages, currentPage){
    let paginationDetail = ''
    let beforePages = currentPage - 1;
    let afterPages = currentPage + 1;
    let liActive;

    if(currentPage > 1){
        paginationDetail += `<li class="prev" onclick="updateState(${pageCount-1})"><a><span class="fa fa-angle-left"></span> </a></li>`
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++){

        if(pageLength > totalPages){
            continue;
        }
        if(pageLength == 0){
            pageLength = pageLength + 1;
        }

        if(currentPage == pageLength){
            liActive = 'active';
        }else{
            liActive = '';
        }

        paginationDetail += `<li class="${liActive}" onclick="updateState(${pageLength})" ><a>${pageLength}</a></li>`
    }

    if(currentPage < totalPages){
        paginationDetail += `<li onclick="updateState(${pageCount+1})" class="next"><a><span class="fa fa-angle-right"></span> </a></li>`
    }

    blogPagination.innerHTML = paginationDetail
}

pagination(totalPages, currentPage)

    }

getAllPosts();


// Search for a post

const searchField = document.getElementById("searchField");
const submitSearchRequest = document.getElementById("submitSearchRequest");

submitSearchRequest.addEventListener("click", (event) =>{
    event.preventDefault();

    updateSearchKeyword(searchField.value);
})


function updateState(pageNumber){
    getAllPosts(pageCount = pageNumber)
    history.pushState(null, null, `?page=${pageNumber}`)
    location.reload();
}

function updateSearchKeyword(searchKeyword){
    getAllPosts(keyword = searchKeyword)
    history.pushState(null, null, `?keyword=${searchKeyword}`)
    location.reload();
}

// delete search keyword on page refresh
window.addEventListener('load', function() {
    const pageUrl = new URL(window.location.href);
    const param = pageUrl.searchParams.get('keyword');
    if (param) {
      pageUrl.searchParams.delete('keyword');
      window.history.replaceState({}, '', pageUrl.toString());
    }
});




