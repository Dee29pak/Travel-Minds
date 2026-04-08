import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { LuLogOut } from "react-icons/lu";
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDailog, setOpenDailog] = useState(false);

  useEffect(() => {
    console.log(user)
  }, [user])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

    const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: `Application/json`
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      window.location.reload();
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <div className="flex items-center">
        <img src="/logo.svg" className="h-8 w-auto" />
        <h1 className='text-[#1A4B7D] px-2 text-xl font-extrabold'>Travel Minds</h1>
      </div>

      <div>
        {user ?
          <div className='flex items-center gap-3'>

            <a href="/create-trip">
            <Button className="cursor-pointer bg-linear-to-r from-[#1A4B7D] to-[#163E68] shadow-[0px_8px_24px_rgba(26,75,125,0.5)] px-5 py-4 rounded-xl border border-black text-white font-medium group">
              <div className="relative overflow-hidden">
                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  + Create Trips
                </p>
                <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  + Create Trips
                </p>
              </div>
            </Button>
            </a>

            <a href="/my-trips">
            <Button className="cursor-pointer bg-linear-to-r from-[#1A4B7D] to-[#163E68] shadow-[0px_8px_24px_rgba(26,75,125,0.5)] px-5 py-4 rounded-xl border border-black text-white font-medium group">
              <div className="relative overflow-hidden">
                <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  My Trips
                </p>
                <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                  My Trips
                </p>
              </div>
            </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-10 w-10 rounded-full' />
              </PopoverTrigger>

              <PopoverContent>
                <h2
                className="font-bold flex items-center gap-2 rounded-full text-red-500 cursor-pointer hover:text-red-600"
                onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}><LuLogOut />Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
          :
          <Button
          onClick={()=>setOpenDailog(true)} 
          className="cursor-pointer bg-linear-to-r from-[#1A4B7D] to-[#163E68] shadow-[0px_8px_24px_rgba(26,75,125,0.5)] px-6 py-5 rounded-xl border border-black text-white font-medium group">
            <div className="relative overflow-hidden">
              <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Sign In
              </p>
              <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Sign In
              </p>
            </div>
          </Button>
        }
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogDescription>
              <div>

                <div className="flex items-center">
                  <img src="/logo.svg" className="h-8 w-auto" />
                  <h1 className='text-[#1A4B7D] px-2 text-xl font-extrabold'>Travel Minds</h1>
                </div>

                <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely</p>

                <div className='flex justify-end'>
                  <Button
                    onClick={login}
                    className="flex w-full mt-5 gap-4 items-center cursor-pointer bg-linear-to-r from-[#1A4B7D] to-[#163E68] shadow-[0px_8px_24px_rgba(26,75,125,0.5)] px-6 py-5 rounded-xl border border-black text-white font-medium group">
                    <div className="relative overflow-hidden">
                      <p className="flex items-center justify-center gap-2 group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                        <FcGoogle className='text-xl' />Sign In With Google
                      </p>
                      <p className="absolute top-7 left-0 w-full flex items-center justify-center gap-2 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                        <FcGoogle className='text-xl' />Sign In With Google
                      </p>
                    </div>
                  </Button>
                </div>

              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Header