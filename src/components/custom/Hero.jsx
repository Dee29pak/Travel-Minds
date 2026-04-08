import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center leading-tight mt-16">
        Discover Your Next Favorite Place with <br />
        <span className="
          p-2 rounded-2xl
          bg-linear-to-r from-purple-500 via-[#006064] to-[#283593]
          text-transparent bg-clip-text
        ">
          Travel Minds
        </span>
      </h1>
      <p className='text-xl text-gray-500 text-center'>Your Personal Trip Planner and travel curator, creating custom itineraries tailored to your interests and budget</p>

      <Link to={'/create-trip'}>
        <Button className="cursor-pointer bg-linear-to-r from-[#1A4B7D] to-[#163E68] shadow-[0px_8px_24px_rgba(26,75,125,0.5)] px-10 py-5 rounded-xl border border-black text-white font-medium group">
          <div className="relative overflow-hidden">
            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              Get Started, It's Free
            </p>
            <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              Get Started, It's Free
            </p>
          </div>
        </Button>
      </Link>

      <img src="/landing.png" className='mt-2'/>

    </div>
  )
}

export default Hero