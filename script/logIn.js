const loginForm = document.querySelector('.logIn__form')
let loader = document.querySelector('.loader')
const logInWrapper = document.querySelector('.logIn__wrapper')
const localUrl = 'http://localhost:3000/logIn'
let newArr = []

logInWrapper.classList.add('hidden')
async function addCard() {
    let response = await axios.get(localUrl)
    let arr = {
        userList:response.data[0].username,
        password:response.data[0].password,
    }
    newArr.push(arr)
}
addCard()
setTimeout(() => {
logInWrapper.classList.remove('hidden')
loader.classList.add('hidden')
}, 1200);
loginForm.addEventListener('submit',(e) => {
    e.preventDefault()
    let data = {
        username:e.target.username.value,
        password:e.target.password.value,
    }
    function logIn() {
        if (data.username == newArr[0].userList && data.password == newArr[0].password) {
            try{
                window.location.pathname = '/dashboard.html'
                e.target.reset()
            }
            catch(error){
                console.error('Error:',error);
            }
        }
    }
    logIn()
})