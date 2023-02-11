async function loggedInUser(){
    const preNavLogin = document.getElementById("preNavLogin");
    const preNavToken = localStorage.getItem("token")
    if(preNavToken){
        preNavLogin.innerHTML = `<img src="../../../images/icons/spinner.gif" alt="" width="40px">`
    }

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

  let response = await fetch("https://rockassociates-api.herokuapp.com/loggedInUser", getData)
  const fetchedData = await response.json()
  console.log(fetchedData)

  preNavLogin.style.display = "none"

  const addProfile = document.getElementById("addProfile");
  addProfile.innerHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
      <title>Document</title>
  </head>
  <body>
      <div class="profilePicture" id="profilePicture">
        ${fetchedData.loggedInUser.firstName.charAt(0)}${fetchedData.loggedInUser.lastName.charAt(0)}
      </div>
      <img src="${fetchedData.loggedInUser.imageLink}" class="topProfileImage" id="topProfileImage" alt="">

          
      <div class="userProfile" id="userProfile">
          <div class="profilePictureIn" id="profilePictureIn">
          ${fetchedData.loggedInUser.firstName.charAt(0)}${fetchedData.loggedInUser.lastName.charAt(0)}
          </div>
          <img src="${fetchedData.loggedInUser.imageLink}" class="inProfileImage" id="inProfileImage" alt="">

          <h3 class="adminNames">${fetchedData.loggedInUser.firstName} ${fetchedData.loggedInUser.lastName}</h3>
          <p class="userFetchedEmail" style="font-weight: 500;">${fetchedData.loggedInUser.email}</p>

          <div class="switchAccount" style="font-weight: 500; padding: 35px 20px 20px; " id="adminPanel">
                <p class="switchAccountLink"> 
                <i class="fas fa-chalkboard-teacher"></i> </nbsp>Admin Panel
                </p>
          </div>

          <div class="preNavLogout" style="border-top: 1px solid rgba(0, 0, 0, 0.54); padding: 30px 20px 20px;">
              <h5><a onClick="preNavLogoutUser()"><i class="fa fa-sign-out"></i> </nbsp>Logout</a></h5>
          </div>
      </div>
      

  </body>
  </html>
  `

  const UserProfilePicture = document.getElementById("profilePicture");
  const UserProfile = document.getElementById("userProfile");
  const HideUserProfile = document.querySelectorAll("[id='hideUserProfile']");
  const myProfile = document.getElementById("myProfile");
  const myFooterCopyRight = document.getElementById ("myFooterCopyRight");
  const profilePictureIn = document.getElementById("profilePictureIn");


  const adminPanel = document.getElementById("adminPanel");
  if(fetchedData.loggedInUser.role == "user"){
    adminPanel.style.display = "none";
  }

  //Go to admin panel
  adminPanel.addEventListener("click", ()=>{
    location = "dashboard.html"
})



  const topProfileImage = document.getElementById("topProfileImage");
  topProfileImage.addEventListener("click", ()=>{
      if(UserProfile.style.display !== "none"){
          UserProfile.style.display = "none"
      }

      else {
          UserProfile.style.display = "block"
      }
      })

  // hidding and showing the image profile in the top right corner
  const inProfileImage = document.getElementById("inProfileImage");

  if (fetchedData.loggedInUser.imageLink) {
      UserProfilePicture.style.display = "none"
      profilePictureIn.style.display = "none"
  }

  
  else{
      topProfileImage.style.display = "none"
      inProfileImage.style.display = "none"
  }

  UserProfile.style.display = "none";

  UserProfilePicture.addEventListener("click", ()=>{
  if(UserProfile.style.display !== "none"){
      UserProfile.style.display = "none"
  }

  else {
      UserProfile.style.display = "block"
  }
  })


  for(var i = 0; i < HideUserProfile.length; i++) 
  HideUserProfile[i].addEventListener("click", ()=>{
  UserProfile.style.display = "none"
  })

  

//   myProfile.addEventListener("click", ()=>{
//   UserProfile.style.display = "none"
//   })

//   myFooterCopyRight.addEventListener("click", ()=>{
//   UserProfile.style.display = "none"
//   })


}

loggedInUser()


function preNavLogoutUser(){
    localStorage.removeItem("token")
    location = "../index.html"
  }

const token = localStorage.getItem("token")
if(!token){
const topRightLogin = document.getElementById("addProfile")
    topRightLogin.style.display = "none"
}


