// Get registered users
function hideRegisteredUsersLoader(){
    registeredUsers_preloader.classList.remove("show")
}

async function fetchRegisteredUsers(){
        
    let response = await fetch("https://rockassociates-api.herokuapp.com/getRegisteredUsers")
    
    const allUsers = await response.json(); 
    hideRegisteredUsersLoader()
    document.title = "Rock Associates Company Ltd | Dashboard"
    const users = allUsers.RegisteredUsers;
    console.log(users);
    for(let i=0;i<users.length;i++){
        let usersContainer = document.getElementById("usersContainer");
        
 
        let usersArray = users[i];

        let firstName = usersArray.firstName;
        let lastName = usersArray.lastName;
        let userId = usersArray._id
        let email = usersArray.email;
        let role = usersArray.role;
        
      if(1>0) {

        let userTemplate = `
    
            <tr id="${userId}">
                <td>${firstName} ${lastName}</td>
                <td>${email}</td>
                <td>${role}</td>
            </tr>

        
        `
        
       
        
        
        usersContainer.innerHTML += userTemplate;
    
    }
    
        }
        
    }

fetchRegisteredUsers();