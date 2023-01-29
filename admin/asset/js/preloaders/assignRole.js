const assignRole_preloader = document.getElementById("assignRole_preloader")
function showAssignRoleLoader(){
    assignRole_preloader.classList.add("show")
    document.title = "Loading..."
}
showAssignRoleLoader()