// Variables
let posts = [
    {
        'logo': 'wheat',
        'author': 'weizenBauer',
        'sub': 'Tullnerfeld',
        'img': './img/wheat.jpg',
        'alt': 'wheat',
        'posts': ['Der Weizen ist das wahre Gold. Das Gold, dass man auch essen kann.']
    },
    {
        'logo': 'forest',
        'author': 'wienerWaldAmt',
        'sub': 'Wienerwald',
        'img': './img/forest.jpg',
        'alt': 'forest',
        'posts': ['Ein Spaziergang im Wald verleiht dem Geist neue Kraft und Kreativität.']
    },
    {
        'logo': 'locomotive',
        'author': 'eisenbahnMuseum',
        'sub': 'Österreich',
        'img': './img/locomotive.jpg',
        'alt': 'locomotive',
        'posts': ['Am 12. Dezember 2023 öffnet das Eisenbahnermuseum eine neue Ausstellung zum Thema Eisenbahn & Nostalgie.']
    }
]


//Functions
load();


function showPosts() {
    initializePostCascade();
}


function initializePostCascade() {
    let postCascade = document.getElementById('post-cascade');
    postCascade.innerHTML = '';
    fillPostCascade(postCascade);
}


function fillPostCascade(postCascade) {
    for (let i = 0; i < posts.length; i++) {
        addPostContainer(postCascade, i);
    }
    for (let i = 0; i < posts.length; i++) {    // Bitte ueberdenken!
        writeAddedPosts(i);
    }
}


function addPostContainer(postCascade, i) {    // Bitte HTML-Code ueberdenken!
    postCascade.innerHTML += `
        <article id="post-container-${i}" class="post-container">
            <div id="post-header-${i}" class="post-header">
                <div class="logo-box ${getLogo(i)}"></div>
                <div>
                    <h3 id="author-${i}">${getAuthor(i)}</h3>
                    <span id="sub-text-${i}" class="sub-text">${getSub(i)}</span>
                </div>    
            </div>
            <img id="post-img-${i}" src="${getImg(i)}" alt="${getAlt(i)}" class="post-img">
            <p id="post-collector-${i}" class="post-collector">
                <span id="post-text-${i}" class="post-text">
                    <b id="post-author-${i}">${getAuthor(i)}</b>
                    ${getFirstPost(i)}
                </span>
            </p>
            <form id="post-form-${i}" onsubmit="addPost(${i})">
                <input id="input-post-${i}" class="input-post post-text" type="text" placeholder="Post hinzufügen" required>
            </form>
        </article>
    `;
}


function getLogo(i) {
    return posts[i]['logo'];
}


function getAuthor(i) {
    return posts[i]['author'];
}


function getSub(i) {
    if (posts[i]['sub'].length > 0) {
        return posts[i]['sub'];
    }
}


function getImg(i) {
    return posts[i]['img'];
}


function getAlt(i) {
    return posts[i]['alt'];
}


function getFirstPost(i) {
    return posts[i]['posts'][0];
}


function addPost(i) {
    let post = document.getElementById(`input-post-${i}`).value;
    posts[i]['posts'].push(post);
    saveAndShowPosts();
}

function saveAndShowPosts() {
    save();
    showPosts();
}


function save() {
    let postsAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAsText);
}


function load() {
    let postsAsText = localStorage.getItem('posts');
    if (postsAsText) {
        posts = JSON.parse(postsAsText);
    }
}


function getAddedPosts(i) {
    return posts[i]['posts'];
}


function writeAddedPosts(i) {
    let addedPosts = getAddedPosts(i);
    for (let j = 1; j < addedPosts.length; j++) {
        let postText = document.getElementById(`post-collector-${i}`);
        postText.innerHTML += `
        <span class="post-text">
            <b>ruan</b>
            ${addedPosts[j]}
        </span>
        `;
    }
}