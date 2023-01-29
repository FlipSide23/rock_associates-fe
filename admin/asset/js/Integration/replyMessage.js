


function hidereplyMessagesLoader(){
    replyMessages_preloader.classList.remove("show")
}

const messageId = localStorage.getItem("messageId")

async function getMessage() {

    const getOptions = {
    
        method: 'GET',
        headers: {
        
         'auth-token': JSON.parse(sessionStorage.getItem('token'))
     
       },
    }



    let response = await fetch('https://ernestruzindana-be.cyclic.app/contact/getMessageById/'+messageId, getOptions)
    const fetchSingleMessage = await response.json();
    hidereplyMessagesLoader()
    document.title = "Rock Associates Company Ltd | Dashboard"

    const singleMessage = fetchSingleMessage.clientMessage

    const senderNames = document.getElementById("senderNames")
    senderNames.innerHTML = singleMessage.names

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

const confirmReplyMessage = document.getElementById("confirmReplyMessage");
confirmReplyMessage.style.display = "none"

submitReplyMessage.addEventListener("click", (event) =>{
    event.preventDefault();
    confirmReplyMessage.style.display = "block"
    confirmReplyMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`
    document.title = "Loading..."
    replyMessage()
});

function replyMessage(){

    const replyMessage = document.getElementById("replyMessage");

        const data = {
            replyMessage: replyMessage.value
        }
 

    const sendData = {
        method: "PUT",
        body: JSON.stringify(data), 
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://ernestruzindana-be.cyclic.app/contact/replyMessage/"+messageId, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.replyMessageSuccess){
        confirmReplyMessage.style.color = "green"
        confirmReplyMessage.style.fontWeight = "bold"
        confirmReplyMessage.innerHTML = fetchedData.replyMessageSuccess
        document.title = "Rock Associates Company Ltd | Dashboard"
        setTimeout(()=>{location = "messages"}, 3000)
    }

    else{
        confirmReplyMessage.style.color = "red"
        confirmReplyMessage.style.fontWeight = "bold"
        confirmReplyMessage.innerHTML = fetchedData.message 
        document.title = "Rock Associates Company Ltd | Dashboard"
    }
})
}

