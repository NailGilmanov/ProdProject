import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import lightThemeImage from '../images/light-light.jpeg';
import darkThemeImage from '../images/dark-dark.avif';

import coinImage from '../images/coin-svgrepo-com.svg';

import React, { useState } from'react';

import Modal from 'react-bootstrap/Modal';


export default function Shop(props) {
    const [coins, setCoins] = useState(localStorage.getItem('coins'));
    const [buyTheme, setBuyTheme] = useState(JSON.parse(localStorage.getItem('buyTheme')));
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBuy = () => {
        setCoins(coins - 200);
        localStorage.setItem('coins', coins - 200);
        setBuyTheme(true);
        localStorage.setItem('buyTheme', true);
        setShow(false);
    }

    if (!props.theme) {
        document.querySelector('body').style.backgroundColor = '#1d4068';
        document.querySelector('body').style.color = '#dfe7eb';
    } else {
        document.querySelector('body').style.backgroundColor = '#fefefe';
        document.querySelector('body').style.color = 'black';
    }

    const handleLight = () => {
        props.setTheme(true);
    }

    const handleDark = () => {
        props.setTheme(false)
    }

    return (
        <main className='p-3'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтверждение платежа</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы точно желаете купить "Темная тема"?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="success" onClick={handleBuy} disabled={coins < 200}>
                        Купить за <img src={coinImage} className='inline-block' alt="coinImage" width={15}/> 200
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="m-3.5 flex" >
                <img src={coinImage} alt="coinImage" width={20}/> 
                <h2 className='p-2.5'>{coins}</h2>
            </div>

            <h1 className="m-3.5" >Магазин</h1>
            <div className="card-wrapper flex flex-wrap">
                <Card className="m-3.5" style={{ width: '19rem' }}>
                    <Card.Img variant="top" src={lightThemeImage} />
                    <Card.Body>
                        <Card.Title>Светлая тема</Card.Title>
                        <Card.Text>
                            Светлая тема - это как луч солнца, проникающий сквозь тучи и озаряющий все вокруг своим теплом и светом. Она наполняет сердца радостью, поднимает настроение и заставляет улыбаться даже в самые трудные моменты. 
                        </Card.Text>
                        <Button variant="success" onClick={handleLight}>Применить</Button>
                    </Card.Body>
                </Card>

                <Card className="m-3.5" style={{ width: '19rem' }}>
                    <Card.Img variant="top" src={darkThemeImage} />
                    <Card.Body>
                        <Card.Title>Темная тема</Card.Title>
                        <Card.Text>
                            Темная тема - это как ночное небо, усыпанное мерцающими звездами и облаками, загадочная и мистическая. Она окружает все вокруг таинственным мраком, создавая атмосферу загадочности и интриги. 
                        </Card.Text>
                        <Button variant="success" onClick={handleDark} disabled={!buyTheme}>Применить</Button>
                        <Button variant="success" className='mx-2.5' hidden={buyTheme} onClick={handleShow}>Купить</Button>
                    </Card.Body>
                </Card>
            </div>
        </main>
    )
}