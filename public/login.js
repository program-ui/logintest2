const logOutMsg = document.querySelector('.logoutmsg')

window.onbeforeunload = function() {
 sessionStorage.removeItem('logout');
};

(function logOutMessage() {
if(sessionStorage.getItem("logout") === null) { 
  return }

 else {
     logOutMsg.classList.add('show2')
 } 
})()

