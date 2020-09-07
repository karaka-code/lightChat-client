import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import userReducer from "./user/reducer"
import roomReducer from "./rooms/reducer";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user', 'room']
}

const rootReducer =  combineReducers({
    user: userReducer,
    room: roomReducer
});

export default persistReducer(persistConfig,rootReducer)