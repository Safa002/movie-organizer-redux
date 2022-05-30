import { combineReducers } from "redux";
import dataReducer from "./dataReducers";
const rootReducer = combineReducers({
    data: dataReducer,
})
export default rootReducer