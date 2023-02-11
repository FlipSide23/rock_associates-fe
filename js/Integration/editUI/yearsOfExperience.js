

let yearsOfExperience = document.getElementById("yearsOfExperience");
async function getExperience(){
        
        const getData = {
            method: "GET",
            headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
        }

        let response = await fetch("https://rockassociates-api.herokuapp.com/getExperience", getData)
        
        const ourExperience = await response.json(); 
        const Experience = ourExperience.experienceContent;
        console.log(Experience)

        yearsOfExperience.innerHTML = Experience.yearsOfExperience;

    }
        

getExperience();

