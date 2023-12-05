// Variables
let posts = [
    {
        'logo': 'wheat',
        'author': 'weizenBauer',
        'sub': 'Tullnerfeld',
        'img': './img/wheat.jpg',
        'alt': 'wheat',
        'likes': 239,
        'like-state': false,
        'comments': ['Der Weizen ist das wahre Gold. Das Gold, dass man auch essen kann.']
    },
    {
        'logo': 'forest',
        'author': 'wienerWaldAmt',
        'sub': 'Wienerwald',
        'img': './img/forest.jpg',
        'alt': 'forest',
        'likes': 126,
        'like-state': false,
        'comments': ['Ein Spaziergang im Wald verleiht dem Geist neue Kraft und Kreativität.']
    },
    {
        'logo': 'locomotive',
        'author': 'eisenbahnMuseum',
        'sub': 'Österreich',
        'img': './img/locomotive.jpg',
        'alt': 'locomotive',
        'likes': 54,
        'like-state': false,
        'comments': ['Am 12. Dezember 2023 öffnet das Eisenbahnermuseum eine neue Ausstellung zum Thema Eisenbahn & Nostalgie.']
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
        writeAddedComments(i);
    }
    setLikeButtons();
}


function addPostContainer(postCascade, i) {    // Bitte HTML-Code ueberdenken!
    postCascade.innerHTML += `
        <article id="post-container-${i}" class="post-container">
            <div id="post-header-${i}" class="post-header">
                <div class="logo-box ${getLogo(i)}"></div>
                <div class="post-header-text">
                    <h3 id="author-${i}">${getAuthor(i)}</h3>
                    <span id="sub-text-${i}" class="sub-text">${getSub(i)}</span>
                </div>    
            </div>
            <img id="post-img-${i}" src="${getImg(i)}" alt="${getAlt(i)}" class="post-img">
            <div id="post-button-bar-${i}" class="post-button-bar">
                <button id="post-like-button-${i}" class="post-like-button" onclick="likePost(${i})">Like</button>
            </div>
            <span id="post-likes-${i}" class="post-likes">${getLikes(i)} Likes</span>
            <p id="comment-collector-${i}" class="comment-collector">
                <span id="comment-text-${i}" class="comment-text">
                    <b id="comment-author-${i}">${getAuthor(i)}</b>
                    ${getFirstComment(i)}
                </span>
            </p>
            <form id="comment-form-${i}" onsubmit="addComment(${i})">
                <input id="input-comment-${i}" class="input-comment comment-text" type="text" placeholder="Kommentar hinzufügen" required>
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


function getLikes(i) {
    if (posts[i]['likes'] > 0) {
        return posts[i]['likes'];
    }
}


function getFirstComment(i) {
    return posts[i]['comments'][0];
}


function addComment(i) {
    let comment = document.getElementById(`input-comment-${i}`).value;
    posts[i]['comments'].push(comment);
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


function likePost(i) {
    if (posts[i]['like-state'] == false) {
        addLike(i);
    } else {
        removeLike(i);
    }
}

function addLike(i) {
    let newLikes = ++posts[i]['likes'];
    let likes = document.getElementById(`post-likes-${i}`);
    likes.innerHTML = `${newLikes} Likes`;
    posts[i]['like-state'] = true;
    document.getElementById(`post-like-button-${i}`).classList.add('post-like-button-used');
    save();
}


function removeLike(i) {
    let newLikes = --posts[i]['likes'];
    let likes = document.getElementById(`post-likes-${i}`);
    likes.innerHTML = `${newLikes} Likes`;
    posts[i]['like-state'] = false;
    document.getElementById(`post-like-button-${i}`).classList.remove('post-like-button-used');
    save();
}


function setLikeButtons() {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]['like-state'] == true) {
            document.getElementById(`post-like-button-${i}`).classList.add('post-like-button-used');
        } else {
            document.getElementById(`post-like-button-${i}`).classList.remove('post-like-button-used');
        }
    }
}


function getAddedComments(i) {
    return posts[i]['comments'];
}


function writeAddedComments(i) {
    let addedComments = getAddedComments(i);
    for (let j = 1; j < addedComments.length; j++) {
        let commentText = document.getElementById(`comment-collector-${i}`);
        commentText.innerHTML += `
        <span id="comment-text-${j}" class="comment-text">
            <b>ruan</b>
            ${addedComments[j]}
        </span>
        `;
    }
}


// letzte Funktionen verbessern!!!