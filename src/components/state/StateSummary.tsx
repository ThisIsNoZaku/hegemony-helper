import {Stack, TextField} from "@mui/material";
import {DispatchContext, GameContext} from "../../state/GameContext.ts";
import {useContext} from "react";
import type {Game} from "../../data/game.ts";
import LegitimacyTracks from "./LegitimacyTracks.tsx";
import type {UpdateStatePlayerAction} from "../../state/Reducers.ts";

export function StateSummary() {
    const game = useContext(GameContext) as Game;
    const {state} = game;

    const dispatch = useContext(DispatchContext);

    return <Stack sx={{justifyContent: "space-between"}} spacing={1}>
        <Stack direction="row" sx={{justifyContent: "space-between"}}>
            <TextField type="number" label="Treasury" value={state.treasury} onChange={e => dispatch!({
                type: "update_player",
                player: "state",
                playerData: {
                    ...state,
                    treasury: parseInt(e.target.value)
                }
            } as UpdateStatePlayerAction)}/>
            <TextField type="number" label="Personal Influence" value={state.personalInfluence}
                       onChange={e => dispatch!({
                           type: "update_player",
                           player: "state",
                           playerData: {
                               ...state,
                               personalInfluence: Math.max(0, parseInt(e.target.value))
                           }
                       } as UpdateStatePlayerAction)}/>
        </Stack>

        <LegitimacyTracks legitimacy={state.legitimacy}
                          onChange={changes => dispatch!({
                              type: "update_player",
                              player: "state",
                              playerData: {
                                  ...state,
                                  legitimacy: {
                                      ...state.legitimacy,
                                      values: changes
                                  }
                              }
                          } as UpdateStatePlayerAction)}
                          onShieldsChange={changes => dispatch!({
                              type: "update_player",
                              player: "state",
                              playerData: {
                                  ...state,
                                  legitimacy: {
                                      ...state.legitimacy,
                                      shields: changes
                                  }
                              }
                          } as UpdateStatePlayerAction)}
        />
    </Stack>
}