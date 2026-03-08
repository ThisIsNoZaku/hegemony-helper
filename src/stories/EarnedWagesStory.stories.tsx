import {ExpectedWagesCalculator} from "../components/ExpectedWages.tsx";

const meta = {
    component: ExpectedWagesCalculator,
}

export default meta;

export const WorkingClass = {
    args: {
        mc: 15,
        cc: 30,
        state: 30
    }
}

export const MiddleClass = {
    args: {
        mc: undefined,
        cc: 30,
        state: 30
    }
}