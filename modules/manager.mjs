import { TextBlock } from "./TextBlock.mjs";
import { FileHandler } from "./FileHandler.mjs";
import { linearConverter, weightConverter } from "./converters.mjs";

/*
* TEST GET DEFAULT SETTINGS IMPORT
* get TextBlock atributes to configuration json file for TextBlock settings
*/
async function getJSONconfig(path) {
    const response = await fetch(path);
    const jsonData = await response.json();

    //TEST
    console.log("JSON fetched");
    console.log(jsonData);

    return jsonData;
}

/*
* TEST FOR DEFAULT SETTINGS IMPORT
* set TextBlock atributes to configuration json file for TextBlock settings
*/
function setJSONconfig(textBlock, jsonData) {
    textBlock.linearUnit = jsonData.linearUnit;
    textBlock.weightUnit = jsonData.weightUnit;
    textBlock.pageWidth = jsonData.pageWidth;
    textBlock.pageHeight = jsonData.pageHeight;
    textBlock.paperGSM = jsonData.paperGSM;
    textBlock.topBottomMargin = jsonData.topBottomMargin;
    textBlock.insideMargin = jsonData.insideMargin;
    textBlock.outsideMargin = jsonData.outsideMargin;
    textBlock.targetFontPt = jsonData.targetFontPt;
    textBlock.fontFamily = jsonData.fontFamily;
    textBlock.lineSpacing = jsonData.lineSpacing;
    textBlock.paragraphSpacing = jsonData.paragraphSpacing;
    textBlock.flyLeaves = jsonData.flyLeaves;
    textBlock.titlePage = jsonData.titlePage;
    textBlock.tableOfContentsPage = jsonData.tableOfContentsPage;
    textBlock.infoPage = jsonData.infoPage;
    textBlock.pagePerSectionHead = jsonData.pagePerSectionHead;
    textBlock.imagePages = jsonData.imagePages;
}



/*
* TEST POPULATE PAGE SETTINGS 
* populate select with page size options from json config
*/
async function populatePageSizeSelect(element, path) {
    const response = await fetch(path);
    const jsonData = await response.json();

    //TEST
    console.log("JSON fetched");
    console.log(jsonData);

    let htmlString = "";
    //htmlString += `<option value = '-1'>default page sizes</option>`;
    if(jsonData) {
        jsonData.pages.forEach (pages => {
            htmlString += `<option value='${pages.name}'>${pages.name}</option>`;
        });
        console.log(element);
        document.querySelector(element).innerHTML = htmlString;
    }
} 

/*
* PAPER DEFAULT SETTINGS SET TEXTBLOCK
* get TextBlock atributes to configuration json file for TextBlock settings
*/
async function getJSONpageSize(path, pageName) {
    const response = await fetch(path);
    const jsonData = await response.json();

    let pageInfo;

    jsonData.pages.forEach (pages => {
        if (pages.name === pageName) {

            console.log(pages);
            pageInfo = pages;
        }
    });

    //test
    return pageInfo;
}


/*
* PAPER DEFAULT SETTINGS SET TEXTBLOCK
* set TextBlock atributes to configuration json file for TextBlock settings
*/
function setJSONpageSize(textBlock, jsonData) {
    textBlock.pageWidth = jsonData.pageWidth;
    textBlock.pageHeight = jsonData.pageHeight;
    textBlock.topBottomMargin = jsonData.topBottomMargin;
    textBlock.insideMargin = jsonData.insideMargin;
    textBlock.outsideMargin = jsonData.outsideMargin;
}




/*
* set element values to match TextBlock settings
*/
function setViewToConfig(textBlock) {
    //Linear Unit
    document.querySelectorAll('input[name="pageLinearUnit"]').forEach((element) => {
        if (element.value === textBlock.linearUnit) {
            //TEST
            console.log(`match LU __ ${element.value} is ${textBlock.linearUnit}`);
            
            document.getElementById(`${element.id}`).checked = true
        }
    });
    //Weight Unit
    document.querySelectorAll('input[name="pageWeightUnit"]').forEach((element) => {
        if (element.value === textBlock.weightUnit) {
            //TEST
            console.log(`match LU __ ${element.value} is ${textBlock.weightUnit}`);
            
            document.getElementById(`${element.id}`).checked = true
        }
    });
    //Page Width
    document.querySelector('#widthInput').setAttribute("placeholder", linearConverter(textBlock.pageWidth, "px", textBlock.linearUnit).toFixed(1) );
    document.querySelector('#widthInput').value = null;
    //Page Height
    document.querySelector('#heightInput').setAttribute("placeholder", linearConverter(textBlock.pageHeight, "px", textBlock.linearUnit).toFixed(1)  );
    document.querySelector('#heightInput').value = null;
    //Paper GSM
    document.querySelector('#paperWeight').setAttribute("placeholder", textBlock.paperGSM);
    document.querySelector('#paperWeight').value = null;
    //Top and Bottom Margins
    document.querySelector('#topBotomInput').setAttribute("placeholder", linearConverter(textBlock.topBottomMargin, "px", textBlock.linearUnit).toFixed(1) );
    document.querySelector('#topBotomInput').value = null;
    //Inside Margin
    document.querySelector('#insideInput').setAttribute("placeholder", linearConverter(textBlock.insideMargin, "px", textBlock.linearUnit).toFixed(1) );
    document.querySelector('#insideInput').value = null;
    //Outside Margin
    document.querySelector('#outsideInput').setAttribute("placeholder", linearConverter(textBlock.outsideMargin, "px", textBlock.linearUnit).toFixed(1) );
    document.querySelector('#outsideInput').value = null;
    //Target Font Point Size
    document.querySelector('#pointSizeFont').setAttribute("placeholder", textBlock.targetFontPt);
    document.querySelector('#pointSizeFont').value = null;
    //Font Family
    document.querySelector('#fontList').setAttribute("placeholder", textBlock.fontFamily);
    document.querySelector('#fontList').value = null;
    //Line Spacing
    document.querySelector('#lineSpacing').setAttribute("placeholder", textBlock.lineSpacing);
    document.querySelector('#lineSpacing').value = null;
    //Paragraph Spacing
    document.querySelector('#paragraphSpacing').setAttribute("placeholder", textBlock.paragraphSpacing);
    document.querySelector('#paragraphSpacing').value = null;
    //Fly Leaves
    document.querySelector('#numFlyLeaves').setAttribute("placeholder", textBlock.flyLeaves);
    document.querySelector('#numFlyLeaves').value = null;
    //Title Page
    if (textBlock.titlePage > 0) {
        document.querySelector('#titlePageAdd').checked = true;
    } else {
        document.querySelector('#titlePageAdd').checked = false;
    }
    //Table Of Contents Page
    if (textBlock.tableOfContentsPage > 0) {
        document.querySelector('#tocPageAdd').checked = true;
    } else {
        document.querySelector('#tocPageAdd').checked = false;
    }
    //Info Page
    if (textBlock.infoPage > 0) {
        document.querySelector('#bookInfoPageAdd').checked = true;
    } else {
        document.querySelector('#bookInfoPageAdd').checked = false;
    }
    //Page Per Section Head
    document.querySelector('#chHeadPage').setAttribute("placeholder", textBlock.pagePerSectionHead);
    document.querySelector('#chHeadPage').value = null;
    //Image Pages
    document.querySelector('#imagePage').setAttribute("placeholder", textBlock.imagePages);
    document.querySelector('#imagePage').value = null;

}

/*
* update results. WITH TEXTBLOCK
*/
function updateResults(textblock, numPageRes, numSheetsRes, thicknessBlockRes, weightBlockRes) {
    if (isNaN(textblock.resultNumPages)) {
        numPageRes.innerHTML = "&nbsp;";
    } else {
        numPageRes.innerText = textblock.resultNumPages;
    }

    if (isNaN(textblock.resultNumSheets)) {
        numSheetsRes.innerHTML = "&nbsp;";
    } else {
        numSheetsRes.innerText = textblock.resultNumSheets;
    }

    let showThickness = linearConverter((textblock.resultThickness), "cm", textblock.linearUnit);
    if (isNaN(showThickness)) {
        //console.log("show thickness NaN");
        showThickness = "";
        thicknessBlockRes.innerText = showThickness + textblock.linearUnit;
    } else {
        thicknessBlockRes.innerText = showThickness.toFixed(2) + textblock.linearUnit;
    }

    let showWeight = weightConverter(textblock.resultWeight, "kg", textblock.weightUnit);
    if (isNaN(showWeight)) {
        showWeight = "";
        weightBlockRes.innerText = showWeight + textblock.weightUnit;
    } else {
        weightBlockRes.innerText = showWeight.toFixed(2) + textblock.weightUnit;
    }
}

function updateMeasures(textblock, pageWidthIn, pageHeightIn, topBottomMarginIn, insideMarginIn, ousideMarginIn) {
    let inWidth = parseFloat(pageWidthIn.value);
    textblock.pageWidth = linearConverter(inWidth, textblock.linearUnit, "px");
    let inHeight = parseFloat(pageHeightIn.value);
    textblock.pageHeight = linearConverter(inHeight, textblock.linearUnit, "px");

    let valueTBM;
    if (topBottomMarginIn.value === "") {
        valueTBM = 0;
    } else {

        //TEST
        /*                     console.log("TBM in__");
                            console.log(topBottomMarginIn.value); */

        valueTBM = parseFloat(topBottomMarginIn.value);
    }
    let inMarginTBM = valueTBM
    textblock.topBottomMargin = linearConverter(inMarginTBM, textblock.linearUnit, "px");

    let valueIM;
    if (insideMarginIn.value === "") {
        valueIM = 0;
    } else {

        //TEST
        /*                     console.log("IM in__");
                            console.log(insideMarginIn.value); */

        valueIM = parseFloat(insideMarginIn.value);
    }
    let inMarginIM = valueIM;
    textblock.insideMargin = linearConverter(inMarginIM, textblock.linearUnit, "px");


    let valueOM;
    if (ousideMarginIn.value === "") {
        valueOM = 0;
    } else {

        //TEST
        /*                     console.log("OM in__");
                            console.log(ousideMarginIn.value); */

        valueOM = parseFloat(ousideMarginIn.value);
    }
    let inMarginOM = valueOM;
    textblock.outsideMargin = linearConverter(inMarginOM, textblock.linearUnit, "px");
}


/*
* Add download link for font to header
*/
function addFontLink(fontFamily, headerElement) {
    const url = "https://fonts.googleapis.com/css?family=" + fontFamily;
    const link = document.createElement('link');
    link.href = url;
    link.rel = "stylesheet";
    headerElement[0].appendChild(link);

}


export { getJSONconfig, setJSONconfig, populatePageSizeSelect, getJSONpageSize, setJSONpageSize, setViewToConfig, updateResults, updateMeasures, addFontLink }