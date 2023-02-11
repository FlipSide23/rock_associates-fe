const submitComment = document.getElementById("submitComment");
const commentBody = document.getElementById("commentBody");
const popupBoxComments = document.getElementById("popupBoxComments")
const popupBoxCommentsValidation = document.getElementById("popupBoxCommentsValidation")
const popupBoxCommentsReplies = document.getElementById("popupBoxCommentsReplies")
const popupBoxCommentsRepliesValidation = document.getElementById("popupBoxCommentsRepliesValidation")
const commentList = document.getElementById("list_comment");

function closePopupComments(){
    popupBoxComments.classList.remove("open-popup")
}

function closePopupCommentsValidation(){
    popupBoxCommentsValidation.classList.remove("open-popup")
}

function closePopupCommentsReplies(){
    popupBoxCommentsReplies.classList.remove("open-popup")
}

function closePopupCommentsRepliesValidation(){
    popupBoxCommentsRepliesValidation.classList.remove("open-popup")
}

submitComment.addEventListener("click", (event) =>{
    event.preventDefault(); 

    comment();
});

async function comment(){

    const post__id = (await postDetails()).postInfo._id

    const data = {
        comment: commentBody.value, 
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://rockassociates-api.herokuapp.com/createComment/"+post__id, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if(fetchedData.invalidToken){
        popupBoxComments.classList.add("open-popup")
    }

    else if(fetchedData.validationError){
        popupBoxCommentsValidation.classList.add("open-popup")
    }

    else if(fetchedData.successMessage){
        commentList.innerHTML = ""
        const commentorNames = fetchedData.commentContent.user_id.firstName +" "+ fetchedData.commentContent.user_id.lastName
        var commentorPicture
        var commentorImageTemplate;

        if(fetchedData.commentContent.user_id.imageLink){
            commentorPicture = fetchedData.commentContent.user_id.imageLink
            commentorImageTemplate = 
            `<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
        }

        else{
            commentorPicture = fetchedData.commentContent.user_id.firstName.charAt(0)+fetchedData.commentContent.user_id.lastName.charAt(0)
            commentorImageTemplate = 
            ` <div class="authorImageCharts" id="authorImageCharts">
            ${fetchedData.commentContent.user_id.firstName.charAt(0)+fetchedData.commentContent.user_id.lastName.charAt(0)}
            </div>`
        }

        // Highlight Comment

        el = document.createElement('li');
        el.className = "box_result row";
        el.innerHTML =
        `
        <div class="comments">
            <div class="avatar_comment">
                ${commentorImageTemplate}
            </div>
            <div class="result_comment">
                <h4>${commentorNames} <span> &nbsp &nbsp/ ${fetchedData.commentContent.createdAt}</span></h4>
                <p>${fetchedData.commentContent.comment}</p>
                <div class="tools_comment">
                    <a class="" onclick="refreshPage()">Like</a>
                    <span aria-hidden="true"> · </span>
                    <i class="fa fa-thumbs-o-up"></i> <span class="count" id="count">0</span> 
                    <span aria-hidden="true"> · </span>
                    <a class="replay" onclick="refreshPage()">Reply</a>
                </div>
                <ul class="child_replay" style="display: flex; flex-direction: column-reverse;"></ul>
            </div>
        </div>
        `
        
            document.getElementById('list_comment').prepend(el);
            $('.commentar').val('');

    }

})

	
}



//Fetch all comments
async function getAllComments(){

    const postId = (await postDetails()).postInfo._id

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("https://rockassociates-api.herokuapp.com/getAllComments/"+postId, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const comments = fetchedData.allAvailableComments;

    const countComments = document.getElementById("countComments")
    countComments.innerHTML = `<span>(${comments.length})</span>`

    if(comments.length === 0){
        commentList.innerHTML = `
            <div class="noCommentsFound">
                No Comments yet!
            </div>
        
        `
    }

    for(let i=0; i<comments.length; i++){
        const commentsArray = comments[i];  
        const body = commentsArray.comment;
        const comment_id = commentsArray._id;
        const date = commentsArray.createdAt
        const commentorName = commentsArray.commentCreator.firstName +' '+ commentsArray.commentCreator.lastName;
        const commentorImage = commentsArray.commentCreator.imageLink
        console.log(commentorImage)
        const commentLikes = commentsArray.comment_likes_count;

     
        var commentorImageTemplate;
        if(commentorImage){
           commentorImageTemplate = 
           `
           <div><img src="${commentorImage}" alt="someImage" class="AuthorImage" id="authorProfilePicture"></div>
           `
        }
             
        else{
            commentorImageTemplate = 
           ` <div class="authorImageCharts" id="authorImageCharts">
           ${commentsArray.commentCreator.firstName.charAt(0) + commentsArray.commentCreator.lastName.charAt(0)}
           </div>`
        }


        let responseReplies = await fetch("https://rockassociates-api.herokuapp.com/getAllCommentReplies/"+comment_id, getData)
        const fetchedDataReplies = await responseReplies.json()

        const replies = fetchedDataReplies.allAvailableReplies;

        const replyTemplate = replies.map(myFunction).join(' ');

        function myFunction(eachReply) {

            var replierImageTemplate;
            if(eachReply.replyCreator.imageLink){
               replierImageTemplate = 
               `<img src="${eachReply.replyCreator.imageLink}" alt="" class="AuthorImage" id="authorProfilePicture">`
            }
                 
            else{
                replierImageTemplate = 
               ` <div class="authorImageCharts" id="authorImageCharts">
               ${eachReply.replyCreator.firstName.charAt(0)+eachReply.replyCreator.lastName.charAt(0)}
               </div>`
            }

        return `
		<li class="box_result row" id="">
            <div class="replies comments">
                <div class="avatar_comment">
                  ${replierImageTemplate}
                </div>
                
                <div class="result_comment">
                    <h4>${eachReply.replyCreator.firstName +' '+ eachReply.replyCreator.lastName} <span> &nbsp &nbsp/ ${eachReply.createdAt}</span></h4>
                    <p>${eachReply.reply}</p>
                </div>
                
            </div>
        </li>
        `
        }

        // Change comment like text
        
        let likeText

        const likeToken = JSON.parse(localStorage.getItem("token"))
        const allCommentLikes = commentsArray.commentLikes.map(eachLike => eachLike.user_id)
   
        if(likeToken){

        let responseLikes = await fetch("https://rockassociates-api.herokuapp.com/loggedInUser", getData)
        
        
            const fetchedDataLikes = await responseLikes.json()
    
            const userLike = fetchedDataLikes.loggedInUser._id

            if(allCommentLikes.includes(userLike)){
                likeText = "Unlike"
               }
    
               else{
                likeText = "Like"
               }
        }

        else{
            likeText = "Like"
        }
        

        
        const commentTemplate = `
        <li class="box_result row" id="${comment_id}">
            <div class="comments">
                <div class="avatar_comment">
                    ${commentorImageTemplate}
                </div>
                <div class="result_comment">
                    <h4>${commentorName} <span> &nbsp &nbsp/ ${date}</span></h4>
                    <p>${body}</p>
                    
                    <div class="tools_comment">
                        <a class="like" onclick="likeComment('${comment_id}')">${likeText}</a>
                        <span aria-hidden="true"> · </span>
                        <i class="fa fa-thumbs-o-up"></i> <span class="count" id="count">${commentLikes}</span> 
                        <span aria-hidden="true"> · </span>
                        <a class="replay" onclick="storeCommentId('${comment_id}')">Reply</a>
                    </div>
                    <ul class="child_replay" >
                      ${replyTemplate}
                    </ul>
                </div>
                 
            </div>
            
            
        </li>
        `

        commentList.innerHTML += commentTemplate

    }
}


getAllComments()


function storeCommentId(commentId){
    localStorage.setItem("commentId", commentId)

    const tokenReplies = JSON.parse(localStorage.getItem("token"))
    if(!tokenReplies){
        popupBoxCommentsReplies.classList.add("open-popup")        
    }
}


async function commentReply(){
    let commentId = localStorage.getItem("commentId")

    var comment_replay = $('.comment_replay').val();
    const data = {
        reply: comment_replay, 
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://rockassociates-api.herokuapp.com/commentReply/"+commentId, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if(fetchedData.invalidToken){
        popupBoxCommentsReplies.classList.add("open-popup")
    }

    else if(fetchedData.validationError){
        popupBoxCommentsRepliesValidation.classList.add("open-popup")
    }

    else if(fetchedData.successMessage){

        const commentorNames = fetchedData.replyContent.user_id.firstName +" "+ fetchedData.replyContent.user_id.lastName
        var commentorPicture
        var commentorImageTemplate;

        if(fetchedData.replyContent.user_id.imageLink){
            commentorPicture = fetchedData.replyContent.user_id.imageLink
            commentorImageTemplate = 
            `<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
        }

        else{
            commentorPicture = fetchedData.replyContent.user_id.firstName.charAt(0)+fetchedData.replyContent.user_id.lastName.charAt(0)
            commentorImageTemplate = 
            ` <div class="authorImageCharts" id="authorImageCharts">
            ${fetchedData.replyContent.user_id.firstName.charAt(0)+fetchedData.replyContent.user_id.lastName.charAt(0)}
            </div>`
        }

        // Highlight Comment

    el = document.createElement('li');
    el.className = "box_reply row";
    el.innerHTML =
    `
    <div class="replies comments">
        <div class="avatar_comment">
            ${commentorImageTemplate}
        </div>
        <div class="result_comment">
            <h4>${commentorNames} <span> &nbsp &nbsp/ ${fetchedData.replyContent.createdAt}</span></h4>
            <p>${comment_replay}</p>
        </div>
    </div>

    `
    $current.closest('li').find('.child_replay').prepend(el);
    $('.comment_replay').val('');
    cancel_reply();

    }

})
	
}


function refreshPage(){
    location.reload()
}


// Edit comments
// <div class="comment-actions">
//     <button class="edit-button"><i class="fas fa-edit"></i></button>
//     <button class="delete-button"><i class="fas fa-trash"></i></button>
// </div> 