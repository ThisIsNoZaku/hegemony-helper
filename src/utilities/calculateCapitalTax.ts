const calculateCapitalTax = function calculateCapitalTax(revenue: number, taxLevel: number): number {
    if (revenue < 5) {
        return 0;
    }
    switch (taxLevel) {
        case 0:
            if (revenue < 10) {
                return 2;
            } else if (revenue < 25) {
                return 4;
            } else if (revenue < 50) {
                return 7;
            } else if (revenue < 100) {
                return 10;
            } else if (revenue < 200) {
                return 20;
            } else if (revenue < 300) {
                return 40;
            } else {
                return 60;
            }
        case 1:
            if (revenue < 10) {
                return 2;
            } else if (revenue < 25) {
                return 5;
            } else if (revenue < 50) {
                return 10;
            } else if (revenue < 100) {
                return 15;
            } else if (revenue < 200) {
                return 30;
            } else if (revenue < 300) {
                return 70;
            } else {
                return 120;
            }
        case 2:
            if (revenue < 10) {
                return 1;
            } else if (revenue < 25) {
                return 5;
            } else if (revenue < 50) {
                return 12;
            } else if (revenue < 100) {
                return 24;
            } else if (revenue < 200) {
                return 40;
            } else if (revenue < 300) {
                return 100;
            } else {
                return 160;
            }
    }
    throw new Error();
}

export default calculateCapitalTax;