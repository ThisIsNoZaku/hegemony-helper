import {
    Box,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField, Tooltip
} from "@mui/material";
import {IncomeTaxCalculator} from "../taxes/IncomeTaxCalculator.tsx";
import type {WorkingClassPlayer} from "../../data/working-class/workingClass.ts";
import type {LawId, LawLevel} from "../../data/laws.ts";
import {useContext, useState} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import {Actions as workingClass} from "../../data/working-class/workingClass.ts";
import {type SxProps} from "@mui/system";
import {type Theme} from "@mui/material/styles";
import {getClassColor} from "../../utilities/getClassColor.ts";
import {ExpectedWagesCalculator} from "../ExpectedWages.tsx";
import type {CapitalistPlayer} from "../../data/capitalists/capitalists.ts";
import type {StatePlayer} from "../../data/state/state.ts";
import type {MiddleClassPlayer} from "../../data/middle-class/middleClass.ts";
import type {PlayerClass} from "../../data/players.ts";
import NumberSpinnerField from "../NumberSpinnerField.tsx";
import _ from "lodash";
import PersonIcon from "@mui/icons-material/Person";
import {ForeignTradeIcon} from "../LawIcon.tsx";
import PaidIcon from "@mui/icons-material/Paid";

export default function ({wc, mc, cc, state, laws, sx}: {
    wc: WorkingClassPlayer,
    mc: MiddleClassPlayer,
    cc: CapitalistPlayer,
    state: StatePlayer,
    laws: Record<LawId, LawLevel>,
    sx?: SxProps<Theme>
}) {
    const dispatch = useContext(DispatchContext) as React.Dispatch<any>;
    const estimatedWages = cc.companies.concat(state.companies).reduce((total, c) => {
        if (c?.workers === "wc") {
            total[c.class] += c.wages[c.wageLevel as number];
        }
        return total;
    }, {
        cc: 0,
        state: 0,
        mc: mc ? 0 : undefined
    } as Record<PlayerClass, number>);
    (mc || {companies: []}).companies.filter(c => c).reduce((wages, c) => {
        if (c?.hasBonusWorker) {
            wages.mc += c.wages[c.wageLevel as number];
        }
        return wages;
    }, estimatedWages);
    const [estimatedFoodPrice, setEstimatedFoodPrice] = useState(12);

    return <Paper sx={{
        padding: "5px",
        backgroundColor: getClassColor("wc", .1),
        border: "2px solid " + getClassColor("wc"),
        ...(sx || {})
    }}>
        <Stack spacing={1}>
            <FormLabel component="legend"><strong>Working Class</strong></FormLabel>
            <Paper>
                <Stack spacing={1.} direction="row" justifyContent="space-between" alignItems="center">
                    <NumberSpinnerField value={wc.population}
                                        label="Workers"
                                        onChange={(_e, v) => {
                                            const value = _.clamp(v, 10, 30);
                                            dispatch(workingClass.update.population(value));
                                        }}/>
                    <div style={{flexGrow: 1, display: "flex", textAlign: "center"}}>
                        =
                    </div>
                    <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                        <PersonIcon sx={{color: getClassColor("wc")}}/>
                        <TextField type="number"
                                   sx={{flexGrow: 2}}
                                   label="Population" value={Math.floor(wc.population / 3)}/>
                    </Stack>
                </Stack>
            </Paper>
            <Paper>
                <ExpectedWagesCalculator cc={estimatedWages.cc} state={estimatedWages.state} mc={estimatedWages.mc}/>
            </Paper>
            <Paper>
                <Stack spacing={1}>
                    <FormLabel component="legend"><strong>Estimated Food Cost</strong></FormLabel>
                    <Stack spacing={1} direction="row">
                        <FormControl sx={{flexGrow: 2, minWidth: 275, maxWidth: 275}}>
                            <InputLabel>Estimated Price of Food</InputLabel>
                            <Select variant={"outlined"}
                                    sx={{width: "100%"}}
                                    value={estimatedFoodPrice}
                                    label="Estimated Price of Food"
                                    onChange={e => setEstimatedFoodPrice(Number(e.target.value))}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {minWidth: 275}
                                        }
                                    }}>
                                <MenuItem value={9} sx={{alignContent: "center"}}>
                                    <Tooltip title={`9 to CC` + (mc ? " or MC" : "")} placement="right">
                                        <span style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "100%",
                                            width: "100%"
                                        }}>9 to <PersonIcon
                                            sx={{color: getClassColor("cc")}}/>{mc && <>/<PersonIcon
                                            sx={{color: getClassColor("mc")}}/></>}</span>
                                    </Tooltip>
                                </MenuItem>
                                <MenuItem value={10}>
                                    <Tooltip title="10 to Foreign Trade" placement="right">
                                        <span style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "100%",
                                            width: "100%"
                                        }}>10 to <ForeignTradeIcon/></span>
                                    </Tooltip>
                                </MenuItem>
                                <MenuItem value={12}>
                                    <Tooltip title={`12 to CC` + (mc ? " or MC" : "")} placement="right">
                                        <span style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "100%",
                                            width: "100%"
                                        }}>12 to <PersonIcon
                                            sx={{color: getClassColor("cc")}}/>{mc && <>/<PersonIcon
                                            sx={{color: getClassColor("mc")}}/></>}</span>
                                    </Tooltip>
                                </MenuItem>
                                <MenuItem value={15}>
                                    <Tooltip title={`15 to CC` + (mc ? " or MC" : "")} placement="right">
                                        <span style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "100%",
                                            width: "100%"
                                        }}>15 to <PersonIcon
                                            sx={{color: getClassColor("cc")}}/>{mc && <>/<PersonIcon
                                            sx={{color: getClassColor("mc")}}/></>}
                                            or 10 to <ForeignTradeIcon/> + 5 to <PersonIcon
                                                sx={{color: getClassColor("state")}}/>
                                        </span>
                                    </Tooltip>
                                </MenuItem>
                                <MenuItem value={20}>
                                    <Tooltip title="10 to Foreign Trade + 10 to State" placement="right"><span style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                        width: "100%"
                                    }}>10 to <ForeignTradeIcon/> + 10 to <PersonIcon
                                        sx={{color: getClassColor("state")}}/></span>
                                    </Tooltip>
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={{alignContent: "center"}}>
                            x
                        </Box>
                        <Stack direction="row" sx={{alignContent: "center", alignItems: "center"}}>
                            <PersonIcon sx={{color: getClassColor("wc")}}/>
                            <TextField type="number"
                                       sx={{flexGrow: 2}}
                                       label="Population" value={Math.floor(wc.population / 3)}/>
                        </Stack>
                        <Box sx={{alignContent: "center"}}>
                            =
                        </Box>
                        <Stack direction="row" sx={{alignContent: "center", alignItems: "center", flexGrow: 1}}>
                            <PaidIcon/>
                            <TextField sx={{flexGrow: 1}} type="number" label="Estimated Total"
                                       value={Math.floor(wc.population / 3) * estimatedFoodPrice}/>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
            <Paper>
                <FormLabel component="legend"><strong>Taxes</strong></FormLabel>
                <IncomeTaxCalculator player="wc" taxableWorkers={Math.floor(wc.population / 3)} laws={laws}/>
            </Paper>
        </Stack>
    </Paper>
}