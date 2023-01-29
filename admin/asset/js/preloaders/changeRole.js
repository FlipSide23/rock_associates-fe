const changeRole_preloader = document.getElementById("changeRole_preloader")
function showChangeRoleLoader(){
    changeRole_preloader.classList.add("show")
    document.title = "Loading..."
}
showChangeRoleLoader() 