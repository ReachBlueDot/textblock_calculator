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
    let inCount = measurement / 2.54;
    return inCount;
}

/**
 * in to cm
 */
function convertINtoCM(measurement) {
    let cmCount = measurement * 2.54;
    return cmCount;
}

/**
 * Linear conversion function 
 * takes measurement value, In unit, and Out unit
 * Units: "in", "cm", "px"
 */
function linearUnitCheck(unit) {
    let good = false;
    if (unit === "in" || unit === "cm" || unit === "px") {
        good = true;
    }
    return good;
}

function linearConverter(measurement, inUnit, outUnit) {
    if (linearUnitCheck(inUnit) && linearUnitCheck(outUnit)) {
        if (inUnit === "cm") {
            if (outUnit === "px") {
                return convertCMtoPX(measurement);
            }
            if (outUnit === "in") {
                return convertCMtoIN(measurement);
            }
            if (outUnit === "cm") {
                return measurement;
            }
        }
        if (inUnit === "in") {
            if (outUnit === "px") {
                return convertINtoPX(measurement);
            }
            if (outUnit === "in") {
                return measurement;
            }
            if (outUnit === "cm") {
                return convertINtoCM(measurement);
            }
        }
        if (inUnit === "px") {
            if (outUnit === "px") {
                return measurement;
            }
            if (outUnit === "in") {
                return convertPXtoIN(measurement);
            }
            if (outUnit === "cm") {
                return convertPXtoCM(measurement);
            }
        }
    } else {
        return error("unit not suported");
    }
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
 * kg to lb
 */
function convertKGtoLB(measurement) {
    let lbCount = measurement * 2.20462;
    return lbCount;
}

/**
 * Weight conversion function 
 * takes measurement value, In unit, and Out unit
 * Units: "lb", "kg"
 */
function weightUnitCheck(unit) {
    let good = false;
    if (unit === "lb" || unit === "kg") {
        good = true;
    }
    return good;
}
function weightConverter(measurement, inUnit, outUnit) {
    if (weightUnitCheck(inUnit) && weightUnitCheck(outUnit)) {
        if (inUnit === "lb") {
            if (outUnit === "kg") {
                return convertLBtoKG(measurement);
            }
            if (outUnit === "lb") {
                return measurement;
            }
        }
        if (inUnit === "kg") {
            if (outUnit === "kg") {
                return measurement;
            }
            if (outUnit === "lb") {
                return convertKGtoLB(measurement);
            }
        }
    } else {
        return error("unit not suported");
    }
}


export { linearConverter, weightConverter }