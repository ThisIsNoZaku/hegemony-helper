import {Fragment, useState} from 'react'
import './App.css'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormLabel,
    Grid,
    InputAdornment,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Tooltip,
} from "@mui/material";
import {useTheme} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import SpaIcon from '@mui/icons-material/Spa';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import WarehouseIcon from '@mui/icons-material/Warehouse';

function calculatePoints(capital: number, startingCapitalTrack: number) {
    const trackPosition = findCapitalTrackPosition(capital)
    return (3 * Math.max(0, trackPosition - startingCapitalTrack)) + trackPosition;
}

function calculateMultiplier(taxLevel: number, educationLevel: number, healthLevel: number): number {
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

function calculateCapitalTax(revenue: number, taxLevel: number): number {
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
}

// TODO: Add bid rigging, global food crisis, health crisis, higher education program, exit strategy, global branding
const specialCards = [
    {
        name: "Offshore Companies"
    },
    {
        name: "Buy Private Island",
        allowed: (capital: number) => capital >= 50
    }
]

const revenueBreakpoints = [5, 10, 25, 50, 100, 200, 300]

type ExportCard = {
    food: Record<number, number>,
    health: Record<number, number>,
    education: Record<number, number>,
    luxuries: Record<number, number>
}

const capitalTrackPointsForCapital = {
    0: 0,
    10: 1,
    25: 2,
    50: 3,
    75: 4,
    100: 5,
    125: 6,
    150: 7,
    175: 8,
    200: 9,
    250: 10,
    300: 11,
    350: 12,
    400: 13,
    450: 14,
    500: 15
}

const capitalTrack = Object.entries(capitalTrackPointsForCapital);

// const capitalTrackCapitalForPoints = Object.fromEntries( Object.entries(capitalTrackPointsForCapital).map(([k, v]) => [v, Number(k)]) );
//TODO: Tool to select best export card.
const exportCards: ExportCard[] = [
    {
        food: {
            2: 15,
            6: 45
        },
        health: {
            3: 20,
            5: 30
        },
        luxuries: {
            3: 20,
            7: 50
        },
        education: {
            4: 25,
            8: 45
        }
    },
    {
        food: {
            4: 45,
            8: 85
        },
        health: {
            3: 15,
            5: 25
        },
        luxuries: {
            2: 15,
            6: 40
        },
        education: {
            3: 15,
            7: 35
        }
    },
    {
        food: {
            2: 20,
            6: 55
        },
        health: {
            3: 25,
            5: 40
        },
        luxuries: {
            4: 39,
            8: 55
        },
        education: {
            3: 15,
            7: 35
        }
    },
    {
        food: {
            3: 35,
            7: 80
        },
        health: {
            4: 20,
            8: 40
        },
        luxuries: {
            3: 15,
            5: 25
        },
        education: {
            2: 15,
            6: 45
        }
    },
    {
        food: {
            3: 30,
            5: 50
        },
        health: {
            3: 25,
            7: 55
        },
        luxuries: {
            2: 10,
            6: 35
        },
        education: {
            4: 25,
            8: 45
        }
    },
    {
        food: {
            2: 25,
            6: 65
        },
        health: {
            3: 20,
            7: 40
        },
        luxuries: {
            4: 20,
            7: 35
        },
        education: {
            3: 25,
            6: 45
        }
    },
    {
        food: {
            4: 40,
            7: 70
        },
        health: {
            2: 15,
            7: 50
        },
        luxuries: {
            3: 25,
            6: 50
        },
        education: {
            3: 20,
            5: 30
        }
    },
    {
        food: {
            2: 15,
            6: 50
        },
        health: {
            4: 30,
            7: 50
        },
        luxuries: {
            3: 15,
            7: 35
        },
        education: {
            3: 20,
            5: 35
        }
    },
    {
        food: {
            3: 25,
            6: 50
        },
        health: {
            3: 20,
            7: 40
        },
        luxuries: {
            3: 20,
            7: 50
        },
        education: {
            2: 15,
            7: 55
        }
    },
    {
        food: {
            4: 50,
            8: 95
        },
        health: {
            3: 15,
            7: 35
        },
        luxuries: {
            3: 20,
            5: 30
        },
        education: {
            2: 15,
            6: 40
        }
    },
    {
        food: {
            3: 30,
            7: 70
        },
        health: {
            3: 20,
            5: 35
        },
        luxuries: {
            4: 30,
            6: 40
        },
        education: {
            2: 15,
            6: 35
        }
    },
    {
        food: {
            3: 35,
            7: 75
        },
        health: {
            3: 20,
            5: 35
        },
        luxuries: {
            2: 10,
            6: 35
        },
        education: {
            4: 25,
            7: 40
        }
    },
    {
        food: {
            3: 25,
            7: 55
        },
        health: {
            2: 10,
            6: 35
        },
        luxuries: {
            4: 25,
            8: 45
        },
        education: {
            3: 20,
            5: 35
        }
    },
    {
        food: {
            2: 15,
            6: 50
        },
        health: {
            4: 25,
            8: 45
        },
        luxuries: {
            3: 25,
            5: 40
        },
        education: {
            3: 15,
            7: 35
        }
    },
    {
        food: {
            4: 45,
            7: 80
        },
        health: {
            2: 15,
            6: 40
        },
        luxuries: {
            3: 20,
            5: 30
        },
        education: {
            3: 20,
            7: 50
        }
    },
    {
        food: {
            3: 30,
            5: 50
        },
        health: {
            3: 20,
            6: 50
        },
        luxuries: {
            3: 25,
            7: 55
        },
        education: {
            3: 20,
            7: 50
        }
    },
]

function HealthIcon() {
    return (<div style={{color: "red"}}>
        <FavoriteIcon/>
    </div>)
}

function EducationIcon() {
    return (<div style={{color: "orange"}}>
        <SchoolIcon/>
    </div>)
}

function LuxuryIcon() {
    return <div style={{color: "blue"}}>
        <SmartphoneIcon/>
    </div>
}

function FoodIcon() {
    return <div style={{color: "green"}}>
        <SpaIcon/>
    </div>
}

type CompanyDefinition = {
    name: string,
    cost: number,
    fullyAutomated?: boolean,
    output: {
        base: number,
        automationBonus: number
    },
    type: "health" | "education" | "luxuries" | "food" | "influence",
    wages: [number, number, number]
}

const wageScale = {
    auto: [0, 0, 0],
    vLarge: [20, 30, 40],
    large: [25, 30, 35],
    medium: [10, 20, 30],
    small: [15, 20, 25],
    vSmall: [10, 15, 20]
}

const companyDefinitions = {
    automatedGrainFarm: {
        name: "Automated Grain Farm",
        cost: 25,
        fullyAutomated: true,
        output: {
            base: 2,
            automationBonus: 0
        },
        type: "food" as const,
        wages: wageScale.auto
    },
    medicalVillage: {
        name: "Medical Village",
        cost: 24,
        output: {
            base: 9,
            automationBonus: 2
        },
        type: "health" as const,
        wages: wageScale.vLarge
    },
    stadium: {
        name: "Stadium",
        cost: 20,
        output: {
            base: 8,
            automationBonus: 3
        },
        type: "luxuries" as const,
        wages: wageScale.large
    },
    tvStation: {
        name: "TV Station",
        cost: 24,
        output: {
            base: 4,
            automationBonus: 0
        },
        type: "influence" as const,
        wages: wageScale.vLarge
    },
    lobbyingFirm: {
        name: "Lobbying Firm",
        cost: 16,
        output: {
            base: 3,
            automationBonus: 0,
        },
        type: "influence" as const,
        wages: wageScale.medium
    },
    fashionCompany: {
        name: "Fashion Company",
        cost: 8,
        output: {
            base: 4,
            automationBonus: 2
        },
        type: "luxuries" as const,
        wages: wageScale.vSmall
    },
    fishFarm: {
        name: "Fish Farm",
        cost: 20,
        output: {
            base: 6,
            automationBonus: 1
        },
        type: "food" as const,
        wages: wageScale.large
    },
    radioStation: {
        name: "Radio Station",
        cost: 12,
        output: {
            base: 2,
            automationBonus: 0
        },
        type: "influence" as const,
        wages: wageScale.vSmall
    },
    shoppingMall: {
        name: "Shopping Mall",
        cost: 16,
        output: {
            base: 6,
            automationBonus: 2
        },
        type: "luxuries" as const,
        wages: wageScale.small
    },
    clinic: {
        name: "Clinic",
        cost: 16,
        output: {
            base: 6,
            automationBonus: 2
        },
        type: "health" as const,
        wages: wageScale.medium
    },
    hotel: {
        name: "Hotel",
        cost: 15,
        output: {
            base: 7,
            automationBonus: 0
        },
        type: "luxuries" as const,
        wages: [20, 25, 30]
    },
    fastFoodChain: {
        name: "Fast Food Chain",
        cost: 8,
        output: {
            base: 3,
            automationBonus: 0
        },
        type: "food" as const,
        wages: wageScale.vSmall
    },
    superMarket: {
        name: "Supermarket",
        cost: 16,
        output: {
            base: 3,
            automationBonus: 1
        },
        type: "food" as const,
        wages: wageScale.small
    },
    pharmaceuticalCompany: {
        name: "Pharmaceutical Company",
        cost: 20,
        output: {
            base: 8,
            automationBonus: 3
        },
        type: "health" as const,
        wages: wageScale.vLarge
    },
    instituteOfTechnology: {
        name: "Institute of Technology",
        cost: 20,
        output: {
            base: 8,
            automationBonus: 5
        },
        type: "education" as const,
        wages: wageScale.vLarge
    },
    academy: {
        name: "Academy",
        cost: 12,
        output: {
            base: 7,
            automationBonus: 0
        },
        type: "education" as const,
        wages: [10, 20, 30]
    },
    college: {
        name: "College",
        cost: 16,
        output: {
            base: 6,
            automationBonus: 2
        },
        type: "education" as const,
        wages: [10, 20, 30]
    },
    hospital: {
        name: "Hospital",
        cost: 20,
        output: {
            base: 7,
            automationBonus: 0
        },
        type: "health" as const,
        wages: [10, 20, 30]
    },
    university: {
        name: "University",
        cost: 24,
        output: {
            base: 9,
            automationBonus: 2
        },
        type: "education" as const,
        wages: wageScale.vLarge
    },
    carManufacturer: {
        name: "Car Manufacturer",
        cost: 45,
        fullyAutomated: true,
        output: {
            base: 5,
            automationBonus: 0
        },
        type: "luxuries" as const,
        wages: wageScale.auto
    },
    publishingHouse: {
        name: "Publishing House",
        cost: 12,
        output: {
            base: 4,
            automationBonus: 0
        },
        type: "influence" as const,
        wages: [20, 25, 30]
    },
    electronicsManufacturer: {
        name: "Electronics Manufacturer",
        cost: 25,
        output: {
            base: 3,
            automationBonus: 0
        },
        fullyAutomated: true,
        type: "luxuries" as const,
        wages: wageScale.auto
    },
    automatedDairyFarm: {
        name: "Automated Dairy Farm",
        cost: 45,
        fullyAutomated: true,
        output: {
            base: 3,
            automationBonus: 0
        },
        type: "food" as const,
        wages: wageScale.auto
    },
    vegetableFarm: {
        name: "Vegetable Farm",
        cost: 15,
        output: {
            base: 5,
            automationBonus: 0
        },
        type: "food" as const,
        wages: [20, 25, 30]
    },
};

type CompanyInstance = CompanyDefinition & {
    wageLevel: 0 | 1 | 2
    wagesLocked: boolean
    workers?: "wc" | "mc" | null
    automatedBonus?: boolean
}

function iconForGood(goodName: string) {
    switch (goodName) {
        case "health":
            return HealthIcon();
        case "education":
            return EducationIcon();
        case "luxuries":
            return LuxuryIcon();
        case "food":
            return FoodIcon();
        default:
            throw "???";
    }
}

const initialGame: {
    laws: {
        labor: 0 | 1 | 2,
        tax: 0 | 1 | 2,
        health: 0 | 1 | 2,
        education: 0 | 1 | 2
    },
    revenue: number,
    capital: number,
    goods: {
        food: number,
        luxuries: number,
        education: number,
    },
    companies: (CompanyInstance | null)[]
} = {
    laws: {
        labor: 1,
        tax: 2,
        health: 1,
        education: 0
    },
    revenue: 120,
    capital: 0,
    goods: {
        food: 1,
        education: 2,
        luxuries: 2
    },
    companies:
        [
            {...companyDefinitions.clinic, wageLevel: 1} as CompanyInstance,
            {
                ...companyDefinitions.superMarket,
                wageLevel: 1,
                workers: "wc",
            } as CompanyInstance,
            {
                ...companyDefinitions.shoppingMall,
                wageLevel: 1,
                workers: "mc",
            } as CompanyInstance,
            {...companyDefinitions.college, wageLevel: 1, workers: "wc"} as CompanyInstance,
            null, null, null, null,
            null, null, null, null]
}

/**
 * Find the index on the capital track for the given capital amount.
 * @param capital
 */
function findCapitalTrackPosition(capital: number) {
    return Object.keys(capitalTrackPointsForCapital).map(k => Number.parseInt(k)).reduce((highest, next, index) => {
        if (capital >= next) {
            return index;
        }
        return highest;
    }, 0);
}

function App() {
    const [phase, setPhase] = useState<"playing" | "production" | "taxes" | "scoring">("playing")
    // Laws
    const [laborLaw, setLaborLaw] = useState<0 | 1 | 2>(initialGame.laws.labor);
    const [taxLevel, setTaxLevel] = useState<0 | 1 | 2>(initialGame.laws.tax);
    const [healthLevel, setHealthLevel] = useState<0 | 1 | 2>(initialGame.laws.health);
    const [educationLevel, setEducationLevel] = useState<0 | 1 | 2>(initialGame.laws.education);
    // Companies
    const [companies, setCompanies] = useState<(CompanyInstance | null)[]>(initialGame.companies);

    // Goods and storage
    const [food, setFood] = useState({
        quantity: initialGame.goods.food,
        storageBuilt: false
    });
    const [luxuries, setLuxuries] = useState({
        quantity: initialGame.goods.luxuries,
        storageBuilt: false
    });
    const [health, setHealth] = useState({
        quantity: 0,
        storageBuilt: false
    });
    const [education, setEducation] = useState({
        quantity: initialGame.goods.education,
        storageBuilt: false
    });

    const [track, setTrack] = useState(0);
    const [points, setPoints] = useState(0);
    const [revenue, setRevenue] = useState(initialGame.revenue)
    const [capital, setCapital] = useState(0)

    // Calculated output
    const foodOutput = companies.filter(c => c && c.workers && c.type === "food").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0)
    const luxuriesOutput = companies.filter(c => c && c.workers && c.type === "luxuries").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0)
    const healthOutput = companies.filter(c => c && c.workers && c.type === "health").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0)
    const educationOutput = companies.filter(c => c && c.workers && c.type === "education").reduce((total, company) => {
        return total + company!.output.base + (company?.automatedBonus ? company.output.automationBonus : 0)
    }, 0);

    const taxMultiplier = calculateMultiplier(taxLevel, educationLevel, healthLevel);
    const employmentTax = companies.filter(c => c !== null && c?.workers).length * taxMultiplier;

    const wcWages = companies.reduce((total, company) => {
        if (company && company.workers === "wc") {
            return total + company.wages[company.wageLevel];
        }
        return total;
    }, 0)
    const mcWages = companies.reduce((total, company) => {
        if (company && company.workers === "mc") {
            return total + company.wages[company.wageLevel];
        }
        return total;
    }, 0)
    const totalWages = wcWages + mcWages;

    const pretaxRevenue = revenue - totalWages;

    const preCapitalTaxRevenue = pretaxRevenue - employmentTax;

    const capitalTax = calculateCapitalTax(preCapitalTaxRevenue, taxLevel);
    const nextCorporateTaxBreakpoint = revenueBreakpoints.reduce((bp, lowest) => bp > preCapitalTaxRevenue ? Math.min(bp, lowest) : lowest, 300);

    const estimatedFinalRevenue = preCapitalTaxRevenue - capitalTax;

    const gotoPlayingPhase = () => {
        switch (phase) {
            case "production":
                undoProductionPhase();
                // Unto the production phase
                break;
            case "scoring":
            // Started a new turn
        }
        setLastProductionPhase({
            wages: {mc: 0, wc: 0, total: 0},
            output: {food: 0, luxuries: 0, health: 0, education: 0},
            startingRevenue: 0,
            startingCapital: 0,
            endingCapital: 0,
            endingRevenue: 0
        })
        setLastTaxPhase({
            employmentTax: 0,
            capitalTax: 0,
            startingRevenue: 0,
            startingCapital: 0,
            endingRevenue: 0,
            endingCapital: 0
        })
        setLastScoring({
            amountMovedToCapital: 0,
            finalCapital: 0,
            startingTrackMarkerPosition: 0,
            finalTrackMarkerPosition: 0
        })
        setLastCardPlayed(null)
        setPhase("playing")
    }

    // Effects of the last production phase
    const [lastProductionPhase, setLastProductionPhase] = useState<{
        wages: { mc: number, wc: number, total: number },
        output: { food: number, luxuries: number, health: number, education: number },
        startingRevenue: number,
        startingCapital: number,
        endingCapital: number,
        endingRevenue: number
    }>({
        wages: {mc: 0, wc: 0, total: 0},
        output: {food: 0, luxuries: 0, health: 0, education: 0},
        startingRevenue: 0,
        startingCapital: 0,
        endingCapital: 0,
        endingRevenue: 0
    })

    const gotoProductionPhase = () => {
        const productionResult = {
            wages: {
                mc: mcWages,
                wc: wcWages,
                total: totalWages
            },
            output: {
                food: foodOutput,
                luxuries: luxuriesOutput,
                health: healthOutput,
                education: educationOutput
            },
            startingRevenue: revenue,
            startingCapital: capital,
            endingRevenue: revenue - Math.min(totalWages, revenue),
            endingCapital: capital - Math.max(totalWages - revenue, 0)
        };
        setLastProductionPhase(productionResult);
        // Subtract wages from revenue
        setRevenue(productionResult.endingRevenue);
        setCapital(productionResult.endingCapital)

        setFood({...food, quantity: food.quantity + foodOutput})
        setLuxuries({...luxuries, quantity: luxuries.quantity + luxuriesOutput})
        setHealth({...health, quantity: health.quantity + healthOutput})
        setEducation({...education, quantity: education.quantity + educationOutput})
        // Add output to goods
        setPhase("production");
    }

    const undoProductionPhase = () => {
        // Take wages back
        setRevenue(lastProductionPhase.startingRevenue)
        setCapital(lastProductionPhase.startingCapital);
        // Subtract output from goods
        setFood({...food, quantity: food.quantity - lastProductionPhase.output.food})
        setLuxuries({...luxuries, quantity: luxuries.quantity - lastProductionPhase.output.luxuries})
        setHealth({...health, quantity: health.quantity - lastProductionPhase.output.health})
        setEducation({...education, quantity: education.quantity - lastProductionPhase.output.education})
    }

    // Effects of the last tax phase
    const [lastTaxPhase, setLastTaxPhase] = useState<{
        employmentTax: number,
        capitalTax: number
        startingRevenue: number,
        startingCapital: number,
        endingRevenue: number,
        endingCapital: number
    }>({
        employmentTax: 0,
        capitalTax: 0,
        startingRevenue: 0,
        startingCapital: 0,
        endingRevenue: 0,
        endingCapital: 0
    })

    const gotoTaxPhase = () => {
        setPhase("taxes");
        const actualCapitalTax = calculateCapitalTax(lastProductionPhase!.endingRevenue - employmentTax, taxLevel);
        const taxResult = {
            employmentTax,
            capitalTax: actualCapitalTax,
            startingRevenue: lastProductionPhase!.endingRevenue,
            startingCapital: lastProductionPhase!.endingCapital,
            endingRevenue: Math.max(0, lastProductionPhase!.endingRevenue - employmentTax - actualCapitalTax),
            endingCapital: lastProductionPhase!.endingCapital - Math.max(0, employmentTax + actualCapitalTax - lastProductionPhase!.endingRevenue)
        }
        setLastTaxPhase(taxResult);
        setRevenue(taxResult.endingRevenue);
        setCapital(taxResult.endingCapital);
    }

    const undoTaxPhase = () => {
        setPhase("production");
        setRevenue(lastTaxPhase.startingRevenue);
        setCapital(lastTaxPhase.startingCapital);
        setLastTaxPhase({
            employmentTax: 0,
            capitalTax: 0,
            startingRevenue: 0,
            startingCapital: 0,
            endingRevenue: 0,
            endingCapital: 0
        })
    }

    const [lastScoring, setLastScoring] = useState<{
        amountMovedToCapital: number,
        finalCapital: number,
        startingTrackMarkerPosition: number,
        finalTrackMarkerPosition: number
    }>({
        amountMovedToCapital: 0,
        finalCapital: 0,
        startingTrackMarkerPosition: 0,
        finalTrackMarkerPosition: 0
    })
    const gotoScoringPhase = () => {
        // Move all revenue to capital
        const finalCapital = lastTaxPhase.endingCapital + lastTaxPhase.endingRevenue
        // Calculate the number of moves on the capital track
        const newTrackPosition = findCapitalTrackPosition(finalCapital)
        const scoreResult = {
            finalCapital,
            amountMovedToCapital: lastTaxPhase.endingRevenue,
            startingTrackMarkerPosition: track,
            finalTrackMarkerPosition: Math.max(track, newTrackPosition)
        }
        setLastScoring(scoreResult);
        setPoints(points + newTrackPosition + (Math.max(0, newTrackPosition - track) * 3));
        setRevenue(0);
        setTrack(Math.max(track, newTrackPosition));
        setCapital(finalCapital);
        setPhase("scoring")
    }

    const undoScoringPhase = () => {
        setPhase("taxes");
        setRevenue(lastScoring.amountMovedToCapital);
        setCapital(lastScoring.finalCapital - lastScoring.amountMovedToCapital);
        setPoints(points - lastScoring.finalTrackMarkerPosition - (Math.max(0, lastScoring.finalTrackMarkerPosition - lastScoring.startingTrackMarkerPosition) * 3));
        setTrack(lastScoring.startingTrackMarkerPosition);
        setLastScoring({
            amountMovedToCapital: 0,
            finalCapital: 0,
            startingTrackMarkerPosition: 0,
            finalTrackMarkerPosition: 0
        });
    }

    const [specialCardDialogOpen, setSpecialCardDialogOpen] = useState(false);
    const [lastCardPlayed, setLastCardPlayed] = useState<null | Record<string, any>>(null);

    // @eslint-disable-next-line @typescript-eslint/no-explicit-any
    function playCard(card: Record<string, any>) {
        switch (card.name) {
            case "Offshore Companies":
                card.amountMoved = Math.floor(revenue / 2);
                setCapital(capital + card.amountMoved);
                setRevenue(revenue - card.amountMoved);
                break;
            case "Buy Private Island":
                setCapital(capital - 50);
                setPoints(points + 7);
                break;
        }
        setLastCardPlayed(card);
    }

    function undoLastCardPlay() {
        if (lastCardPlayed) {
            switch (lastCardPlayed?.name) {
                case "Offshore Companies":
                    setCapital(capital - lastCardPlayed.amountMoved);
                    setRevenue(revenue + lastCardPlayed.amountMoved);
                    break;
                case "Buy Private Island":
                    setCapital(capital + 50);
                    setPoints(points - 7);
                    break;
            }
        }
        setLastCardPlayed(null)
    }

    return (
        <Stack spacing={2} sx={{padding: 2}}>
            <Summary revenue={revenue}
                     capital={capital}
                     estimatedFinalCapital={estimatedFinalRevenue}
                     points={points}
                     track={track}
                     setRevenue={setRevenue}
                     setCapital={setCapital}
                     setPoints={setPoints}
                     setTrack={setTrack}
            />
            <Stack direction="row" sx={{justifyContent: "space-around"}}>
                <Button variant="contained" onClick={() => setSpecialCardDialogOpen(true)}>
                    Play a special card
                </Button>
                <Button variant="contained" onClick={undoLastCardPlay}
                        sx={{visibility: lastCardPlayed ? "visible" : "hidden"}}>
                    Undo last card ({lastCardPlayed?.name})
                </Button>
                <Button variant="contained" onClick={() => setPoints(points + 3)}>
                    Pass a Law (+3★)
                </Button>
                <Button variant="contained" onClick={() => setPoints(points + 1)}>
                    Support a Law (+1★)
                </Button>
            </Stack>
            <Stack spacing={2}>
                <Laws laborLaw={laborLaw}
                      setLaborLaw={setLaborLaw}
                      taxLevel={taxLevel}
                      setTaxLevel={setTaxLevel}
                      healthLevel={healthLevel}
                      setHealthLevel={setHealthLevel}
                      educationLevel={educationLevel}
                      setEducationLevel={setEducationLevel}
                />

                <Storages
                    food={food}
                    setFood={setFood}
                    foodOutput={foodOutput}
                    luxuries={luxuries}
                    setLuxuries={setLuxuries}
                    luxuriesOutput={luxuriesOutput}
                    health={health}
                    setHealth={setHealth}
                    healthOutput={healthOutput}
                    education={education}
                    setEducation={setEducation}
                    educationOutput={educationOutput}
                />

                <Box sx={{layout: "flex"}}>
                    {/*<Accordion*/}
                    {/*    defaultExpanded>*/}
                    {/*    <AccordionSummary*/}
                    {/*        expandIcon={<ArrowDownwardIcon/>}*/}
                    {/*    >*/}
                    <strong>Companies</strong>
                    {/*</AccordionSummary>*/}
                    {/*<AccordionDetails>*/}
                    <Companies companies={companies}
                               setCompanies={updatedCompanies => setCompanies([...updatedCompanies])}
                               laborLaw={laborLaw}
                    />
                    {/*    </AccordionDetails>*/}
                    {/*</Accordion>*/}
                </Box>

                <Paper sx={{padding: 1}}>
                    <Stack spacing={2} sx={{width: "100%"}}>
                        <FormLabel><strong>Estimated Wages</strong></FormLabel>
                        <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
                            <TextField label="WC Wages" value={wcWages} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>+</strong>
                            </div>
                            <TextField label="MC Wages" value={mcWages} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>{"=>"}</strong>
                            </div>
                            <TextField label="Estimated pre-tax profix/loss" value={pretaxRevenue} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                        </Stack>

                        <FormLabel><strong>Estimated Employment Tax</strong></FormLabel>
                        <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
                            <TextField label="Estimated pre-tax profix/loss" value={pretaxRevenue} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>-</strong>
                            </div>
                            <TextField label="Est. Employment Tax" value={employmentTax} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>{"=>"}</strong>
                            </div>

                            <TextField label="Estimated profix/loss" value={preCapitalTaxRevenue} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                        </Stack>

                        <FormLabel><strong>Estimated Capital Tax</strong></FormLabel>
                        <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
                            <TextField label="Estimated pre-tax profix/loss" value={preCapitalTaxRevenue}
                                       disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>-</strong>
                            </div>
                            <TextField label="Est. Capital Tax" value={capitalTax} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>{"=>"}</strong>
                            </div>

                            <TextField label="Estimated profix/loss" value={preCapitalTaxRevenue - capitalTax}
                                       disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <TextField
                                label="Next Capital Tax Amount"
                                value={`Pay $${calculateCapitalTax(nextCorporateTaxBreakpoint, taxLevel)} @ $${nextCorporateTaxBreakpoint}+ Revenue`}
                                disabled={true}/>
                        </Stack>

                        <FormLabel><strong>Post-Tax Profit/Loss</strong></FormLabel>

                        <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
                            <TextField label="Starting Revenue" value={revenue} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>-</strong>
                            </div>
                            <TextField label="Total Wages" value={totalWages} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>-</strong>
                            </div>
                            <TextField label="Total Taxes" value={capitalTax + employmentTax} disabled={true}
                                       sx={{
                                           '& *.Mui-disabled': {color: "inherit", WebkitTextFillColor: 'inherit'}
                                       }}/>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <strong>=</strong>
                            </div>
                            <Tooltip
                                title={(pretaxRevenue - employmentTax - capitalTax) > 0 ? "" : "You aren't gaining any capital this turn!"}>
                                <TextField label="Estimated After-tax Capital Profit/loss" disabled={true}
                                           sx={{
                                               '& *.Mui-disabled': {
                                                   color: (pretaxRevenue - employmentTax - capitalTax) > 0 ? "inherit" : "red",
                                                   WebkitTextFillColor: 'inherit'
                                               }
                                           }}
                                           value={pretaxRevenue - employmentTax - capitalTax}/>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
            {lastProductionPhase &&
                <ProductionPhaseDialog open={phase === "production"} onConfirm={gotoTaxPhase}
                                       onCancel={gotoPlayingPhase} production={lastProductionPhase}/>}
            {lastTaxPhase && <TaxPhaseDialog
                open={phase === "taxes"}
                onConfirm={gotoScoringPhase}
                onCancel={undoTaxPhase}
                employmentTax={lastTaxPhase.employmentTax}
                capitalTax={lastTaxPhase.capitalTax}
                endingRevenue={lastTaxPhase?.endingRevenue as number}
                endingCapital={lastTaxPhase?.endingCapital as number}
            />}
            <ScoringPhaseDialog open={phase === "scoring"} onConfirm={() => gotoPlayingPhase()}
                                onCancel={undoScoringPhase} scoring={lastScoring}/>
            <SpecialCardDialog open={specialCardDialogOpen} onClose={(playedCard) => {
                setSpecialCardDialogOpen(false)
                if (playedCard) {
                    playCard(playedCard);
                }
            }}/>
            <AppBar position="sticky" sx={{marginTop: 10, top: 'auto', bottom: 0}}>
                <Toolbar variant="regular" sx={{justifyContent: "space-between"}}>
                    <Button onClick={() => gotoPlayingPhase}
                            variant={phase === "playing" ? "contained" : "outlined"}
                            color={phase === "playing" ? "success" : "inherit"}>
                        Playing
                    </Button>
                    <Button onClick={gotoProductionPhase}
                            variant={phase === "production" ? "contained" : "outlined"}
                            color={phase === "production" ? "success" : "inherit"}>
                        Production
                    </Button>
                    <Button onClick={() => {
                        if (phase === "taxes") {
                            gotoTaxPhase()
                        }
                    }}
                            variant={phase === "taxes" ? "contained" : "outlined"}
                            color={phase === "taxes" ? "success" : "inherit"}>
                        Taxes
                    </Button>
                    <Button onClick={gotoScoringPhase}
                            variant={phase === "scoring" ? "contained" : "outlined"}
                            color={phase === "scoring" ? "success" : "inherit"}>
                        Scoring
                    </Button>
                </Toolbar>
            </AppBar>
        </Stack>
    )
}

function SpecialCardDialog({open, onClose}: { open: boolean, onClose: (card?: { name: string }) => void }) {
    return <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <Stack spacing={1}>
                {specialCards.map(card => <Button onClick={() => onClose(card)} variant="contained">
                    {card.name}
                </Button>)}
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onClose(undefined)}>Close</Button>
        </DialogActions>
    </Dialog>
}

function Summary({
                     revenue,
                     capital,
                     points,
                     track,
                     setRevenue,
                     setCapital,
                     setPoints,
                     setTrack,
                     estimatedFinalCapital
                 }: {
    revenue: number,
    capital: number,
    estimatedFinalCapital: number,
    points: number,
    track: number,
    setRevenue: (r: number) => void,
    setCapital: (c: number) => void,
    setPoints: (p: number) => void,
    setTrack: (t: number) => void
}) {
    const estimatedPoints = calculatePoints(estimatedFinalCapital, track);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return <Paper style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "10px",
        marginBottom: "10px",
        marginTop: 15
    }}>
        <Grid container columns={{xs: 1, sm: 3}} spacing={1}>
            <Grid size={1}>
                <TextField label="Revenue" value={revenue}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           onChange={(e) => setRevenue(Math.max(0, Number(e.target.value)))}/>
            </Grid>
            <Grid size={1}>
                <TextField label="Capital" value={capital}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           onChange={(e) => setCapital(Number(e.target.value))}/>
            </Grid>
            <Grid size={1}>
                <TextField label="Points" value={points}
                           size={isSmall ? "small" : "medium"}
                           type="number"
                           onChange={(e) => setPoints(Number(e.target.value))}/>
            </Grid>
            <Grid container columns={16} size="grow">
                {Object.entries(capitalTrackPointsForCapital)
                    .map((ct, i) => {
                        const visible = !isSmall || track === ct[1] || findCapitalTrackPosition(estimatedFinalCapital) === i;
                        if (!visible) {
                            return <></>
                        }
                        return <Grid size={{xs: 8, sm: 2, md: 1}}>
                            <Tooltip
                                title={findCapitalTrackPosition(estimatedFinalCapital) === i ? `Your estimated final capital will score ${estimatedPoints} points` : ""}>
                                <Stack
                                    direction={isSmall ? "row" : "column"}
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    style={{
                                        background: findCapitalTrackPosition(estimatedFinalCapital) === i ? "lightblue" : "inherit"
                                    }}>
                                    ${ct[0]}
                                    <Radio checked={track === ct[1]}
                                           onChange={() => setTrack(ct[1])}/>
                                    {ct[1]}
                                </Stack>
                            </Tooltip>
                        </Grid>
                    })}
            </Grid>
        </Grid>
    </Paper>
}

function Law({title, value, setValue}: { title: string, value: 0 | 1 | 2, setValue: (newValue: 0 | 1 | 2) => void }) {
    return <Fragment><FormLabel>{title}</FormLabel>
        <div>
            <ToggleButtonGroup sx={{flexAlign: "center"}} exclusive>
                <ToggleButton value={2} selected={value === 2}
                              style={{
                                  color: value === 2 ? "inherit" : "red",
                                  background: value === 2 ? "red" : "inherit"
                              }}
                              onClick={() => setValue(2)}>A</ToggleButton>
                <ToggleButton value={1} selected={value === 1}
                              style={{
                                  color: value === 1 ? "inherit" : "gold",
                                  background: value === 1 ? "gold" : "inherit"
                              }}
                              onClick={() => setValue(1)}>B</ToggleButton>
                <ToggleButton value={0} selected={value === 0}
                              style={{
                                  color: value === 0 ? "white" : "blue",
                                  background: value === 0 ? "blue" : "white"
                              }}
                              onClick={() => setValue(0)}>C</ToggleButton>
            </ToggleButtonGroup>
        </div>
    </Fragment>
}

function Companies({companies, setCompanies, laborLaw}: {
    companies: (CompanyInstance | null)[],
    setCompanies: (companies: (CompanyInstance | null)[]) => void,
    laborLaw: 0 | 1 | 2
}) {
    const [selectedNewCompanySlot, setSelectedNewCompanySlot] = useState<number | null>(null);
    const [newCompanyDialogOpen, setnewCompanyDialogOpen] = useState(false);

    return <Stack spacing={2}>
        <Stack direction="row" sx={{width: "100%", justifyContent: "space-around"}} spacing={2}>
            <Tooltip title="All companies have their wages set to the minimum.">
                <Button variant="contained" onClick={() => {
                    companies.forEach(company => {
                        if (company) {
                            company.wageLevel = laborLaw;
                        }
                    });
                    setCompanies([...companies]);
                }}>Set All Wages to Minimum ({String.fromCharCode(67 - laborLaw)})</Button>
            </Tooltip>
            <Tooltip title="Any companies with wages below the minimum are raised to the minimum.">
                <Button variant="contained" onClick={() => {
                    companies.forEach(company => {
                        if (company) {
                            company.wageLevel = Math.max(laborLaw, company.wageLevel) as 0 | 1 | 2;
                        }
                    });
                    setCompanies([...companies]);
                }}>Required Wages to Minimum ({String.fromCharCode(67 - laborLaw)})</Button>
            </Tooltip>
        </Stack>

        <Grid sx={{layout: "flex", justifyContent: "center"}} container columns={{xs: 1, sm: 1, md: 3, lg: 4}}
              spacing={2}>
            {companies.map((company, index) => (
                <Grid key={index} size={1}>
                    <CompanyCard laborLaw={laborLaw} company={company}
                                 updateCompany={(updated) => {
                                     companies[index] = updated;
                                     setCompanies([...companies]);
                                 }}
                                 index={index}
                                 openNewCompanyDialog={() => {
                                     setnewCompanyDialogOpen(true);
                                     setSelectedNewCompanySlot(index)
                                 }}
                    />
                </Grid>
            ))}
        </Grid>
        <NewCompanyDialog open={newCompanyDialogOpen} onClose={() => setnewCompanyDialogOpen(false)}
                          companies={companies} setCompanies={companies => setCompanies([...companies])}
                          slot={selectedNewCompanySlot as number} laborLaw={laborLaw}/>
    </Stack>
}

function CompanyCard({company, updateCompany, laborLaw, openNewCompanyDialog}: {
    laborLaw: 0 | 1 | 2,
    company: CompanyInstance | null,
    index: number,
    updateCompany: (company: CompanyInstance | null) => void,
    openNewCompanyDialog: () => void
}) {
    const operational = company && (company.workers || company.fullyAutomated);
    return <Card variant="outlined" sx={{}}
                 style={{background: operational ? "white" : "lightgray"}}
    >
        <CardContent>
            {company ?
                (<Stack>
                        <Stack direction="row" sx={{alignItems: "center", width: "100%"}}
                               spacing={1}>
                            <div>
                                <Tooltip
                                    title={operational ? "Company is operational" : "Company is non-operational"}>
                                    <ToggleButton value={company.name}
                                                  selected={!!company.workers}
                                                  sx={{padding: 0}}>
                                        {!operational && <PersonIcon
                                            sx={{visibility: "hidden"}}/>}
                                        {operational && !company.fullyAutomated && <PersonIcon
                                            sx={{visibility: "visible"}}/>}
                                        {operational && company.fullyAutomated && <SettingsIcon
                                            sx={{visibility: "visible"}}/>}
                                    </ToggleButton>
                                </Tooltip>
                            </div>
                            <div style={{flexGrow: 1, textAlign: "center"}}>
                                {company.name}
                            </div>
                            <Tooltip title="Remove company">
                                <Button color="error" onClick={() => updateCompany(null)}>
                                    <DeleteIcon/>
                                </Button>
                            </Tooltip>
                        </Stack>
                        <div style={{display: "inline-flex", justifyContent: "center"}}>
                            <Stack direction="row">
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    Output: {company.output.base + (company.automatedBonus ? company.output.automationBonus : 0)} {iconForGood(company.type)}
                                </div>
                                {company.output.automationBonus > 0 &&
                                    <Tooltip title={company.automatedBonus ? "Remove Automation" : "Add Automation"}>
                                        <Button sx={{color: company.automatedBonus ? "green" : "gray"}} onClick={() => {
                                            updateCompany({
                                                ...company,
                                                automatedBonus: !company.automatedBonus
                                            })
                                        }}>
                                            <SettingsIcon/>
                                        </Button>
                                    </Tooltip>}
                            </Stack>
                        </div>
                        {company.fullyAutomated ?
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Tooltip title="Fully Automated">
                                    <SettingsIcon style={{color: "green"}}/>
                                </Tooltip>
                            </div> : <Fragment>
                                <RadioGroup row style={{justifyContent: "space-around"}}>
                                    <Tooltip title="Remove Workers from this company">
                                        <FormControlLabel sx={{marginLeft: 0}}
                                                          control={<Radio size="small"
                                                                          checked={!company.workers}
                                                                          onClick={() => {
                                                                              updateCompany({...company, workers: null})
                                                                          }}/>} label="N/A"/>
                                    </Tooltip>
                                    <Tooltip title="Set Middle Class Workers">
                                        <FormControlLabel sx={{marginLeft: 0}}
                                                          control={<Radio size="small"
                                                                          checked={company.workers === "mc"}
                                                                          onClick={() => {
                                                                              updateCompany({...company, workers: "mc"})
                                                                          }}/>} label="MC"/>
                                    </Tooltip>
                                    <Tooltip title="Set Working Class Workers">
                                        <FormControlLabel sx={{marginLeft: 0}}
                                                          control={<Radio size="small"
                                                                          checked={company.workers === "wc"}
                                                                          onClick={() => {
                                                                              updateCompany({...company, workers: "wc"})
                                                                          }}/>} label="WC"/>
                                    </Tooltip>
                                </RadioGroup>

                                <div>
                                    Wages
                                </div>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <RadioGroup row>
                                        <FormControlLabel sx={{marginLeft: 0}}
                                                          control={<Radio
                                                              checked={company.wageLevel == 2}
                                                              style={{color: "red"}}
                                                              onClick={() => {
                                                                  updateCompany({...company, wageLevel: 2})
                                                              }} size="small"/>}
                                                          label={company.wages[2].toString()}/>
                                        <FormControlLabel sx={{marginLeft: 0}}
                                                          control={<Radio
                                                              checked={company.wageLevel == 1}
                                                              style={{color: "gold"}}
                                                              onClick={() => {
                                                                  updateCompany({...company, wageLevel: 1})
                                                              }} size="small"/>}
                                                          label={company.wages[1].toString()}/>
                                        <FormControlLabel sx={{marginLeft: 0}}
                                                          control={<Radio
                                                              checked={company.wageLevel == 0}
                                                              style={{color: "blue"}}
                                                              onClick={() => {
                                                                  updateCompany({...company, wageLevel: 0})
                                                              }} size="small"/>}
                                                          label={company.wages[0].toString()}/>
                                    </RadioGroup>
                                    {company.wageLevel < laborLaw &&
                                        <Tooltip
                                            title="Wages too below the minimum set by labor law!">
                                            <WarningIcon></WarningIcon>
                                        </Tooltip>}
                                </div>
                            </Fragment>}
                    </Stack>
                ) :
                <div style={{width: "100%", height: "100%"}}>
                    <Button sx={{height: "100%", width: "100%"}} onClick={openNewCompanyDialog}><AddIcon/></Button>
                </div>
            }
        </CardContent>
    </Card>
}

function GoodsAndServicesStorageCard({type, quantity, output, capacity, updateQuantity, updateStorage}: {
    type: "food" | "luxuries" | "health" | "education",
    quantity: number,
    capacity: number,
    output: number,
    updateQuantity: (quantity: number) => void,
    updateStorage: (buildStorage: boolean) => void
}) {
    const overflow = (quantity + output) > capacity
    const isSmall = useMediaQuery(useTheme().breakpoints.down("sm"));
    return <Card sx={{flexGrow: 1, display: "flex"}}>
        <CardContent
            sx={{flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Stack spacing={1}>
                {type.substring(0, 1).toUpperCase() + type.substring(1)} {iconForGood(type)}
                <TextField type="number"
                           label="Current"
                           value={quantity}
                           onChange={(e) => updateQuantity(Math.max(0, Number.parseInt(e.target.value)))}
                />
                <Stack direction={isSmall ? "column" : "row"} spacing={1}>
                    <Tooltip title="Storage capacity">
                        <TextField label="Capacity"
                                   value={capacity}
                                   disabled={true}
                                   slotProps={{
                                       input: {
                                           endAdornment: <InputAdornment style={{width: 24}} position="end">
                                               <Tooltip title={capacity === 12 ? "Add Storage" : "Remove Storage"}>
                                                   <Button style={{padding: 0, minWidth: 0}}
                                                           onClick={() => updateStorage(capacity === 12)}>
                                                       <WarehouseIcon
                                                           style={{color: capacity === 12 ? "gray" : "green"}}
                                                           fontSize="small" sx={{margin: 0}}/>
                                                   </Button>
                                               </Tooltip>
                                           </InputAdornment>
                                       }
                                   }}
                        />
                    </Tooltip>
                    <Tooltip title="How much will be produced this turn">
                        <TextField label="Est. Output"
                                   value={output}
                                   disabled={true}
                        />
                    </Tooltip>
                    <TextField label="Est. Total"
                               value={output + quantity}
                               disabled={true}
                               slotProps={{
                                   input: {
                                       endAdornment: <InputAdornment position="end">
                                           <Tooltip title="Production will cause storage to overflow"><WarningIcon
                                               sx={{visibility: overflow ? "visible" : "hidden", color: "orange"}}
                                           /></Tooltip>
                                       </InputAdornment>
                                   }
                               }}
                    />
                </Stack>
            </Stack>
        </CardContent>
    </Card>
}

function ProductionPhaseDialog({
                                   open,
                                   onConfirm,
                                   onCancel,
                                   production
                               }: {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    production: {
        wages: { mc: number, wc: number, total: number },
        output: { food: number, luxuries: number, health: number, education: number },
        startingCapital: number,
        startingRevenue: number,
        endingCapital: number,
        endingRevenue: number
    }
}) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Do Your Production</DialogTitle>
            <DialogContent>
                <Grid spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                    <Box>
                        <FormLabel><strong>Pay These Wages:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Working Class Wages" value={production.wages.wc}/>
                            <TextField label="Middle Class Wages" value={production.wages.mc}/>
                        </Stack>
                    </Box>
                    <Box>
                        <FormLabel><strong>Collect These Resources:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField
                                label="Food"
                                value={production.output.food}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><FoodIcon/></InputAdornment>
                                }}
                            />
                            <TextField
                                label="Luxuries"
                                value={production.output.luxuries}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><LuxuryIcon/></InputAdornment>
                                }}
                            />
                            <TextField
                                label="Health"
                                value={production.output.health}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><HealthIcon/></InputAdornment>
                                }}
                            />
                            <TextField
                                label="Education"
                                value={production.output.education}
                                disabled
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><EducationIcon/></InputAdornment>
                                }}
                            />
                        </Stack>
                    </Box>
                </Grid>
            </DialogContent>
            <DialogActions sx={{justifyContent: "space-between"}}>
                <Button onClick={onCancel} variant="contained" color="error">Go Back</Button>
                <Button onClick={onConfirm} variant="contained">Done, Go to Taxes</Button>

            </DialogActions>
        </Dialog>
    );
}

function NewCompanyDialog({open, onClose, companies, setCompanies, slot, laborLaw}: {
    open: boolean,
    onClose: () => void,
    companies: (CompanyInstance | null)[],
    setCompanies: (companies: (CompanyInstance | null)[]) => void,
    slot: number,
    laborLaw: number
}) {
    const sortedCompanies = Object.entries(companyDefinitions).sort((a, b) => a[1].name.localeCompare(b[1].name));
    const [filter, setFilter] = useState("");
    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent sx={{height: "60vh"}}>
            <Paper style={{position: "sticky", top: 0, zIndex: 100}}>
                <TextField sx={{width: "100%"}} label="Filter" value={filter}
                           onChange={e => setFilter(e.target.value)}></TextField>
            </Paper>
            <div style={{height: "100%", overflowY: "auto"}}>
                <Stack spacing={2} sx={{minWidth: "400px", marginTop: 1}}>
                    {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                    {sortedCompanies.filter(([k, c]) => c.name.toLowerCase().includes(filter)).map(([key, company]) => (
                        <Button key={key} variant="outlined" fullWidth onClick={() => {
                            companies[slot] = {...company, wageLevel: laborLaw} as CompanyInstance;
                            setCompanies([...companies]);
                            onClose();
                        }}>
                            {company.name}
                        </Button>
                    ))}
                </Stack>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
}

function TaxPhaseDialog({
                            open,
                            onConfirm,
                            onCancel,
                            employmentTax,
                            capitalTax,
                            endingRevenue,
                            endingCapital
                        }: {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    employmentTax: number,
    capitalTax: number,
    endingRevenue: number,
    endingCapital: number
}) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Pay Your Taxes</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                    <Box>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Employment Tax" value={employmentTax} disabled/>
                            <TextField label="Capital Tax" value={capitalTax} disabled/>
                            <TextField label="Total Taxes" value={employmentTax + capitalTax} disabled/>
                        </Stack>
                    </Box>
                    <Box>
                        <FormLabel><strong>After taxes you will have:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}} direction="row">
                            <Stack direction="row">
                                <TextField disabled={true} label="Revenue" value={endingRevenue}/>
                                <TextField disabled={true} label="Capital" value={endingCapital}/>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions sx={{justifyContent: "space-between"}}>
                <Button onClick={onCancel} variant="contained" color="error">Go Back</Button>
                <Button onClick={onConfirm} variant="contained">Done, Go to Scoring</Button>
            </DialogActions>
        </Dialog>
    );
}

function ScoringPhaseDialog({
                                open,
                                onConfirm,
                                onCancel,
                                scoring
                            }: {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    scoring: {
        finalCapital: number,
        startingTrackMarkerPosition: number,
        finalTrackMarkerPosition: number
    }
}) {
    const pointsGained = findCapitalTrackPosition(scoring.finalCapital) + (Math.max(0, scoring.finalTrackMarkerPosition - scoring.startingTrackMarkerPosition) * 3);
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Do Your Scoring</DialogTitle>
            <DialogContent>
                <strong>You will have:</strong>
                <Stack spacing={3} sx={{minWidth: "400px", marginTop: 1}}>
                    <Box>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Final Capital" value={scoring.finalCapital} disabled/>
                        </Stack>
                    </Box>
                    {scoring.finalTrackMarkerPosition > scoring.startingTrackMarkerPosition &&
                        <Box>
                            <FormLabel>
                                <strong>Move the marker on your Capital Track to
                                    ${capitalTrack[scoring.finalTrackMarkerPosition][0]}/{capitalTrack[scoring.finalTrackMarkerPosition][1]}★</strong>
                            </FormLabel>
                        </Box>}
                    <Box>
                        <FormLabel><strong>Then Score:</strong></FormLabel>
                        <Stack spacing={1} sx={{marginTop: 1}}>
                            <TextField label="Points" value={pointsGained} disabled/>
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions sx={{justifyContent: "space-between"}}>
                <Button onClick={onCancel} variant="contained" color="error">Go Back</Button>
                <Button onClick={onConfirm} variant="contained">Done, Next Turn</Button>
            </DialogActions>
        </Dialog>
    );
}

export function Laws({
                         laborLaw,
                         setLaborLaw,
                         taxLevel,
                         setTaxLevel,
                         healthLevel,
                         setHealthLevel,
                         educationLevel,
                         setEducationLevel
                     }: {
    laborLaw: 0 | 1 | 2,
    setLaborLaw: (v: 0 | 1 | 2) => void,
    taxLevel: 0 | 1 | 2,
    setTaxLevel: (v: 0 | 1 | 2) => void,
    healthLevel: 0 | 1 | 2,
    setHealthLevel: (v: 0 | 1 | 2) => void,
    educationLevel: 0 | 1 | 2,
    setEducationLevel: (v: 0 | 1 | 2) => void
}) {
    return <Paper sx={{padding: 1}}>
        <strong>Laws</strong>
        <Grid container columns={{xs: 1, sm: 4}} sx={{justifyContent: "center"}}>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Labor" value={laborLaw} setValue={setLaborLaw}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Tax" value={taxLevel} setValue={setTaxLevel}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Health" value={healthLevel} setValue={setHealthLevel}/>
            </Grid>
            <Grid size={1} sx={{justifyContext: "space-around"}}>
                <Law title="Education" value={educationLevel} setValue={setEducationLevel}/>
            </Grid>
        </Grid>
    </Paper>
}

function Storages({
                      food,
                      luxuries,
                      health,
                      education,
                      setFood,
                      setLuxuries,
                      setHealth,
                      setEducation,
                      foodOutput,
                      healthOutput,
                      educationOutput,
                      luxuriesOutput
                  }: {
    food: { quantity: number, storageBuilt: boolean },
    luxuries: { quantity: number, storageBuilt: boolean },
    health: { quantity: number, storageBuilt: boolean },
    education: { quantity: number, storageBuilt: boolean },
    setFood: (f: { quantity: number, storageBuilt: boolean }) => void,
    setLuxuries: (l: { quantity: number, storageBuilt: boolean }) => void,
    setHealth: (h: { quantity: number, storageBuilt: boolean }) => void,
    setEducation: (e: { quantity: number, storageBuilt: boolean }) => void,
    foodOutput: number,
    healthOutput: number,
    educationOutput: number,
    luxuriesOutput: number
}) {
    return <Box sx={{layout: "flex"}}>
        <strong>Storages</strong>
        <Grid container columns={{xs: 1, sm: 4}} spacing={2}>
            <Grid size={1}>
                <GoodsAndServicesStorageCard type="food" quantity={food.quantity}
                                             capacity={food.storageBuilt ? 24 : 12}
                                             output={foodOutput}
                                             updateQuantity={q => setFood({...food, quantity: q})}
                                             updateStorage={storageBuilt => setFood({
                                                 ...food,
                                                 storageBuilt
                                             })}
                />
            </Grid>
            <Grid size={1}>
                <GoodsAndServicesStorageCard type="luxuries" quantity={luxuries.quantity}
                                             capacity={luxuries.storageBuilt ? 24 : 12}
                                             output={luxuriesOutput}
                                             updateStorage={storageBuilt => setLuxuries({
                                                 ...luxuries,
                                                 storageBuilt
                                             })}
                                             updateQuantity={q => setLuxuries({...luxuries, quantity: q})}
                />
            </Grid>
            <Grid size={1}>
                <GoodsAndServicesStorageCard type="health" quantity={health.quantity}
                                             capacity={health.storageBuilt ? 24 : 12}
                                             output={healthOutput}
                                             updateStorage={storageBuilt => setHealth({
                                                 ...health,
                                                 storageBuilt
                                             })}
                                             updateQuantity={q => setHealth({...health, quantity: q})}
                />
            </Grid>
            <Grid size={1}>
                <GoodsAndServicesStorageCard type="education" quantity={education.quantity}
                                             capacity={education.storageBuilt ? 24 : 12}
                                             output={educationOutput}
                                             updateStorage={storageBuilt => setEducation({
                                                 ...education,
                                                 storageBuilt
                                             })}
                                             updateQuantity={q => setEducation({...education, quantity: q})}
                />
            </Grid>
        </Grid>
    </Box>
}

export default App
