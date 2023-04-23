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
* set element values to match TextBlock settings
*/
function setViewToConfig(textBlock) {
    //Linear Unit
    document.querySelectorAll('input[name="pageLinearUnit"]').forEach((element) => {
        if (element.value === textBlock.linearUnit) {
            console.log(`match LU __ ${element.value} is ${textBlock.linearUnit}`);
            //element.setAttribute("checked", "true");
            document.getElementById(`${element.id}`).checked = true
        }
    });
    //Weight Unit
    document.querySelectorAll('input[name="pageWeightUnit"]').forEach((element) => {
        if (element.value === textBlock.weightUnit) {
            console.log(`match LU __ ${element.value} is ${textBlock.weightUnit}`);
            //element.setAttribute("checked", "true");
            document.getElementById(`${element.id}`).checked = true
        }
    });
    //Page Width
    document.querySelector('#widthInput').setAttribute("placeholder", textBlock.pageWidth);
    document.querySelector('#widthInput').value = null;
    //Page Height
    document.querySelector('#heightInput').setAttribute("placeholder", textBlock.pageHeight);
    document.querySelector('#heightInput').value = null;
    //Paper GSM
    document.querySelector('#paperWeight').setAttribute("placeholder", textBlock.paperGSM);
    document.querySelector('#paperWeight').value = null;
    //Top and Bottom Margins
    document.querySelector('#topBotomInput').setAttribute("placeholder", textBlock.topBottomMargin);
    document.querySelector('#topBotomInput').value = null;
    //Inside Margin
    document.querySelector('#insideInput').setAttribute("placeholder", textBlock.insideMargin);
    document.querySelector('#insideInput').value = null;
    //Outside Margin
    document.querySelector('#outsideInput').setAttribute("placeholder", textBlock.outsideMargin);
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
        //document.querySelector('#titlePageAdd').setAttribute("checked", "true");
        document.querySelector('#titlePageAdd').checked = true;
    } else {
        //document.querySelector('#titlePageAdd').setAttribute("checked", "false");
        document.querySelector('#titlePageAdd').checked = false;
    }
    //Table Of Contents Page
    if (textBlock.tableOfContentsPage > 0) {
        //document.querySelector('#tocPageAdd').setAttribute("checked", "true");
        document.querySelector('#tocPageAdd').checked = true;
    } else {
        //document.querySelector('#tocPageAdd').setAttribute("checked", "false");
        document.querySelector('#tocPageAdd').checked = false;
    }
    //Info Page
    if (textBlock.infoPage > 0) {
        //document.querySelector('#bookInfoPageAdd').setAttribute("checked", "true");
        document.querySelector('#bookInfoPageAdd').checked = true;
    } else {
        //document.querySelector('#bookInfoPageAdd').setAttribute("checked", "false");
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


export { getJSONconfig, setJSONconfig, setViewToConfig, updateResults, updateMeasures, addFontLink }