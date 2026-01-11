import FavoriteIcon from "@mui/icons-material/Favorite";
import SchoolIcon from "@mui/icons-material/School";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import SpaIcon from "@mui/icons-material/Spa";

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

function InfluenceIcon() {
    return <div style={{color: "purple"}}>
        ■
    </div>
}
export { HealthIcon, EducationIcon, LuxuryIcon, FoodIcon, InfluenceIcon };