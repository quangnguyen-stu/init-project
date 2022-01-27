import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import {
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Typography,
    Container,
    Grid,
    Snackbar,
    Card,
    Box,
    InputAdornment,
    IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    styledCard: {
        margin: "auto",
        padding: 30,
        width: 500,
    },
    styleContainer: {
        marginTop: 50,
    },
}));

const Copyright = () => (
    <Typography align="center" color="textSecondary" variant="body2">
        {"Copyright © "}
        <Link color="inherit" href="https://stunited.vn/">
            MSP
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
    </Typography>
);

export default function Login({ flash }) {
    // const { message: flashMsg } = flash;
    const classes = useStyles();

    document.title = "LOGIN";
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const LoginForm = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
        validationSchema: LoginForm,
        onSubmit(values, helper) {
            Inertia.post(route("authenticate"), values, {
                onError: (errors) => {
                    helper.setFieldValue("password", "");
                    helper.setErrors(errors);
                    setOpen(true);
                },
                preserveScroll: (page) => Object.keys(page.props.errors).length,
            });
        },
    });

    const handleClose = (reason) => {
        if ("clickaway" === reason) {
            return;
        }
        setOpen(false);
    };

    // useEffect(() => {
    //     if (flashMsg.key) {
    //         setOpen(true);
    //     }
    // }, [flashMsg]);
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    return (
        <Container component="main">
            <Grid item className={classes.styleContainer} xs={12}>
                <Card className={classes.styledCard}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        autoHideDuration={3000}
                        open={open}
                        onClose={handleClose}
                    >
                        <Alert severity='red' variant="filled">
                            {/*{t(flashMsg.key)}*/}
                            failed login
                        </Alert>
                    </Snackbar>

                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            MERCHANT SERVICE PROVIDER
                        </Typography>
                        <form
                            noValidate
                            className={classes.form}
                            onSubmit={formik.handleSubmit}
                        >
                            <TextField
                                autoFocus
                                fullWidth
                                required
                                autoComplete="email"
                                error={
                                    formik.touched.email &&
                                    !!formik.errors.email
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                                label="Email"
                                margin="normal"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                variant="outlined"
                                onChange={formik.handleChange}
                            />
                            <TextField
                                fullWidth
                                required
                                autoComplete="current-password"
                                error={
                                    formik.touched.password &&
                                    !!formik.errors.password
                                }
                                helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                                id="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                label="Password"
                                margin="normal"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                variant="outlined"
                                onChange={formik.handleChange}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        id="remember"
                                        value={formik.values.remember}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                fullWidth
                                className={classes.submit}
                                color="primary"
                                type="submit"
                                variant="contained"
                            >
                                Log In
                            </Button>
                            <Grid container>
                                <Link
                                    component={InertiaLink}
                                    // href={route("password.forgot")}
                                    variant="body2"
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                        </form>
                    </div>
                </Card>
            </Grid>
            <Grid item className={classes.styleContainer} xs={12}>
                {/*<div className="g-signin2" data-onsuccess="onSignIn"></div>*/}
                <Button variant='outlined' onClick={()=>{
                    Inertia.get(route("login.provider",{driver:'google'}))
                }}
                   className="btn btn-secondary">Google sign In</Button>
            </Grid>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
