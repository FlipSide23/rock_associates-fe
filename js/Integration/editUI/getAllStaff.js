
// Get all staff members
let staffContainer = document.getElementById("staffContainer");

async function getAllStaffMembers(){
        
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("https://rockassociates-api.herokuapp.com/getAllMembers", getData)
    
    const allStaff = await response.json(); 
    const results = allStaff.allStaffMembers;

    if(results.length === 0){
       staffContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No team added!
            </div>
        
        `
    }

    else{

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

            let socialBox = socialLinks ? `<ul class="social-box">${socialLinks}</ul>` : `<ul class="social-box invisibleSocialMedias"></ul>`;

        return `
            <div class="team-block">
                <div class="inner-box">
                    <div class="image">
                        <img src="${eachReply.image}" alt="" class="staffItem"/>
                        ${socialBox}  
                    </div>
                    <div class="lower-box">
                        <div class="designation">${eachReply.position}</div>
                        <h3><a href="">${eachReply.name}</a></h3>
                    </div>
                </div>
             </div>
        `
        }

        staffContainer.innerHTML = staffTemplate;
    
       // Animate member items

        if ($('.three-item-carousel').length ) {
            $('.three-item-carousel').owlCarousel({
                loop:true,
                margin:30,
                nav:true,
                //autoHeight: true,
                smartSpeed: 500,
                autoplay: 5000,
                navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    800:{
                        items:3
                    },
                    1024:{
                        items:3
                    },
                    1200:{
                        items:3
                    }
                }
            });    		
        }
    
    }

        }
        

getAllStaffMembers();

