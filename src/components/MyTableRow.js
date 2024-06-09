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
    const { row, cols, isExtended } = props;
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
                {isExtended && (
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                )}

                {/* <TableCell>{row.number}</TableCell>
                <TableCell>{row.opened_at}</TableCell>
                <TableCell>{row.sys_id}</TableCell>
                <TableCell>{row.description.id}</TableCell>
                <TableCell>{row.description.project}</TableCell>
                <TableCell>{row.description.message}</TableCell>
                <TableCell>
                    {shortenCloseNotes(row.closed_notes, maxLength)}
                </TableCell> */}
                {console.log(cols)}
                {cols.map((col) => (
                    <TableCell>{row[col.key]}</TableCell>
                ))}
            </TableRow>
            {isExtended && (
                <TableRow>
                    <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                    >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                {/* <Typography
                                    variant="body1"
                                    gutterBottom
                                    component="div"
                                >
                                    
                                    {row.extended_message}
                                    
                                </Typography> */}

                                <Typography
                                    component="div"
                                    dangerouslySetInnerHTML={{
                                        __html: row.extended_message,
                                    }}
                                />
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};
export default MyTableRow;
