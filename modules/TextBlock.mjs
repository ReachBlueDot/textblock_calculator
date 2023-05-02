import { linearConverter, weightConverter } from './converters.mjs';

/**
 * TextBlock class to store info
 */
class TextBlock {
    constructor() {
        //Unit Settings for Display
        this.linearUnit = "";
        this.weightUnit = "";

        //Paper Information
        this.pageWidth = 0;
        this.pageHeight = 0;
        this.paperGSM = 0;


        //Text Information
        this.targetTexts = new Map();
        this.numSections = 1;

        //Text Formating
        this.topBottomMargin = 0;
        this.insideMargin = 0;
        this.outsideMargin = 0;
        this.targetFontPt = 12;
        this.fontFamily = "Times New Roman";
        this.lineSpacing = 1;
        this.paragraphSpacing = 0;

        //Extras
        this.flyLeaves = 0;
        this.titlePage = 0;
        this.tableOfContentsPage = 0;
        this.infoPage = 0;
        this.sectionHeadSameSide = false;
        this.pagePerSectionHead = 0;
        this.imagePages = 0;

        //Result Values
        this.resultNumPages = 0;
        this.resultNumSheets = 0;
        this.resultThickness = 0;
        this.resultWeight = 0;


    }

    //Getters
    /**
     * get area of page not within margins (height and width)
     */
    get textAreaWidth() {
        return this.pageWidth - (this.insideMargin + this.outsideMargin);
    }
    get textAreaHeight() {
        return this.pageHeight - (this.topBottomMargin * 2);
    }

    /**
     * get number of line breaks in the target texts Map strings
     */

    get numLineBreaks() {
        const textsIter = this.targetTexts.values();

        let newLineCount = 0;
        for (let text of textsIter) {
            newLineCount = newLineCount + (text.match(/\n/g) || []).length + 1;

        }

        return newLineCount;
    }


    /**
     * get space to add to text length measurment for line break spacing
     */
    get paraSpaceAdd() {

        let addUnit = (this.targetFontPt * this.lineSpacing);
       
        // adding 1      
        let totalAdded = ((this.paragraphSpacing + 1) * addUnit) * this.numLineBreaks;

        return totalAdded;
    }


}



/*
* FOR OUTPUT FILE TEXT
* 
*/
function textBlockString(textBlock) {
    const header = `TextBlock Planner Results \n`;

    const fileList = () => {
        let ret = `\nIncluded Files: \n`;
        const iterator = textBlock.targetTexts.keys();
        for (let key of iterator) {
            ret = ret + `>>${key} \n`;
        }
        return ret;
    }
    const fileString = fileList();
    const chapters = `Chapters/Sections: ${textBlock.numSections} \n`;
    const fileSec = `${fileString}${chapters}`;

    const resultHeader = `\nPredicted Results: \n`;
    const numPages = `>>Number of pages: ${textBlock.resultNumPages} \n`;
    const numSheets = `>>Number of sheets: ${textBlock.resultNumSheets} \n`;
    const thickness = `>>Thickness: ${linearConverter(textBlock.resultThickness, "cm", textBlock.linearUnit).toFixed(2)} ${textBlock.linearUnit} \n`;
    const weight = `>>Weight: ${weightConverter(textBlock.resultWeight, "kg", textBlock.weightUnit).toFixed(2)} ${textBlock.weightUnit} \n`;
    const resultSec = `${resultHeader}${numPages}${numSheets}${thickness}${weight}`;

    const pageHeader = `\nPaper Characteristics: \n`;
    const height = `>>Page height: ${linearConverter(textBlock.pageHeight, "px", textBlock.linearUnit).toFixed(2)} ${textBlock.linearUnit} \n`;
    const width = `>>Page width: ${linearConverter(textBlock.pageWidth, "px", textBlock.linearUnit).toFixed(2)} ${textBlock.linearUnit} \n`;
    const gsm = `>>Paper weight: ${textBlock.paperGSM} gsm \n`;
    const paperSec = `${pageHeader}${height}${width}${gsm}`;

    const formatingHeader = `\nFormating Used: \n`;
    const topBottomMargin = `>>Top and bottom margins: ${linearConverter(textBlock.topBottomMargin, "px", textBlock.linearUnit).toFixed(2)} ${textBlock.linearUnit} \n`;
    const insideMargin = `>>Inside margins:  ${linearConverter(textBlock.insideMargin, "px", textBlock.linearUnit).toFixed(2)} ${textBlock.linearUnit} \n`;
    const outsideMargin = `>>Outside margins:  ${linearConverter(textBlock.outsideMargin, "px", textBlock.linearUnit).toFixed(2)} ${textBlock.linearUnit} \n`;
    const fontPt = `>>Font size: ${textBlock.targetFontPt} pt \n`;
    const font = `>>Font: ${textBlock.fontFamily} \n`;
    const lineSpace = `>>Line spacing: ${textBlock.lineSpacing} \n`;
    const paragraphSpacing = `>>Paragraph spacing: ${textBlock.paragraphSpacing} \n`;
    const formatSec = `${formatingHeader}${topBottomMargin}${insideMargin}${outsideMargin}${fontPt}${font}${lineSpace}${paragraphSpacing}`;

    const extraHeader = `\nExtras: \n`;
    const flyLeaves = `>>Number of fly leaves: ${textBlock.flyLeaves} \n`;
    const isThere = (atribute) => {
        if (atribute > 0) {
            return "Yes";
        } else { return "No" }
    }
    const titlePage = `>>Title page: ${isThere(textBlock.titlePage)} \n`;
    const tocPage = `>>Table of contents page: ${isThere(textBlock.tableOfContentsPage)} \n`;
    const infoPage = `>>Book information page: ${isThere(textBlock.infoPage)} \n`;
    const sectionHeadSide = `>>Chaper heding will fall the (right or left): ${textBlock.sectionHeadSameSide} \n`;
    const pagePerHeader = `>>Portion of page per chapter heading: ${textBlock.pagePerSectionHead} \n`;
    const imagePages = `>>Pages used for images: ${textBlock.imagePages} \n`;
    const extraSec = `${extraHeader}${flyLeaves}${titlePage}${tocPage}${infoPage}${sectionHeadSide}${pagePerHeader}${imagePages}`;

    const string = `${header}${fileSec}${resultSec}${paperSec}${formatSec}${extraSec}`;
    return string;
}


/*
* TEXT THICKNESS MEASUREMENT
* translates paper GSM and page count to aproxomate thickness of textblock in CM
*/
function blockThicknessCM(pageThicknessGSM, leafeCount) {
    let factorGSMtoMM = 0.001328146;
    let mmMeasure = pageThicknessGSM * factorGSMtoMM;
    let thickness = leafeCount * mmMeasure;
    let thicknessCM = thickness / 10;
    return thicknessCM;
}


/*
* TEXT WEIGHT MEASUREMENT
* translates paper GSM and page count to aproxomate weight of textblock in kilograms
* takes linear units of px
*/
function blockWeightKg(pageThicknessGSM, pageHeight, pageWidth, sheetCount) {



    let cmHeight = linearConverter(pageHeight, "px", "cm");

    let cmWidth = linearConverter(pageWidth, "px", "cm");

    let weightKG = (pageThicknessGSM * cmHeight * cmWidth * sheetCount * 2) / (1000 * 10000);

    return weightKG;
}


/**
 * Calculate pages to add for section headings
 * takes portion of page per, and number of sections, and if section will always begin on the same side
 */
function headerSpace(portionOfPage, numSections, startsOnSide) {
    let spaceAdd = 0;
    if (startsOnSide === true) {
        spaceAdd = ((portionOfPage + 1) * numSections) + (numSections * .5);
    } else {
        spaceAdd = (portionOfPage * numSections) + (numSections * .5);
    }
    return spaceAdd;
}

/**
 * Creat child div for input element, and populate with Strings
 */
function addChildTextDiv(element, textBlock, targetTextsKey) {
    for (const child of element.children) {
        if (targetTextsKey === child.id) {

            child.remove();
        }
    }
    const textDiv = document.createElement("div");
    textDiv.setAttribute("id", targetTextsKey);
    const node = document.createTextNode(textBlock.targetTexts.get(targetTextsKey));
    textDiv.appendChild(node);

    element.appendChild(textDiv);

    textDiv.style.margin = "0px";
    textDiv.style.padding = "0px";
}

/**
 * Remove child div for input element
 */
function removeChildTextDiv(element, textBlock, targetTextsKey) {
    for (const child of element.children) {
        if (targetTextsKey === child.id) {


            child.remove();
        }
    }
}



/**
 * Update style for child divs 
 */
function updateStyleChildTextDiv(element, textBlock) {
    for (const child of element.children) {

        child.style.fontSize = textBlock.targetFontPt + "pt";
        child.style.fontFamily = textBlock.fontFamily;
        child.style.lineHeight = textBlock.lineSpacing;
    }
}


/**
 * Function to measure the div with the text, and calculate TextBlock text measurements
 */
function textMeasure(element, textBlock) {
    let noShowDiv = element;

    updateStyleChildTextDiv(noShowDiv, textBlock);

    noShowDiv.style.width = textBlock.textAreaWidth + "px";


    noShowDiv.style.display = "block";
    let divHeight = noShowDiv.clientHeight;

    //add in paragrph spacing
    divHeight = divHeight + textBlock.paraSpaceAdd;


    let headerPgs = headerSpace(textBlock.pagePerSectionHead, textBlock.numSections, textBlock.sectionHeadSameSide);
    let addInPages = (2 * textBlock.flyLeaves) + textBlock.titlePage + textBlock.tableOfContentsPage + textBlock.infoPage + headerPgs + textBlock.imagePages;
    addInPages = Math.ceil(addInPages);

    textBlock.resultNumPages = Math.ceil(divHeight / textBlock.textAreaHeight) + addInPages;
    textBlock.resultNumSheets = Math.ceil(textBlock.resultNumPages / 4);
    textBlock.resultThickness = blockThicknessCM(textBlock.paperGSM, (textBlock.resultNumSheets * 2));
    textBlock.resultWeight = blockWeightKg(textBlock.paperGSM, textBlock.pageHeight, textBlock.pageWidth, textBlock.resultNumSheets);

    //Hide text - none
    noShowDiv.style.display = "none";
}


export { TextBlock, textBlockString, textMeasure, addChildTextDiv, removeChildTextDiv, updateStyleChildTextDiv }