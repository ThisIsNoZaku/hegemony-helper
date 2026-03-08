import IconField from "../components/IconField.tsx";
import PersonIcon from "@mui/icons-material/Person";

const meta = {
    component: IconField
}

export default meta;

export const IconFieldStory = {
    args: {
        icon: <PersonIcon/>,
        value: 123,
        label: "The Label"
    }
}