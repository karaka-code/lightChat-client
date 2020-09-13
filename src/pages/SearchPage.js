import React, {useCallback, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {addFriend} from "../store/friends/actions";
import {useDispatch, useSelector} from "react-redux";
import {useMessage} from "../hooks/message.hook";

const SearchPage = () => {
    const {request} = useHttp()
    const [friends, setFriends] = useState([])
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const addedFriends = useSelector(state => state.friends.friends)
    const message = useMessage()

    const handleSearch = useCallback(async (e) => {
        e.preventDefault()
        try {
            const data = await request(`/api/friends/?q=${name}`, 'GET', null)
            setFriends(data)
        } catch (e) {
        }
    }, [request, name])

    const changeForm = e => {
        setName(e.target.value)
    }

    const handleFriend = (item) => {
        dispatch(addFriend(item))
    }

    return (
        <>
            <form className="container" style={{marginTop: 50, marginLeft: 50}}>
                <div className="container">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="name" type="text" onChange={changeForm}
                                   value={name}/>
                            <label htmlFor="name">Friend Name</label>
                        </div>
                    </div>
                    <button style={{float: "right"}} onClick={handleSearch} className="btn waves-effect waves-light"
                            type="submit"
                            name="action">Search
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </form>
            <div style={{marginTop: 70}}>
                {friends.length !== 0 && <ul className="collection with-header">
                    <li className="collection-header"><h4>Found users:</h4></li>
                    {friends.map(item => {
                        return <li
                            className="collection-item"
                            key={item._id}>
                            {item.name}
                            <button style={{float: "right"}}
                                    onClick={() => handleFriend(item)}
                                    className="btn waves-effect waves-light"
                                    type="submit"
                                    name="action"
                            >
                                Add
                            </button>
                        </li>
                    })}
                </ul>}

            </div>
        </>
    )
}

export default SearchPage