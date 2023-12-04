// Variables
let posts = [
    {
        'logo': './img/tagesschau-logo',
        'author': 'Weizen-Bauer',
        'location': 'Tullnerfeld',
        'img': './img/wheat.jpg',
        'alt': 'wheat',
        'description': 'Der Weizen ist das wahre Gold. Das Gold, dass man auch essen kann.'
    },
    {
        'logo': './img/tagesschau-logo',
        'author': 'tagesschau',
        'location': 'Vienna',
        'img': './img/forest.jpg',
        'alt': 'forest',
        'description': 'Ein Spaziergang im Wald verleiht dem Geist neue Kraft und Kreativität.'
    },
    {
        'logo': './img/tagesschau-logo',
        'author': 'tagesschau',
        'location': 'Vienna',
        'img': './img/tagesschau.png',
        'alt': 'tagesschau-logo',
        'description': 'Das Londoner Sea Life Aquarium'
    }
]


//Functions
function showPosts() {
    initializePostContainer();

}


function initializePostContainer() {
    let postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';
    fillPostContainer(postContainer);
}


function fillPostContainer(postContainer) {
    for (let i = 0; i < posts.length; i++) {
        loadPost(postContainer, i);
    }
}


function loadPostHeader(postContainer, i) {
    postContainer.innerHTML += `
        <div id="post-header-${i}" class="post-header">
            <img id="logo-${i}" src="${logo(i)}" alt="${alt(i)}" class="tagesschau-logo">
            <h3 id="author-${i}">${author(i)}</h3>
        </div>
    `;
}


function loadPostImg(postContainer, i) {
    postContainer.innerHTML += `
        <img id="post-img-${i}" src="${img(i)}" alt="${alt(i)}" class="post-img">
    `;
}


function loadPostCollector(postContainer, i) {
    postContainer.innerHTML += `
        <div id="post-collector-${i}" class="post-collector">
            
            <p id="post-text-${i}" class="post-text">
                <b id="post-author-${i}" class="post-sender">${author(i)}</b>
                ${description(i)}
            </p>
        </div>
    `;
}


function loadPost(postContainer, i) {
    loadPostHeader(postContainer, i);
    loadPostImg(postContainer, i);
    loadPostCollector(postContainer,i);
}


function logo(i) {
    return posts[i]['logo'];
}


function alt(i) {
    return posts[i]['alt'];
}


function author(i) {
    return posts[i]['author'];
}


function img(i) {
    return posts[i]['img'];
}

function description(i) {
    return posts[i]['description'];
}