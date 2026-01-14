import {type ActionDispatch, createContext} from "react";
import type {Game} from "../data/game.ts";
import type {ReducerAction} from "./Reducers.ts";

export const GameContext = createContext<Game | null>(null);
export const DispatchContext = createContext<ActionDispatch<[ReducerAction]> | null>(null);