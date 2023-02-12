async function loggedInUser(){
    const preNavLogin = document.getElementById("preNavLogin");
    const addProfile = document.getElementById("addProfile");
    // const preNavToken = sessionStorage.getItem("token")
    // if(preNavToken){
    //     preNavLogin.innerHTML = `<img src="../images/Spinner.gif" alt="" width="40px">`
    //     document.title = "Loading..."
    // }

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

  let response = await fetch("https://rockassociates-api.herokuapp.com/loggedInUser", getData)
  const fetchedData = await response.json()
  console.log(fetchedData)

  if(!fetchedData.invalidToken){
    preNavLogin.style.display = "none"
  }
 
//   document.title = "Ernest Ruzindana"
    
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
          <div class="profile-pic" id="profile-pic">
                <label class="-label" for="file">
                <span style="margin-top: 6.5px;"><i class="fa-solid fa-camera"></i></span>
                <span>
                    Edit Image
                </span>
                </label>
                <input id="file" onchange="UpdateUserProfile()" type="file" name="profileImage"/>
                
                <div class="profile-picRight" id="profilePicRight">
                ${fetchedData.loggedInUser.firstName.charAt(0)}${fetchedData.loggedInUser.lastName.charAt(0)}
                </div>
                <img src="" id="profileImageLink" width="200"/>
            </div>
          <p class="removeImage" onclick ="deleteUserProfilePicture()" id="removeImage" style="font-weight: 500;"><i class="fa-solid fa-trash"></i> Remove Image</p>
          <h3>${fetchedData.loggedInUser.firstName} ${fetchedData.loggedInUser.lastName}</h3>
          <p class="userFetchedEmail" style="font-weight: 500;">${fetchedData.loggedInUser.email}</p>

          <div class="switchAccount" style="font-weight: 500; padding: 20px;" id="adminPanel">
                <p class="switchAccountLink" id="dashboard">
                <i class="fas fa-chalkboard-teacher"></i> </nbsp> Admin Panel
                </p>
                <p class="switchAccountLink" id="contactUs">
                <i class="far fa-envelope-open"></i> </nbsp> Contact Us
                </p>
          </div>

          <div class="quote-btn-logout theme-btn">
              <h5><a onClick="preNavLogoutUser()"><i class="fa fa-sign-out"></i> </nbsp>Logout</a></h5>
          </div>
      </div>
      

  </body>
  </html>
  `

        const UserProfilePicture = document.getElementById("profilePicture");
        const UserProfile = document.getElementById("userProfile");
        const HideUserProfile = document.querySelectorAll("[id='hideUserProfile']");
       const profilePicRight = document.getElementById("profilePicRight");
       const profileImageLink = document.getElementById("profileImageLink")
        const dashboard = document.getElementById("dashboard");
        const contactUs = document.getElementById("contactUs");
        const profilePic = document.getElementById("profile-pic");
        const removeImage = document.getElementById("removeImage");
        removeImage.style.display = "none";

        //show or hide admin panel
        if(fetchedData.loggedInUser.role == "user"){
            dashboard.style.display = "none"
        }
        else{
            contactUs.style.display = "none"
        }
    
        //Go to admin panel
        dashboard.addEventListener("click", ()=>{
            location = "admin/dashboard"
        })
        contactUs.addEventListener("click", ()=>{
            location = "index#contact"
            UserProfile.style.display = "none"
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
        console.log(!fetchedData.loggedInUser.ImagePresent)
        if (fetchedData.loggedInUser.imageLink) {
            UserProfilePicture.style.display = "none"
            profileImageLink.src = fetchedData.loggedInUser.imageLink
            profilePicRight.style.display = "none"
            profilePic.style.marginBottom = "0px"
        }

        else{
            topProfileImage.style.display = "none"
            profileImageLink.style.display = "none"
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

     // Show and hide delete image button
        if (fetchedData.loggedInUser.imageLink && fetchedData.loggedInUser.ImagePresent) {
            removeImage.style.display = "block"
        }


}

loggedInUser()
