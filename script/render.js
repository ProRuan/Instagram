// Variables Of Rendering
let posts = [
    {
        'logo': 'wheat',    // logo of author
        'author': 'weizenBauer',    // author of post
        'sub': 'Tullnerfeld',    // location and other details
        'img': './img/wheat.jpg',    // image of post
        'alt': 'wheat',    // alternative text of image
        'likes': 239,    // counter of likes
        'like-state': false,    // state of like-button
        'comments': ['Der Weizen ist das wahre Gold. Das Gold, dass man auch essen kann.'],    // contains the comments of post
        'following': false    // state of follow-button
    },
    {
        'logo': 'forest',
        'author': 'wienerWaldAmt',
        'sub': 'Wienerwald',
        'img': './img/forest.jpg',
        'alt': 'forest',
        'likes': 126,
        'like-state': false,
        'comments': ['Ein Spaziergang im Wald verleiht dem Geist neue Kraft und Kreativität.'],
        'following': false
    },
    {
        'logo': 'locomotive',
        'author': 'eisenbahnMuseum',
        'sub': 'Österreich',
        'img': './img/locomotive.jpg',
        'alt': 'locomotive',
        'likes': 54,
        'like-state': false,
        'comments': ['Am 12. Dezember 2023 öffnet das Eisenbahnermuseum eine neue Ausstellung zum Thema Eisenbahn & Nostalgie.'],
        'following': false
    },
    {
        'logo': 'kettlebell',
        'author': 'kettlebellChallenge',
        'sub': 'Österreich',
        'img': './img/kettlebell.jpg',
        'alt': 'kettlebell',
        'likes': 612,
        'like-state': false,
        'comments': ['Am 07. Dezember 2023 findet die nächste Kettlebell-Challenge statt. Wer eine 20 kg-Kettlebell in auf beiden Seiten mindestens 10-mal hochheben kann, schafft es in die nächste Runde.'],
        'following': false
    },
    {
        'logo': 'coding',
        'author': 'institutOfCodingJakarta',
        'sub': 'Jakarta - Indonesien',
        'img': './img/dna.png',
        'alt': 'dna',
        'likes': 2023,
        'like-state': false,
        'comments': ['Kann KI neues Leben erschaffen? Ein Team internationaler Wissenschaftler wird bei der Veranstaltung Code Of Life in Jakarta im November 2024 versuchen, eine Antwort auf diese Frage zu finden.'],
        'following': false
    }
];    // contains the posts


//Functions Of Rendering
load();    // loads the JSON array 'posts' from the local storage


function showPosts() {    // shows all posts
    let postCascade = document.getElementById('post-cascade');    // contains the id of the element 'post-cascade'
    postCascade.innerHTML = '';    // empties the postCascade
    fillPostCascade(postCascade);
}


function fillPostCascade(postCascade) {    // fills the postCascade
    for (let i = 0; i < posts.length; i++) {
        addPostContainer(postCascade, i);
        writeAddedComments(i);
        setLikeButton(i);
        setEmptyAndDeleteButton(i);
    }

    // Bitte bearbeiten!!!!!!!!!!!!!!!!!!!!
    showRecommendedContacs();
    setFollowButton();
    showNumberOfMyPosts();
}


function addPostContainer(postCascade, i) {    // adds the 'post-container-i'
    postCascade.innerHTML += `
        <article id="post-container-${i}" class="post-container">
            ${writePostHeader(i)}
            ${writePostImg(i)}
            ${writePostButtonBar(i)}
            ${writePostLikes(i)}
            ${writePostCollector(i)}
            ${writeInputComment(i)}
        </article>
    `;    // writes the HTML code of the 'post-container-i'
}


function writePostHeader(i) {    // provides the HTML code for the 'post-header-i'
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


function writePostImg(i) {    // provides the HTML code for the 'post-img-i'
    if (getAuthor(i) == 'ruan') {    // if author is 'ruan' ...
        return getRuansImg();    // return ruan´s image
    } else {    // else ...
        return `
        <img id="post-img-${i}" src="${getImg(i)}" alt="${getAlt(i)}" class="post-img">
    `;    // return image of post i
    }
}


function writePostButtonBar(i) {    // provides the HTML code for the 'post-button-bar-i'
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


function writePostLikes(i) {    // provides the HTML code for the 'post-likes-i'
    return `
        <span id="post-likes-${i}" class="post-likes">${getLikes(i)}</span>
    `;
}


function writePostCollector(i) {    // provides the HTML code for the 'post-collector-i'
    return `
        <p id="comment-collector-${i}" class="comment-collector">
            <span id="comment-text-${i}" class="comment-text">
                <b id="comment-author-${i}">${getAuthor(i)}</b>
                ${getFirstComment(i)}
            </span>
        </p>
    `;
}


function writeInputComment(i) {    // provides the HTML code for the 'input-comment-i'
    return `
        <form id="comment-form-${i}" onsubmit="addComment(${i})">
            <input id="input-comment-${i}" class="input-comment comment-text" type="text" placeholder="Kommentar hinzufügen" required>
        </form>
    `;
}


function getLogo(i) {    // provides the logo of post i
    return posts[i]['logo'];
}


function getAuthor(i) { // provides the author of post i
    return posts[i]['author'];
}


function getSub(i) {    // provides the sub of post i
    if (posts[i]['sub'].length > 0) {    // if sub contains elements ...
        return posts[i]['sub'];    // return sub data
    }
}


function getImg(i) {    // provides the image of post i
    return posts[i]['img'];
}


function getRuansImg() {    // provides the image of 'ruan'
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


function getAlt(i) {    // provides the alternative text of the image of post i
    return posts[i]['alt'];
}


function getLikes(i) {    // provides the likes of post i
    let like = posts[i]['likes'];
    if (like == 1) {    // if their is only 1 like ...
        return like + ' like';    // return '1 like'
    } else {    // else ...
        return like + ' likes'    // return 'x likes'
    }
}


function getFirstComment(i) {    // provides the first comment of post i
    return posts[i]['comments'][0];
}


function addComment(i) {    // adds a new comment to post i
    let comment = document.getElementById(`input-comment-${i}`).value;    // saves the value of 'input-comment-i' in the variable 'cooment'
    posts[i]['comments'].push(comment);    // adds the new comment to post i
    saveAndShowPosts();
}


function writeAddedComments(i) {    // provides the HTML code of the added comments
    let addedComments = getAddedComments(i);    // contains the comments of post i
    writeOneAddedComment(addedComments, i);
}


function writeOneAddedComment(addedComments, i) {    // provides the HTML code of the added comment j
    for (let j = 1; j < addedComments.length; j++) {    // as long as there are comments ...
        let textOfComments = document.getElementById(`comment-collector-${i}`);    // contains the element 'comment-collector-i'
        textOfComments.innerHTML += `
        <span id="comment-text-${j}" class="comment-text">
            <b>ruan</b>
            ${addedComments[j]}
        </span>
        `;    // writes the added commend j
    }
}


function saveAndShowPosts() {    // saves and shows posts
    save();
    showPosts();
}


function save() {    // saves the posts to the local storage
    let postsAsText = JSON.stringify(posts);    // converts 'posts' to a String
    localStorage.setItem('posts', postsAsText);    // saves 'posts' at the local storage
}


function load() {    // loads the posts from the local storage
    let postsAsText = localStorage.getItem('posts');    // loads 'posts' from the local storage
    if (postsAsText) {
        posts = JSON.parse(postsAsText);    // parses the String to the JSON array 'posts'
    }
}