import { TextBlock, addChildTextDiv } from "./TextBlock.mjs";

class FileHandler {
    constructor() {
        this.storedFiles = [];
    }

}

/**
 * Add selected files to local storage
 * takes element file picker
 */
function handleFilesInPromise(file) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function () {
            reject(reader);
        };
        reader.readAsText(file);
    });
}


async function handleFilesIn(filesElement, loadElement) {
    const fileList = filesElement.files;
    console.log(fileList);
    const nameListArray = [];
    let promiseReaders = [];

    for (let item of fileList) {

        nameListArray.push(item.name);

    }


    for (let i = 0; i < fileList.length; i++) {
        promiseReaders.push(handleFilesInPromise(fileList[i]));
    }
    Promise.all(promiseReaders).then((val) => {

        for (let i = 0; i < nameListArray.length; i++) {
            let thisText = "";
            let storeFile = false;

            thisText = thisText + val[i];

            if (sessionStorage.getItem(nameListArray[i]) !== null) {
                storeFile = confirm(`A file with this name (${nameListArray[i]}) already exists, do you want to replace it?`);

                if (storeFile === true) {

                    sessionStorage.removeItem(nameListArray[i]);

                    sessionStorage.setItem(nameListArray[i], thisText);
                }
            } else {
                sessionStorage.setItem(nameListArray[i], thisText);
            }

            loadElement.click();
        }

    });



}






/**
 * Show files from Session Storage in a Div
 * takes a div
 */
function showFilesFromSession(element, textBlock) {
    const fileList = Object.keys(sessionStorage);
    for (let item of fileList) {
        const fileDiv = document.createElement("div");
        fileDiv.setAttribute("class", "showDoc");

        const activeCheck = document.createElement("input");
        activeCheck.setAttribute("type", "checkbox");
        activeCheck.setAttribute("class", "activeCheck");
        activeCheck.setAttribute("id", `${item}`);
        activeCheck.setAttribute("title", `${item}`)

        if (textBlock.targetTexts.has(item)) {

            activeCheck.setAttribute("checked", "true");
        }
        
        const activeFileLable = document.createElement("lable");
        activeFileLable.setAttribute("for", `${item}`);
        activeFileLable.innerText = item;

        fileDiv.appendChild(activeCheck);
        fileDiv.appendChild(activeFileLable);


        element.appendChild(fileDiv);
    }

}


/**
 * Activate file (add to TextBlock targetTexts array as JSON object)
 * takes TextBlock and a TXT file
 */
function activateFile(textBlock, fileName, fileText) {

    textBlock.targetTexts.set(fileName, fileText);

}

export { FileHandler, handleFilesIn, showFilesFromSession, activateFile }