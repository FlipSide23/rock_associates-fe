
//popup
const popupBoxSubscriptions = document.getElementById("popupBoxSubscriptions")
let resultsContainer = document.getElementById("subscriptionsContainer");
let subscriberIdDeletion;

function openPopupSubscriptions(subscriber_id){
    popupBoxSubscriptions.classList.add("open-popup")
    localStorage.setItem("subscriberIdDeletion", subscriber_id)
    subscriberIdDeletion = localStorage.getItem("subscriberIdDeletion")
}

function closePopupSubscriptions(){
    popupBoxSubscriptions.classList.remove("open-popup")
}


// Delete Results
subscriberIdDeletion = localStorage.getItem("subscriberIdDeletion")
let deleteSubscriber= async() => {
    document.title = "Loading..."
    const deleteOptions = {
    
        method: 'DELETE',
        headers: {
        
         'auth-token': JSON.parse(localStorage.getItem('token'))
     
       },
    }

    let response = await fetch('https://rockassociates-api.herokuapp.com/deleteSubscriber/'+subscriberIdDeletion, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.removedMessage){ 
            history.go(0);
        }
    
}




// Get subscribers

  

async function fetchSubscribers(){
        
    let response = await fetch("https://rockassociates-api.herokuapp.com/getAllSubscriptions")
    
    const allResults = await response.json(); 
    const results = allResults.subscribers;
    document.title = "Rock Associates Company Ltd | Dashboard"

    if(results.length === 0){
        resultsContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                !No subscriptions found
            </div>
        
        `
    }

    else{

    for(let i=0;i<results.length;i++){
        

        let resultsArray = results[i];

        let subscriberEmail = resultsArray.subscriberEmail;
        let resultId = resultsArray._id;
        let verifiedStatus = resultsArray.isVerified;
        
        var verifiedTemplate
        if(verifiedStatus == true){
            verifiedTemplate = `<span style="color: green;"><i class="fa fa-check-circle"></i> Verified</span>`
        }

        else{
            verifiedTemplate = `<span style="color: red;"><i class="fa fa-close"></i> Unverified</span>`
        }
        
      if(1>0) {

        let postTemplate = `
    
        <div class="col-md-6" id="${resultId}">
            <div class="panel box-v1">
               <div style="font-size: 16px; text-align: center; color: purple; text-decoration: underline; font-weight: bold; 
               padding-top: 15px; border-top: 5px solid #f0f3f4;
               ">Subscriber Email</div>

            <div class="panel-body text-center" id="panel-body" style=" font-size: 15px; margin-top: -30px; padding-bottom: 20px;">
            ${subscriberEmail} 
            </div>
            <div class="panel-body text-center" id="panel-body" style=" font-size: 15px; margin-top: -45px; padding-bottom: 10px;">
              ${verifiedTemplate} 
            </div> 
            <div style="display: flex; flex-direction: row;"> 
                <div class="deleteMessage" style="font-size: 13px; color: #EE4B2B; font-weight: bold; text-align: center; margin: auto; width: 65%; border-top: 5px solid #f0f3f4; border-left: 5px solid #f0f3f4; padding-bottom: 5px; padding-top: 5px;" id= '${resultId}' onclick="openPopupSubscriptions('${resultId}')">
                Remove from Subscribers
                </div>
                <div class="deleteMessage" style="font-size: 13px; color: purple; text-align: center; margin: auto; font-weight: bold; width: 35%; border-top: 5px solid #f0f3f4; padding-bottom: 5px; padding-top: 5px;" id= '${resultId}' onclick="copyContent('${subscriberEmail}')">
                 Copy Email
                </div>
            </div>
            </div>
        </div>

        
        `
        resultsContainer.innerHTML += postTemplate;

    }

}
    
        }
        
    }

fetchSubscribers();


const copyContent = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    
  }



 

