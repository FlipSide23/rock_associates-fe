async function manageTestimonial(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllTestimonials", getData)
    const fetchedData = await response.json()
    const testimonials = fetchedData.allTestimonials;

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
                    <div class="blogContent">
                        <h3> <a style="cursor: pointer; font-family: poppins;">${name}</a> </h3>
                        <hr>
                        <p class="ContentSection" style="font-family: calibri;">
                            ${testimonial}
                        </p>

                        
                        
                        <button style="background: #cba10a; border-color: #cba10a; color: white; font-weight: bold;"><a href="updateTestimonial.html?testimonialId=${testimonial_id}">Update Testimonial</a> </button> &nbsp;
                        <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${testimonial_id}')">Delete Tesimonial</button>
                    </div>
                </div>
        `
        
        manageTestimonials.innerHTML += testimonialTemplate
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

    let response = await fetch(`http://localhost:5000/deleteTestimonial?testimonialId=${testimonialIdDeletion}`, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.successMessage){ 
            location= "manageTestimonial.html"
        }
    
}