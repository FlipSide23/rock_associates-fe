
// Get all staff members
let aboutUsTextHome = document.getElementById("aboutUsTextHome");
async function getAboutHome(){
        
        const getData = {
            method: "GET",
            headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
        }

        let response = await fetch("http://localhost:5000/getAbout", getData)
        
        const aboutUs = await response.json(); 
        const about = aboutUs.aboutContent;
        console.log(about)

        aboutUsTextHome.innerHTML = about.about.slice(0, 450)+"...";

    }
        

getAboutHome();

