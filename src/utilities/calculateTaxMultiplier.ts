const calculateTaxMultipler = function(taxLevel: number, educationLevel: number, healthLevel: number): number {
    switch (taxLevel) {
        case 2:
            return 3 + ((educationLevel + healthLevel) * 2)
        case 1:
            return 2 + (educationLevel + healthLevel);
        case 0:
            return 1;
        default:
            throw new Error("Uh oh");
    }
}

export default calculateTaxMultipler;