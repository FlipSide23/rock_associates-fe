async function manageStaff(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllMembers", getData)
    const fetchedData = await response.json()
    const members = fetchedData.allStaffMembers;

    for(let i=0; i<members.length; i++){
        const staffArray = members[i];

        const name = staffArray.name;
        const image = staffArray.image;
        const staff_id = staffArray._id;
        const position = staffArray.position


        const manageStaffMembers = document.getElementById("manageStaffMembers");
        
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

                        
                        
                        <button style="background: #cba10a; border-color: #cba10a; color: white; font-weight: bold;"><a href="updateStaffMember.html?memberId=${staff_id}">Update Member</a> </button> &nbsp;
                        <button  style="background: #ff6b6b;  border-color: #ff6b6b; color: white; font-weight: bold;" onclick="openPopup('${staff_id}')">Delete Member</button>
                    </div>
                </div>
        `
        
        manageStaffMembers.innerHTML += staffTemplate
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

    let response = await fetch(`http://localhost:5000/deleteMember?memberId=${memberIdDeletion}`, deleteOptions)
    const fetchDeletedPost = await response.json();
    console.log(fetchDeletedPost)
        if(fetchDeletedPost.successMessage){ 
            location= "manageStaff.html"
        }
    
}