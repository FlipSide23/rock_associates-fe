
//popup
const popupBoxClientMessages = document.getElementById("popupBoxClientMessages")
let resultsContainer = document.getElementById("messagesContainer");
let messageIdDeletion;

function openPopupClientMessages(message_id){
    popupBoxClientMessages.classList.add("open-popup")
    localStorage.setItem("messageIdDeletion", message_id)
    messageIdDeletion = localStorage.getItem("messageIdDeletion")
}
function closePopupClientMessages(){
    popupBoxClientMessages.classList.remove("open-popup")
}

// Delete Results

let deleteMessage= async() => {
    document.title = "Loading..."
    const deleteOptions = {
    
        method: 'DELETE',
        headers: {
        
         'auth-token': JSON.parse(localStorage.getItem('token'))
     
       },
    }

    let response = await fetch('https://rockassociates-api.herokuapp.com/deleteMessage/'+messageIdDeletion, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.deletedMessage){ 
            location="messages.html"
        }
    
}




// Get messages

function hideMessagesLoader(){
    messages_preloader.classList.remove("show")
}
 

async function fetchMessages(){
        
    let response = await fetch("https://rockassociates-api.herokuapp.com/getAllMessages")
    
    const allResults = await response.json(); 
    const results = allResults.clientMessages;
    hideMessagesLoader()

    if(results.length === 0){
        resultsContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No messages found!
            </div>
        
        `
    }

    else{
   
    for(let i=0;i<results.length;i++){
        

        let resultsArray = results[i];

        let firstName = resultsArray.firstName;
        let lastName = resultsArray.lastName;
        let phoneNumber   = resultsArray.phoneNumber;
        let resultId = resultsArray._id
        let message = resultsArray.message;
        let email = resultsArray.email;
        
      if(1>0) {

        let postTemplate = `
    
        <div class="col-md-6">
            <div class="panel box-v1">
            <div style="font-size: 16px; text-align: center; color: #3aaf47; text-decoration: underline; font-weight: bold; 
            padding-top: 15px;
            ">Sender Info</div>
                <div class="panel-body text-center" style=" font-size: 15px; margin-top: -30px; padding-bottom: 20px;">
               <span style="text-decoration: underline;">Names</span>: ${firstName+''+lastName} </br>
               <span style="text-decoration: underline;">Email</span>: ${email} </br> 
               <span style="text-decoration: underline;">Phone Number</span>: ${phoneNumber} </br>
               </div>
               <div style="font-size: 16px; text-align: center; color: #3aaf47; text-decoration: underline; font-weight: bold;
               ">Sender Message</div>

            <div class="panel-body text-center" style=" font-size: 15px; margin-top: -10px; padding: 20px; text-align: justify;">
             ${message}
            </div>   
                <div class="deleteMessage" style="font-size: 20px; margin-left: 20px; text-align: center; width: 40px; height: 40px; background: #ff6b6b; color: white; border-radius: 50%;  padding: 5px 5px;"  onclick="openPopupClientMessages('${resultId}')">
                <i class="fa fa-trash" aria-hidden="true"></i>
                </div>

                <div style="font-size: 16px; text-align: center; padding-bottom: 20px;   
                display: flex;
                flex-direction: column;
                padding: 20px;
                ">
                <button id="postSubmitData" class="add-btn " style="
                border: none;
                background: #3aaf47;
                width: 60%;
                position: relative;
                margin: auto;
                padding: 5px 0px; color: white;"
                onclick="getSingleMessage('${resultId}')"
                >  <span class="fa fa-envelope-o"></span> Reply</button>
                </div>
            </div>
        </div>

        
        `
        resultsContainer.innerHTML += postTemplate;
    
    }
    
        }

    }
        
    }

fetchMessages();



//Go to reply message page

let getSingleMessage= async(messageId) => {
    document.title = "Loading..."

    const getOptions = {
    
        method: 'GET',
        headers: {
        
         'auth-token': JSON.parse(localStorage.getItem('token'))
     
       },
    }



    let response = await fetch('https://rockassociates-api.herokuapp.com/getMessageById/'+messageId, getOptions)
    const fetchSingleMessage = await response.json();
    console.log(fetchSingleMessage)

        if(fetchSingleMessage.clientMessageSuccess){ 
            localStorage.setItem("messageId", fetchSingleMessage.clientMessage._id)
            location="replyMessage.html"
        }
}

