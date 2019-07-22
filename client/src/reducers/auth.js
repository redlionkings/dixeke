import _ from "lodash";

const initialState = {
    profile : {}, // decoded chua thong tin payload
    isAuthenticated : false
}

const loginReducer = (state= initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER" :
            return {
                ...state,
                profile : action.payload,
                isAuthenticated: !_.isEmpty(action.payload)
                // isEmpty la true( action.payload la {} )
                // neu action.payload la {} ==>decoded = { } ==> token chua co => isAuthenticated = false
            }
        default :
            return state
    }
    
}

export default loginReducer