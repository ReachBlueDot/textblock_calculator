import { TextBlock } from "./TextBlock.mjs";

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


async function handleFilesIn(element) {
    const fileList = element.files;
    console.log(fileList);
    const nameListArray = [];
    let promiseReaders = [];

    for (let item of fileList) {

        //TEST
        console.log(item);

        nameListArray.push(item.name);

        //TEST
        console.log(nameListArray);
    }


    for (let i = 0; i < fileList.length; i++) {
        promiseReaders.push(handleFilesInPromise(fileList[i]));
    }
    Promise.all(promiseReaders).then((val) => {
        console.log("__Reader Results__ ");
        console.log(val);

        for (let i = 0; i < nameListArray.length; i++) {
            let thisText = "";
            let storeFile = false;

            thisText = thisText + val[i];
            console.log(thisText);

            if(localStorage.getItem(nameListArray[i]) !== null) {
                storeFile = confirm(`A file with this name (${nameListArray[i]}) already exists, do you want to replace it?`);
                //TEST
                console.log(storeFile);

                if (storeFile === true) {
                    //TEST
                    console.log("storring file");
                    localStorage.removeItem(nameListArray[i]);

                    //TEST
                    console.log("Local Storage Keys post remove");
                    console.log(Object.keys(localStorage));

                    localStorage.setItem(nameListArray[i], thisText);
                }
            } else {
                localStorage.setItem(nameListArray[i], thisText);
            }

            //TEST
            console.log("Local Storage Keys");
            console.log(Object.keys(localStorage));
            
        }

    });

}






/**
 * ****************IN TESTING*************************************************
 * Show files from Local Storage in a Div
 * takes a div
 */
function showFilesFromLocal(element) {
    const fileList = Object.keys(localStorage);
    for (let item of fileList) {
        const fileDiv = document.createElement("div");
        const node = document.createTextNode(item);
        fileDiv.setAttribute("class", "showDoc");
        fileDiv.appendChild(node);

        element.appendChild(fileDiv);
    }

}


/**
 * Activate file (add to TextBlock targetTexts array as JSON object)
 * takes TextBlock and a TXT file
 */
function activateFile(textBlock, fileName, fileText) {

    //TEST
    console.log("testActivateFile  _");
    console.log(fileText);

    textBlock.targetTexts.set(fileName, fileText);
    console.log("Target Texts Array __");
    console.log(textBlock.targetTexts);


    //TEST
    console.log("end of activate file");
}

export { FileHandler, handleFilesIn, showFilesFromLocal, activateFile }