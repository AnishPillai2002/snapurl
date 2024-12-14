import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Longin from '@/components/login';
import Signup from '@/components/signup';
import { UrlState } from '@/context';


const AuthPage = () => {
  
  const[searchParams] = useSearchParams();// used to read and manipulate the query parameters

  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const {isAuthenticated,loading} = UrlState();

  useEffect(() => {
    if(isAuthenticated && !loading){
      navigate(`/dashboard?${longLink?`createNew=${longLink}`:""}`);
    }
  },[isAuthenticated,loading]);


  return (
    <div className='mt-36 flex flex-col gap-10 items-center'>
      <h1 className='text-5xl font-extrabold'>
        {
          longLink?"Before we continue, let's log you in.":"Login/Sign Up"
        }    
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login"><Longin/></TabsContent>
      <TabsContent value="signup"><Signup/></TabsContent>
    </Tabs>

    </div>
  )
}

export default AuthPage