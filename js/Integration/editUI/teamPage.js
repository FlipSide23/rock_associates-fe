
// Get all staff members
let staffContainer = document.getElementById("staffContainer");
async function getAllStaffMembers(){
        
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllMembers", getData)
    
    const allStaff = await response.json(); 
    const results = allStaff.allStaffMembers;

        const staffTemplate = results.map(myFunction).join(' ');

        function myFunction(eachReply) {

            let socialLinks = '';
            if (eachReply.facebookProfile) {
                socialLinks += `<li><a href="${eachReply.facebookProfile}" target="_blank"><span class="fa fa-facebook-f"></span></a></li>`;
            }
            if (eachReply.linkedlinProfile) {
                socialLinks += `<li><a href="${eachReply.linkedlinProfile}" target="_blank"><span class="fa fa-linkedin"></span></a></li>`;
            }
            if (eachReply.twitterProfile) {
                socialLinks += `<li><a href="${eachReply.twitterProfile}" target="_blank"><span class="fa fa-twitter"></span></a></li>`;
            }

            let socialBox = socialLinks ? `<ul class="social-nav">${socialLinks}</ul>` : `<ul class="social-nav invisibleSocialMedias"></ul>`;

        return `
        <div class="team-block-two col-lg-4 col-md-6 col-sm-12">
        <div class="inner-box wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
            <div class="image">
                <img src="${eachReply.image}" alt="" class="staffItem"/>
                ${socialBox}
            </div>
            <div class="lower-content">
                <h3>${eachReply.name}</h3>
                <div class="designation">${eachReply.position}</div>
            </div>
            </div>
        </div>
        `
        }

        staffContainer.innerHTML = staffTemplate;

        }
        

getAllStaffMembers();

