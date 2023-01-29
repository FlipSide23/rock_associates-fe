const messages_preloader = document.getElementById("messages_preloader")
function showMessagesLoader(){
    messages_preloader.classList.add("show")
    document.title = "Loading..."
}
showMessagesLoader() 