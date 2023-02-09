import React from 'react'
import heroimage from '../asset/heroimage.jpg'
import Spiderman from '../asset/spiderman.jpeg'
import Emancipation from '../asset/emancipation.jpg'
import Blackadam from '../asset/blackadam.jpg'
import Avengers from '../asset/avengers.jpg'
import Sherlockholmes from '../asset/sherlockholmes.jpg'

function BrowsePage() {
  return (
    <div className="flex flex-col w-full p-4">
      <div
        style={{ backgroundImage: 'url(' + heroimage + ')' }}
        className="w-full h-60 rounded-3xl bg-no-repeat bg-cover bg-center mb-4 flex flex-col"
      >
        <div className="text-white p-8 space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">AVATAR</h3>
            <p className="text-xl font-medium">THE WAY OF THE WATER</p>
          </div>
          <div>
            <button className="bg-transparent font-bold border-2 border-red-600 py-2 px-8 text-black hover:bg-gradient-to-r from-cyan-500 to-red-500 font-bold  rounded-full hover:border-white hover:text-white ">
              WATCH
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold p-4">Parties</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex justify-start flex-row space-x-8  sm:space-x-0  sm:flex-col p-4 space-y-2 bg-gray-300 w-auto rounded-lg">
              <img
                src={Spiderman}
                className="rounded-lg sm:rounded-lg h-42 w-32 object-cover "
              />

              <div className="flex flex-col">
                <h3 className="font-bold">Spider Man</h3>
                <p className="text-gray-500 font-semibold">
                  Science Fiction, Fantasy
                </p>
              </div>
            </div>

            <div className="flex justify-start flex-row space-x-8  sm:space-x-0  sm:flex-col p-4 space-y-2 bg-gray-300 w-auto rounded-lg">
              <img
                src={Spiderman}
                className="rounded-lg sm:rounded-lg h-42 w-32 object-cover "
              />

              <div className="flex flex-col">
                <h3 className="font-bold">Spider Man</h3>
                <p className="text-gray-500 font-semibold">
                  Science Fiction, Fantasy
                </p>
              </div>
            </div>

            <div className="flex justify-start flex-row space-x-8  sm:space-x-0  sm:flex-col p-4 space-y-2 bg-gray-300 w-auto rounded-lg">
              <img
                src={Spiderman}
                className="rounded-lg sm:rounded-lg h-42 w-32 object-cover "
              />

              <div className="flex flex-col">
                <h3 className="font-bold">Spider Man</h3>
                <p className="text-gray-500 font-semibold">
                  Science Fiction, Fantasy
                </p>
              </div>
            </div>

            <div className="flex justify-start flex-row space-x-8  sm:space-x-0  sm:flex-col p-4 space-y-2 bg-gray-300 w-auto rounded-lg">
              <img
                src={Spiderman}
                className="rounded-lg sm:rounded-lg h-42 w-32 object-cover "
              />

              <div className="flex flex-col">
                <h3 className="font-bold">Spider Man</h3>
                <p className="text-gray-500 font-semibold">
                  Science Fiction, Fantasy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="keepwatching">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold p-4">Continue Watching</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              <img
                src={Emancipation}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Emancipation}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Emancipation}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Emancipation}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              <img
                src={Sherlockholmes}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Sherlockholmes}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Sherlockholmes}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Sherlockholmes}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              <img
                src={Avengers}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Avengers}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Avengers}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Avengers}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              <img
                src={Blackadam}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Blackadam}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Blackadam}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />

              <img
                src={Blackadam}
                className="max-w-full h-auto rounded-lg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowsePage
