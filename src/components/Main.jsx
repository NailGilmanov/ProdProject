import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';
import Habit from './Habit';

import { useState } from'react';

export default function Main(props) {
    const habits = JSON.parse(localStorage.getItem('habits'))

    const [habitList, setHabit] = useState(habits)

    const actions = JSON.parse(localStorage.getItem('actions'))
    let newCalenarValue = props.calendarValue
    let stringDate = newCalenarValue.toISOString().slice(0, 10)
    let currentDate = new Date(stringDate)
    currentDate.setDate(currentDate.getDate() + 1)
    console.log(currentDate.toISOString().slice(0, 10))
    const filteredActions = actions.filter((action) => action.date.slice(0, 10) === currentDate.toISOString().slice(0, 10))
    console.log(filteredActions)

    const failActions = JSON.parse(localStorage.getItem('failActions'))
    let failNewCalenarValue = props.calendarValue
    let failStringDate = failNewCalenarValue.toISOString().slice(0, 10)
    let failCurrentDate = new Date(failStringDate)
    failCurrentDate.setDate(failCurrentDate.getDate() + 1)
    console.log(failCurrentDate.toISOString().slice(0, 10))
    const failFilteredActions = failActions.filter((action) => action.date.slice(0, 10) === currentDate.toISOString().slice(0, 10))
    console.log(failFilteredActions)

    const idsOfActions = []
    filteredActions.forEach((action) => {
        idsOfActions.push(action.id)
    })

    const idsOfFailedActions = []
    failFilteredActions.forEach((action) => {
        idsOfFailedActions.push(action.id)
    })

    const habitsHistory = JSON.parse(localStorage.getItem('habitsHistory'));
    const filteredHabitsHistory = habitsHistory.filter((habit) => idsOfActions.indexOf(habit.id) !== -1)
    const failedFilteredHabitsHistory = habitsHistory.filter((habit) => idsOfFailedActions.indexOf(habit.id) !== -1)


    const dailyHabits = habitList.filter((habit) => habit.period === "День")
    const weekHabits = habitList.filter((habit) => habit.period === "Неделя")
    const monthHabits = habitList.filter((habit) => habit.period === "Месяц")

    return (
        <main className='p-3'>
            {props.curDay ?
                <div className="progress-bar">
                    <h3 className="text-left text-xl font-extrabold">Текущий прогресс</h3>
                    <ProgressBar variant="success" animated now={props.rate} label={`${props.rate}%`} />
                </div>
            : <></>}
            {
                filteredActions.length === 0 && !props.curDay && failedFilteredHabitsHistory.length === 0 ? <h1 className='text-center m-8'>В данный день привычек нет</h1> : <></>
            }

            {(filteredHabitsHistory.filter((habit) => habit.period === "День").length !== 0 && !props.curDay) || (failedFilteredHabitsHistory.filter((habit) => habit.period === "День").length !== 0 && !props.curDay) ? 
                <div className='mt-8' key='dailyHabits'>
                    <h3 className="text-left text-lg font-bold">Ежедневные привычки</h3>
                    <ListGroup as="ol">
                        {
                            filteredHabitsHistory.filter((habit) => habit.period === "День").map(habit => (
                                <Habit title={habit.title} disabled={true} setRate={props.setRate} rate={props.rate} habits={habitList} setHabit={setHabit}/>
                            ))
                        }

                        {
                            failedFilteredHabitsHistory.filter((habit) => habit.period === "День").map(habit => (
                                <Habit title={habit.title} failed={true} setRate={props.setRate} rate={props.rate} habits={habitList} setHabit={setHabit}/>
                            ))
                        }
                    </ListGroup>
                </div> 
                : 
                <></>
            }

            {(filteredHabitsHistory.filter((habit) => habit.period === "Неделя").length !== 0 && !props.curDay) || (failedFilteredHabitsHistory.filter((habit) => habit.period === "Неделя").length !== 0 && !props.curDay) ? 
                <div className='mt-8' key='weekHabits'>
                    <h3 className="text-left text-lg font-bold">Привычки на неделю</h3>
                    <ListGroup as="ol">
                        {
                            filteredHabitsHistory.filter((habit) => habit.period === "Неделя").map(habit => (
                                <Habit title={habit.title} disabled={true} setRate={props.setRate} rate={props.rate} habits={habitList} setHabit={setHabit}/>
                            ))
                        }

                        {
                            failedFilteredHabitsHistory.filter((habit) => habit.period === "Неделя").map(habit => (
                                <Habit title={habit.title} failed={true} setRate={props.setRate} rate={props.rate} habits={habitList} setHabit={setHabit}/>
                            ))
                        }
                    </ListGroup>
                </div> 
                : 
                <></>
            }
            
            {(filteredHabitsHistory.filter((habit) => habit.period === "Месяц").length !== 0 && !props.curDay) || (failedFilteredHabitsHistory.filter((habit) => habit.period === "Месяц").length !== 0 && !props.curDay) ? 
                <div className='mt-8' key='monthHabits'>
                    <h3 className="text-left text-lg font-bold">Привычки на месяц</h3>
                    <ListGroup as="ol">
                        {
                            filteredHabitsHistory.filter((habit) => habit.period === "Месяц").map(habit => (
                                <Habit title={habit.title} disabled={true} setRate={props.setRate} rate={props.rate} habits={habitList} setHabit={setHabit}/>
                            ))
                        }

                        {
                            failedFilteredHabitsHistory.filter((habit) => habit.period === "Месяц").map(habit => (
                                <Habit title={habit.title} failed={true} setRate={props.setRate} rate={props.rate} habits={habitList} setHabit={setHabit}/>
                            ))
                        }
                    </ListGroup>
                </div> 
                : 
                <></>
            }

            {
                habits.length === 0 && props.curDay ? <h1 className='text-center m-8'>Вы еще не добавили ни одной привычки</h1> : <></>
            }

            {dailyHabits.length !== 0 && props.curDay ? 
                <div className='mt-8' key='dailyHabits'>
                    <h3 className="text-left text-lg font-bold">Ежедневные привычки</h3>
                    <ListGroup as="ol">
                        {
                            dailyHabits.map(habit => (
                                <Habit title={habit.title} setRate={props.setRate} rate={props.rate} habits={habitList} setHabit={setHabit}/>
                            ))
                        }
                    </ListGroup>
                </div> 
                : 
                <></>
            }

            {weekHabits.length !== 0 && props.curDay ? 
                <div className='mt-8' key='weekHabits'>
                    <h3 className="text-left text-lg font-bold">Привычки на неделю</h3>
                    <ListGroup as="ol">
                        {
                            weekHabits.map(habit => (
                                <Habit title={habit.title} setRate={props.setRate} rate={props.rate} habits={habitList} setHabit={setHabit}/>
                            ))
                        }
                    </ListGroup>
                </div> 
                : 
                <></>
            }
            
            {monthHabits.length !== 0 && props.curDay ? 
                <div className='mt-8' key='monthHabits'>
                    <h3 className="text-left text-lg font-bold">Привычки на месяц</h3>
                    <ListGroup as="ol">
                        {
                            monthHabits.map(habit => (
                                <Habit title={habit.title} setRate={props.setRate} rate={props.rate} habits={habitList} setHabit={setHabit}/>
                            ))
                        }
                    </ListGroup>
                </div> 
                : 
                <></>
            }
                
        </main>
    )
}

