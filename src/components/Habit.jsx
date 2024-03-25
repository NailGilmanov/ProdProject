import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import trashCanIcon from "../images/trash-can-svgrepo-com.svg"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Habit(props) {
    let isHabitDeleted = false;
    let habits = props.habits;
    
    const currentHabit = habits.filter((habit) => habit.title === props.title)[0];

    const [done, setDone] = useState(currentHabit.done);

    const [show, setShow] = useState(false);

    const handleFollow = () => {
        habits = habits.filter((habit) => habit.id !== currentHabit.id);
        props.setHabit(habits)
        localStorage.setItem('habits', JSON.stringify(habits))
        const doneHabits = habits.filter((habit) => habit.done === true);
        const currentRating = isNaN(Math.round((doneHabits.length / habits.length) * 100))? 0 : Math.round((doneHabits.length / habits.length) * 100);
        props.setRate(currentRating);
        localStorage.setItem('rate', currentRating);
        setShow(false)
    }
    const handleDelete = () => {
        habits = habits.filter((habit) => habit.id !== currentHabit.id);
        props.setHabit(habits)
        localStorage.setItem('habits', JSON.stringify(habits))
        const doneHabits = habits.filter((habit) => habit.done === true);
        const currentRating = isNaN(Math.round((doneHabits.length / habits.length) * 100))? 0 : Math.round((doneHabits.length / habits.length) * 100);
        props.setRate(currentRating);
        localStorage.setItem('rate', currentRating);

        const actions = JSON.parse(localStorage.getItem('actions'));
        const filteredActions = actions.filter((action) => action.id !== currentHabit.id);
        localStorage.setItem('actions', JSON.stringify(filteredActions));

        const failActions = JSON.parse(localStorage.getItem('failActions'))
        const filteredFailActions = failActions.filter((action) => action.id !== currentHabit.id);
        localStorage.setItem('failActions', JSON.stringify(filteredFailActions));

        setShow(false)
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
        currentHabit.done = currentHabit.done ? false : true
        setDone(currentHabit.done);
        localStorage.setItem('habits', JSON.stringify(habits));
        const doneHabits = habits.filter((habit) => habit.done === true);
        const currentRating = Math.round((doneHabits.length / habits.length) * 100)
        props.setRate(currentRating);
        localStorage.setItem('rate', currentRating);
        
        let habitsHistory = JSON.parse(localStorage.getItem('habitsHistory'))
        habitsHistory.push(currentHabit)
        localStorage.setItem('habitsHistory', JSON.stringify(habitsHistory))

        const actions = JSON.parse(localStorage.getItem('actions'));
        const action = {
            id: currentHabit.id,
            date: new Date()
        }
        actions.push(action);
        localStorage.setItem('actions', JSON.stringify(actions));

        localStorage.setItem('coins', parseInt(localStorage.getItem('coins')) + 100);
    }

    return (
        <div>
            {props.failed ?
                <div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Удаление привычки</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Вы желаете полностью удалить всю историю привычки "{props.title}" или просто прекратить ее отслеживание?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleFollow}>
                                Прекратить отслеживание
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Удалить
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <ListGroup.Item as="li" key={props.title}>
                        <Form className='flex justify-between'>
                            <Form.Check 
                                disabled={true}
                                isInvalid={true}
                                defaultChecked={false}
                                onClick={handleClick}
                                type="checkbox"
                                id="default-checkbox"
                                label={props.title}
                            />
                        </Form>
                    </ListGroup.Item>
                </div> 
            :

                <div>
                    {props.disabled ? 
                        <div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Удаление привычки</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Вы желаете полностью удалить всю историю привычки "{props.title}" или просто прекратить ее отслеживание?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleFollow}>
                                        Прекратить отслеживание
                                    </Button>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Удалить
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <ListGroup.Item as="li" key={props.title}>
                                <Form className='flex justify-between'>
                                    <Form.Check 
                                        disabled={true}
                                        isValid={true}
                                        defaultChecked={true}
                                        onClick={handleClick}
                                        type="checkbox"
                                        id="default-checkbox"
                                        label={props.title}
                                    />
                                </Form>
                            </ListGroup.Item>
                        </div> 
                        :
                        <div>
                            {isHabitDeleted && !props.disabled ? <></> :
                                <div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Удаление привычки</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Вы желаете полностью удалить всю историю привычки "{props.title}" или просто прекратить ее отслеживание?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleFollow}>
                                                Прекратить отслеживание
                                            </Button>
                                            <Button variant="danger" onClick={handleDelete}>
                                                Удалить
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <ListGroup.Item as="li" key={props.title}>
                                        <Form className='flex justify-between'>
                                            <Form.Check 
                                                disabled={done}
                                                isValid={done}
                                                defaultChecked={done}
                                                onClick={handleClick}
                                                type="checkbox"
                                                id="default-checkbox"
                                                label={props.title}
                                            />
                                            <img src={trashCanIcon} width='20' alt="trashCanIcon" onClick={handleShow}/>
                                        </Form>
                                    </ListGroup.Item>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}