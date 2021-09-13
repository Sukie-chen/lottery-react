const defaultState = {
    category: [],
    startBtn: false,
    award: 0
}

export const reducer  = (state = defaultState, action) => {
    if(action.type === 'CLICK_START_BTN') {
        return {
            ...state,
            startBtn: action.value
        }
    }else if(action.type === 'GET_AWARD') {
        return {
            ...state,
            award: action.value
        }
    }else if(action.type === 'UPDATE_CATEGORY') {
        return {
            ...state,
            category: action.value
        }
    }
    return state
}