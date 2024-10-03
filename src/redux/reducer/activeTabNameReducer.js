import { PageName } from '../../constants/constants';
import { ActionsType } from '../../constants/reduxConstants';

const activeTabName = PageName.home;

export default function (state = activeTabName, action) {
    if (ActionsType.activeTabName === action.type) {
        return action.payload;
    }
    return state;
}
