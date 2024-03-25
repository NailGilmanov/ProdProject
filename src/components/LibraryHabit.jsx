import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import plusImage from '../images/plus-svgrepo-com.svg'

import { useState } from'react';

export default function LibraryHabit(props) {
    const [disabled, setDisabled] = useState(false);

    const handleClick = () => {
        props.setCalendarValue(new Date());
        let habits = JSON.parse(localStorage.getItem('habits'))
        let newHabit = {
            id: props.habit.id,
            addDate: new Date().toString(),
            title: props.habit.title,
            category: props.habit.category,
            period: props.habit.period,
            done: false,
        }
        habits.push(newHabit)
        localStorage.setItem('habits', JSON.stringify(habits))
        const doneHabits = habits.filter((habit) => habit.done === true);
        const currentRating = Math.round((doneHabits.length / habits.length) * 100)
        props.setRate(currentRating);
        localStorage.setItem('rate', currentRating);

        setDisabled(true)
    }

    return (
        <ListGroup.Item as="li" key={props.title} hidden={disabled}>
            <Form className='flex justify-between'>
                <div>
                    <p className='m-0'>Название: {props.habit.title}</p>
                    <p className='m-0'>Категория: {props.habit.category}</p>
                    <p className='m-0'>Регулярность: {props.habit.period}</p>
                </div>
                <img src={plusImage} width='20' alt="trashCanIcon" onClick={handleClick}/>
            </Form>
        </ListGroup.Item>
    )
}