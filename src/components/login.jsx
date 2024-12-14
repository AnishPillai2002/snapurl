import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'

import {BeatLoader} from 'react-spinners'
import Error from './error'

import * as Yup from "yup";
import useFetch from '@/hooks/use-fetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { UrlState } from '@/context'

const Longin = () => {

  const [errors,setErrors]=useState({});

  const [formData,setFormData]=useState({
    email:"",
    password:"",
  });

  //handling api calls
  const {data, loading, error, fn:fnLogin}=useFetch(login,formData);

  

  //function to set form data, or handle input change
  const handleInputChange = (e) => {
    //e.target refers to the DOM element that triggered the event. 
    const {name,value}=e.target; 

    setFormData((prevState)=>({
      //reads the existing properties in the formData object, ensuring other fields remain unchanged
      ...prevState, 
      //dynamically sets the key (using the name attribute) to the new value.
      [name]:value, 
    }));
  };

  //function to validate the input on clicking login
  const handleLogin = async (e) => {

    setErrors([]);
    try{
      //validating the inputs
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, {abortEarly: false});

      //api call
      await fnLogin();

    }catch(e){
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  
  //search param
  const [searchParam]=useSearchParams();
  const longLink=searchParam.get("createNew");
  const navigate=useNavigate();

  const {fetchUser} =UrlState(); //function to fetch user detail

  useEffect(()=>{
    //if authentication is success then move to dashboard
    if(error===null && data){
      navigate(`/dashboard?${longLink?`createNew=${longLink}`:""}`);
      fetchUser();
    }
  },[data,error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back! Please log in.</CardDescription>
        {error && <Error message={error.message}/>}
      </CardHeader>
      <CardContent className='space-y-2'>
      <div className='space-y-1'>
          <Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange} />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className='space-y-1'>
          <Input name="password" type="password" placeholder="Enter Password" onChange={handleInputChange} />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loading?<BeatLoader size={10} color='#009990'/> :"Login"} 
          
        </Button>
      </CardFooter>
    </Card>

  )
}

export default Longin