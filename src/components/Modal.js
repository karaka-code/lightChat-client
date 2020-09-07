import React, {useEffect, useState} from "react";
import M from "materialize-css";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {useSelector} from "react-redux";

export const Modal = () => {
    const messageAlerter = useMessage()
    const {request} = useHttp()
    const user = useSelector(state => state.user.currentUser)

    const [name, setName] = useState('')


    const changeForm = e => {
        setName(e.target.value)
    }

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {});
        });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await request('/api/room/', 'POST', {name, id: user.userId})
            messageAlerter(data.message)
        } catch (e) {}
    }

    return (
        <>
            <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Create a room</a>
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Create a room</h4>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input
                                        placeholder="Placeholder"
                                        id="first_name"
                                        type="text"
                                        className="validate"
                                        value={name}
                                        onChange={changeForm}
                                    />
                                    <label htmlFor="first_name">Room Name</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <a className="waves-effect waves-light btn" type="submit"
                       name="action"
                       onClick={handleSubmit}>Create</a>
                </div>
            </div>
        </>
    )
}