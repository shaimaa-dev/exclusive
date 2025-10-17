import { useState } from 'react'
// import formik and Yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import firebase 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { phone } from '../../assets';
import { useNavigate } from 'react-router-dom';
import useData from '../../hooks/useData';
import { MoonLoader } from 'react-spinners';
import Swal from "sweetalert2";

const Login = () => {
  const { dispatch } = useData();
  const navigate = useNavigate();
  const [error, setError] = useState()
  const validationSchema = Yup.object({
    email: Yup.string().email("please enter valid email").required(),
    password: Yup.string().min(6, 'at least 6 charachters').required(),
  });
  const handleAuthError = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      default:
        return "Something went wrong. Please try again.";
    }
  }

  return (
    <div className="w-[85%] mx-auto mb-10 mt-[70px] gap-20 grid grid-cols-1  lgl:grid-cols-2">
      <div className="hidden lgl:block">
        <img src={phone} alt="slide img" className="" />
      </div>
      <div className="flex flex-col justify-center">
        <h5 className="text-3xl font-bold mb-4" >
          Log in to Exclusive
        </h5>
        <p className="text-lg">Enter your details below</p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log("Form Data:", values);
            signInWithEmailAndPassword(auth, values.email, values.password)
              .then((userCredential) => {
                const user = userCredential.user;
                dispatch({
                  type: "ADD_USER",
                  payload: {
                    uid: user.uid,
                    userName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    providerId: user.providerData[0]?.providerId,
                  }
                });
              }).then(() => {
                Swal.fire({
                  title: "Log in successfully",
                  icon: "success",
                  draggable: true
                }).then(() => {
                  resetForm();
                  navigate("/", { replace: true })
                })
              })
              .catch((error) => {
                setError(handleAuthError(error.code));
              })
              .finally(() => {
                setSubmitting(false);
              })
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-10">
              <Field name="email" type="email" className="border-b-2 border-gray-300 p-2 my-3 w-full outline-none" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="text-red-500" />


              <Field name="password" type="password" className="border-b-2 border-gray-300 p-2 my-3 w-1/2 outline-none" placeholder="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 "
              />


              <button
                type="submit"
                disabled={isSubmitting}
                className="block bg-buttoncolor text-white py-2 px-20 capitalize text-lg rounded my-3 w-fit"
              >
                {isSubmitting ? <div className='flex gap-3 items-center'><MoonLoader size={20} /> logging in </div> : "Log in"}
              </button>
            </Form>
          )}
        </Formik>
        {error && <p className="text-red-500 text-lg mt-1 mb-2">{error}</p>}

      </div>
    </div>
  )
}

export default Login
