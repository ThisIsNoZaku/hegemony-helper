import BusinessIcon from "@mui/icons-material/Business";
import type {LawId} from "../data/laws.ts";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {EducationIcon, HealthIcon} from "./Icons.tsx";
import type {Theme} from "@mui/material/styles";
import type {SxProps} from "@mui/system";
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import GroupsIcon from '@mui/icons-material/Groups';

export default function LawIcon({law, sx}: { law: LawId, sx?: SxProps<Theme> }) {
    switch (law) {
        case "fiscal":
            return <FiscalIcon sx={sx}/>
        case "labor":
            return <LaborMarket sx={sx}/>
        case "tax":
            return <TaxIcon sx={sx}/>
        case "health":
            return <WelfareHealthIcon sx={sx}/>
        case "education":
            return <WelfareEducationIcon sx={sx}/>
        case "foreignTrade":
            return <ForeignTradeIcon sx={sx}/>
        case "immigration":
            return <ImmigrationIcon sx={sx}/>
    }
}

export function FiscalIcon({sx}: { sx?: SxProps<Theme> }) {
    return <BusinessIcon sx={sx}/>
}

export function LaborMarket({sx}: { sx?: SxProps<Theme> }) {
    return <LocalAtmIcon sx={sx}/>
}

export function TaxIcon({sx}: { sx?: SxProps<Theme> }) {
    return <ReceiptLongIcon sx={sx}/>
}

export function WelfareHealthIcon({sx}: { sx?: SxProps<Theme> }) {
    return <HealthIcon sx={sx}/>
}

export function WelfareEducationIcon({sx}: { sx?: SxProps<Theme> }) {
    return <EducationIcon sx={sx}/>
}

export function ForeignTradeIcon({sx}: { sx?: SxProps<Theme> }) {
    return <DirectionsBoatIcon sx={sx}/>
}

export function ImmigrationIcon({sx}: { sx?: SxProps<Theme> }) {
    return <GroupsIcon sx={sx}/>
}