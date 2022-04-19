import Header from "./Header"
import SearchForm from "./SearchForm"
import ChatList from "./ChatList"

const Sidebar = () => {
  return (
    <div className="w-1/4 h-screen bg-white overflow-hidden border-r shadow">
      <Header />
      <SearchForm />
      <ChatList />
    </div>
  )
}

export default Sidebar
