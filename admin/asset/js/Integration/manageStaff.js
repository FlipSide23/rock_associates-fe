const manageStaffMembers = document.getElementById("manageStaffMembers");

async function manageStaff(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("https://rockassociates-api.herokuapp.com/getAllMembers", getData)
    const fetchedData = await response.json()
    const members = fetchedData.allStaffMembers;

    if(members.length === 0){
        manageStaffMembers.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No members found!
            </div>
        
        `
    }

    else{

    for(let i=0; i<members.length; i++){
        const staffArray = members[i];

        const name = staffArray.name;
        const image = staffArray.image;
        const staff_id = staffArray._id;
        const position = staffArray.position


        
        
        const staffTemplate = `
                <div class="blogBoxes blogBox1">
                    <div class="blogImage">
                        <img src="${image}" alt="" >
                    </div>
                    <div class="blogContent">
                        <h3> <a style="cursor: pointer; font-family: poppins;">${name}</a> </h3>
                        <hr>
                        <p class="ContentSection" style="font-family: calibri;">
                            ${position}
                        </p>
                        <button style="background: #28a745; border-color: #28a745; color: white; font-weight: bold;"><a style="color: white;" href="updateStaffMember.html?memberId=${staff_id}">Update Member</a> </button> &nbsp;
                        <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${staff_id}')">Delete Member</button>
                    </div>
                </div>
        `
        
        manageStaffMembers.innerHTML += staffTemplate
    }

}
}


manageStaff()


//popup
const popupBox = document.getElementById("popupBox")
let memberIdDeletion;

function openPopup(member_id){
    popupBox.classList.add("open-popup")
    localStorage.setItem("memberIdDeletion", member_id)
    memberIdDeletion = localStorage.getItem("memberIdDeletion")
}
function closePopup(){
    popupBox.classList.remove("open-popup")
}

// Delete member

let deleteMember= async() => {
    const deleteOptions = {
    
        method: 'DELETE',
        headers: {   
         'auth-token': JSON.parse(localStorage.getItem('token'))
     
       },
    }

    let response = await fetch(`https://rockassociates-api.herokuapp.com/deleteMember?memberId=${memberIdDeletion}`, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.successMessage){ 
            location= "manageStaff.html"
        }
    
}