const url = new URL(window.location.href);
const memberId = url.searchParams.get('memberId');

async function memberDetails(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch(`http://localhost:5000/getSingleMember?memberId=${memberId}`, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const singleMember = fetchedData.staffMember;

    const names = document.getElementById("names")
    names.value = singleMember.name

    const position = document.getElementById("position")
    position.value = singleMember.position

    const facebookProfile = document.getElementById("facebookProfile")
    facebookProfile.value = singleMember.facebookProfile

    const linkedinProfile = document.getElementById("linkedinProfile")
    linkedinProfile.value = singleMember.linkedlinProfile

    const twitterProfile = document.getElementById("twitterProfile")
    twitterProfile.value = singleMember.twitterProfile

    const staffMemberImage = document.getElementById("staffMemberImage")
    staffMemberImage.src = singleMember.image
}

memberDetails()



// Update member

const updateMember = document.getElementById("updateMember");
const updateStaffMessage = document.getElementById("updateStaffMessage");

updateStaffMessage.style.display = "none"

updateMember.addEventListener("click", (event) =>{
    event.preventDefault();
    updateStaffMessage.style.display = "block"

    updateStaffMessage.innerHTML = `<img src="../images/icons/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    updateStaffMember();
});


async function updateStaffMember(){
    const image = document.getElementById("image");
    const position = document.getElementById("position");
    const names = document.getElementById("names");
    const facebookProfile = document.getElementById("facebookProfile");
    const linkedinProfile = document.getElementById("linkedinProfile");
    const twitterProfile = document.getElementById("twitterProfile");

    if (!image.files[0]) {
        updateStaffMessage.style.color = "red"
        updateStaffMessage.innerHTML = "Please confirm the above image or add a new one to edit a staff member!"
        return;
      }
    
    const reader =  new FileReader();
     reader.readAsDataURL(image.files[0])
     reader.addEventListener("load",()=>{
    const finalImage = reader.result

    const data = {
        position: position.value, 
        name: names.value,
        facebookProfile: facebookProfile.value,
        linkedlinProfile: linkedinProfile.value,
        twitterProfile: twitterProfile.value,
        image: finalImage,
    }    

    const sendData = {  
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

fetch(`http://localhost:5000/updateMember?memberId=${memberId}`, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    if (fetchedData.successMessage){
        updateStaffMessage.style.color = "green"
        updateStaffMessage.innerHTML = fetchedData.successMessage
        location = "manageStaff.html"
    }

    else if (fetchedData.validationError){
        updateStaffMessage.style.color = "red"
        updateStaffMessage.innerHTML = fetchedData.validationError
    }

    else{
        updateStaffMessage.style.color = "red"
        updateStaffMessage.innerHTML = "Something went wrong, we were unable to add this staff member!"
    }
})

    })
}


