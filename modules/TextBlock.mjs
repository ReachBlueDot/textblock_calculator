import { linearConverter, weightConverter } from './converters.mjs';

/**
 * TextBlock class to store info
 */
class TextBlock {
    constructor() {
        //Unit Settings for Display
        this.linearUnit = "px";
        this.weightUnit = "kg";

        //Paper Information
        this.pageWidth = 528;
        this.pageHeight = 816;
        this.paperGSM = 75;

        //Text Area Information
        //this.textAreaWidth = pageWidth;
        //this.textAreaHeight = pageHeight;

        //Text Information
        this.fileNames = [];

        //usable text string
        this.targetText = "";
        this.targetTexts = new Map();

        this.numSections = 1;

        //Text Formating
        this.topBottomMargin = 0;
        this.insideMargin = 0;
        this.outsideMargin = 0;
        this.targetFontPt = 12;
        this.fontFamily = "Times New Roman";
        this.lineSpacing = 1;
        this.paragraphSpacing = 1;

        //Extras
        this.flyLeaves = 0;
        this.titlePage = 0;
        this.tableOfContentsPage = 0;
        this.infoPage = 0;
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
     * get number of line breaks in the target text string
     */
    get numLineBreaks() {
        //TEST
        let newLineCount = (this.targetText.match(/\n/g) || []).length
        console.log("numParagraphs __" + newLineCount);
        return newLineCount;
    }

    /**
     * get space to add to text length measurment for line break spacing
     */
    get paraSpaceAdd() {
        let addUnit = this.targetFontPt * this.lineSpacing;
        let totalAdded = (this.paragraphSpacing * addUnit) * this.numLineBreaks;
        //TEST
        console.log("added for paragraphs __" + totalAdded);
        return totalAdded;
    }


    
}


/*
* TEST FOR LOADING FONTS
* loads fonts selected from google fonts
*/
/* function loadFontFamily (fontFamily, element) {
    const url = "https://fonts.googleapis.com/css?family=" + fontFamily;
    
    //TEST
    console.log(url);

    const fontFile = new FontFace(fontFamily, url);
    document.fonts.add(fontFile);
    fontFile.load().then(
        () => {
            element.style.fontFamily = fontFamily;
            console.log("load FontFamily successfully");
        },
        (err) => {
            console.error(err);
        }
    );
}
 */


/*
* TEST FOR TEXT THICKNESS MEASUREMENT
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
* TEST FOR TEXT WEIGHT MEASUREMENT
* translates paper GSM and page count to aproxomate weight of textblock in kilograms
* takes linear units of px
*/
function blockWeightKg(pageThicknessGSM, pageHeight, pageWidth, sheetCount) {

    console.log("_block Weight test__");
    console.log(pageThicknessGSM);
    console.log(pageHeight);
    console.log(pageWidth);
    console.log(sheetCount);

    let cmHeight = linearConverter(pageHeight, "px", "cm");
    console.log(cmHeight);
    let cmWidth = linearConverter(pageWidth, "px", "cm");
    console.log(cmWidth);
/*     let areaPage = pageHeight * pageWidth;
    let areaPaper = areaPage * (pageCount / 2);
    let weight = (pageThicknessGSM * areaPaper) / 100000; */

    let weightKG = (pageThicknessGSM * cmHeight * cmWidth * sheetCount * 2)/(1000 * 10000);
    console.log(weightKG);

    return weightKG;
}


/**
 * Calculate pages to add for section headings
 * takes portion of page per, and number of sections
 */
function headerSpace(portionOfPage, numSections) {
    return (portionOfPage * numSections);
}


/**
 * Function to measure the div with the text, and calculate TextBlock text measurements
 */
function textMeasure(element, textBlock) {
    let noShowDiv = element;

    //TEST
    console.log("measure Block__");
    console.log(textBlock);

    noShowDiv.innerText = textBlock.targetText;

    noShowDiv.style.fontSize = textBlock.targetFontPt + "pt";

    //TEST
/*     console.log("font family__");
    console.log(textBlock.fontFamily);
    loadFontFamily(textBlock.fontFamily, element); */
    noShowDiv.style.fontFamily = textBlock.fontFamily;
    noShowDiv.style.lineHeight = textBlock.lineSpacing;
    //TEST DOES A GETTER WORK LIKE THIS?
    noShowDiv.style.width = textBlock.textAreaWidth + "px";


    noShowDiv.style.display = "block";
    let divHeight = noShowDiv.clientHeight;

    //add in paragrph spacing
    //TEST DOES A GETTER WORK LIKE THIS?
    divHeight = divHeight + textBlock.paraSpaceAdd;

    let divWidth = noShowDiv.clientWidth + "px";
    
    //TEST - none
    noShowDiv.style.display = "none";
    
    let headerPgs = headerSpace(textBlock.pagePerSectionHead, textBlock.numSections);
    let addInPages = (2*textBlock.flyLeaves) + textBlock.titlePage + textBlock.tableOfContentsPage + textBlock.infoPage + headerPgs + textBlock.imagePages;
    addInPages = Math.ceil(addInPages);

    //TEST
    console.log("TEST ADD IN Pages ___");
    console.log(textBlock.pagePerSectionHead);
    console.log(numSections);
    console.log(headerPgs);
    console.log(2*textBlock.flyLeaves);
    console.log(textBlock.titlePage);
    console.log(textBlock.tableOfContentsPage);
    console.log(textBlock.infoPage);
    console.log(textBlock.imagePages);
    console.log(addInPages);

    textBlock.resultNumPages = Math.ceil(divHeight / textBlock.textAreaHeight) + addInPages;
    textBlock.resultNumSheets = Math.ceil(textBlock.resultNumPages / 4);
    textBlock.resultThickness = blockThicknessCM(textBlock.paperGSM, textBlock.resultNumSheets);
    textBlock.resultWeight = blockWeightKg(textBlock.paperGSM, textBlock.pageHeight, textBlock.pageWidth, textBlock.resultNumSheets);

    console.log("Height_" + divHeight + "__Width_" + divWidth + "_");
    console.log(noShowDiv.innerText);
}


export { TextBlock, textMeasure }