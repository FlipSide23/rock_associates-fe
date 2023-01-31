
// Get all staff members

async function getAllStaffMembers(){
        
    let response = await fetch("https://rockassociates.cyclic.app/getAllMembers")
    
    const allStaff = await response.json(); 
    const results = allStaff.staffMembers;
    document.title = "Rock Associates Company Ltd | Dashboard"
   
    for(let i=0;i<results.length;i++){
        let staffContainer = document.getElementById("staffContainer");

        let resultsArray = results[i];

        let name = resultsArray.name;
        let position   = resultsArray.position;
        let resultId = resultsArray._id
        let image = resultsArray.image;

        let staffTemplate = `
        <div class="team-block" id="${resultId}">
        <div class="inner-box">
            <div class="image">
                <img src="${image}" alt="" />
                <ul class="social-box">
                    <li><a href="#"><span class="fa fa-facebook-f"></span></a></li>
                    <li><a href="#"><span class="fa fa-linkedin"></span></a></li>
                    <li><a href="#"><span class="fa fa-twitter"></span></a></li>
                    <li><a href="#"><span class="fa fa-pinterest-p"></span></a></li>
                    <li><a href="#"><span class="fa fa-google-plus"></span></a></li>
                </ul>
            </div>
            <div class="lower-box">
                <div class="designation">${position}</div>
                <h3><a href="">${name}</a></h3>
            </div>
        </div>
       </div>
        `
        staffContainer.innerHTML += staffTemplate;
    
    }
    
        }
        

getAllStaffMembers();



//Staff Socials

{/* <ul class="social-box">
    <li><a href="#"><span class="fa fa-facebook-f"></span></a></li>
    <li><a href="#"><span class="fa fa-linkedin"></span></a></li>
    <li><a href="#"><span class="fa fa-twitter"></span></a></li>
    <li><a href="#"><span class="fa fa-pinterest-p"></span></a></li>
    <li><a href="#"><span class="fa fa-google-plus"></span></a></li>
</ul> */}