
const url = new URL(window.location.href);
const slug = url.searchParams.get('slug');

async function projectDetails(){ 

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch(`https://rockassociates-api.herokuapp.com/getSingleProject?slug=${slug}`, getData)
    const fetchedData = await response.json() 
    const singleProject = fetchedData.fetchedProject;

    const projectImage = document.getElementById("projectImage")
    projectImage.src = singleProject.projectImage

    const projectDescription = document.getElementById("projectDescription")
    projectDescription.innerHTML = singleProject.description

    const activitesPeformed = document.getElementById("activitesPeformed")
    activitesPeformed.innerHTML = singleProject.activitiesPerformed

    const projectResult = document.getElementById("projectResult")
    projectResult.innerHTML = singleProject.result

    const projectEmployer = document.getElementById("projectEmployer")
    projectEmployer.innerHTML = singleProject.employer

    const projectClient = document.getElementById("projectClient")
    projectClient.innerHTML = singleProject.client

    const projectLocation = document.getElementById("projectLocation")
    projectLocation.innerHTML = singleProject.location

    const projectYear = document.getElementById("projectYear")
    projectYear.innerHTML = singleProject.year


    return {"projectInfo": singleProject};
}

projectDetails()



// Get related projects
let projectsContainer = document.getElementById("projectsContainer");
async function getAllProjects(){
        
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }

    let response = await fetch("https://rockassociates-api.herokuapp.com/getAllProjects", getData)
    
    const allProjects = await response.json(); 
    const allResults = allProjects.allAvailableProjects;
    let results = allResults.filter(project => project.slug !== slug);

    

    const projectsCount = document.getElementById("allProjects")
    projectsCount.innerHTML = results.length

    if(results.length === 0){
        projectsContainer.innerHTML = `
            <div class="perfectCenteredNoItemFound">
                No Project found!
            </div>
        
        `
    }

    else{

        const projectTemplate = results.map(myFunction).join(' ');

        function myFunction(eachProject) {
        let projectClass;
        if(eachProject.category == "Urban Planning and Development in Rwanda"){
            projectClass = "urbanInRwanda"
        }
        else if(eachProject.category == "Design and Supervision of Road Construction Civil Works"){
            projectClass = "designAndSupervision"
        }
        else if(eachProject.category == "Development of the National Policies and Strategies"){
            projectClass = "developmentOfNationalPolicies"
        }
        else if(eachProject.category == "District Land Use Planning and Physical Planning Elaboration"){
            projectClass = "districtLandUse"
        }
        else if(eachProject.category == "Car Parking Feasibility Studies and Detailed Engineering Designs"){
            projectClass = "carParking"
        }
        else if(eachProject.category == "Establishment of Baseline Surveys and District Potentialities Assessment"){
            projectClass = "establishmentOfBaseline"
        }
        else if(eachProject.category == "Sanitary Landfill Feasibility Studies and Detailed Engineering Designs with Environmental and Social Impacts Assessment (ESIA)"){
            projectClass = "sanitaryLandfill"
        }
        else if(eachProject.category == "Capacity Building, Coaching and Knowledge Transfer on Local Economic Development (LED) for Urban Development Project in Rwanda"){
            projectClass = "capacityBuilding"
        }
        else if(eachProject.category == "Other"){
            projectClass = "other"
        }

        // let response = await fetch(`https://rockassociates-api.herokuapp.com/getProjectByCategory?category=${eachProject.category}`, getData)
    
        // const allProjects = await response.json(); 
        // const results = allProjects.fetchedProject;
        // console.log(results.length)

        return `
        <div class="gallery-block masonry-item ${projectClass} all col-lg-4 col-md-6 col-sm-12">
            <div class="inner-box">
                <div class="image">
                    <img src="${eachProject.projectImage}" alt="" />
                    <div class="overlay-box">
                        <div class="options">
                            <a href="projects-detail.html?slug=${eachProject.slug}" class="plus-icon"><span class="icon flaticon-unlink"></span></a>
                            
                        </div>
                        <div class="content clearfix centerProjectTitle">
                            <h3><a href="projects-detail.html?slug=${eachProject.slug}">${eachProject.title}</a></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        }

        projectsContainer.innerHTML = projectTemplate;


        //Filter projects
        if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : '.masonry-item.col-lg-4'
				 },
				animationOptions:{
					duration:0,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 0,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.on('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 0,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= $('.filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}

    }

        }
        

getAllProjects();






    
    
