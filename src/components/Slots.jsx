const Slots = ({ filteredSlots, movie }) => {
  const [slotsModal] = useGlobalState('slotsModal')
  const handleClose = () => {
    setGlobalState('slotsModal', 'scale-0')
  }

  console.log(filteredSlots)

  function convertTimestampToTime(timestamp) {
    return moment(timestamp).format('h:mm A')
  }
  function formatDateWithDayName(timestamp) {
    return moment(timestamp).format('dddd, MMMM Do YYYY')
  }

  const handlePublish = async (id, day) => {
    const params = {
      id,
      movieId: movie.id,
      day,
    }
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await publishTimeSlot(params)
          .then(async () => {
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'slot published successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }
  const handleDelete = async (id) => {
    const params = {
      id,
      movieId: movie.id,
    }
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await deleteSlot(params)
          .then(async () => {
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'slot deleted successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleClaim = async (id) => {
    const params = {
      id,
      movieId: movie.id,
    }
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await withdraw(params)
          .then(async () => {
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'funds claimed successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
        bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${slotsModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col overflow-y-scroll">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Slots</p>
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
                {' '}
                Dapp <span className="text-red-700">Cinemas</span>
              </p>
            </div>
          </div>
          <div>
            {filteredSlots.map((slot, i) => (
              <div className="my-4 px-4" key={i}>
                <h3 className="text-gray-700">
                  {formatDateWithDayName(slot.day)}
                </h3>
                <div className="flex space-x-2 items-center">
                  <h4>{convertTimestampToTime(slot.startTime)}</h4>
                  <div className="w-3 h-[0.3px] bg-black"></div>
                  <h4>{convertTimestampToTime(slot.endTime)}</h4>
                </div>

                <div className="flex items-center space-x-2 my-2">
                  <button
                    className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
                    onClick={() => handleDelete(slot.id)}
                  >
                    <DeleteIcon className="text-red-700 cursor-pointer" />{' '}
                    delete
                  </button>
                  {!slot.published ? (
                    <button
                      className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
                      onClick={() => handlePublish(slot.id, slot.day)}
                    >
                      <PublishIcon className="text-cyan-600 cursor-pointer text-2xl" />{' '}
                      publish
                    </button>
                  ) : null}

                  {new Date().getTime() > new Date(slot.endTime).getTime() &&
                  slot.seating > 0 ? (
                    <button
                      className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
                      onClick={() => handleClaim(slot.id)}
                    >
                      <AssignmentTurnedIn className="text-green-500" /> claim
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slots
