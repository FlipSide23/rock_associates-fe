

let aboutUsText = document.getElementById("aboutUsText");
async function getAbout(){
        
        const getData = {
            method: "GET",
            headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
        }

        let response = await fetch("http://localhost:5000/getAbout", getData)
        
        const aboutUs = await response.json(); 
        const about = aboutUs.aboutContent;
        console.log(about)

        aboutUsText.innerHTML = about.about;

    }
        

getAbout();
