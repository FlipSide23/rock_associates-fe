const updatePost_preloader = document.getElementById("updatePost_preloader")
function showupdatePostLoader(){
    updatePost_preloader.classList.add("show")
    document.title = "Loading..."
}
showupdatePostLoader()