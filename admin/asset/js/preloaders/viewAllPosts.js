const viewAllPosts_preloader = document.getElementById("viewAllPosts_preloader")
function showviewAllPostsLoader(){
    viewAllPosts_preloader.classList.add("show")
    document.title = "Loading..."
}
showviewAllPostsLoader()