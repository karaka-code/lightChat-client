import React, {useState} from "react";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {useSelector} from "react-redux";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


const SimpleDialog = (props) => {
    const {onClose, open} = props;

    const handleClose = () => {
        onClose();
    };

    const messageAlerter = useMessage()
    const {request} = useHttp()
    const user = useSelector(state => state.user.currentUser)

    const [name, setName] = useState('')


    const changeForm = e => {
        setName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await request('/api/room/', 'POST', {name, id: user.userId})
            messageAlerter(data.message)
        } catch (e) {
        }
        handleClose()
    }


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Create a room</DialogTitle>
            <div>
                <div>
                    <h4 style={{marginLeft: 30}}>Create a room</h4>
                    <div>
                        <form className="col s12">
                            <div>
                                <div className="input-field col s6" style={{margin: 80}}>
                                    <input
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
                       style={{
                           margin: 12,
                           float: "right"
                       }}
                       onClick={handleSubmit}>Create
                    </a>
                </div>
            </div>
        </Dialog>
    )
        ;
}


function Modal() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <br/>
            <button className="waves-effect waves-light btn" onClick={handleClickOpen}>
                Create a room
            </button>
            <SimpleDialog open={open} onClose={handleClose}/>
        </div>
    );
}

export default Modal