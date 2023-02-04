
const submitSubscription = document.getElementById("submitSubscription");
const subscriberEmail = document.getElementById("subscriberEmail");
const subscriberForm = document.getElementById("subscriberForm");
const popupBoxSubscription = document.getElementById("popupBoxSubscription")
const subscriptionMessage = document.getElementById("subscriptionMessage");
subscriptionMessage.style.display = "none";

submitSubscription.addEventListener("click", (event) =>{
    event.preventDefault();
    subscriptionMessage.style.display = "block";   
    subscriptionMessage.innerHTML = `<img src="../images/Spinner.gif" alt="Loading..." width="50px" height="50px">`
    document.title = "Loading..."
    subscription();
});


function subscription(){   

    const data = {
        subscriberEmail: subscriberEmail.value, 
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("https://ernestruzindana-be.cyclic.app/Subscribe", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        subscriptionMessage.style.display = "none";
        popupBoxSubscription.classList.add("open-popup")
        document.title = "Ernest Ruzindana"
    }

    else if (fetchedData.validationError){
        subscriptionMessage.style.color = "red"
        subscriptionMessage.innerHTML = fetchedData.validationError
        document.title = "Ernest Ruzindana"
    }

    else {
        subscriptionMessage.style.color = "red"
        subscriptionMessage.innerHTML = fetchedData.errorMessage
        document.title = "Ernest Ruzindana"
    }
})

}


function closePopupSubscripiton(){
    popupBoxSubscription.classList.remove("open-popup")
    subscriberForm.reset();
}