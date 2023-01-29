
const countUsers = document.getElementById("countUsers")
const countPosts = document.getElementById("countPosts")
var counterContainer = document.querySelector("#website-counter");
const countTraffic = document.getElementById("countTraffic")

async function users(){
    document.title = "Loading..."
    countUsers.innerHTML = `<img src="../../../images/icons/spinner.gif" alt="" width="40px">`
    countPosts.innerHTML = `<img src="../../../images/icons/spinner.gif" alt="" width="40px">`
    counterContainer.innerHTML = `<img src="../../../images/icons/spinner.gif" alt="" width="40px">`
    countTraffic.innerHTML = `<img src="../../../images/icons/spinner.gif" alt="" width="40px">`
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
// Registered Users
  let response = await fetch("http://localhost:5000/getRegisteredUsers", getData)
  const fetchedData = await response.json()
   
    const users = fetchedData.RegisteredUsers;

    countUsers.innerHTML = users.length;

// Number of posts
let postsResponse = await fetch("http://localhost:5000/getAllPosts", getData)
    const postsFetchedData = await postsResponse.json()

    const posts = postsFetchedData.allAvailablePosts;

    
    countPosts.innerHTML = posts.length;


    // Subscribers

let subscriptionResponse = await fetch("http://localhost:5000/getAllSubscriptions")
    
    const allResults = await subscriptionResponse.json(); 
    const results = allResults.subscribers;
counterContainer.innerHTML = results.length


// Client Messages
    let responseMessages = await fetch("http://localhost:5000/getAllMessages")
    
    const allResultsMessages = await responseMessages.json(); 
    document.title = "Rock Associates Company Ltd | Dashboard"
    const resultsMessages = allResultsMessages.clientMessages.length;
    
    countTraffic.innerHTML = resultsMessages;
    
}



users()