import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {useAppSelector} from "app/store";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {authThunk} from "features/auth/auth.reducer";
import {LoginPropsType} from "features/auth/auth.api";
import {ResponseType} from "common/types";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Auth = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            // const errors: FormikErrorType = {}
            // if (!values.email) {
            //     errors.email = 'Email Required'
            // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //     errors.email = 'Invalid email address'
            // }
            //
            // if (values.password.length <= 3) {
            //     errors.password = 'Password should be more than 4'
            // }
            // return errors
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginPropsType>) => {
            dispatch(authThunk.login(values))
                .unwrap()
                .catch((reason: ResponseType) => {
                    debugger
                    const {fieldsErrors} = reason
                    if (fieldsErrors) {
                        reason.fieldsErrors.forEach(fieldErrors => {
                            formikHelpers.setFieldError(fieldErrors.field, fieldErrors.error)
                        })
                    }
                })
            // formik.resetForm()
        },
    })
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}

                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : ''}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: 'red'}}>{formik.errors.password}</div> : ''}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox  {...formik.getFieldProps('rememberMe')}
                                                              checked={formik.values.rememberMe}
                                          />}


                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}