import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import userReducer from "./user/reducer"
import roomReducer from "./rooms/reducer";
import friendReducer from "./friends/reducer";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user', 'room', 'friends']
}

const rootReducer =  combineReducers({
    user: userReducer,
    room: roomReducer,
    friends: friendReducer
});

export default persistReducer(persistConfig,rootReducer)