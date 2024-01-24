import React from "react";
import { Button, FormControl, Grid, InputAdornment, Stack, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function LoginForm({
    //props from Login page
    setLogin,
    setPassword,
    showPassword,
    setShowPassword,
    onLogin,
    pressEnter
}) {

    //login material ui elements inserted into vertual DOM 
    return <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center" sx={{ minHeight: '85vh' }}>
        <FormControl>
            <Stack spacing={2}>
                <TextField
                    required
                    label="Felhasználónév"
                    onChange={e => setLogin(e.target.value)}
                    //login will react to enter key, when mouse is on inout field
                    onKeyDown={pressEnter}
                >
                </TextField>
                <TextField
                    //login will react to enter key, when mouse is on inout field
                    onKeyDown={pressEnter}
                    required
                    label="Jelszó"
                    type={showPassword ? "text" : "password"}
                    onChange={e => setPassword(e.target.value)}
                    helperText="Ne osszd meg a felhasználóneved vagy jelszavad!"
                    InputProps={{
                        endAdornment:
                            <InputAdornment
                                //this handles the "eye" next to the password field, and the visibility
                                position="end"
                                onClick={e => showPassword ? setShowPassword(false) : setShowPassword(true)}>
                                {showPassword ? <Visibility sx={{ cursor: "pointer", }} /> : <VisibilityOff sx={{ cursor: "pointer" }} />}
                            </InputAdornment>
                    }} />
            </Stack>
            <Button
                color="primary"
                type='submit'
                size="large"
                variant="contained"
                onClick={onLogin}>Bejelentkezés</Button>
        </FormControl>
    </Grid >;
}
