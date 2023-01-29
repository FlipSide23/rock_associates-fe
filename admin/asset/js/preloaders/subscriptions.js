const subscriptions_preloader = document.getElementById("subscriptions_preloader")
function showSubscriptionsLoader(){
    subscriptions_preloader.classList.add("show")
    document.title = "Loading..."
}
showSubscriptionsLoader()