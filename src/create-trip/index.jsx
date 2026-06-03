import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModals';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function CreateTrip() {

  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleInputChange = (name, value) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   })
  // }

  // ###################################################################################
  const handleInputChange = (name, value) => {
    let updatedData = {
      ...formData,
      [name]: value
    };

    // auto calculate end date
    if (updatedData.startDate && updatedData.noOfDays) {
      const start = new Date(updatedData.startDate);
      const end = new Date(start);

      end.setDate(start.getDate() + Number(updatedData.noOfDays) - 1);

      updatedData.endDate = end.toISOString().split('T')[0];
    }

    setFormData(updatedData);
  };
  // ###################################################################################

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true)
      return;
    }

    // if (formData?.noOfDays > 7 && !formData?.location || !formData?.budget || !formData?.traveler) {
    //   toast("Max trip duration: 7 days.")
    //   return;
    // }

    // #########################################################################################
    if (
      formData?.noOfDays > 7 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler ||
      !formData?.startDate
    ) {
      toast("Please fill all details. Max trip duration is 7 days.");
      return;
    }
    // ##########################################################################################

    setLoading(true);

    // const FINAL_PROMPT = AI_PROMPT
    //   .replace('{location}', formData?.location?.label)
    //   .replace('{totalDays}', formData?.noOfDays)
    //   .replace('{traveler}', formData?.traveler)
    //   .replace('{budget}', formData?.budget)
    //   .replace('{totalDays}', formData?.noOfDays)

    // ############################################################################
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{startDate}', formData?.startDate)
      .replace('{endDate}', formData?.endDate);
    // ############################################################################


    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {

    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });

    setLoading(false);
    navigate('/view-trip/' + docId)
  }

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
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your<span className='p-2 rounded-2xl
          bg-linear-to-r from-purple-500 via-[#006064] to-[#283593]
          text-transparent bg-clip-text'>Travel Preferences</span>🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>

        <div>
          <h2 className='text-xl mt-3 font-medium'>What is Destination of Choice ?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl mt-3 font-medium'>How many days are you planning your trip</h2>
          <Input placeholder={'Ex.3'} type="number" onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>

        {/* ########################################################################### */}
        <div>
          {/* Date Selection */}
          <h2 className='text-xl mt-3 font-medium'>Select your travel dates</h2>

          <Input
            type="date"
            className="mt-3"
            disabled={!formData?.noOfDays}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />

          {/* Date Range Display */}
          {formData?.startDate && formData?.endDate && (
            <div className="mt-3 p-3 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Your travel dates:</p>
              <p className="font-semibold text-lg">
                {formData.startDate} → {formData.endDate}
              </p>
            </div>
          )}
        </div>
        {/* ################################################################################# */}

        <div>
          <h2 className='text-xl mt-3 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-2xl
              ${formData?.budget == item.title && 'shadow-lg border-black bg-[#cae2fa]'}
              `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl mt-3 font-medium'>Who do you plan on travelling with on your adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-2xl
              ${formData?.traveler == item.people && 'shadow-lg border-black bg-[#cae2fa]'}
              `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className='my-10 flex justify-end'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="cursor-pointer bg-linear-to-r from-[#1A4B7D] to-[#163E68] shadow-[0px_8px_24px_rgba(26,75,125,0.5)] px-6 py-5 rounded-xl border border-black text-white font-medium group">

          <div className="relative overflow-hidden">
            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              {loading ?
                <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : ' Generate Trip'
              }

            </p>
            <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              {loading ?
                <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : ' Generate Trip'
              }
            </p>
          </div>
        </Button>
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

export default CreateTrip
