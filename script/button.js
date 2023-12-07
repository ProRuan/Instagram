// Functions Of Buttons
function likePost(i) {    // likes or unlikes the post i
    (likeStateIsFalse(i)) ? addLike(i) : removeLike(i);
}


function likeStateIsFalse(i) {    // returns 'true', if the state of like is 'false'
    return posts[i]['like-state'] == false;
}


function addLike(i) {    // adds a like and the related settings
    let newLikes = ++posts[i]['likes'];    // sets the increased number of likes
    let likes = document.getElementById(`post-likes-${i}`);    // contains the element 'post-likes-i'
    writeLikeOrLikes(newLikes, likes);
    setStateOfLike(i);
    addClassToId(`post-like-button-${i}`, 'post-like-button-activated');
    save();
}


function writeLikeOrLikes(newLikes, likes) {    // writes '1 like' or 'x likes'
    if (newLikes == 1) {    // if there is only 1 like ...
        likes.innerHTML = `${newLikes} Like`;    // write '1 like'
    } else {    // else ...
        likes.innerHTML = `${newLikes} Likes`;    // write 'x likes'
    }
}


function setStateOfLike(i) {    // sets the appropriate state of like of post i
    let stateOfLike = getStateOfLike(i);    // contains the state of like of post i
    if (stateOfLike == false) {    // if the state of like is 'false' ...
        posts[i]['like-state'] = true;    // set 'like-state' = 'true'
    } else {    // else ...
        posts[i]['like-state'] = false;    // set 'like-state' = 'false'
    }
}


function getStateOfLike(i) {    // provides the state of like of post i
    return posts[i]['like-state'];
}


function addClassToId(id, nameOfClass) {    // adds a class to an element
    document.getElementById(id).classList.add(nameOfClass);
}


function removeLike(i) {    // removes the like and the related settings
    let newLikes = --posts[i]['likes'];    // sets the decreased number of likes
    let likes = document.getElementById(`post-likes-${i}`);    // contains the element 'post-likes-i'
    writeLikeOrLikes(newLikes, likes);
    setStateOfLike(i);
    removeClassFromId(`post-like-button-${i}`, 'post-like-button-activated');
    save();
}


function removeClassFromId(id, nameOfClass) {    // removes a class from an element
    document.getElementById(id).classList.remove(nameOfClass);
}


function setLikeButton(i) {    // sets the 'post-like-button-i' respectively to the state of like of post i
    if (getStateOfLike(i) == true) {
        addClassToId(`post-like-button-${i}`, 'post-like-button-activated');
    } else {
        removeClassFromId(`post-like-button-${i}`, 'post-like-button-activated');
    }
}


function deleteAllComments(i) {    // deletes all comments of post i
    let commentCollector = getAddedComments(i);    // contains all comments of post i
    deleteAllAddedComments(commentCollector, i);
    saveAndShowPosts();
    setEmptyAndDeleteButton(i);
}


function getAddedComments(i) {    // provides the comments of post i
    return posts[i]['comments'];
}


function deleteAllAddedComments(commentCollector, i) {    // deletes all added comments of post i
    while (commentCollector.length > 1) {    // as long as there are added comments ...
        let lastIndex = getIndexOfLastComment(i);    // contains the index of the last comment of post i
        commentCollector.splice(lastIndex, 1);    // deletes the last comment of post i
    }
}


function getIndexOfLastComment(i) {    // provides the index of the last comment of post i
    return (posts[i]['comments'].length - 1);
}


function setEmptyAndDeleteButton(i) {    // sets the state of the 'empty-button' and the 'delete-button'
    if (moreThanOneComment(i)) {    // if there are more than one comments, show buttons
        removeDisplayNone(`post-empty-button-${i}`);
        removeDisplayNone(`post-delete-button-${i}`);
    } else {    // else hide buttons
        addDisplayNone(`post-empty-button-${i}`);
        addDisplayNone(`post-delete-button-${i}`)
    }
}


function addDisplayNone(id) {    // adds display:none to an element
    let element = document.getElementById(id);    // contains the element
    element.classList.add('display-none');    // adds the class 'display-none'
}


function removeDisplayNone(id) {    // removes display:none from an element
    let element = document.getElementById(id);    // contains the element
    element.classList.remove('display-none');    // removes the class 'display-none'
}


function moreThanOneComment(i) {    // the first comment is part of the post
    return posts[i]['comments'].length > 1;    // returns 'true', if there are more than one comments
}


function deleteLastComment(i) {    // deletes the last comment of post i
    let lastIndex = getIndexOfLastComment(i);    // contains the index of the last comment of post i
    let commentCollector = posts[i]['comments'];    // contains the comments of post i
    deleteLastCommentAndSetButtons(lastIndex, commentCollector, i);
    saveAndShowPosts();
}


function deleteLastCommentAndSetButtons(lastIndex, commentCollector, i) {    // deletes the last comment and sets the related buttons
    if (commentCollector.length > 2) {    // if there are more than two comments ...
        commentCollector.splice(lastIndex, 1);    // delete the last comment
    } else {    // else
        commentCollector.splice(lastIndex, 1);    // delete the last comment
        setEmptyAndDeleteButton(i)    // and set the 'empty-button' and the 'delete-button'
    }
}