const logoutBtn = document.querySelector('.btn')

logoutBtn.addEventListener('click', () => {
sessionStorage.setItem('logout', 'logout')
})

