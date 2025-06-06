import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import rzpLogo from '../assets/Logo/rzp_logo.png'
import { setPaymentLoading } from "../Reducer/slices/courseslice";
import { resetCart } from "../Reducer/slices/cartSlice";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const COURSE_PAYMENT = BASE_URL + '/capturePayment';
const COURSE_VERIFY = BASE_URL + '/verifySignature';
const SEND_PAYMENT_SUCCESS_EMAIL_API = BASE_URL + '/sendPaymentSuccessEmail';

function loadScript(src)
{
    return new Promise((resolve)=>{
        const script = document.createElement('script');
        script.src = src;
        script.onload =()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading('loading');
    try{
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if(!res)
        {
            toast.error("Razorpay SDK failed to load");
        }

        //initiate the order

        const orderResponse = await apiConnector('POST',COURSE_PAYMENT,
            {courses},
           {
            Authorization:`Bearer ${token}`,
           }
        );

        if(!orderResponse?.data?.success)
        {
            throw new Error(orderResponse.data.message);
            
        }

        //options
        const options ={
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank you for purachasing course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function (response)
            {
                // send Successful mail
                // sendPaymentSuccessEmail(response,orderResponse?.amount,token)
                //verify payment
                verifyPayment({...response,courses},token,navigate,dispatch);


            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    }
    catch(e)
    {
           console.log("Error in Payment ",e);
           toast.error("Error While Buying The Course");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}