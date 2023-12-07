

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