import { ErrorMessage, FastField, Field, Form, Formik } from "formik"
import useData from "../../hooks/useData";
import * as Yup from "yup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber, } from 'libphonenumber-js';
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
//import swal 
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { cartProducts, dispatch } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  const buyProductNow = location.state?.product;
  const subTotalBuyNow = buyProductNow ? buyProductNow.subtotal : 0;
  console.log(subTotalBuyNow)
  const subTotalAllProducts = cartProducts?.reduce((subtotal, product) => {
    return subtotal + product.subtotal
  }, 0)
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, 'too short').required(),
    companyName: Yup.string().min(3, 'too short').optional(),
    streetAddress: Yup.string().min(3, 'too short').required(),
    apartment: Yup.string().min(3, 'too short').optional(),
    city: Yup.string().min(3, 'too short').required(),
    phone: Yup.string().required("Phone is required").trim().test("Is-valid-Phone-Number", 'please enter valid phone number', function (value) {
      const { country } = this.parent;
      console.log(country)
      if (!value) return false;

      try {
        return isValidPhoneNumber("+" + value, country);
      } catch {
        return false;
      }
    }),
    email: Yup.string().email().required(),
  })
  return (
    <div className="w-[85%] mx-auto  my-12 ">
      <h5 className="my-6 text-4xl font-semibold">billing details</h5>
      <div className="">
        <div>

          <Formik
            initialValues={{ firstName: '', companyName: '', streetAddress: '', apartment: "", city: "", phone: "", country: 'eg', email: "" }}
            validationSchema={validationSchema}
            validateOnBlur={true}
            onSubmit={async (values, { resetForm }) => {
              try {
                const docRef = await addDoc(collection(db, "orders"), {
                  ...values,
                  products: buyProductNow ? [buyProductNow] : cartProducts,
                  subTotalAllProducts: buyProductNow ? subTotalBuyNow: subTotalAllProducts,
                  createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
                });
                console.log("Document written with ID: ", docRef.id);
                await Swal.fire({
                  title: 'Order placed successfully!',
                  text: 'Thank you for shopping with us ',
                  icon: 'success',
                  confirmButtonText: 'OK'
                }).then((result) => {
                  if (result.isConfirmed) {
                    resetForm();
                    dispatch({ type: "CLEAR_CART" })
                    navigate('/', { replace: true })
                  }
                })
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form action="" className=" grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[17px] capitalize" htmlFor="firstName">first name </label>
                  <FastField name="firstName" type="text" id="firstName" className="bg-[#f5f5f5] block w-full p-2 outline-none " />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-lg" />
                  <label className="text-[17px] capitalize" htmlFor="companyName">company name</label>
                  <FastField name="companyName" type="text" id="companyName" className="bg-[#f5f5f5] block w-full p-2 outline-none " />
                  <ErrorMessage name="companyName" component="div" className="text-red-500 text-lg" />
                  <label className="text-[17px] capitalize" htmlFor="streetAddress">street Address</label>
                  <FastField name="streetAddress" type="text" id="streetAddress" className="bg-[#f5f5f5] block w-full p-2 outline-none " />
                  <ErrorMessage name="streetAddress" component="div" className="text-red-500 text-lg" />
                  <label className="text-[17px] capitalize" htmlFor="apartment">apartment, floor, etc.(optional)</label>
                  <FastField name="apartment" type="text" id="apartment" className="bg-[#f5f5f5] block w-full p-2 outline-none " />
                  <ErrorMessage name="apartment" component="div" className="text-red-500 text-lg" />
                  <label className="text-[17px] capitalize" htmlFor="city">Town/City</label>
                  <FastField name="city" type="text" id="city" className="bg-[#f5f5f5] block w-full p-2 outline-none " />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-lg" />
                  <label className="text-[17px] capitalize" htmlFor="phone">Phone number</label>
                  <Field name="phone" type="tel"  >
                    {({ field, form }) => (
                      <PhoneInput
                        country={values.country || "us"}
                        value={field.value}
                        onChange={(value, data) => {
                          console.log(value)
                          form.setFieldValue("phone", value);
                          console.log(data)
                          form.setFieldValue("country", data.countryCode.toUpperCase());
                        }}
                        inputClass="!bg-[#f5f5f5] !ml-12   !p-2 !outline-none !border-none"
                        containerClass="!bg-[#f5f5f5]  "
                        buttonClass="!bg-[#f5f5f5]  !border-none"
                        onBlur={() => form.setFieldTouched("phone", true)}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-lg" />
                  <label className="text-[17px] capitalize" htmlFor="email">email address</label>
                  <FastField name="email" type="email" id="email" className="bg-[#f5f5f5] block w-full p-2 outline-none " />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-lg" />
                </div>
                <div>
                  {
                    buyProductNow ? <div key={buyProductNow.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={buyProductNow.thumbnail} className="w-[80px]" alt="product img" />
                        <h5 className="text-xl font-semibold">{buyProductNow.title} </h5>
                      </div>
                      <p className="text-xl">{subTotalBuyNow.toFixed(1)}</p>
                    </div> : cartProducts.map((product) => {
                      return (
                        <div key={product.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={product.thumbnail} className="w-[80px]" alt="product img" />
                            <h5 className="text-xl font-semibold">{product.title} </h5>
                          </div>
                          <p className="text-xl">{product.subtotal.toFixed(1)}</p>
                        </div>
                      )
                    })
                  }
                  {

                  }
                  <div className="flex justify-between my-4 pb-3 border-b-[1px] border-gray-400">
                    <p className="text-xl">subtotal:</p>
                    <p className="text-xl">${ buyProductNow ? subTotalBuyNow.toFixed() : subTotalAllProducts.toFixed()}</p>
                  </div>
                  <div className="flex justify-between my-4 pb-2 border-b-[1px] border-gray-400">
                    <p className="text-xl">shipping:</p>
                    <p className="text-xl">free</p>
                  </div>
                  <div className="flex justify-between my-4 pb-2 border-b-[1px] border-gray-400">
                    <p className="text-xl">total:</p>
                    <p className="text-xl">${ buyProductNow ? subTotalBuyNow.toFixed() : subTotalAllProducts.toFixed()}</p>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="disabled:bg-gray-600 capitalize py-2 px-4 bg-buttoncolor rounded-md text-white text-xl">place order</button>
                </div>
              </Form>
            )
            }
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
