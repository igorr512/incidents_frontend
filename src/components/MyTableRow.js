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
    /**
     * This component gets a value out of the rows array and the whole columns array
     */
    const { row, cols, isExtended } = props;
    const [open, setOpen] = useState(false);
    
    

    return (
        /**
         * returns the HTML of the table row, it takes the row it got from the props 
         *   and gets the value of the correct column by using the column key
         */
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
                {cols.map((col,index) => (
                    <TableCell key={col.key+index}>{row[col.key]}</TableCell>
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
