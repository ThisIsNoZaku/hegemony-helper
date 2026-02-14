import type {PropsWithChildren, ReactNode} from "react";
import {Paper, Stack} from "@mui/material";

export function ClassView({summaryContent, children}: PropsWithChildren<{ summaryContent: ReactNode}>) {
    return <>
        <Paper style={{
            position: "sticky",
            top: "5.5rem",
            zIndex: 1000,
            padding: "10px",
            marginBottom: "10px"
        }}>
            {summaryContent}
        </Paper>
        <Stack spacing={2}>
            {children}
        </Stack>
    </>
}