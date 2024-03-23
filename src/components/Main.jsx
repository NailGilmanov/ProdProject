import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';
import Habit from './Habit';

export default function Main(props) {
    const habits = JSON.parse(localStorage.getItem('habits'))
    const dailyHabits = habits.filter((habit) => habit.period === "День")
    const weekHabits = habits.filter((habit) => habit.period === "Неделя")
    const monthHabits = habits.filter((habit) => habit.period === "Месяц")

    return (
        <main className='p-3'>
            <div className="progress-bar">
                <h3 className="text-left text-xl font-extrabold">Текущий прогресс</h3>
                <ProgressBar variant="success" animated now={props.rate} label={`${props.rate}%`} />
            </div>
            {
                habits.length === 0 ? <h1 className='text-center m-8'>Вы еще не добавили ни одной привычки</h1> : <></>
            }
            {dailyHabits.length !== 0 ? 
                <div className='mt-8' key='dailyHabits'>
                    <h3 className="text-left text-lg font-bold">Ежедневные привычки</h3>
                    <ListGroup as="ol">
                        {
                            dailyHabits.map(habit => (
                                <Habit title={habit.title} setRate={props.setRate} rate={props.rate}/>
                            ))
                        }
                    </ListGroup>
                </div> 
                : 
                <></>
            }

            {weekHabits.length !== 0 ? 
                <div className='mt-8' key='weekHabits'>
                    <h3 className="text-left text-lg font-bold">Привычки на неделю</h3>
                    <ListGroup as="ol">
                        {
                            weekHabits.map(habit => (
                                <Habit title={habit.title} setRate={props.setRate} rate={props.rate}/>
                            ))
                        }
                    </ListGroup>
                </div> 
                : 
                <></>
            }
            
            {monthHabits.length !== 0 ? 
                <div className='mt-8' key='monthHabits'>
                    <h3 className="text-left text-lg font-bold">Привычки на месяц</h3>
                    <ListGroup as="ol">
                        {
                            monthHabits.map(habit => (
                                <Habit title={habit.title} setRate={props.setRate} rate={props.rate}/>
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

