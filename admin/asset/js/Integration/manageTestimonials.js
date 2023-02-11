const manageTestimonials = document.getElementById("manageTestimonials");

async function manageTestimonial(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("https://rockassociates-api.herokuapp.com/getAllTestimonials", getData)
    const fetchedData = await response.json()
    const testimonials = fetchedData.allTestimonials;

    if(testimonials.length === 0){
        manageTestimonials.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No testimonials found!
            </div>
        
        `
    }

    else{

    for(let i=0; i<testimonials.length; i++){
        const testimonialArray = testimonials[i];

        const name = testimonialArray.name;
        const image = testimonialArray.image;
        const testimonial_id = testimonialArray._id;
        const testimonial = testimonialArray.testimonial.slice(0, 600)+"..."


        const manageTestimonials = document.getElementById("manageTestimonials");
        
        const testimonialTemplate = `
                <div class="blogBoxes blogBox1">
                    <div class="blogImage">
                        <img src="${image}" alt="" >
                    </div>
                    <div class="blogContent" style="align-self:center;">
                        <h3> <a style="cursor: pointer; font-family: poppins;">${name}</a> </h3>
                        <hr>
                        <p class="ContentSection" style="font-family: calibri; margin-bottom: 25px;">
                            ${testimonial}
                        </p>

                        
                        
                        <button style="background: #28a745; border-color: #28a745; color: white; font-weight: bold;"><a style="color: white;" href="updateTestimonial.html?testimonialId=${testimonial_id}">Update Testimonial</a> </button> &nbsp;
                        <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${testimonial_id}')">Delete Tesimonial</button>
                    </div>
                </div>
        `
        
        manageTestimonials.innerHTML += testimonialTemplate
    }

}
}


manageTestimonial()


//popup
const popupBox = document.getElementById("popupBox")
let testimonialIdDeletion;

function openPopup(testimonial_id){
    popupBox.classList.add("open-popup")
    localStorage.setItem("testimonialIdDeletion", testimonial_id)
    testimonialIdDeletion = localStorage.getItem("testimonialIdDeletion")
}
function closePopup(){
    popupBox.classList.remove("open-popup")
}

// Delete testimonial

let deleteTestimonial= async() => {
    const deleteOptions = {
    
        method: 'DELETE',
        headers: {   
         'auth-token': JSON.parse(localStorage.getItem('token'))
     
       },
    }

    let response = await fetch(`https://rockassociates-api.herokuapp.com/deleteTestimonial?testimonialId=${testimonialIdDeletion}`, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.successMessage){ 
            location= "manageTestimonial.html"
        }
    
}