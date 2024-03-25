import LibraryHabit from "./LibraryHabit";
import ListGroup from 'react-bootstrap/ListGroup';

export default function Library(props) {
    const habitsHistory = JSON.parse(localStorage.getItem('habitsHistory'));
    const habits = JSON.parse(localStorage.getItem('habits'));
    const habitsIds = [];
    habits.forEach((habit) => {
        habitsIds.push(habit.id)
    })
    const filteredHabitsHistory = habitsHistory.filter((habit) => habitsIds.indexOf(habit.id) === -1)

    return (
        <main className='p-3'>
            {
                filteredHabitsHistory.length === 0 ?
                    <h1 className='font-extrabold text-center m-8'>Добавляйте и выполняйте привычки и они будут появляться в списке для быстрого доступа</h1> 
                    : 
                    <ListGroup as="ol">
                        {
                            filteredHabitsHistory.map(habit => (
                                <LibraryHabit setCalendarValue={props.setCalendarValue} setRate={props.setRate} habit={habit}/>
                            ))
                        }
                    </ListGroup>
            }
        </main>
    )
}