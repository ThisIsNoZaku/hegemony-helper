import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {Button, Card, CardContent, Grid, InputAdornment, Stack, TextField, Tooltip} from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import WarningIcon from "@mui/icons-material/Warning";
import GoodsIcon from "./GoodsIcon.tsx";

export default function GoodsAndServicesStorageCard({type, quantity, output, capacity, updateQuantity, updateStorage}: {
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
                {type.substring(0, 1).toUpperCase() + type.substring(1)} {<GoodsIcon type={type}/>}
                <Grid columns={10} container spacing={1} alignItems="center">
                    <Grid size={7}>
                        <TextField type="number"
                                   label="Current"
                                   value={quantity}
                                   sx={{flexGrow: 3}}
                                   onChange={(e) => updateQuantity(Math.max(0, Number.parseInt(e.target.value)))}/>
                    </Grid>
                    <Grid size={3}>
                        <Tooltip title="Storage capacity">
                            <TextField label="Capacity"
                                       sx={{flexGrow: 1, flexBasis: 0}}
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
                    </Grid>
                </Grid>
                <Stack direction={isSmall ? "column" : "row"} spacing={1}>

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