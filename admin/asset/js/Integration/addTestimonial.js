// Add a testimonial

const submitRequest = document.getElementById("submitRequest");
const addTestimonialMessage = document.getElementById("addTestimonialMessage");

addTestimonialMessage.style.display = "none"

submitRequest.addEventListener("click", (event) =>{
    event.preventDefault();
    addTestimonialMessage.style.display = "block"

    addTestimonialMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    addTestimonial();
});


async function addTestimonial(){
    const image = document.getElementById("image");
    const testimonialLocation = document.getElementById("location");
    const names = document.getElementById("names");
    const testimonial = document.getElementById("testimonial");

    if (!image.files[0]) {
        addTestimonialMessage.style.color = "red"
        addTestimonialMessage.innerHTML = "Please add the person image!"
        return;
      }
    
    const reader =  new FileReader();
     reader.readAsDataURL(image.files[0])
     reader.addEventListener("load",()=>{
    const finalImage = reader.result

    const data = {
        location: testimonialLocation.value, 
        name: names.value,
        testimonial: testimonial.value,
        image: finalImage,
    }    

    const sendData = {  
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch("http://localhost:5000/addTestimonial", sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        addTestimonialMessage.style.color = "green"
        addTestimonialMessage.innerHTML = fetchedData.successMessage
        location = "manageTestimonial.html"
    }

    else if (fetchedData.validationError){
        addTestimonialMessage.style.color = "red"
        addTestimonialMessage.innerHTML = fetchedData.validationError
    }

    else{
        addTestimonialMessage.style.color = "red"
        addTestimonialMessage.innerHTML = "Something went wrong, we were unable to add this staff member!"
    }
})

    })
}