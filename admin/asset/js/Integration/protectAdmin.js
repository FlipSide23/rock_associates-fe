const checkToken = JSON.parse(localStorage.getItem("token"))
	if (!checkToken){
		location = "../index.html"
	   }

	async function checkLoggedInUser(){
	const getData = {
		method: "GET",
		headers: {"auth_token": JSON.parse(localStorage.getItem("token"))}
	}

	let response = await fetch("https://rockassociates-api.herokuapp.com/loggedInUser", getData)
	const fetchedData = await response.json()
	console.log(fetchedData)

	if(fetchedData.loggedInUser.role !== "admin"){
		location = "../index.html"
	}

}

checkLoggedInUser()