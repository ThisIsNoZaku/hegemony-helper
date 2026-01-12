import {Box, Grid} from "@mui/material";
import GoodsAndServicesStorageCard from "./GoodsAndServicesCard";

export default function Storages({
                                     food,
                                     luxuries,
                                     health,
                                     education,
                                     setFood,
                                     setLuxuries,
                                     setHealth,
                                     setEducation,
                                     foodOutput,
                                     healthOutput,
                                     educationOutput,
                                     luxuriesOutput
                                 }: {
    food: { quantity: number, storageBought?: boolean, ftzQuantity: number },
    luxuries: { quantity: number, storageBought?: boolean, ftzQuantity: number },
    health: { quantity: number, storageBought?: boolean },
    education: { quantity: number, storageBought?: boolean },
    setFood: (f: { quantity: number, storageBought?: boolean, ftzQuantity: number }) => void,
    setLuxuries: (f: { quantity: number, storageBought?: boolean, ftzQuantity: number }) => void,
    setHealth: (h: { quantity: number, storageBought?: boolean }) => void,
    setEducation: (e: { quantity: number, storageBought?: boolean }) => void,
    foodOutput: number,
    healthOutput: number,
    educationOutput: number,
    luxuriesOutput: number
}) {
    return <Box sx={{layout: "flex"}}>
        <strong>Storages</strong>
        <Grid container columns={{xs: 1, sm: 1, md: 2, lg: 4}} spacing={2}>
            <Grid size={1}>
                <GoodsAndServicesStorageCard type="food" quantity={food.quantity}
                                             capacity={food.storageBought ? 16 : 8}
                                             storageBought={food.storageBought}
                                             output={foodOutput}
                                             ftzQuantity={food.ftzQuantity}
                                             updateQuantity={q => setFood({...food, quantity: q})}
                                             updateStorage={storageBought => setFood({
                                                 ...food,
                                                 storageBought
                                             })}
                                             updateFtzQuantity={q => setFood({...food, ftzQuantity: q})}
                />
            </Grid>
            <Grid size={1}>
                <GoodsAndServicesStorageCard type="luxuries" quantity={luxuries.quantity}
                                             capacity={luxuries.storageBought? 24 : 12}
                                             storageBought={luxuries.storageBought}
                                             output={luxuriesOutput}
                                             ftzQuantity={luxuries.ftzQuantity}
                                             updateStorage={storageBought => setLuxuries({
                                                 ...luxuries,
                                                 storageBought
                                             })}
                                             updateQuantity={q => setLuxuries({...luxuries, quantity: q})}
                                             updateFtzQuantity={q => setLuxuries({...luxuries, ftzQuantity: q})}
                />
            </Grid>
            <Grid size={1}>
                <GoodsAndServicesStorageCard type="health" quantity={health.quantity}
                                             capacity={health.storageBought? 24 : 12}
                                             output={healthOutput}
                                             storageBought={health.storageBought}
                                             updateStorage={storageBought => setHealth({
                                                 ...health,
                                                 storageBought
                                             })}
                                             updateQuantity={q => setHealth({...health, quantity: q})}
                />
            </Grid>
            <Grid size={1}>
                <GoodsAndServicesStorageCard type="education" quantity={education.quantity}
                                             capacity={education.storageBought? 24 : 12}
                                             output={educationOutput}
                                             storageBought={education.storageBought}
                                             updateStorage={storageBought => setEducation({
                                                 ...education,
                                                 storageBought
                                             })}
                                             updateQuantity={q => setEducation({...education, quantity: q})}
                />
            </Grid>
        </Grid>
    </Box>
}