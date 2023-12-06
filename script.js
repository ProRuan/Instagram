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
    setButtons();
}


function addPostContainer(postCascade, i) {
    postCascade.innerHTML += `
        <article id="post-container-${i}" class="post-container">
            ${writePostHeader(i)}
            ${writePostImg(i)}
            ${writePostButtonBar(i)}
            ${writePostLikes(i)}
            ${writePostCollector(i)}
            ${writeInputComment(i)}
        </article>
    `;
}


function writePostHeader(i) {
    return `
        <div id="post-header-${i}" class="post-header">
            <div class="logo-box ${getLogo(i)}"></div>
            <div class="post-header-text">
                <h3 id="author-${i}">${getAuthor(i)}</h3>
                <span id="sub-text-${i}" class="sub-text">${getSub(i)}</span>
            </div>    
        </div>
    `;
}


function writePostImg(i) {
    if (getAuthor(i) == 'ruan') {
        return getRuansImg();
    } else {
        return `
        <img id="post-img-${i}" src="${getImg(i)}" alt="${getAlt(i)}" class="post-img">
    `;
    }
}


function writePostButtonBar(i) {
    return `
        <div id="post-button-bar-${i}" class="post-button-bar">
            <button id="post-like-button-${i}" class="post-like-button" onclick="likePost(${i})">Like</button>
            <div id="delete-and-empty-buttons-${i}" class="delete-and-empty-buttons">
                <button id="post-empty-button-${i}" class="post-button" onclick="openDialogBox(${i}, 'empty')"> k - n</button>
                <button id="post-delete-button-${i}" class="post-button" onclick="openDialogBox(${i}, 'delete')">k - 1</button>
            </div>
        </div>
    `;
}


function writePostLikes(i) {
    return `
        <span id="post-likes-${i}" class="post-likes">${getLikes(i)}</span>
    `;
}


function writePostCollector(i) {
    return `
        <p id="comment-collector-${i}" class="comment-collector">
            <span id="comment-text-${i}" class="comment-text">
                <b id="comment-author-${i}">${getAuthor(i)}</b>
                ${getFirstComment(i)}
            </span>
        </p>
    `;
}


function writeInputComment(i) {
    return `
        <form id="comment-form-${i}" onsubmit="addComment(${i})">
            <input id="input-comment-${i}" class="input-comment comment-text" type="text" placeholder="Kommentar hinzufügen" required>
        </form>
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
    let like = posts[i]['likes'];
    if (like == 1) {
        return like + ' like';
    } else {
        return like + ' likes'
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


function getRuansImg() {
    return `
        <div class="rectangle display-center">
            <div class="circle blue-4 display-center">
                <div class="circle blue-3 display-center">
                    <div class="circle blue-2 display-center">
                        <div class="circle blue-1 display-center"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
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
    (likeStateIsFalse(i)) ? addLike(i) : removeLike(i);
}


function likeStateIsFalse(i) {
    return posts[i]['like-state'] == false;
}


function addLike(i) {    // Bitte ueberdenken
    let newLikes = ++posts[i]['likes'];
    let likes = document.getElementById(`post-likes-${i}`);
    if (newLikes != 1) {
        likes.innerHTML = `${newLikes} Likes`;
    } else {
        likes.innerHTML = `${newLikes} Like`;
    }
    posts[i]['like-state'] = true;
    document.getElementById(`post-like-button-${i}`).classList.add('post-like-button-used');
    save();
}


function removeLike(i) {    // Bitte ueberdenken
    let newLikes = --posts[i]['likes'];
    let likes = document.getElementById(`post-likes-${i}`);
    likes.innerHTML = `${newLikes} Likes`;
    posts[i]['like-state'] = false;
    document.getElementById(`post-like-button-${i}`).classList.remove('post-like-button-used');
    save();
}


function setLikeButtons() {    // Bitte ueberdenken
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]['like-state'] == true) {
            document.getElementById(`post-like-button-${i}`).classList.add('post-like-button-used');
        } else {
            document.getElementById(`post-like-button-${i}`).classList.remove('post-like-button-used');
        }
    }
}


function deleteAllComments(i) {    // Bitte ueberdenken
    let commentCollector = posts[i]['comments'];
    while (commentCollector.length > 1) {
        let lastIndex = getIndexOfLastComment(i);
        commentCollector.splice(lastIndex, 1);
    }
    saveAndShowPosts();
    addDisplayNone(`post-empty-button-${i}`);
    addDisplayNone(`post-delete-button-${i}`);
}


function addDisplayNone(id) {
    let element = document.getElementById(id);
    element.classList.add('display-none');
}


function removeDisplayNone(id) {
    let element = document.getElementById(id);
    element.classList.remove('display-none');
}


function setButtons() {
    for (let i = 0; i < posts.length; i++) {
        if (moreThanOneComment(i)) {
            removeDisplayNone(`post-empty-button-${i}`);
            removeDisplayNone(`post-delete-button-${i}`);
        } else {
            addDisplayNone(`post-empty-button-${i}`);
            addDisplayNone(`post-delete-button-${i}`)
        }
    }
}


function moreThanOneComment(i) {
    return posts[i]['comments'].length > 1;
}


function deleteLastComment(i) {    // Bitte ueberdenken
    let lastIndex = getIndexOfLastComment(i);
    let commentCollector = posts[i]['comments'];
    if (commentCollector.length > 2) {
        commentCollector.splice(lastIndex, 1);
        saveAndShowPosts();
    } else {
        commentCollector.splice(lastIndex, 1);
        saveAndShowPosts();
        addDisplayNone(`post-empty-button-${i}`);
        addDisplayNone(`post-delete-button-${i}`);
    }
}


function getIndexOfLastComment(i) {
    return (posts[i]['comments'].length > 1);
}


function getAddedComments(i) {
    return posts[i]['comments'];
}


function writeAddedComments(i) {    // Bitte ueberdenken
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




let deliveredIndex = 0;
let requestedAction = 'delete';

function openDialogBox(index, action) {
    removeDisplayNone('dialog-box-background');
    setTextOfDialogBox(action);
    deliveredIndex = index;
    requestedAction = action;
}


function confirmAction() {
    let yesButton = document.getElementById('yes-button');
    if (requestedAction == 'empty') {
        deleteAllComments(deliveredIndex);
    } else if (requestedAction == 'delete') {
        deleteLastComment(deliveredIndex);
    } else if (requestedAction == 'post') {
        addPost();
    }
    closeDialog();
}


function setTextOfDialogBox(action) {
    let dialogBox = document.getElementById('dialog-box');
    if (action == 'empty') {
        dialogBox.innerHTML = `
            <span id="dialog-box-text">
                Wollen Sie wirklich <b>alle</b> Kommentare löschen?
            </span>
            <div id="dialog-box-button-bar" class="jc-space-between">
                <button id="yes-button" class="post-button" onclick="confirmAction()">Ja</button>
                <button id="no-button" class="post-button" onclick="closeDialog()">Nein</button>
            </div>
        `;
    } else if (action == 'delete') {
        dialogBox.innerHTML = `
            <span id="dialog-box-text">
                Wollen Sie den <b>letzen</b> Kommentar löschen?
            </span>
            <div id="dialog-box-button-bar" class="jc-space-between">
                <button id="yes-button" class="post-button" onclick="confirmAction()">Ja</button>
                <button id="no-button" class="post-button" onclick="closeDialog()">Nein</button>
            </div>
        `;
    } else if (action == 'post') {
        dialogBox.innerHTML = `
            <form id="post-form" class="post-form" onsubmit="confirmAction()">
                <input id="input-post" class="input-post" name="input-post" type="text" placeholder="Post hinzufügen" required>
                <div id="dialog-box-button-bar" class="jc-space-between">
                    <button id="accept-button" class="post-button" onsubmit="confirmAction()">Posten
                    <button id="reject-button" class="post-button" onclick="closeDialog()">Schließen
                </div>
            </form>
        `;
    }
}


function closeDialog() {
    addDisplayNone('dialog-box-background');
}


function getNextIndex() {
    return posts.length;
}


function addPost() {
    let input = document.getElementById('input-post').value;
    posts[deliveredIndex] = {
        'logo': 'ruan',
        'author': 'ruan',
        'sub': 'Tulln an der Donau',
        'img': './img/wheat.jpg',
        'alt': 'wheat',
        'likes': 0,
        'like-state': false,
        'comments': [input]
    };
    saveAndShowPosts();
    location.href = `#post-container-${deliveredIndex}`;
}
// Angemerkte Funktionen verbessern!!!