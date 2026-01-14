import {Button, Card, CardContent, Grid, InputAdornment, TextField, Tooltip} from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import WarningIcon from "@mui/icons-material/Warning";
import GoodsIcon from "../GoodsIcon.tsx";

export default function GoodsAndServicesStorageCard({type, ftzQuantity, storageBought, quantity, output, capacity, updateQuantity, updateStorage, updateFtzQuantity}: {
    type: "food" | "luxuries" | "health" | "education",
    quantity: number,
    ftzQuantity?: number,
    capacity: number,
    output: number,
    storageBought?: boolean,
    updateQuantity: (quantity: number) => void,
    updateStorage: (buildStorage: boolean) => void,
    updateFtzQuantity?: (quantity: number) => void
}) {
    const overflow = Math.max(0, quantity + output - capacity)

    return <Card sx={{flexGrow: 1, display: "flex"}}>
        <CardContent
            sx={{flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Grid container columns={10} spacing={1}>
                <Grid size={10} textAlign="center">
                    {type.substring(0, 1).toUpperCase() + type.substring(1)} {<GoodsIcon type={type}/>}
                </Grid>
                <Grid size={{xs: 10, sm: 10, md: 7}}>
                    <TextField type="number"
                               sx={{width: "100%"}}
                               label="Current"
                               value={quantity}
                               onChange={(e) => updateQuantity(Math.max(0, Number.parseInt(e.target.value)))}/>
                </Grid>
                <Grid size={{xs: 10, sm: 10, md: 3}}>
                    <Tooltip title="Storage capacity">
                        <TextField label="Capacity"
                                   value={capacity}
                                   sx={{width: "100%"}}
                                   disabled={true}
                                   slotProps={{
                                       input: {
                                           endAdornment: <InputAdornment style={{width: 24}} position="end">
                                               <Tooltip title={!storageBought ? "Add Storage" : "Remove Storage"}>
                                                   <Button style={{padding: 0, minWidth: 0}}
                                                           onClick={() => updateStorage(!storageBought)}>
                                                       <WarehouseIcon
                                                           style={{color: !storageBought ? "gray" : "green"}}
                                                           fontSize="small" sx={{margin: 0}}/>
                                                   </Button>
                                               </Tooltip>
                                           </InputAdornment>
                                       }
                                   }}
                        />
                    </Tooltip>
                </Grid>
                <Grid size={{xs: 10, sm: 5}}>
                    <Tooltip title="How much will be produced this turn">
                        <TextField label="Est. Output"
                                   value={output}
                                   sx={{width: "100%"}}
                                   disabled={true}
                        />
                    </Tooltip>
                </Grid>
                <Grid size={{xs: 10, sm: 5}}>
                    <TextField label="Est. Total"
                               value={output + quantity}
                               disabled={true}
                               sx={{width: "100%"}}
                               slotProps={{
                                   input: {
                                       endAdornment: <InputAdornment position="end">
                                           <Tooltip title="Estimated output can't fit in storage"><WarningIcon
                                               sx={{visibility: overflow ? "visible" : "hidden", color: (["food", "luxuries"].includes(type) ? "orange" : "red")}}
                                           /></Tooltip>
                                       </InputAdornment>
                                   }
                               }}
                    />
                </Grid>
                {["food", "luxuries"].includes(type) && <Grid size={10} textAlign="center" sx={{mt: 1}}>
                    <Grid size={10}>
                        <TextField label="Current FTZ Quantity"
                                   value={ftzQuantity}
                                   type="number"
                                      onChange={(e) =>
                                          updateFtzQuantity!(Math.min(type === "food" ? 8 : 12, Math.max(0, Number.parseInt(e.target.value))))
                                      }
                                   sx={{width: "100%"}}
                                   slotProps={{
                                       input: {
                                           endAdornment: <InputAdornment position="end">
                                               <Tooltip title="More than can fit in the Free Trade Zone will be produced."><WarningIcon
                                                   sx={{visibility: (overflow + ftzQuantity! - capacity) > (type === "food" ? 8 : 12) ? "visible" : "hidden", color: "red"}}
                                               /></Tooltip>
                                           </InputAdornment>
                                       }
                                   }}
                        />
                    </Grid>
                </Grid>}
            </Grid>
        </CardContent>
    </Card>
}