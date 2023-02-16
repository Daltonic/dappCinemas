import React from 'react'
import images from '../../constants/images'
import data from '../../constants/data'

function BrowsePage() {
  return (
    <div className="flex flex-col w-full p-4">
      <div
        style={{ backgroundImage: 'url(' + images.Heroimage + ')' }}
        className="w-full h-full rounded-3xl bg-no-repeat bg-cover bg-center mb-4 flex flex-col"
      >
        <div className="text-white p-8 space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">AVATAR</h3>
            <p className="text-xl font-medium">THE WAY OF THE WATER</p>
          </div>
          <div>
            <button className="bg-transparent font-bold border-2 border-red-600 py-2 px-8 text-black hover:bg-gradient-to-r from-cyan-500 to-red-500  rounded-full hover:border-white hover:text-white ">
              WATCH
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold p-4">Parties</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.PartiesData.map((item, index) => (
              <div
                key={index}
                className="flex justify-start flex-row space-x-8  sm:space-x-0  sm:flex-col p-4 space-y-2 bg-gray-300 w-auto rounded-lg"
              >
               <div className='flex h-full w-auto'>
               <img
                  key={item.id}
                  src={item.imgUrl}
                  className="rounded-lg  object-cover "
                />
               </div>

                <div className="flex flex-col">
                  <h3 key={item.id} className="font-bold md:text-lg">
                    {item.header}
                  </h3>
                  <p key={item.id} className=" md:text-gray-500 font-normal md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="keepwatching">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold p-4">Continue Watching</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {/* ContinueWatchingDataA' */}
              {data.ContinueWatchingDataA.map((item, index) => (
                <div key={index}>
                  <img
                    key={item.id}
                    src={item.imgUrl}
                    className="max-w-full h-auto rounded-lg"
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {/* ContinueWatchingDataB' */}
              {data.ContinueWatchingDataB.map((item, index) => (
                <div key={index}>
                  <img
                    key={item.id}
                    src={item.imgUrl}
                    className="max-w-full h-auto rounded-lg"
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {/* ContinueWatchingDataC' */}
              {data.ContinueWatchingDataC.map((item, index) => (
                <div key={index}>
                  <img
                    key={item.id}
                    src={item.imgUrl}
                    className="max-w-full h-auto rounded-lg"
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {/* ContinueWatchingDataD' */}

              {data.ContinueWatchingDataD.map((item, index) => (
                <div key={index}>
                
                  <img
                    key={item.id}
                    src={item.imgUrl}
                    className="max-w-full h-auto rounded-lg"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowsePage
