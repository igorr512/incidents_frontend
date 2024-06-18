import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MyTableRow from "./MyTableRow";

const MyTable = (props) => {
    /**
     * This component is responsible for rendering the table
     *  props:
     *    columns: array of jsons of key and name of the columns
     *    rows: array of the row data
     *    isExtended: a flag that will tell the component to add an extendable button or not
     */
    const { columns, rows,isExtended} = props;
    return (
        /**
         * returns the table, runs the <MyTableRow> on each element of the rows array
         */
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            {isExtended && <TableCell />}
                            {columns.map((column, index) => (
                                <TableCell key={index}>{column.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <MyTableRow
                                key={`row_${index}`}
                                row={row}
                                cols={columns}
                                isExtended={isExtended}
                            ></MyTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
export default MyTable;
