
// Get all staff Services
let servicesContainer = document.getElementById("servicesContainer");
async function getAllServices(){
        
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
        <div class="price-block-two col-lg-4 col-md-6 col-sm-12">
            <div class="inner-box" style="background-image:url(images/background/14.jpg)">
                <div class="upper-box">
                    <div class="month">${eachService.serviceTitle}</div>
                </div>
                <div class="servicesText">
                   ${eachService.serviceDescription}
                </div>
            
            </div>
        </div>
        `
        }

        servicesContainer.innerHTML = serviceTemplate;

        }
        

getAllServices();

