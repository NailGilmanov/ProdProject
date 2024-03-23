import Header from "./components/Header"
import Main from "./components/Main";
import { useEffect, useState } from "react";
import SignInSignUp from "./components/SignInSignUp"

import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";

export default function App() {
  const [showHome, setShowHome] = useState(false);
  const localSignUp = localStorage.getItem('signUp')

  const [rate, setRate] = useState(localStorage.getItem('rate'));

  useEffect(() => {
      if (localSignUp) {
          setShowHome(true)
      }
  }, [showHome, localSignUp])

  return (<div className="max-w-5xl mx-auto">
      <Routes>
        <Route path='/' element={
          showHome ? 
            <>
              <Header rate={rate} setRate={setRate}/>
              <Main rate={rate} setRate={setRate}/>
            </>
          :
          <SignInSignUp/>
        }/>
      </Routes>
      <Routes>
        <Route path='/profile' element={<><Header rate={rate} setRate={setRate}/><Profile/></>}/>
      </Routes>
    </div>
  )
}