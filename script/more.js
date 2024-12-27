const moreBox = document.querySelector('.moreBox')
const localUrl = 'http://localhost:3000/users';
let newArr = []
async function apiCard(id) {
    let response = await axios.get(localUrl)
    let res = response.data.filter(e => e.id == id)
    renderFn(res)
}
apiCard('1')
function renderFn(data) {
    data.forEach(e => {
        moreBox.innerHTML = `<div class="flex items-center">
        <img class="block w-[200px] object-cover h-[216px]" src="${e.image}" alt="image user">
        <div class="ms-12 space-y-4">
            <div>
                <p class="text-slate-400">name</p>
                <p class="text-[22px] leading-[12px]">${e.name}</p>
            </div>
            <div>
                <p class="text-slate-400">email</p>
                <p class="text-[22px] leading-[12px]">${e.email}</p>
            </div>
            <div>
                <p class="text-slate-400">phone</p>
                <p class="text-[22px] leading-[12px]">${e.phone}</p>
            </div>
            <div>
                <p class="text-slate-400">Date admission</p>
                <p class="text-[22px] leading-[12px]">${e.data}</p>
            </div>
        </div>
</div>`
    });
}
async function username() {
    let date = await axios.get(`http://localhost:3000/logIn`)    
    document.querySelector('.username').textContent =  date.data[0].username
}
username()
document.querySelector('.dashboard__wrapper').classList.add('hidden');
document.querySelector('body').style.backgroundColor = "#FEAF00";

setTimeout(() => {
    document.querySelector('.dashboard__wrapper').classList.remove('hidden');
    document.querySelector('.loader').classList.add('hidden');
}, 1200);

document.querySelector('#file-input').addEventListener('change', (e) => {
    image = document.querySelector('.fileImage').src = URL.createObjectURL(e.target.files[0]);
});

function logOut() {
    window.location.pathname = '/login.html';
}