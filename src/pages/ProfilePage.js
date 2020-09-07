import React, {useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useSelector} from "react-redux";
import {useMessage} from "../hooks/message.hook";
import {useDispatch} from "react-redux";
import {logOutUser} from "../store/user/actions";

export const ProfilePage = () => {

    const dispatch = useDispatch()
    const message = useMessage()
    const user = useSelector(state => state.user.currentUser)
    const {request} = useHttp()
    const [form, setForm] = useState({
        name: user.name, email: user.email, password: user.password
    })


    const changeForm = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const data = await request('/api/auth/update', 'PUT', {...form, id: user.userId}, {
                Authorization: `Bearer ${user.token}`
            })
            message(data.message)
            dispatch(logOutUser(null))
        } catch (e) {}
    }


    return (
        <div className="container">
            <h3>Profile Page</h3>
            <div className="row">
                <div className="input-field col s8">
                    <input id="name" type="text" name="name" className="validate" onChange={changeForm} value={form.name}/>
                    <label className="active" htmlFor="name">Name</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s8">
                    <input id="email" type="email" name="email" className="validate" onChange={changeForm} value={form.email}/>
                    <label className="active" htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s8">
                    <input id="password" name="password" className="validate" onChange={changeForm}
                           value={form.password}/>
                    <label className="active" htmlFor="password">Password</label>
                </div>
            </div>
            <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onClick={handleUpdate}
            >
                Save
                <i className="material-icons right">send</i>
            </button>
        </div>
    )
}