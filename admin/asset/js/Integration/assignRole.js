function hideAssignRoleLoader(){
    assignRole_preloader.classList.remove("show")
}

async function registeredUsers(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

  let response = await fetch("http://localhost:5000/getRegisteredUsers", getData)
  const fetchedData = await response.json()
  hideAssignRoleLoader()
  document.title = "Rock Associates Company Ltd | Dashboard"
    const users = fetchedData.RegisteredUsers;
    console.log(users);
   
    for(let i=0;i<users.length;i++){

        let usersArray = users[i];
        console.log(usersArray);
        const nameAbbreviation = usersArray.firstName.charAt(0) +""+usersArray.lastName.charAt(0);
        let image
        if(!usersArray.imageLink){
            image = nameAbbreviation 
        }
        else{
            image = `<img src="${usersArray.imageLink}" alt="" id="imagePicture" style="margin-top: -10px;">`
        }

        const name = usersArray.firstName +" "+usersArray.lastName;
        const role = usersArray.role
        const userId = usersArray._id

  const addUsers = document.getElementById("addUsers");

  if(1>0) {

  const usersTemplate = `
  <div class="col-md-3 col-xs-12 col-sm-6 p-left" >
        <div class="mainbox" style="text-align: center; height: 320px;">
            <div class="imgbox" 
            style="
            background: black;
            color: white;
            width: 100%;
            height: 166px;
            line-height: 165px;
            font-weight: bold;
            font-size: 70px;
            cursor: pointer;
            text-align: center;
            "
            >
             
             ${image} 
              
            </div>
            <div class="lefttext" >
            ${name}
            </div>
            <div class="leftBottomtext" id="leftBottomtext" style="dispay: block;">
            ${role}
            </div>
            <div class="righttext">
                <a id="${userId}" onclick="getSingleUser('${userId}')" style="cursor: pointer;">Change Role</a>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
  `
  addUsers.innerHTML += usersTemplate;
  }
  

    } 



}

registeredUsers()





