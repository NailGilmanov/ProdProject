import Header from "./components/Header"
import Main from "./components/Main";
import { useEffect, useState } from "react";
import SignInSignUp from "./components/SignInSignUp"

import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Shop from "./components/Shop";
import Library from "./components/Library";

import Form from 'react-bootstrap/Form';

export default function App() {
  const [showHome, setShowHome] = useState(false);
  const localSignUp = localStorage.getItem('signUp')

  const [rate, setRate] = useState(localStorage.getItem('rate'));
  const [curDay, setCurDay] = useState(true);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [theme, setTheme] = useState(true);

  const handleChange = (event) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const result = JSON.parse(reader.result);
      const habits = result.habits;
      const historyHabit = JSON.parse(localStorage.getItem('habitsHistory'));
      const habitsCopy = [...habits];
      const failedAction = []
      habitsCopy.forEach(habit => {
        console.log(habit)
        console.log(Math.round((new Date() - new Date(habit.addDate)) / (1000 * 60 * 60 * 24)));
        for (let i = 0; i < Math.round((new Date() - new Date(habit.addDate)) / (1000 * 60 * 60 * 24)); i += 1) {
          const listOfDateActions = []
          const copyAction = [...result.actions]
          copyAction.filter(action => action.id === habit.id).forEach(action => listOfDateActions.push(action.date.slice(0, 10)))
          const dateOfFailed = new Date(habit.addDate);
          dateOfFailed.setDate(dateOfFailed.getDate() + i);
          if (listOfDateActions.indexOf(dateOfFailed.toISOString().slice(0, 10)) === -1) {
            failedAction.push({id: habit.id, date: dateOfFailed.toISOString().slice(0, 10)})
          }
        }
        if (habit.period === 'daily') {
          habit.period = 'День'
        } else if (habit.period === 'weekly') {
          habit.period = 'Неделя'
        } else if (habit.period ==='monthly') {
          habit.period = 'Месяц'
        }
        habit.done = false;
        let habitHistoryCopy = {...habit}
        habitHistoryCopy.done = true
        historyHabit.push(habitHistoryCopy)
      })

      const actions = result.actions;
      console.log(actions);
      localStorage.setItem('failActions', JSON.stringify(failedAction));
      localStorage.setItem('coins', JSON.stringify(parseInt(JSON.parse(localStorage.getItem('coins'))) + actions.length * 100));
      localStorage.setItem('actions', JSON.stringify(actions));
      localStorage.setItem('habits', JSON.stringify(habitsCopy));
      localStorage.setItem('habitsHistory', JSON.stringify(historyHabit));
      window.location.reload();
    })

    reader.readAsText(event.target.files[0])
  }

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
              <Form.Group controlId="formFile" className="m-2.5 mb-3">
                <Form.Control onChange={handleChange} type="file"/>
              </Form.Group>
              <Header rate={rate} setRate={setRate} setCurDay={setCurDay} calendarValue={calendarValue} setCalendarValue={setCalendarValue}/>
              <Main rate={rate} setRate={setRate} curDay={curDay} calendarValue={calendarValue}/>
            </>
          :
          <SignInSignUp/>
        }/>
        <Route path='/profile' element={<><Header calendarValue={calendarValue} setCalendarValue={setCalendarValue} rate={rate} setRate={setRate} setCurDay={setCurDay}/><Profile/></>}/>
        <Route path='/shop' element={<><Header calendarValue={calendarValue} setCalendarValue={setCalendarValue} rate={rate} setRate={setRate} setCurDay={setCurDay}/><Shop theme={theme} setTheme={setTheme}/></>}/>
        <Route path='/library' element={<><Header calendarValue={calendarValue} setCalendarValue={setCalendarValue} rate={rate} setRate={setRate} setCurDay={setCurDay}/><Library setRate={setRate} setCalendarValue={setCalendarValue}/></>}/>
      </Routes>
    </div>
  )
}