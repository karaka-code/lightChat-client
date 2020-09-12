import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useDispatch} from "react-redux";
import {logInUser} from "../store/user/actions";

const AuthPage = () => {
    const dispatch = useDispatch()
    const message = useMessage()
    const {error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        name: '', email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeForm = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
            dispatch(logInUser(data))
        } catch (e) {}
    }

    return (
        <form className="container" style={{marginTop: 50}}>
            <div className="container">
                <div className="container">
                    <div className="row">
                        <div className="input-field col s12">
                            <blockquote>
                                Your name:
                            </blockquote>
                            <input
                                placeholder="Enter your name"
                                id="name"
                                type="text"
                                name="name"
                                value={form.name}
                                className="validate"
                                onChange={changeForm}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <blockquote>
                                Your email:
                            </blockquote>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="Email"
                                className="validate"
                                onChange={changeForm}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <blockquote>
                                Your password:
                            </blockquote>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={form.password}
                                placeholder="Password"
                                className="validate"
                                onChange={changeForm}
                            />
                        </div>
                    </div>
                    <div className="row s12" style={{display: "flex", justifyContent: "center"}}>
                        <button style={{marginRight: 90}} onClick={handleLogin} className="btn waves-effect waves-light"
                                type="submit"
                                name="action">Login
                            <i className="material-icons right">send</i>
                        </button>
                        <button onClick={handleRegister} className="btn waves-effect waves-light" type="submit"
                                name="action">Register
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AuthPage
