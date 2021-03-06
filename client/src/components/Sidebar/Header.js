import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

import { logout } from '../../redux/actions/authActions'
import { Link } from 'react-router-dom'

const Header = () => {
  const { name, avatar } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="flex justify-between items-center border-b dark:border-slate-900 p-4">
      <div className="w-12 h-12 mr-4">
        {avatar ? (
          <img src={avatar} alt="profile pic" />
        ) : (
          <FaUserCircle className="text-5xl text-gray-400 dark:text-white" />
        )}
      </div>
      <h1 className="w-full font-semibold text-2xl dark:text-white">{name}</h1>
      <Menu
        transition
        menuClassName="bg-white dark:bg-slate-800"
        menuButton={(
          <MenuButton className="group">
            <BsThreeDotsVertical className="w-6 h-6 text-gray-400 transition group-hover:text-gray-800 dark:text-white dark:group-hover:text-gray-400" />
          </MenuButton>
        )}
      >
        <MenuItem className="p-0 dark:text-white dark:hover:bg-slate-700">
          <Link
            className="py-2 px-6 block w-full h-full"
            to="/settings"
          >Settings</Link>
        </MenuItem>
        <MenuItem
          className="py-2 px-6 dark:text-white dar:bg-slate-800 dark:hover:bg-slate-700"
          onClick={handleLogout}
        >Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default Header
