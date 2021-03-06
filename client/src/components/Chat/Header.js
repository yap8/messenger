import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { BiRefresh } from 'react-icons/bi'

import { fetchMessages } from '../../redux/actions/messagesActions'
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import { deleteChat } from '../../redux/actions/chatsActions'

const Header = () => {
  const { title, id } = useSelector(state => state.chat)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRefresh = () => dispatch(fetchMessages(id))

  const handleDeleteChat = () => {
    dispatch(deleteChat(id))
    navigate('/')
  }

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow border-b dark:border-slate-900 dark:bg-slate-800">
      <div className="w-12 h-12 mr-4">
        <FaUserCircle className="text-5xl text-gray-400 dark:text-white" />
      </div>
      <h1 className="w-full font-semibold text-2xl dark:text-white">{title}</h1>
      <Menu
        transition
        menuClassName="bg-white dark:bg-slate-800"
        menuButton={(
          <MenuButton className="group p-2">
            <BsThreeDotsVertical className="w-6 h-6 text-gray-400 transition group-hover:text-gray-800 dark:text-white dark:group-hover:text-gray-400" />
          </MenuButton>
        )}
      >
        <MenuItem
          className="py-2 px-6 dark:text-white dark:hover:bg-slate-700"
          onClick={handleDeleteChat}
        >
          Delete chat
        </MenuItem>
      </Menu>
      <button
        className="group p-2 bg-gray-200 rounded transition hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600"
        onClick={handleRefresh}
      >
        <BiRefresh className="text-3xl text-gray-800 transition group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-100" />
      </button>
    </div>
  )
}

export default Header
