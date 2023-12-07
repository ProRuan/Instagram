


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
    return (posts[i]['comments'].length - 1);
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


function showRecommendedContacs() {
    let recommendedContacts = document.getElementById('recommended-contacts-container');
    recommendedContacts.innerHTML = '';
    fillRecommendedContacts(recommendedContacts);
}


function fillRecommendedContacts(recommendedContacts) {
    for (let i = 0; i < 5; i++) {
        recommendedContacts.innerHTML += `
            <div class="other-contacts contact-container">
                <div class="logo-box ${getLogo(i)}"></div>
                <div class="other-contact-text">
                    <h3 id="author">${getAuthor(i)}</h3>
                    <span id="sub-text" class="sub-text">${getSub(i)}</span>
                </div>
                <button id="follow-button-${i}" class="follow-button" onclick="follow(${i})">Folgen</button>
            </div>
        `;
    }
}


function follow(i) {
    if (posts[i]['following'] == false) {
        posts[i]['following'] = true;
        document.getElementById(`follow-button-${i}`).classList.add('follow-button-active');
    } else {
        posts[i]['following'] = false;
        document.getElementById(`follow-button-${i}`).classList.remove('follow-button-active');
    }
    saveAndShowPosts();
}


function setFollowButton() {
    for (let i = 0; i < 5; i++) {
        if (posts[i]['following'] == true) {
            document.getElementById(`follow-button-${i}`).classList.add('follow-button-active');
        } else {
            document.getElementById(`follow-button-${i}`).classList.remove('follow-button-active');
        }
    }
}


let levelCounter = 0;

function closeDialogIf(id) {
    setLevelCounterIf(id);
    decreaseLevelCounter();
    levelCounterLessThanOne();
}


function setLevelCounterIf(id) {
    if (id == 'dialog-box') {
        levelCounter = 3;
    }
}


function decreaseLevelCounter() {
    return (levelCounter > 0) ? levelCounter-- : levelCounter = 0;
}


function levelCounterLessThanOne() {
    if (levelCounter < 1) {
        closeDialog();
    }
}


function showNumberOfMyPosts() {
    let counter = document.getElementById('counter-of-my-posts');
    let sum = countMyPosts();
    counter.innerHTML = `<b>Meine Posts: ${sum}</b>`;
}


function countMyPosts() {
    let sum = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]['author'] == 'ruan') {
            sum++;
        }
    }
    return sum;
}


function goToTop() {
    location.href = '#body';
}