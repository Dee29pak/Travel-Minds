import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Places to Visit</h2>

            <div>
                {trip?.tripData?.itinerary.map((item, index) => (
                    <div className='mt-5'>
                        <h2 className='font-bold text-lg'>Day {item.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {item.activities.map((place, index) => (
                                <div>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit
