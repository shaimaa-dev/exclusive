import { phone } from "../../../assets";
// import formik and Yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import firebase 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { google } from '../../../assets/index'
import useData from "../../../hooks/useData";
import { FadeLoader } from "react-spinners";

const Register = () => {
    const [emailErrorMessage, setEmailErrorMessage] = useState(null)
    const [googleErrorMessage, setGoogleErrorMessage] = useState(null)
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        userName: Yup.string().min(3, "at least 3 latters").required(),
        email: Yup.string().email("please enter valid email").required(),
        password: Yup.string().min(6, 'at least 6 charachters').required(),
    });
    const handleAuthError = (code) => {
        switch (code) {
            case "auth/email-already-in-use":
                return "This email is already registered. Try logging in.";
            case "auth/invalid-email":
                return "Please enter a valid email address.";
            case "auth/weak-password":
                return "Password must be at least 6 characters.";
            case "auth/user-not-found":
                return "No user found with this email.";
            case "auth/wrong-password":
                return "Incorrect password. Try again.";
            default:
                return "Something went wrong. Please try again.";
        }
    };

    const { dispatch } = useData();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const createWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                dispatch({
                    type: "ADD_USER", payload: {
                        uid: user.uid,
                        userName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        providerId: user.providerData[0].providerId,
                    }
                })
            }).catch((error) => {
                setGoogleErrorMessage(handleAuthError(error.code))
            });
    }
    return (
        <div className="w-[85%] mx-auto my-10  gap-20 grid grid-cols-1 lgl:grid-cols-2">
            <div className="hidden lgl:block">
                <img src={phone} alt="slide img" className="" />
            </div>
            <div className="flex flex-col justify-center">
                <h5 className="text-3xl font-bold mb-4" >
                    Create an account
                </h5>
                <p className="text-lg">Enter your details below</p>
                <Formik
                    initialValues={{ userName: "", email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log("Form Data:", values);
                        createUserWithEmailAndPassword(auth, values.email, values.password)
                            .then((userCredential) => {
                                if (userCredential) {
                                    updateProfile(auth.currentUser, {
                                        displayName: values.userName
                                    });
                                    resetForm();
                                    navigate("/login", { replace: true });
                                }
                            })
                            .catch((error) => {
                                setEmailErrorMessage(handleAuthError(error.code));
                            })
                            .finally(() => {
                                setSubmitting(false);
                            })
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="mt-10">
                            <Field name="userName" type="text" className="border-b-2 border-gray-300 p-2 my-3 w-full outline-none" placeholder="Enter username" />
                            <ErrorMessage name="userName" component="div" className="text-red-500" />

                            <Field name="email" type="email" className="border-b-2 border-gray-300 p-2 my-3 w-full outline-none" placeholder="Email" />
                            <ErrorMessage name="email" component="div" className="text-red-500" />


                            <Field name="password" type="password" className="border-b-2 border-gray-300 p-2 my-3 w-full outline-none" placeholder="password" />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 "
                            />
                            {emailErrorMessage && <p className="text-red-500 text-lg mt-1 mb-2">{emailErrorMessage}</p>}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-buttoncolor text-white p-2 rounded my-3 w-full capitalize text-xl"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <FadeLoader color="#ffffff" height={8} size={20} width={2} radius={2} margin={2} />
                                        Signing up...
                                    </div>
                                ) : (
                                    "Sign up"
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
                <button onClick={createWithGoogle} className="flex gap-3 w-fit mx-auto mt-3 py-2 px-6 border-2 border-gray-300 rounded-md">
                    <img src={google} alt="google-icon" />
                    sign up with google
                </button>
                {googleErrorMessage && <p className="text-red-500 text-lg mt-1 mb-2">{googleErrorMessage}</p>}
                <p className="text-center text-lg mt-4">Already have an account?<Link to="/login" className="ml-2 border-b-2 pb-1  border-b-sky-800">Log in</Link></p>
            </div>
        </div >
    )
}

export default Register
