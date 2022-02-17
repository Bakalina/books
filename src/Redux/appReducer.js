import {getAuthUser} from "./authReducer";

const INITIALIZED_SUCCESS = 'appReducer/INITIALIZED_SUCCESS';


const initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {

    switch (action.type) {
    case INITIALIZED_SUCCESS:
        return {
            ...state,
            initialized: true
        };
    default:
        return state;
    }
};

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});


export const initializedApp = () => (dispatch) => {
    const promise = dispatch(getAuthUser());
    promise.then(()=>{
        dispatch(initializedSuccess());
    });
};

export default appReducer;