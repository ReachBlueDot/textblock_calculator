/**
 * Conversion functions
 * 
 * _Linear_
 * cm to px
 * px to cm
 * in to px
 * px to in
 * cm to in
 * in to cm
 * 
 * _Weight_
 * lb to kg
 * kg to lb
 * 
 */

/**
 * Linear
 * *****************************************
 * cm to px
 * px to cm
 * in to px
 * px to in
 * cm to in
 * in to cm
 */

/**
 * cm to px
 */
function convertCMtoPX(measurement) {
    let pxCount = measurement * 37.8;
    return pxCount;
}

/**
 * px to cm
 */
function convertPXtoCM(measurement) {
    let cmCount = measurement / 37.8;
    return cmCount;
}

/**
 * in to px
 */
function convertINtoPX(measurement) {
    let pxCount = measurement * 96;
    return pxCount;
}

/**
 * in to px
 */
function convertPXtoIN(measurement) {
    let inCount = measurement / 96;
    return inCount;
}

/**
 * cm to in
 */
function convertCMtoIN(measurement) {
    let inCount = measurement * 2.54;
    return inCount;
}

/**
 * in to cm
 */
function convertINtoCM(measurement) {
    let cmCount = measurement / 2.54;
    return cmCount;
}

/**
 * Weight
 * *****************************************
 * lb to kg
 * kg to lb
 */

/**
 * lb to kg
 */
function convertLBtoKG(measurement) {
    let kgCount = measurement / 2.20462;
    return kgCount;
}

/**
 * lb to kg
 */
function convertKGtoLB(measurement) {
    let lbCount = measurement * 2.20462;
    return lbCount;
}


export {
    convertCMtoPX, convertPXtoCM,
    convertINtoPX, convertPXtoIN, convertCMtoIN,
    convertINtoCM, convertLBtoKG, convertKGtoLB
}