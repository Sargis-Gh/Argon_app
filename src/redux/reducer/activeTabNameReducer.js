import { ActionsType } from "../../constants/reduxConstants";

const activeTabName = 'Home'

export default function (state = activeTabName, action) {
    if (ActionsType.activeTabName === action.type) {
        return action.payload
    }
    return state;
}