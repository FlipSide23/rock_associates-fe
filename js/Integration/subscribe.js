
const submitSubscription = document.getElementById("submitSubscription");
const subscriberEmail = document.getElementById("subscriberEmail");
const subscriberForm = document.getElementById("subscriberForm");
const popupBoxSubscription = document.getElementById("popupBoxSubscription")
const subscriptionStatus = document.getElementById("subscriptionStatus")
const subscriptionErrorMessage = document.getElementById("subscriptionErrorMessage")

submitSubscription.addEventListener("click", (event) =>{
    event.preventDefault();   
    submitSubscription.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="20px" height="20px">`   
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

fetch("https://rockassociates-api.herokuapp.com/Subscribe", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        popupBoxSubscription.classList.add("open-popup")
        subscriptionStatus.style.color = "black"
        subscriptionErrorMessage.style.color = "black"
        subscriptionStatus.innerHTML = "Done!"
        subscriptionErrorMessage.innerHTML = "Thank you for subscribing on our News Letter! To receive our updates go to your email to verify this email address!"
        submitSubscription.innerHTML= "Subscribe"
    }

    else if (fetchedData.validationError){
        popupBoxSubscription.classList.add("open-popup")
        subscriptionStatus.style.color = "red"
        subscriptionErrorMessage.style.color = "red"
        subscriptionStatus.innerHTML = "Fail!"
        subscriptionErrorMessage.innerHTML = fetchedData.validationError
        submitSubscription.innerHTML= "Subscribe"
    }

    else if (fetchedData.duplicateError){
        popupBoxSubscription.classList.add("open-popup")
        subscriptionStatus.style.color = "red"
        subscriptionErrorMessage.style.color = "red"
        subscriptionStatus.innerHTML = "Fail!"
        subscriptionErrorMessage.innerHTML = fetchedData.duplicateError
        submitSubscription.innerHTML= "Subscribe"
    }

    else {
        popupBoxSubscription.classList.add("open-popup")
        subscriptionStatus.style.color = "red"
        subscriptionErrorMessage.style.color = "red"
        subscriptionStatus.innerHTML = "Fail!"
        subscriptionErrorMessage.innerHTML = "Something went wrong, we were unable to process this request!"
        submitSubscription.innerHTML= "Subscribe"
    }
})

}


function closePopupSubscripiton(){
    popupBoxSubscription.classList.remove("open-popup")
    subscriberForm.reset();
}