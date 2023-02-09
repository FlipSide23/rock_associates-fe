
async function countCategories(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
    }
    
    //Urban Planning and Development in Rwanda
    let response = await fetch("http://localhost:5000/getProjectByCategory?category=Urban Planning and Development in Rwanda", getData)
    const fetchedData = await response.json() 
    const singleProject = fetchedData.fetchedProject;
    
    const urbanInRwanda = document.getElementById("urbanInRwanda")
    urbanInRwanda.innerHTML = singleProject.length

    //Design and Supervision of Road Construction Civil Works
    let response1 = await fetch("http://localhost:5000/getProjectByCategory?category=Design and Supervision of Road Construction Civil Works", getData)
    const fetchedData1 = await response1.json() 
    const singleProject1 = fetchedData1.fetchedProject;
    
    const designAndSupervision = document.getElementById("designAndSupervision")
    designAndSupervision.innerHTML = singleProject1.length

    //Development of the National Policies and Strategies
    let response2 = await fetch("http://localhost:5000/getProjectByCategory?category=Development of the National Policies and Strategies", getData)
    const fetchedData2 = await response2.json() 
    const singleProject2 = fetchedData2.fetchedProject;
    
    const developmentOfNationalPolicies = document.getElementById("developmentOfNationalPolicies")
    developmentOfNationalPolicies.innerHTML = singleProject2.length

    //District Land Use Planning and Physical Planning Elaboration
    let response3 = await fetch("http://localhost:5000/getProjectByCategory?category=District Land Use Planning and Physical Planning Elaboration", getData)
    const fetchedData3 = await response3.json() 
    const singleProject3 = fetchedData3.fetchedProject;
    
    const districtLandUse = document.getElementById("districtLandUse")
    districtLandUse.innerHTML = singleProject3.length

     //Car Parking Feasibility Studies and Detailed Engineering Designs
    let response4 = await fetch("http://localhost:5000/getProjectByCategory?category=Car Parking Feasibility Studies and Detailed Engineering Designs", getData)
    const fetchedData4 = await response4.json() 
    const singleProject4 = fetchedData4.fetchedProject;
    
    const carParking = document.getElementById("carParking")
    carParking.innerHTML = singleProject4.length

     //Establishment of Baseline Surveys and District Potentialities Assessment
    let response5 = await fetch("http://localhost:5000/getProjectByCategory?category=Establishment of Baseline Surveys and District Potentialities Assessment", getData)
    const fetchedData5 = await response5.json() 
    const singleProject5 = fetchedData5.fetchedProject;
    
    const establishmentOfBaseline = document.getElementById("establishmentOfBaseline")
    establishmentOfBaseline.innerHTML = singleProject5.length

     //Sanitary Landfill Feasibility Studies and Detailed Engineering Designs with Environmental and Social Impacts Assessment (ESIA)
    let response6 = await fetch("http://localhost:5000/getProjectByCategory?category=Sanitary Landfill Feasibility Studies and Detailed Engineering Designs with Environmental and Social Impacts Assessment (ESIA)", getData)
    const fetchedData6 = await response6.json() 
    const singleProject6 = fetchedData6.fetchedProject;
    
    const sanitaryLandfill = document.getElementById("sanitaryLandfill")
    sanitaryLandfill.innerHTML = singleProject6.length

    //Capacity Building, Coaching and Knowledge Transfer on Local Economic Development (LED) for Urban Development Project in Rwanda
    let response7 = await fetch("http://localhost:5000/getProjectByCategory?category=Capacity Building, Coaching and Knowledge Transfer on Local Economic Development (LED) for Urban Development Project in Rwanda", getData)
    const fetchedData7 = await response7.json() 
    const singleProject7 = fetchedData7.fetchedProject;
    
    const capacityBuilding = document.getElementById("capacityBuilding")
    capacityBuilding.innerHTML = singleProject7.length

    //Other
    let response8 = await fetch("http://localhost:5000/getProjectByCategory?category=Other", getData)
    const fetchedData8 = await response8.json() 
    const singleProject8 = fetchedData8.fetchedProject;
    
    const otherProjects = document.getElementById("otherProjects")
    otherProjects.innerHTML = singleProject8.length
}

countCategories()
