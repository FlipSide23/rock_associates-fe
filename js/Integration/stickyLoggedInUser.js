async function loggedInUser(){
    const preNavLoginSticky = document.getElementById("preNavLoginSticky");
    const addProfileSticky = document.getElementById("addProfileSticky");
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
    preNavLoginSticky.style.display = "none"
  }
 
//   document.title = "Ernest Ruzindana"
    
  addProfileSticky.innerHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
      <title>Document</title>

  </head>
  <body>
      <div class="profilePicture" id="profilePictureSticky">
        ${fetchedData.loggedInUser.firstName.charAt(0)}${fetchedData.loggedInUser.lastName.charAt(0)}
      </div>
      <img src="${fetchedData.loggedInUser.imageLink}" class="topProfileImage" id="topProfileImageSticky" alt="">

          
      <div class="userProfileSticy" id="userProfileSticky">
          <div class="profile-pic" id="profile-pic">
                <label class="-label" for="file">
                <span style="margin-top: 6.5px;"><i class="fa-solid fa-camera"></i></span>
                <span>
                    Edit Image
                </span>
                </label>
                <input id="file" onchange="UpdateUserProfile()" type="file" name="profileImage"/>
                
                <div class="profile-picRight" id="profilePicRightSticky">
                ${fetchedData.loggedInUser.firstName.charAt(0)}${fetchedData.loggedInUser.lastName.charAt(0)}
                </div>
                <img src="" id="profileImageLinkSticky" width="200"/>
            </div>
          <p class="removeImage" onclick ="deleteUserProfilePicture()" id="removeImageSticky" style="font-weight: 500;"><i class="fa-solid fa-trash"></i> Remove Image</p>
          <h3>${fetchedData.loggedInUser.firstName} ${fetchedData.loggedInUser.lastName}</h3>
          <p class="userFetchedEmail" style="font-weight: 500;">${fetchedData.loggedInUser.email}</p>

          <div class="switchAccount" style="font-weight: 500; padding: 20px;" id="adminPanelSticky">
                <p class="switchAccountLink" id="dashboardSticky">
                <i class="fas fa-chalkboard-teacher"></i> </nbsp> Admin Panel
                </p>
                <p class="switchAccountLink" id="contactUsSticky">
                <i class="far fa-envelope-open"></i> </nbsp> Contact Me
                </p>
          </div>

          <div class="quote-btn-logout theme-btn">
              <h5><a onClick="preNavLogoutUser()"><i class="fa fa-sign-out"></i> </nbsp>Logout</a></h5>
          </div>
      </div>
      

  </body>
  </html>
  `

        const UserProfilePictureSticky = document.getElementById("profilePictureSticky");
        const UserProfileSticky = document.getElementById("userProfileSticky");
        const HideUserProfileSticky = document.querySelectorAll("[id='hideUserProfileSticky']");
        const profilePicRightSticky = document.getElementById("profilePicRightSticky");
        const profileImageLinkSticky = document.getElementById("profileImageLinkSticky")
        const dashboardSticky = document.getElementById("dashboardSticky");
        const contactUsSticky = document.getElementById("contactUsSticky");
        const profilePicSticky = document.getElementById("profile-picSticky");
        const removeImageSticky = document.getElementById("removeImageSticky");
        removeImageSticky.style.display = "none";
        UserProfileSticky.style.display = "none";

        // Show and hide delete image button
        if (fetchedData.loggedInUser.imageLink && fetchedData.loggedInUser.ImagePresent) {
            removeImageSticky.style.display = "block"
        }

        //show or hide admin panel
        if(fetchedData.loggedInUser.role == "user"){
            dashboardSticky.style.display = "none"
        }
        else{
            contactUsSticky.style.display = "none"
        }
    
        //Go to admin panel
        dashboardSticky.addEventListener("click", ()=>{
            location = "admin/dashboard"
        })
        contactUsSticky.addEventListener("click", ()=>{
            location = "index#contact"
            UserProfileSticky.style.display = "none"
        })

        const topProfileImageSticky = document.getElementById("topProfileImageSticky");
        topProfileImageSticky.addEventListener("click", ()=>{
            if(UserProfileSticky.style.display !== "none"){
                UserProfileSticky.style.display = "none"
            }
    
            else {
                UserProfileSticky.style.display = "block"
            }
            })

        // hidding and showing the image profile in the top right corner 
        console.log(!fetchedData.loggedInUser.ImagePresent)
        if (fetchedData.loggedInUser.imageLink) {
            UserProfilePictureSticky.style.display = "none"
            profileImageLinkSticky.src = fetchedData.loggedInUser.imageLink
            profilePicRightSticky.style.display = "none"
            profilePicSticky.style.marginBottom = "0px"
        }

        else{
            topProfileImageSticky.style.display = "none"
            profileImageLinkSticky.style.display = "none"
        }


        

        UserProfilePictureSticky.addEventListener("click", ()=>{
        if(UserProfileSticky.style.display !== "none"){
            UserProfileSticky.style.display = "none"
        }

        else {
            UserProfileSticky.style.display = "block"
        }
        })


        for(var i = 0; i < HideUserProfileSticky.length; i++) 
        HideUserProfileSticky[i].addEventListener("click", ()=>{
        UserProfileSticky.style.display = "none"
        })

     


}

loggedInUser()
