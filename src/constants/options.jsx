export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏘️',
        people: '3-5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '🏕️',
        people: '5-10 People'
    }
]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Affordable',
        desc: 'Stay conscious of costs',
        icon: '💵'

    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon: '💸'
    },
]

export const AI_PROMPT='Generate Travel Plan for Location: {location} for {totalDays} Days from {startDate} to {endDate} for {traveler} with a {budget} budget in JSON format; first fetch and analyze the real-time or forecasted weather conditions for the given location between the provided travel dates and determine average temperature, humidity, and overall conditions, then classify the weather as Hot, Rainy, Cold, or Pleasant, and adapt the entire travel plan based on this weather such that if the weather is Hot prioritize indoor, shaded, evening or water-based activities, if Rainy prioritize indoor attractions like malls, museums, cafes, and shows, if Cold include a mix of cozy indoor and light outdoor activities, and if Pleasant prioritize outdoor sightseeing and walking experiences; include a weather object with condition, averageTemperature (based on trip dates), humidity, dateRange ({startDate} to {endDate}), and a short recommendation; give me hotel options list with hotelName, hotel address, pricePerNight, hotel image url, geo coordinates, rating, and descriptions; and suggest a complete itinerary with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating, duration, and activityType (Indoor/Outdoor) for each location, structured across {totalDays} days with each day including day, dayTheme based on weather suitability, and best time to visit according to daily weather patterns, ensuring the plan matches the {traveler} travel style and {budget} budget, and return only valid JSON format.'