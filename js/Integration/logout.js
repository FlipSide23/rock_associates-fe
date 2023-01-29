
function preNavLogoutUser(){
    localStorage.removeItem("token")
    history.go(0)
  }