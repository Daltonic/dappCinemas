import { useState,useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from 'react-icons/fa';
import { useGlobalState, setGlobalState } from '../store';
import {
  getSlots,
  addSlot,
  structuredTimeslot,
} from "../services/Blockchain.services";
import { toast } from 'react-toastify'

const AddSlot = () => {
  const [addSlotModal] = useGlobalState('addSlotModal')
  const [singleMovie] = useGlobalState('singleMovie')
  const [slotsForDay] = useGlobalState("slotsForDay");

  const [ticketPrice,setTicketPrice] = useState('')
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [capacity, setCapacity] = useState('');
  const [day, setDay] = useState(null);
  const [blockedStamps,setBlockedStamps] = useState([])
  const [show,setShow] = useState(false)

  const timeInterval = 10
  


  const getEndOfDayTimestamp = () => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 0, 0);
    return endOfDay.getTime();
  };

  const getStartUpDayTimestamp = () => {
    const endOfDay = new Date();
    endOfDay.setHours(6, 0, 0, 0);
    return endOfDay.getTime();
  };

  const getTimestamp = (existingTime, min = 10) => {
    const timeSlotDiff = new Date(existingTime);
    timeSlotDiff.setMinutes(timeSlotDiff.getMinutes() + min);
    return timeSlotDiff.getTime();
  };


  const handleSelectedDay = (date) => {
    const day = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    setDay(
      new Date(
        `${day.toLocaleDateString("en-US", options).replace(/\//g, "-")}`
      ).getTime()
    ); 
  }




  const handleClose = () => {
    setGlobalState("addSlotModal", "scale-0");
  };

  
useEffect(() => {
  if (!day) return

  getSlots(day)
    .then(() => {
      setShow(false);
    })
    .catch((error) => {
      console.error(error);
    });
}, [day]);

useEffect(() => {
  if (!slotsForDay.length) {
    setShow(true);
    setBlockedStamps([]);
    return;
  }

  // Check if there are slots available for the selected day
  const slotsAvailable = slotsForDay.some((slot) => !slot.deleted);

  if (slotsAvailable) {
    const filteredTimeSlots = slotsForDay.filter((slot) => !slot.deleted);

    const timestamps = [];
    filteredTimeSlots.forEach((slot) => {
      const { startTime, endTime } = slot;
      let currTime = new Date(startTime);
      while (currTime < endTime) {
        timestamps.push(currTime.getTime());
        currTime.setMinutes(currTime.getMinutes() + 10);
      }
    });

    setBlockedStamps(timestamps);
    setShow(true);
  } else {
    setShow(true);
  }
}, [slotsForDay]);


   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!day || !startTime || !endTime || !capacity || !ticketPrice) return;
     const params = {
       movieId: singleMovie.id,
       ticketCost : ticketPrice,
       startTime: new Date(startTime).getTime(),
       endTime: new Date(endTime).getTime(),
       capacity: capacity,
       day,
     };

     console.log(params)

     await toast.promise(
        new Promise(async (resolve, reject) => {
          await addSlot(params)
            .then(async () => {
              resetForm();
              handleClose()
              getSlots(day);
              resolve();
            })
            .catch(() => reject());
        }),
        {
          pending: "Approve transaction...",
          success: "Time slot added successfully 👌",
          error: "Encountered error 🤯",
        }
      );
   };

   const resetForm = ()=> {
    setDay(null)
    setStartTime(null)
    setEndTime(null)
    setTicketPrice('')
    setCapacity('')
    setShow(false)
   }

  
  
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${addSlotModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Add movie slot</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={handleClose}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <div className="flex justify-center items-center rounded-full overflow-hidden h-10 w-64 shadow-md shadow-slate-300 p-4">
              <p className="text-slate-700">
                {" "}
                Dapp <span className="text-red-700">Cinemas</span>
              </p>
            </div>
          </div>
          <div
            className="flex flex-row justify-between items-center
          bg-gray-300 rounded-xl mt-5 p-2"
          >
            <DatePicker
              selected={day}
              onChange={(date) => handleSelectedDay(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select day..."
              minDate={Date.now()}
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
            />
          </div>
          {show && day ? (
            <>
              {console.log(blockedStamps)}
              <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  minTime={getStartUpDayTimestamp()}
                  maxTime={getEndOfDayTimestamp()}
                  timeCaption="Start Time"
                  excludeTimes={blockedStamps}
                  timeIntervals={timeInterval}
                  dateFormat="h:mm aa"
                  placeholderText="Select start time..."
                  className="block w-full text-sm text-slate-500 bg-transparent
                  border-0 focus:outline-none focus:ring-0"
                />
              </div>

              <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="p"
                  timeIntervals={timeInterval}
                  excludeTimes={blockedStamps}
                  minTime={getTimestamp(startTime)}
                  maxTime={getEndOfDayTimestamp()}
                  timeCaption="End Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select end time..."
                  className="block w-full text-sm text-slate-500 bg-transparent
                   border-0 focus:outline-none focus:ring-0"
                />
              </div>

              <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
                <input
                  className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
                  type="number"
                  step={0.01}
                  min={0.01}
                  name="ticket_price"
                  placeholder="Ticket price"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
                <input
                  className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
                  type="number"
                  name="capacity"
                  placeholder="set capacity "
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="flex flex-row justify-center items-center w-full text-white text-md
            bg-gradient-to-r from-cyan-500 to-red-500 py-2 px-5 rounded-full drop-shadow-xl border border-transparent
            hover:bg-transparent hover:border hover:border-blue-400
            focus:outline-none focus:ring mt-5"
              >
                Submit
              </button>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default AddSlot