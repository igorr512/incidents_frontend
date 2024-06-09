import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";

const MyTableRow = (props) => {
    const { row} = props;
    const [open, setOpen] = useState(false);
    const maxLength = 10;

    const shortenCloseNotes = (closedNote, maxLength) => {
        if (closedNote.length > maxLength) {
            return closedNote.substring(0, maxLength) + "...";
        } else {
            return closedNote;
        }
    };
    return (
        <>
            <TableRow>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>

                <TableCell>{row.number}</TableCell>
                <TableCell>{row.opened_at}</TableCell>
                <TableCell>{row.sys_id}</TableCell>
                <TableCell>{row.description.id}</TableCell>
                <TableCell>{row.description.project}</TableCell>
                <TableCell>{row.description.message}</TableCell>
                <TableCell>
                    {shortenCloseNotes(row.closed_notes, maxLength)}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                component="div"
                            >
                                Event: {row.description.description}
                                <br></br>
                                Past solution: {row.closed_notes}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};
export default MyTableRow;
