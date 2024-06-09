import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MyTableRow from "./MyTableRow";

const MyTable = (props) => {
    const { columns, rows,isExtended} = props;
    return (
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
                                key={index}
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
