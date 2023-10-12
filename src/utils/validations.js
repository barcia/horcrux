const thresholdEqualOrLessThanParts = (parts, threshold) => {
    if (parts < threshold) {
        console.log("❌ Error: Threshold can't be greater than parts");
        return false;
    }
    return true;
}

const existsOneInput = (input) => {
    if (!input) {
        console.log("❌ Error: Input file is required");
        return false;
    }
    return true;
}

export { thresholdEqualOrLessThanParts, existsOneInput };