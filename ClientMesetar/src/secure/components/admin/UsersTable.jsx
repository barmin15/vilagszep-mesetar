import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';

//this function is simply for rendering the table with the users, it doesn't handle any logic
export function UsersTable({
    users,
    handleEditUser,
    onDeleteUser
}) {

    return <TableContainer
        component={Paper}
        elevation={3}
        sx={{
            maxHeight: "65%",
            position: "absolute",
            top: "45%",
            left: "50%",
            width: { xs: "100%", sm: "80%" },
            transform: "translate(-50%, -50%)",
            margin: "0 auto",
            "&::-webkit-scrollbar": {
                width: 7
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "##FFFBF5"
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#49789F",
                borderRadius: 21
            }
        }
        }>
        <Table stickyHeader aria-label="sticky table" sx={{
            maxWidth: "100%",
            width: "100%",
            height: "61%"
        }}>
            <TableHead sx={{
                backgroundColor: "#49789F"
            }}>
                <TableRow>
                    <TableCell align="center" sx={{
                        fontSize: 16,
                        width: { xs: "20%", sm: "25%" },
                        backgroundColor: "#49789F",
                        color: "white"
                    }}>Felhasználó:</TableCell>
                    <TableCell align="center" sx={{
                        fontSize: 15,
                        width: { xs: "20%", sm: "25%" },
                        backgroundColor: "#49789F",
                        color: "white"
                    }}>Szerep:</TableCell>
                    <TableCell align="right" sx={{
                        fontSize: 15,
                        width: { xs: "20%", sm: "25%" },
                        backgroundColor: "#49789F",
                        color: "white"
                    }}>Szerkesztés / Törlés</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users?.map(user => <TableRow key={user.publicId} sx={{
                    '&:last-child td, &:last-child th': { border: 0 }, bgcolor: "#F6F1F1"
                }}>
                    <TableCell component="th" scope="row" align="center" sx={{
                        fontSize: 15,
                        width: { xs: "20%", sm: "25%" },
                    }}>
                        {user.login}
                    </TableCell>
                    <TableCell align="center" sx={{
                        width: { sx: "20%", sm: "25%" },
                    }}>{user.role}</TableCell>
                    <TableCell align="right">
                        <EditIcon
                            onClick={(e) => handleEditUser(user.publicId)}
                            sx={{
                                position: "relative",
                                right: '20%',
                                "&:hover": {
                                    color: "blue",
                                    cursor: "pointer"
                                }
                            }} >
                        </EditIcon>
                        <DeleteIcon onClick={e => onDeleteUser(e, user.publicId)} sx={{
                            "&:hover": {
                                color: "red",
                                cursor: "pointer"
                            }
                        }} />
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer >;
}
