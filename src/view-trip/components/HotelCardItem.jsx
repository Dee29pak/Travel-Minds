import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {

        const data = {
            textQuery: hotel?.hotelName
        }

        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.address} target='_blank'>

            <div className='hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-md'>
                <img src={photoUrl?photoUrl: '/placeholder.jpg'} className='rounded-xl h-45 w-full object-cover'/>

                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>

                    <h2 className='text-xs text-gray-500 flex gap-2'>
                        <img src="/location.png" className='h-5 w-auto' />
                        {hotel?.address}
                    </h2>

                    <h2 className='text-sm flex gap-2'>
                        <img src="/money.png" className='h-5 w-auto' />
                        {hotel?.pricePerNight}
                    </h2>

                    <h2 className='text-sm flex gap-2'>
                        <img src="/rating.png" className='h-5 w-auto' />
                        Ratings: {hotel?.rating}
                    </h2>
                </div>

            </div>
        </Link>
    )
}

export default HotelCardItem
