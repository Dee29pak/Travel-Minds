import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


function InfoSection({ trip }) {

    const[photoUrl, setPhotoUrl] = useState();

    useEffect(()=>{
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async()=>{

        const data = {
            textQuery:trip?.userSelection?.location?.label
        }

        const result = await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[3].name)

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <div>
            <img src={photoUrl?photoUrl: '/placeholder.jpg'} className='h-85 w-full object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl bg-linear-to-r from-purple-500 via-[#006064] to-[#283593]
          text-transparent bg-clip-text'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📆 {trip.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🥂 No. of Traveler: {trip.userSelection?.traveler}</h2>
                    </div>
                </div>

                <div>
                    <Button className="cursor-pointer bg-linear-to-r from-[#1A4B7D] to-[#163E68] shadow-[0px_8px_24px_rgba(26,75,125,0.5)] px-6 py-4 rounded-xl border border-black text-white font-medium group overflow-hidden">
                        <div className="relative h-6 flex items-center justify-center">
                            {/* Default text */}
                            <span className="flex items-center gap-2 transition-all duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-6">
                                Share <IoIosSend />
                            </span>
                            {/* Hover text */}
                            <span className="absolute flex items-center gap-2 translate-y-6 group-hover:translate-y-0 transition-all duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                                Share <IoIosSend />
                            </span>
                        </div>
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default InfoSection
