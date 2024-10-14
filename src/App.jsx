import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Demo from "./components/Demo/Demo"
import DemoHeader from "./components/Demo/DemoHeader";
import HomeHeader from "./components/Home/HomeHeader/HomeHeader";
import { Blog } from "./Context/Context";
import { ToastContainer, toast } from 'react-toastify';
import Profile from "./components/Home/HomeHeader/Profile/Profile";
import Write from "./components/Home/HomeHeader/Write/Write";
import Preview from "./components/Home/HomeHeader/Write/Preview";

function App() {
  const { currentUser } = Blog();
  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <ToastContainer />
      <Routes>
        {currentUser && <Route path="/" element={<Home />} />}
        {!currentUser && <Route path="/demo" element={<Demo />} />}
        <Route path="/profile/:userId" element={<Profile/>}/>
        <Route path="/write" element={<Write/>}/>
        <Route path="/preview" element={<Preview/>}/>
        <Route path="*" element={<Navigate to={currentUser ? "/" : "/demo"} />} />
      </Routes>
    </>
  )
}

export default App
