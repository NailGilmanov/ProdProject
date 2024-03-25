import { useRef} from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function SignInSignUp() {
    const name = useRef()
    const email = useRef()
    const password = useRef()

    const handleClick = () => {
        if (name.current.value && email.current.value && password.current.value) {
            console.log(name.current.value + " " + email.current.value + " " + password.current.value)
            localStorage.setItem("name", name.current.value)
            localStorage.setItem("password", password.current.value)
            localStorage.setItem("email", email.current.value)
            localStorage.setItem("signUp", email.current.value)
            localStorage.setItem("habits", JSON.stringify([]))
            localStorage.setItem("habitsHistory", JSON.stringify([]))
            localStorage.setItem("rate", 0)
            localStorage.setItem("coins", 0)
            localStorage.setItem("actions", JSON.stringify([]))
            localStorage.setItem("failActions", JSON.stringify([]))
            localStorage.setItem("buyTheme", false)
            window.location.reload()
        }
    }

    return (
        <div className="grid h-screen place-content-center">
            <h3 className="text-left p-1 text-xl font-extrabold">Регистрация</h3>
            <InputGroup className="mb-3">
                <Form.Control
                    ref={name}
                    placeholder="Имя"
                    aria-label="Username"
                    aria-describedby="basic-addon2"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Form.Control
                    ref={email}
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon2"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Form.Control
                    type="password"
                    ref={password}
                    placeholder="Пароль"
                    aria-label="Pawssword"
                    aria-describedby="basic-addon2"
                />
            </InputGroup>
            <Button onClick={handleClick} variant="success">Зарегистрироваться</Button>{' '}
        </div>
    )
}