import FavoriteIcon from "@mui/icons-material/Favorite";
import SchoolIcon from "@mui/icons-material/School";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import SpaIcon from "@mui/icons-material/Spa";
import SquareIcon from '@mui/icons-material/Square';

function HealthIcon() {
    return <FavoriteIcon style={{color: "red"}}/>
}

function EducationIcon() {
    return <SchoolIcon style={{color: "orange"}}/>
}

function LuxuryIcon() {
    return <SmartphoneIcon style={{color: "blue"}}/>;
}

function FoodIcon() {
    return <SpaIcon style={{color: "green"}}/>
}

function InfluenceIcon() {
    return <SquareIcon style={{color: "purple"}}/>
}

export {HealthIcon, EducationIcon, LuxuryIcon, FoodIcon, InfluenceIcon};