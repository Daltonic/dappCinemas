import { Menu } from '@headlessui/react'
import { FiEdit } from 'react-icons/fi'
import { BiLogInCircle } from 'react-icons/bi'
import { SiGnuprivacyguard } from 'react-icons/si'
import { BsChatLeftDots } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
import { MdOutlineJoinLeft } from 'react-icons/md'
import { toast } from 'react-toastify'
import {
  createNewGroup,
  joinGroup,
  loginWithCometChat,
  signUpWithCometChat,
} from '../services/chat'
import { setGlobalState, useGlobalState } from '../store'

const ChatActions = ({ movie, group }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [owner] = useGlobalState('deployer')
  const [currentUser] = useGlobalState('currentUser')

  const handleSignUp = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await signUpWithCometChat(connectedAccount)
          .then((user) => resolve(user))
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Signning up...',
        success: 'Signed up successfully, please login 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleLogin = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await loginWithCometChat(connectedAccount)
          .then((user) => {
            setGlobalState('currentUser', user)
            resolve(user)
            window.location.reload()
          })
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Logging...',
        success: 'Logged in successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleCreateGroup = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await createNewGroup(`guid_${movie.id}`, movie.name)
          .then((group) => {
            setGlobalState('group', group)
            resolve(group)
            window.location.reload()
          })
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Creating group...',
        success: 'Group created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleJoinGroup = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await joinGroup(`guid_${movie.id}`)
          .then((group) => {
            setGlobalState('group', group)
            resolve()
            window.location.reload()
          })
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Joining group...',
        success: 'Group joined successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <Menu as="div" className="relative inline-block text-left mx-auto">
      <Menu.Button
        className="inline-flex justify-center items-center space-x-2
          rounded-md bg-black bg-opacity-10 px-4 py-2 text-sm
          font-medium text-black hover:bg-opacity-30 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75"
      >
        <span>Chat Options</span>
        <FiChevronDown size={17} />
      </Menu.Button>
      <Menu.Items
        className="absolute right-0 mt-2 w-56 origin-top-right
          divide-y divide-gray-100 rounded-md bg-white shadow-md 
          ing-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {!currentUser && (
          <>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex justify-start items-center space-x-1 ${
                    active ? 'bg-gray-200 text-black' : 'text-red-500'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={handleSignUp}
                >
                  <SiGnuprivacyguard size={17} />
                  <span>Chat SignUp</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex justify-start items-center space-x-1 ${
                    active ? 'bg-gray-200 text-black' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={handleLogin}
                >
                  <BiLogInCircle size={17} />
                  <span>Chat Login</span>
                </button>
              )}
            </Menu.Item>
          </>
        )}

        {currentUser && (
          <>
            {currentUser.uid != owner && group && !group.hasJoined && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex justify-start items-center space-x-1 ${
                      active ? 'bg-gray-200 text-black' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleJoinGroup}
                  >
                    <MdOutlineJoinLeft size={17} />
                    <span>Join Group</span>
                  </button>
                )}
              </Menu.Item>
            )}

            {currentUser.uid == owner && !group && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex justify-start items-center space-x-1 ${
                      active ? 'bg-gray-200 text-black' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleCreateGroup}
                  >
                    <FiEdit size={17} />
                    <span>Create Group</span>
                  </button>
                )}
              </Menu.Item>
            )}

            {group && group.hasJoined && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex justify-start items-center space-x-1 ${
                      active ? 'bg-gray-200 text-black' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setGlobalState('chatModal', 'scale-100')}
                  >
                    <BsChatLeftDots size={17} />
                    <span>Chat</span>
                  </button>
                )}
              </Menu.Item>
            )}
          </>
        )}
      </Menu.Items>
    </Menu>
  )
}

export default ChatActions
