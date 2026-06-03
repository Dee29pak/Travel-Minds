import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json"
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for Location: Las Vegas for 3 Days from 04/20/2026 to 04/22/2026 for Couple with a Cheap budget in JSON format; first fetch and analyze the real-time or forecasted weather conditions for the given location between the provided travel dates and determine average temperature, humidity, and overall conditions, then classify the weather as Hot, Rainy, Cold, or Pleasant, and adapt the entire travel plan based on this weather such that if the weather is Hot prioritize indoor, shaded, evening or water-based activities, if Rainy prioritize indoor attractions like malls, museums, cafes, and shows, if Cold include a mix of cozy indoor and light outdoor activities, and if Pleasant prioritize outdoor sightseeing and walking experiences; include a weather object with condition, averageTemperature (based on trip dates), humidity, dateRange (04/20/2026 to 04/22/2026), and a short recommendation; give me hotel options list with hotelName, hotel address, pricePerNight, hotel image url, geo coordinates, rating, and descriptions; and suggest a complete itinerary with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating, duration, and activityType (Indoor/Outdoor) for each location, structured across 3 days with each day including day, dayTheme based on weather suitability, and best time to visit according to daily weather patterns, ensuring the plan matches the Couple travel style and Cheap budget, and return only valid JSON format." },
            ],
        },

        {
            role: "model",
            parts: [
                { text: "{\n  \"location\": \"Las Vegas\",\n  \"travelDates\": \"04/21/2026 to 04/23/2026\",\n  \"travelStyle\": \"Couple\",\n  \"budget\": \"Cheap\",\n  \"weather\": {\n    \"condition\": \"Pleasant\",\n    \"averageTemperature\": \"75°F\",\n    \"humidity\": \"18%\",\n    \"dateRange\": \"04/21/2026 to 04/23/2026\",\n    \"recommendation\": \"Late April brings beautiful, pleasant spring weather to Las Vegas with warm days and mild evenings. This is perfect for our itinerary prioritizing outdoor sightseeing, strolling the Strip, and viewing open-air attractions. Bring comfortable walking shoes, sunscreen, and a light layer for the cooler nights.\"\n  },\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Flamingo Las Vegas Hotel & Casino\",\n      \"hotelAddress\": \"3555 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"pricePerNight\": \"$40\",\n      \"hotelImageUrl\": \"https://example.com/images/strat-vegas.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1475,\n        \"longitude\": -115.1566\n      },\n      \"rating\": 3.8,\n      \"description\": \"An incredibly budget-friendly option located at the northern end of the Strip. Guests often receive discounted access to the iconic Skypod observation deck, offering stunning romantic views of the city lights.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"pricePerNight\": \"$0 (Free)\",\n      \"rating\": 4.7,\n      \"duration\": \"1 hour\",\n      \"activityType\": \"Outdoor\"\n    },\n    {\n      \"placeName\": \"Flamingo Wildlife Habitat\",\n      \"placeDetails\": \"A beautiful, peaceful, and free attraction located at the Flamingo hotel. Stroll hand-in-hand through streams, waterfalls, and exotic birds.\",\n      \"placeImageUrl\": \"https://example.com/images/flamingo-habitat.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1156,\n        \"longitude\": -115.1706\n      },\n      \"ticketPricing\": \"$0 (Free)\",\n      \"rating\": 4.9,\n      \"duration\": \"2 hours\",\n      \"activityType\": \"Outdoor\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 2\",\n      \"dayTheme\": \"Vintage Vegas Romance & Neon Lights\",\n      \"bestTime\": \"Late Afternoon to Night\",\n      \"activities\": [\n        {\n          \"placeName\": \"Las Vegas Arts District\",\n          \"placeDetails\": \"Take advantage of the pleasant daytime weather to walk through 18b, the Arts District. Enjoy vibrant murals, quirky vintage shops, and grab a cheap local coffee.\",\n          \"placeImageUrl\": \"https://example.com/images/arts-district.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1554,\n            \"longitude\": -115.1524\n          },\n          \"ticketPricing\": \"$20 per person\",\n          \"rating\": 4.6,\n          \"duration\": \"1.5 hours\",\n          \"activityType\": \"Outdoor\"\n        },\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Head to Downtown Vegas to walk beneath the massive Viva Vision LED canopy. Enjoy free live music, vibrant energy, and cheap drinks in a historic setting.\",\n          \"placeImageUrl\": \"https://example.com/images/fremont-street.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1699,\n            \"longitude\": -115.1436\n          },\n          \"ticketPricing\": \"$0 (Free to walk)\",\n          \"rating\": 4.8,\n          \"duration\": \"2 hours\",\n          \"activityType\": \"Indoor\"\n        },\n        {\n          \"placeName\": \"The LINQ Promenade\",\n          \"placeDetails\": \"An open-air pedestrian district filled with cheap eateries, bars, and views of the High Roller observation wheel. Perfect for a leisurely, budget-friendly afternoon walk.\",\n          \"placeImageUrl\": \"https://example.com/images/linq-promenade.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1176,\n            \"longitude\": -115.1709\n          },\n          \"ticketPricing\": \"$0 (Free)\",\n          \"rating\": 4.1,\n          \"duration\": \"1 hour\",\n          \"activityType\": \"Indoor\"\n        }\n      ]\n    }\n  ]\n}"}
            ]
        }
    ]
});