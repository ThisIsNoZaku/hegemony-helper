import type {PropsWithChildren, ReactNode} from "react";
import {Paper, Stack} from "@mui/material";

export function ClassView({summaryContent, children}: PropsWithChildren<{ summaryContent: ReactNode }>) {
    return <>
        <Paper className="foobar" sx={{
            marginTop: "4rem",
            zIndex: 1000,
            padding: "10px"
        }}>
            {summaryContent}
        </Paper>
        <div style={{paddingTop: "15px"}}>
            {children}
        </div>
    </>
}