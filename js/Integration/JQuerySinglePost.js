$(document).ready(function() {
	$('#list_comment').on('click', '.like', function (e) {
		$current = $(this);
		var x = $current.closest('div').find('.like').text().trim();
		var y = parseInt($current.closest('div').find('.count').text().trim());
        const checkToken = JSON.parse(localStorage.getItem("token"))
        if (!checkToken){
            $current.prop('disabled', true);
           }
		else if (x === "Like") {
			$current.closest('div').find('.like').text('Unlike');
			$current.closest('div').find('.count').text(y + 1);
		} else if (x === "Unlike"){
			$current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1); 
		} 
        else {
			var replay = $current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1);
		}
	});

    $('#listLikes').on('click', '.like', function (e) {
		$current = $(this);
		var x = $current.closest('div').find('.like').text().trim();
		var y = parseInt($current.closest('div').find('.count').text().trim());
        const checkToken = JSON.parse(localStorage.getItem("token"))
        if (!checkToken){
            $current.prop('disabled', true);
           }
		else if (x === "Like") {
			$current.closest('div').find('.like').text('Unlike');
			$current.closest('div').find('.count').text(y + 1);
		} else if (x === "Unlike"){
			$current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1); 
		} 
        else {
			var replay = $current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1);
		}
	});

    $('#submitComment').on('click', '.postComments', function (e) {
		$current = $(this);
	
		var y = parseInt($current.closest('div').find('.countComments').text().trim());
        const checkToken = JSON.parse(localStorage.getItem("token"))
        if (!checkToken){
            $current.prop('disabled', true);
           }
		$current.closest('div').find('.countComments').text(y + 1);

	});

	
	$('#list_comment').on('click', '.replay', async function (e) {

        //LoggedIn user
        const getData = {
            method: "GET",
            headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
        }

        let response = await fetch("https://rockassociates-api.herokuapp.com/loggedInUser", getData)
        const fetchedData = await response.json()
        console.log(fetchedData)

		if(fetchedData.successMessage){

			var commentorPicture
			var commentorImageTemplate;

			if(fetchedData.loggedInUser.imageLink){
				commentorPicture = fetchedData.loggedInUser.imageLink
				commentorImageTemplate = 
				`<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
			}

			else{
				commentorPicture = fetchedData.loggedInUser.firstName.charAt(0)+fetchedData.loggedInUser.lastName.charAt(0)
				commentorImageTemplate = 
				` <div class="authorImageCharts" id="authorImageCharts">
				${fetchedData.loggedInUser.firstName.charAt(0)+fetchedData.loggedInUser.lastName.charAt(0)}
				</div>`
			}

			cancel_reply();
			$current = $(this);
			el = document.createElement('li');
			el.className = "box_reply row";
			el.innerHTML =
			`
				<div class="col-md-12 reply_comment">
						<div class="avatar_comment">
						${commentorImageTemplate}
						</div>
						<div class="box_comment">
						<textarea class="comment_replay" placeholder="Add a comment..."></textarea>
						<div class="box_post">
							<div class="pull-right">
							<button class="cancel" onclick="cancel_reply()" type="button">Cancel</button>
							<button onclick="commentReply()" type="button" value="1">Reply</button>
							</div>
						</div>
						</div>
				</div>
			`
			$current.closest('li').find('.child_replay').prepend(el);
	}
	});

    //View Replies

    
});


function cancel_reply(){
	$('.reply_comment').remove();
}

function hideReplies(){
	$('.box_reply').hide();
}