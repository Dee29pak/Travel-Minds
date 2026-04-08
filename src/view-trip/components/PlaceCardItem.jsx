import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({ place }) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place])

  const GetPlacePhoto = async () => {

    const data = {
      textQuery: place.placeName
    }

    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'>
      <div className='border rounded-xl p-3 shadow-md mt-2 flex gap-5 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer'>
        <img src={photoUrl?photoUrl: '/placeholder.jpg'} className='h-32.5 w-full rounded-xl object-cover' />

        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails}</p>

          <h2 className='mt-2 text-sm flex gap-1'>
            <img src="/clock.png" className='h-5 w-auto' />
            {place?.duration}
          </h2>


        </div>

      </div>
    </Link >
  )
}

export default PlaceCardItem
