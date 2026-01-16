import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "../../config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import { useToast } from "../../hooks/use-toast";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const AuthRegister = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast()
  function onSubmit(event) {
    event.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      // Handle missing fields
      console.log('All fields are required.');
      return;
    }
    
    dispatch(registerUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message,
        })
        navigate('/auth/login')
      } else {
        toast({
          title: data?.payload?.message
        })
      }
    } )
    
  }
  
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className=" text-center">
        <h1 className=" text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className=" text-primary ml-2 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText="Sign Up"
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
