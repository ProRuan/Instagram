// Variables Of Dialog Box
let deliveredIndex = 0;    // contains the delivered index of the element i
let requestedAction = 'delete';    // contains the requested actions of the triggering button


// Functions Of Dialog Box
function openDialogBox(index, action) {    // opens the 'dialog-box'
    removeDisplayNone('dialog-box-background');
    setUpDialogBox(action);
    deliveredIndex = index;    // receives the delivered index of the element i
    requestedAction = action;    // receives the delivered action of the triggering button
}


function setUpDialogBox(action) {    // sets the text of the dialog box
    let dialogBox = document.getElementById('dialog-box');    // contains the 'dialog-box'
    setTextOfAction(action, dialogBox);
}


function setTextOfAction(action, dialogBox) {    // sets the text of the dialog box depending on the requested action
    if (action == 'empty') {
        setTextForEmtpyingComments(dialogBox);
    } else if (action == 'delete') {
        setTextForDeletingAComment(dialogBox);
    } else if (action == 'post') {
        setTextForAddingAPost(dialogBox);
    }
}


function setTextForEmtpyingComments(dialogBox) {    // provides the text for deleting all comments
    return dialogBox.innerHTML = `
        <span id="dialog-box-text">
            Wollen Sie wirklich <b>alle</b> Kommentare löschen?
        </span>
        <div id="dialog-box-button-bar" class="jc-space-between">
            <button id="yes-button" class="post-button" onclick="confirmAction()">Ja</button>
            <button id="no-button" class="post-button" onclick="closeDialog()">Nein</button>
        </div>
    `;
}


function setTextForDeletingAComment(dialogBox) {    // provides the text for deleting the last comment
    return dialogBox.innerHTML = `
        <span id="dialog-box-text">
            Wollen Sie den <b>letzen</b> Kommentar löschen?
        </span>
        <div id="dialog-box-button-bar" class="jc-space-between">
            <button id="yes-button" class="post-button" onclick="confirmAction()">Ja</button>
            <button id="no-button" class="post-button" onclick="closeDialog()">Nein</button>
        </div>
    `;
}


function setTextForAddingAPost(dialogBox) {    // provides the text for adding a post
    return dialogBox.innerHTML = `
        <form id="post-form" class="post-form" onsubmit="confirmAction()">
            <input id="input-post" class="input-post" name="input-post" type="text" placeholder="Post hinzufügen" required>
            <div id="dialog-box-button-bar" class="jc-space-between">
                <button id="accept-button" class="post-button" onsubmit="confirmAction()">Posten
                <button id="reject-button" class="post-button" onclick="closeDialog()">Schließen
            </div>
        </form>
    `;
}


function confirmAction() {    // confirms the requested action
    executeRequestedAction();
    closeDialog();
}


function executeRequestedAction() {    // executes the requested action
    if (requestedAction == 'empty') {
        deleteAllComments(deliveredIndex);
    } else if (requestedAction == 'delete') {
        deleteLastComment(deliveredIndex);
    } else if (requestedAction == 'post') {
        addPost();
    }
}


function closeDialog() {    // close the dialog box
    addDisplayNone('dialog-box-background');
}