import {Box, Grid} from "@mui/material";
import GoodsAndServicesStorageCard from "./GoodsAndServicesCard.tsx";
import {useContext} from "react";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import type {Game} from "../../data/game.ts";
import {Actions} from "../../data/capitalists.ts"

export default function Storages({
                                     foodOutput,
                                     healthOutput,
                                     educationOutput,
                                     luxuriesOutput
                                 }: {
    foodOutput: number,
    healthOutput: number,
    educationOutput: number,
    luxuriesOutput: number
}) {
    const dispatch = useContext(DispatchContext);
    const outputs = {
        food: foodOutput,
        health: healthOutput,
        education: educationOutput,
        luxuries: luxuriesOutput
    }
    const {capitalists} = useContext(GameContext) as Game;
    return <Box sx={{layout: "flex"}}>
        <strong>Storages</strong>
        <Grid container columns={{xs: 1, sm: 1, md: 2, lg: 4}} spacing={2}>
            {["food", "luxuries", "health", "education"].map(key => {
                const good = capitalists.goods[key as keyof typeof capitalists.goods];
                return <Grid size={1}>
                    <GoodsAndServicesStorageCard type={key as keyof typeof capitalists.goods}
                                                 quantity={good.quantity}
                                                 capacity={good.capacity * (good.storageBought ? 2 : 1)}
                                                 storageBought={good.storageBought}
                                                 output={outputs[key as keyof typeof outputs]}
                                                 ftzQuantity={good.ftzQuantity}
                                                 updateQuantity={q => dispatch!(Actions.update.goods[key as keyof typeof capitalists.goods](capitalists, {
                                                     ...good,
                                                     quantity: q
                                                 }))}
                                                 updateStorage={storageBought => dispatch!(Actions.update.goods[key as keyof typeof capitalists.goods](capitalists, {
                                                     ...good,
                                                     storageBought
                                                 }))}
                                                 updateFtzQuantity={q => dispatch!(Actions.update.goods[key as keyof typeof capitalists.goods](capitalists, {
                                                     ...good,
                                                     ftzQuantity: q
                                                 }))}
                    />
                </Grid>;
            })}
        </Grid>
    </Box>
}