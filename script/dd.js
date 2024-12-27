const table = document.querySelector('.table');
const tableBody = document.createElement('tbody');
const localUrl = 'http://localhost:3000/users';
let userList = [];
let currentEditId = null;
const modalWrapper = document.querySelector('.modalWrapper');
const formModal = document.querySelector('.modal__form');

document.querySelector('.dashboard__wrapper').classList.add('hidden');
document.querySelector('body').style.backgroundColor = "#FEAF00";

setTimeout(() => {
    document.querySelector('.dashboard__wrapper').classList.remove('hidden');
    document.querySelector('.loader').classList.add('hidden');
}, 1200);

async function moreRender(value) {
    console.log(value);
}
function renderFn(data) {
    tableBody.innerHTML = '';
    data.forEach(el => {
        const td = `<tr class="bg-white border-b-[12px] border-[#F8F8F8] p-2">
            <td class="px-4 py-2 flex items-center gap-3">
                <img src="${el.image}" alt="Avatar" class="w-[65px] rounded-md h-[55px]">
                <span class="username-with-image">
                    ${el.name}
                </span>
            </td>
            <td class="px-4 py-2">${el.email}</td>
            <td class="px-4 py-2">${el.phone}</td>
            <td class="px-4 py-2">${el.eNumber}</td>
            <td class="px-4 py-2">${el.data}</td>
            <td class="px-4 py-2 text-center space-x-4">
                <button onclick="moreList(${el.id})">
                    <i class="fa-solid text-xl fa-ellipsis"></i>
                </button>
                <button onclick="editList(${el.id})" class="text-yellow-500 hover:text-yellow-700">
                    <i class="fa-solid fa-pen"></i>                                  
                </button>
                <button onclick="deleteList(${el.id})" class="text-red-500 hover:text-red-500">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>`;
        tableBody.innerHTML += td;
    });
    table.appendChild(tableBody);
}

document.querySelector('#file-input').addEventListener('change', (e) => {
    image = document.querySelector('.fileImage').src = URL.createObjectURL(e.target.files[0]);
});

formModal.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        image: document.querySelector('.fileImage').src || image,
        name: e.target.username.value,
        email: e.target.email.value, 
        phone: e.target.phone.value,
        eNumber: e.target.number.value,
        data: `${time} ${day}.${month}.${year}`,
    };

    if (!formData.name || !formData.email || !formData.phone || !formData.eNumber) {
        alert('toldirilmagan input bor');
        return;
    }

    try {
        if (currentEditId) {
            await axios.put(`${localUrl}/${currentEditId}`, formData);
        } else {
            await axios.post(localUrl, formData);
        }
        fetchUsers();
        modalCloseHandleBtn();
    } catch (error) {
        console.error('error',error);
    }
});

function editList(id) {
    const user = userList.find(u => u.id == id);
    currentEditId = id;
    formModal.username.value = user.name;
    formModal.email.value = user.email;
    formModal.phone.value = user.phone;
    formModal.number.value = user.eNumber;
    document.querySelector('.fileImage').src = user.image;
    modalWrapper.classList.remove('hidden');
}


async function username() {
    let date = await axios.get(`http://localhost:3000/logIn`)    
    document.querySelector('.username').textContent =  date.data[0].username
}

username()
function moreList(id) {
    apiCard(id)
    document.querySelector('.moreHidden').classList.add('hidden')
    document.querySelector('.moreFlex').classList.remove('hidden')
}
let newArr = []
async function apiCard(id) {
    let response = await axios.get(localUrl)
    let res = response.data.filter(e => e.id == id)
    console.log(res);
    renderFn(res)
}
let moreBox = document.querySelector('.moreBox')
function moreRender(data) {
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
async function fetchUsers(search = '') {
    try {
        const response = await axios.get(localUrl);
        userList = response.data;
        const filteredData = userList.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
        moreRender(filteredData);
    } catch (error) {
        console.error('Error', error);
    }
}

async function deleteList(id) {
    try {
        await axios.delete(`${localUrl}/${id}`);
        fetchUsers();
    } catch (error) {
        console.error('Error', error);
    }
}

function modalAdd() {
    currentEditId = null;
    formModal.reset();
    document.querySelector('.fileImage').src = '';
    modalWrapper.classList.remove('hidden');
}

function modalCloseHandleBtn() {
    currentEditId = null;
    formModal.reset();
    document.querySelector('.fileImage').src = '';
    modalWrapper.classList.add('hidden');
}

modalWrapper.addEventListener('click', (e) => {
    if (e.target.className.includes('modalWrapper')) {
        modalCloseHandleBtn();
    }
});

document.querySelector('.searchUser').addEventListener('input', (e) => {
    fetchUsers(e.target.value);
});

function logOut() {
    window.location.pathname = '/login.html';
}

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
let year = String(new Date().getFullYear()).split('').splice(2, 2).join('');
let time = String(new Date()).split(' ')[4].split(':').splice(0, 2).join(':');
let image = '';

fetchUsers();
