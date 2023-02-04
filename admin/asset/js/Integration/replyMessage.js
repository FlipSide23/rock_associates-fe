


// function hidereplyMessagesLoader(){
//     replyMessages_preloader.classList.remove("show")
// }

const messageId = localStorage.getItem("messageId")

async function getMessage() {

    const getOptions = {
    
        method: 'GET',
        headers: {
        
         'auth-token': JSON.parse(localStorage.getItem('token'))
     
       },
    }



    let response = await fetch('http://localhost:5000/getMessageById/'+messageId, getOptions)
    const fetchSingleMessage = await response.json();
    // hidereplyMessagesLoader()

    const singleMessage = fetchSingleMessage.clientMessage

    const senderNames = document.getElementById("senderNames")
    senderNames.innerHTML = singleMessage.firstName +' '+ singleMessage.lastName

    const senderEmailInfo = document.getElementById("senderEmailInfo")
    senderEmailInfo.innerHTML = singleMessage.email

    const senderPhone = document.getElementById("senderPhone")
    senderPhone.innerHTML = singleMessage.phoneNumber

    const senderMessage = document.getElementById("senderMessage")
    senderMessage.innerHTML = singleMessage.message
}

getMessage()



// reply Messages

const submitReplyMessage = document.getElementById("submitReplyMessage");
const popupBox = document.getElementById("popupBox")
const confirmReplyMessage = document.getElementById("confirmReplyMessage");
confirmReplyMessage.style.display = "none"

submitReplyMessage.addEventListener("click", (event) =>{
    event.preventDefault();
    confirmReplyMessage.style.display = "block"
    confirmReplyMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`
    document.title = "Loading..."
    replyMessage()
});

const replyMessageInput = document.getElementById("replyMessage");
function replyMessage(){

        const data = {
            replyMessage: replyMessageInput.value
        }
 
    const sendData = {
        method: "PUT",
        body: JSON.stringify(data), 
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("http://localhost:5000/replyMessage/"+messageId, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.replyMessageSuccess){
        confirmReplyMessage.style.display = "none"
        popupBox.classList.add("open-popup")
    }

    else{
        confirmReplyMessage.style.color = "red"
        confirmReplyMessage.style.fontWeight = "bold"
        confirmReplyMessage.innerHTML = "Something went wrong, we were unable to send this reply!" 
        document.title = "Rock Associates Company Ltd | Dashboard"
    }
})
}

function closePopup(){
    popupBox.classList.remove("open-popup")
    location = "messages.html"
}

