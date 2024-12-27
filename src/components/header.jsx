import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '@/context'
import useFetch from '@/hooks/use-fetch'

import {BarLoader} from 'react-spinners'
import { logout } from '@/db/apiAuth'


const Header = () => {

  const navigate=useNavigate();

  const {user,fetchUser}=UrlState();

  const {loading,fn:fnLogOut} = useFetch(logout);

  return (
    <>
    <nav className="py-4 px-9 flex justify-between items-center bg-lime-300">
        <Link to="/">
            <img src="/urlsnap-logo.png" alt="urlsnap-logo" className='h-16' />
        </Link>

        <div>
          {
            !user?<Button onClick={()=>navigate("/auth")}>Login</Button>
            :(
              <DropdownMenu>
                <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} className="object-contain" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LinkIcon className='h-4 w-4'/>
                    <span onClick={()=>{
                      navigate("/dashboard");
                    }}>My Links</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4"/>  
                    <span onClick={()=>{
                        fnLogOut().then(() => {
                          fetchUser();
                          navigate("/");
                        });
                    }}>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            )
          }
            
        </div>
        
    </nav>
    {loading && <BarLoader className='mb-4' width={"100%"} color='#009990'/>}
    </>
  )
}

export default Header