import {Box, Grid} from "@mui/material";
import GoodsAndServicesStorageCard from "./GoodsAndServicesCard.tsx";
import {useContext} from "react";
import {DispatchContext} from "../../state/GameContext.ts";
import type {PlayerWithStorages} from "../../data/players.ts";
import {Actions as capitalists} from "../../data/capitalists.ts";
import {Actions as middleClass} from "../../data/middleClass.ts";
import type {PlayerWithCompanies} from "../../data/game.ts";
import {calculatePlayerProduction} from "../../utilities/calculatePlayerProduction.ts";
import type {GoodsName} from "../../data/goods.ts";
export default function Storages({
                                     player
                                 }: {
    player: PlayerWithStorages & PlayerWithCompanies
}) {
    const dispatch = useContext(DispatchContext);
    const update = () => {
        switch (player.playerClass) {
            case "cc":
                return capitalists.update;
            case "mc":
                return middleClass.update
        }
        throw new Error();
    }

    const outputs = calculatePlayerProduction(player);

    return <Box sx={{layout: "flex"}}>
        <strong>Storages</strong>
        <Grid container columns={{xs: 1, sm: 1, md: 2, lg: 4}} spacing={2}>
            {["food", "luxuries", "health", "education"].map(key => {
                const good = player.storages[key as keyof typeof player.storages];
                return <Grid size={1}>
                    <GoodsAndServicesStorageCard type={key as keyof typeof player.storages}
                                                 quantity={good.quantity}
                                                 capacity={good.capacity * (good.storageBought ? 2 : 1)}
                                                 storageBought={good.storageBought}
                                                 output={outputs[key as GoodsName]}
                                                 ftzQuantity={good.ftzQuantity}
                                                 updateQuantity={q => dispatch!(update().goods[key as keyof typeof player.storages](player, {
                                                     ...good,
                                                     quantity: q
                                                 }))}
                                                 updateStorage={storageBought => dispatch!(update().goods[key as keyof typeof player.storages](player, {
                                                     ...good,
                                                     storageBought
                                                 }))}
                                                 updateFtzQuantity={q => dispatch!(update().goods[key as keyof typeof player.storages](player, {
                                                     ...good,
                                                     ftzQuantity: q
                                                 }))}
                    />
                </Grid>;
            })}
        </Grid>
    </Box>
}