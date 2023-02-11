const contactForm = document.getElementById("contactForm");
const visitorFirstName = document.getElementById("visitorFirstName");
const visitorLastName = document.getElementById("visitorLastName");
const visitorEmail = document.getElementById("visitorEmail");
const visitorTel = document.getElementById("visitorTel");
const visitorMessage = document.getElementById("visitorMessage");
const messageSubmit = document.getElementById("messageSubmit");
const contactMessage = document.getElementById("contactMessage");
const popupBox = document.getElementById("popupBox")


contactMessage.style.display = "none"


messageSubmit.addEventListener("click", (event)=>{
    event.preventDefault();
    messageSubmit.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`
    contact();
});

function contact(){
    const data = {
        firstName: visitorFirstName.value,
        lastName: visitorLastName.value,
        email: visitorEmail.value,
        phoneNumber: visitorTel.value,
        message: visitorMessage.value
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch("https://rockassociates-api.herokuapp.com/sendMessage", sendData)
    .then(response => response.json())
    .then((fetchedData)=>{
        console.log(fetchedData)

        if (fetchedData.validationError){
            contactMessage.style.display = "block";
            contactMessage.innerHTML = fetchedData.validationError
            messageSubmit.innerHTML= "Send"
        }

        else if (fetchedData.successMessage){
            contactMessage.style.display = "none"
            popupBox.classList.add("open-popup")
            messageSubmit.innerHTML= "Send"
        }

        else {
            contactMessage.style.display = "block";
            contactMessage.innerHTML = "Something went wrong, we were unable to send this message!"
            messageSubmit.innerHTML= "Send"
        }
    })
}

function closePopup(){
    popupBox.classList.remove("open-popup")
    contactForm.reset();
}