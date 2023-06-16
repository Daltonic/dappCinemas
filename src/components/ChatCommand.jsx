import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import { joinGroup, createNewGroup } from '../services/chat'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getOwner } from '../services/blockchain'

const ChatCommand = ({ movie }) => {
  const [chatCommandModal] = useGlobalState('chatCommandModal')
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [loaded, setLoaded] = useState(false)
  const [deployer] = useGlobalState('deployer')
  const { id } = useParams()

  const handleClose = () => {
    setGlobalState('chatCommandModal', 'scale-0')
  }

  const handleCreateGroup = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await createNewGroup(`guid_${id}`, movie.name)
          .then((group) => {
            setGlobalState('group', group)
            resolve()
            handleClose()
            setGlobalState('chatModal', 'scale-100')
          })
          .catch(() => reject())
      }),
      {
        pending: 'Creating group...',
        success: 'Group created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleJoinGroup = async () => {
    new Promise(async (resolve, reject) => {
      await joinGroup(`guid_${id}`)
        .then(async (group) => {
          setGlobalState('group', group)
          handleClose()
          setGlobalState('chatModal', 'scale-100')
          resolve()
          window.location.reload()
        })
        .catch(() => reject())
    }),
      {
        pending: 'joining group...',
        success: 'joined successfully 👌',
        error: 'Encountered error 🤯',
      }
  }

  useEffect(async () => {
    await getOwner().then(() => setLoaded(true))
  }, [])

  return loaded ? (
    <div
      className={`fixed -top-4 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform z-[4000] transition-transform duration-300 ${chatCommandModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12  md:w-2/5 h-[12rem] p-6  relative">
        <div className="flex items-center justify-between">
          <h2>Auth</h2>
          <FaTimes className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="mt-12 flex items-center justify-center space-x-6">
          {deployer?.toLowerCase() == connectedAccount ? (
            <button
              className="p-2 bg-cyan-700 rounded-md text-white focus:outline-none focus:ring-0"
              onClick={handleCreateGroup}
            >
              Create Group
            </button>
          ) : (
            <button
              className="p-2 bg-red-700 rounded-md text-white focus:outline-none focus:ring-0"
              onClick={handleJoinGroup}
            >
              Join group
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null
}

export default ChatCommand
