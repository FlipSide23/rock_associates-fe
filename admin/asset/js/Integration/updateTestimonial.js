const url = new URL(window.location.href);
const testimonialId = url.searchParams.get('testimonialId');

async function testimonialDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch(`https://rockassociates-api.herokuapp.com/getSingleTestimonial?testimonialId=${testimonialId}`, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const singleTestimonial = fetchedData.fetchedTestimonial;

    const names = document.getElementById("names")
    names.value = singleTestimonial.name

    const location = document.getElementById("location")
    location.value = singleTestimonial.location

    const testimonialBody = document.getElementById("testimonialBody")
    testimonialBody.value = singleTestimonial.testimonial

    const testimonialImageDisplay = document.getElementById("testimonialImageDisplay")
    testimonialImageDisplay.src = singleTestimonial.image
}

testimonialDetails()



// Update Testimonial

const updateTestimonial = document.getElementById("updateTestimonial");
const testimonialMessage = document.getElementById("testimonialMessage");

testimonialMessage.style.display = "none"

updateTestimonial.addEventListener("click", (event) =>{
    event.preventDefault();
    testimonialMessage.style.display = "block"

    testimonialMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    updateTestimonials();
});


async function updateTestimonials(){
    const names = document.getElementById("names")
    const testimonialLocation = document.getElementById("location")
    const testimonialBody = document.getElementById("testimonialBody")
    const image = document.getElementById("image")

    if (!image.files[0]) {
        testimonialMessage.style.color = "red"
        testimonialMessage.innerHTML = "Please confirm the person image or add a new one to edit a testimonial!"
        return;
      }
    
    const reader =  new FileReader();
     reader.readAsDataURL(image.files[0])
     reader.addEventListener("load",()=>{
    const finalImage = reader.result

    const data = {
        location: testimonialLocation.value, 
        name: names.value,
        testimonial: testimonialBody.value,
        image: finalImage,
    }    

    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch(`https://rockassociates-api.herokuapp.com/updateTestimonial?testimonialId=${testimonialId}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        testimonialMessage.style.color = "green"
        testimonialMessage.innerHTML = fetchedData.successMessage
        location = "manageTestimonial.html"
    }

    else if (fetchedData.validationError){
        testimonialMessage.style.color = "red"
        testimonialMessage.innerHTML = fetchedData.validationError
    }

    else{
        testimonialMessage.style.color = "red"
        testimonialMessage.innerHTML = "Something went wrong, we were unable to add this staff Testimonial!"
    }
})

    })
}


