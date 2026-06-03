import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


function InfoSection({ trip }) {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {

        const data = {
            textQuery: trip?.userSelection?.location?.label
        }

        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    // ##########################################################
    const getWeatherStyles = (condition) => {
        const lowerCondition = condition?.toLowerCase() || "";

        if (lowerCondition.includes("hot") || lowerCondition.includes("sunny")) {
            return { icon: "☀️", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
        }
        if (lowerCondition.includes("rain") || lowerCondition.includes("storm")) {
            return { icon: "🌧️", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" };
        }
        if (lowerCondition.includes("cloud")) {
            return { icon: "☁️", color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" };
        }
        if (lowerCondition.includes("cold") || lowerCondition.includes("snow")) {
            return { icon: "❄️", color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" };
        }

        // Default/Neutral Advice Icon
        return { icon: "💡", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" };
    };

    const weatherStyle = getWeatherStyles(trip.tripData?.weather?.condition);
    // ##########################################################

    return (
        <div>
            <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='h-85 w-full object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-row gap-2'>
                    <h2 className='font-bold text-2xl bg-linear-to-r from-purple-500 via-[#006064] to-[#283593]
          text-transparent bg-clip-text'>{trip?.userSelection?.location?.label}</h2>
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



            <div className='flex justify-between items-center'>
                <div className='my-3 flex flex-col gap-2'>

                    <div className='flex gap-1'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📆 {trip.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>✈️ Travel Dates: {trip.userSelection?.startDate} / {trip.userSelection?.endDate}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🥂 No. of Traveler: {trip.userSelection?.traveler}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🌡️ {trip.tripData?.weather?.averageTemperature} / {trip.tripData?.weather?.condition}</h2>
                    </div>

                    <div className="mt-8">
                        <div className={`${weatherStyle.bg} ${weatherStyle.border} border p-5 rounded-2xl shadow-sm flex gap-4 items-start`}>
                            {/* Dynamic Advice Icon */}
                            <div className="text-3xl filter drop-shadow-sm">
                                {weatherStyle.icon}
                            </div>

                            <div>
                                <h3 className={`font-bold ${weatherStyle.color} mb-1 flex items-center gap-2 uppercase text-xs tracking-widest`}>
                                    Traveler Advice
                                </h3>
                                <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                                    {trip.tripData?.weather?.recommendation}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default InfoSection
