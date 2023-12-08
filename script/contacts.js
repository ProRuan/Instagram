function showRecommendedContacts() {    // shows the recommended contacts
    let recommendedContacts = document.getElementById('recommended-contacts-container');    // contains the element 'recommended-contacts-container'
    recommendedContacts.innerHTML = '';    // empties the 'recommended-contacts-container'
    fillRecommendedContacts(recommendedContacts);
    setFollowButton();
}


function fillRecommendedContacts(recommendedContacts) {    // writes the HTML code of the recommended contacts
    for (let i = 0; i < 5; i++) {    // there are 5 recommended contacts ...
        recommendedContacts.innerHTML += `
            <div class="other-contacts contact-container">
                <div class="logo-box ${getLogo(i)}"></div>
                <div class="other-contacts-text">
                    <h3 id="author">${getAuthor(i)}</h3>
                    <span id="sub-text" class="sub-text">${getSub(i)}</span>
                </div>
                <button id="follow-button-${i}" class="post-button follow-button" onclick="follow(${i})">Folgen</button>
            </div>
        `;    // writes the recommended contact i
    }
}


function follow(i) {    // sets the state of following
    setStateOfFollowing(i);
    saveAndShowPosts();
}


function setStateOfFollowing(i) {    // sets the state of following of post i
    if (getFollowing(i) == false) {    // if the state of following of post i == 'false'
        posts[i]['following'] = true;    // sets state of following == 'true'
        addClassToId(`follow-button-${i}`, 'follow-button-activated');
    } else {    // else ...
        posts[i]['following'] = false;    // sets state of following == 'false'
        removeClassFromId(`follow-button-${i}`, 'follow-button-activated');
    }
}


function getFollowing(i) {    // returns the state of following of post i
    return posts[i]['following'];
}


function setFollowButton() {    // sets the follow-button
    for (let i = 0; i < 5; i++) {    // there are 5 recommended contacts ...
        if (getFollowing(i) == true) {    // if state of following == 'true'
            addClassToId(`follow-button-${i}`, 'follow-button-activated');
        } else {
            removeClassFromId(`follow-button-${i}`, 'follow-button-activated');
        }
    }
}