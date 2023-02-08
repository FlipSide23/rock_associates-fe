
// Get all staff Services
let homeServicesContainer = document.getElementById("homeServicesContainer");
async function getServices(){
        
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/getAllServices", getData)
    
    const allStaff = await response.json(); 
    const results = allStaff.allServices;

        const serviceTemplate = results.map(myFunction).join(' ');

        function myFunction(eachService) {

        return `
        <div class="services-block-two">
            <div class="inner-box">
                <h3><a href="services-detail.html">${eachService.serviceTitle.slice(0, 40)+"..."}</a></h3>
                <div class="text">${eachService.serviceDescription.slice(0, 150)+"..."}</div>
                
            </div>
        </div>
`
        }

        homeServicesContainer.innerHTML = serviceTemplate;

        // Services Carousel
	if ($('.services-carousel').length) {
		$('.services-carousel').owlCarousel({
			loop:true,
			margin:0,
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
					items:1
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
        

getServices();

