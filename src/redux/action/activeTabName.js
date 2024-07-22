import { ActionsType } from "../../constants/reduxConstants"

export const activeTabName = {
    setActiveTabName: (page) => {
        return (dispatch) => {
            return dispatch({
                type: ActionsType.activeTabName,
                payload: page,
            })
        }
    },
}
