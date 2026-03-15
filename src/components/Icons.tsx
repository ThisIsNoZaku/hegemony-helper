import FavoriteIcon from "@mui/icons-material/Favorite";
import SchoolIcon from "@mui/icons-material/School";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import SpaIcon from "@mui/icons-material/Spa";
import SquareIcon from '@mui/icons-material/Square';
import type {SxProps} from "@mui/system";
import type {Theme} from "@mui/material/styles";

function HealthIcon({sx}: { sx?: SxProps<Theme> }) {
    return <FavoriteIcon sx={{color: "red", ...(sx || {})}} />
}

function EducationIcon({sx}: { sx?: SxProps<Theme> }) {
    return <SchoolIcon sx={{color: "orange", ...(sx || {})}} />
}

function LuxuryIcon({sx}: { sx?: SxProps<Theme> }) {
    return <SmartphoneIcon sx={{color: "blue", ...(sx || {})}} />
}

function FoodIcon({sx}: { sx?: SxProps<Theme> }) {
    return <SpaIcon sx={{color: "green", ...(sx || {})}} />
}

function InfluenceIcon({sx}: { sx?: SxProps<Theme> }) {
    return <SquareIcon sx={{color: "purple", ...(sx || {})}} />
}

export {HealthIcon, EducationIcon, LuxuryIcon, FoodIcon, InfluenceIcon};