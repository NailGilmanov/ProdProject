import Dropdown from 'react-bootstrap/Dropdown';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import DropdownButton from 'react-bootstrap/DropdownButton';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Header(props) {

    const habitTitle = useRef();
    const period = useRef();
    const habitCategory = useRef();
    let currentPeriod = ''

    const changeCurrentPeriod = (text) => {
        currentPeriod = text
    }

    const [showCalendar, setShowCalendar] = useState(false);

    const handleCloseCalendar = () => setShowCalendar(false);
    const handleShowCalnedar = () => setShowCalendar(true);
    const handleDateChange = () => {
        const days = props.calendarValue;
        days.setDate(days.getDate() + 1);
        if (props.calendarValue.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)) {
            props.setCurDay(true)
        } else {
            props.setCurDay(false)
        }
        days.setDate(days.getDate() - 1)
        setShowCalendar(false);
    };

    const handleCreate = () => {
        if (habitTitle.current.value && currentPeriod) {
            props.setCalendarValue(new Date());
            let habits = JSON.parse(localStorage.getItem('habits'))
            const habitsTitles = habits.map((habit) => habit.title)
            console.log(habitsTitles)
            if (habitsTitles.indexOf(habitTitle.current.value) === -1) {
                let newHabit = {
                    id: new Date().toString(),
                    addDate: new Date().toString(),
                    title: habitTitle.current.value,
                    category: habitCategory.current.value,
                    period: currentPeriod,
                    done: false,
                }
                habits.push(newHabit)
                localStorage.setItem('habits', JSON.stringify(habits))
                setShow(false)
                const doneHabits = habits.filter((habit) => habit.done === true);
                const currentRating = Math.round((doneHabits.length / habits.length) * 100)
                props.setRate(currentRating);
                localStorage.setItem('rate', currentRating);
                window.location.reload()
            }
        }
    }

    const ruDate = new Intl.DateTimeFormat("ru", {day: "numeric", month: "long", year: "numeric", weekday: "long"}).format(props.calendarValue).replace(/(\s?\.?)/, "")

    const [show, setShow] = useState(false);

    const handleClose = () => {
        currentPeriod = ''
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const exitFunc = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <header className="p-4 flex justify-between font-mono header">
            <Modal show={showCalendar} onHide={handleCloseCalendar}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить дату</Modal.Title>
                </Modal.Header>
                <Modal.Body><Calendar onChange={props.setCalendarValue} value={props.calendarValue}/></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseCalendar}>
                    Отмена
                </Button>
                <Button variant="success" onClick={handleDateChange}>
                    Сохранить
                </Button>
                </Modal.Footer>
            </Modal>

            <section className="left-side">
                <h1 className="text-2xl font-extrabold logo"><Link to="/">DailyHabits</Link></h1>
                <label className="text-sm text-gray-400 font-normal" onClick={handleShowCalnedar}>{ruDate}</label>
            </section>
            
            <section className="right-side">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Меню
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShow}>Добавить привычку</Dropdown.Item>
                        <Dropdown.Item><Link to='/'>Главная</Link></Dropdown.Item>
                        <Dropdown.Item><Link to='/profile'>Профиль</Link></Dropdown.Item>
                        <Dropdown.Item><Link to='/shop'>Магазин</Link></Dropdown.Item>
                        <Dropdown.Item><Link to='/library'>Бибилиотека привычек</Link></Dropdown.Item>
                        <Dropdown.Item onClick={exitFunc}>Выйти</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </section>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать привычку</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="my-3.5">
                        <h3 className="text-lg font-medium">Название привычки</h3>
                        <InputGroup className="mb-3">
                            <Form.Control
                            ref={habitTitle}
                            placeholder="Делать зарядку"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </div>
                    <div className="my-3.5">
                        <h3 className="text-lg font-medium">Категория</h3>
                        <InputGroup className="mb-3">
                            <Form.Control
                            ref={habitCategory}
                            placeholder="Спорт"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </div>
                    <div className="my-3.5">
                        <h3 className="text-lg font-medium">Временной промежуток</h3>
                        <DropdownButton ref={period} variant="success" id="dropdown-item-button" title="Выбрать периодичность">
                            <Dropdown.Item as="button" onClick={() => changeCurrentPeriod('День')}>День</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => changeCurrentPeriod('Неделя')}>Неделя</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => changeCurrentPeriod('Месяц')}>Месяц</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="success" onClick={handleCreate}>
                    Создать привычку
                </Button>
                </Modal.Footer>
            </Modal>
        </header>
    )
}