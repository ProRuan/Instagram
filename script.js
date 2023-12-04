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
                <img id="logo-${i}" src="${getLogo(i)}" alt="${getAlt(i)}" class="tagesschau-logo">
                <h3 id="author-${i}">${getAuthor(i)}</h3>
            </div>
            <img id="post-img-${i}" src="${getImg(i)}" alt="${getAlt(i)}" class="post-img">
            <div id="post-collector-${i}" class="post-collector">
                <p id="post-text-${i}" class="post-text">
                    <b id="post-author-${i}" class="post-sender">${getAuthor(i)}</b>
                    ${getDescription(i)}<br>
                </p>
                <form id="post-form" onsubmit="addPost(${i})">
                    <input id="input-post-${i}" class="input-post" type="text" placeholder="Post hinzufügen" required>
                </form>
            </div>
        </article>
    `;
}


function getLogo(i) {
    return posts[i]['logo'];
}


function getAlt(i) {
    return posts[i]['alt'];
}


function getAuthor(i) {
    return posts[i]['author'];
}


function getImg(i) {
    return posts[i]['img'];
}


function getDescription(i) {
    return posts[i]['description'];
}


function addPost(i) {    // Bitte bearbeiten!
    let post = document.getElementById(`input-post-${i}`).value;
    posts[i]['posts'].push(post);
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
    for (let j = 0; j < addedPosts.length; j++) {
        let postText = document.getElementById(`post-text-${i}`);
        postText.innerHTML += `
        <b>Ruan</b>
        ${addedPosts[j]}<br>
        `;
    }
}    // Bitte post-collector ueberdenken!