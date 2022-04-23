import { useEffect, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setUsers, findUsers } from '../../redux/actions/usersActions'

const SearchForm = () => {
  const [formData, setFormData] = useState('')
  const dispatch = useDispatch()

  const handleChange = e => {
    setFormData(e.target.value)

    if (e.target.value === '') return dispatch(setUsers(null))

    dispatch(findUsers(e.target.value))
  }

  const clearForm = () => {
    dispatch(setUsers(null))
    setFormData('')
  }

  return (
    <div className="p-4 flex items-center border-b relative">
      <label className="absolute left-7 cursor-text" htmlFor="search">
        <FaSearch className="text-gray-500 text-lg" />
      </label>
      <input
        id="search"
        className="w-full py-2 px-10 rounded bg-gray-200 text-xl text-gray-800"
        type="text"
        placeholder="Search"
        autoComplete="off"
        value={formData}
        onChange={handleChange}
      />
      <button
        className={`absolute right-7 group ${formData.length ? '' : 'hidden'}`}
        onClick={clearForm}
      >
        <FaTimes className="text-gray-500 text-lg transition group-hover:text-gray-800" />
      </button>
    </div>
  )
}

export default SearchForm
