import {EducationIcon, FoodIcon, HealthIcon, InfluenceIcon, LuxuryIcon} from "./Icons.tsx";

export default function GoodsIcon({type}: {type: "food" | "luxuries" | "health" | "education" | "influence"}) {
    switch (type) {
        case "food":
            return <FoodIcon/>
        case "luxuries":
            return <LuxuryIcon/>
        case "education":
            return <EducationIcon/>
        case "health":
            return <HealthIcon/>
        case "influence":
            return <InfluenceIcon/>
        default:
            throw new Error(`Unknown goods type: ${type}`);
    }
}