import Storages from "../components/capitalists/Storages.tsx";

const meta = {
    component: Storages,
    argTypes: {
        highlightColor: {
            value: "red",
            options: ["red", "goldenrod"],
            control: {
                type: "select",
            }
        }
    }
}

export default meta;

export const Capitalist = {
    args: {

    }
}