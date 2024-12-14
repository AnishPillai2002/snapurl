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
import { signUp } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { UrlState } from '@/context'

const Signup = () => {

  const [errors,setErrors]=useState({});

  const [formData,setFormData]=useState({
    name:"",
    profile_pic:null,
    email:"",
    password:"",
  });

  //handling api calls
  const {data, loading, error, fn:fnSignup}=useFetch(signUp,formData);

  

  //function to set form data, or handle input change
  const handleInputChange = (e) => {
    //e.target refers to the DOM element that triggered the event. 
    const {name,value,files}=e.target; 

    setFormData((prevState)=>({
      //reads the existing properties in the formData object, ensuring other fields remain unchanged
      ...prevState, 
      //dynamically sets the key (using the name attribute) to the new value.
      [name]:files?files[0]:value, 
    }));
  };

  //function to validate the input on clicking login
  const handleSignup = async (e) => {

    setErrors([]);
    try{
      //validating the inputs
      const schema = Yup.object().shape({
        name:Yup.string().required("Name is required"),
        profile_pic:Yup.mixed().required("Profile picture is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, {abortEarly: false});

      //api call
      await fnSignup();

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
  },[error,loading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create an account.</CardDescription>
        {error && <Error message={error.message}/>}
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Input name="name" type="text" placeholder="Enter Name" onChange={handleInputChange} />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className='space-y-1'>
          <Input name="profile_pic" type="file" accept="image/*"  onChange={handleInputChange} />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
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
        <Button onClick={handleSignup}>
          {loading?<BeatLoader size={10} color='#009990'/> :"Signup"} 
          
        </Button>
      </CardFooter>
    </Card>

  )
}

export default Signup;