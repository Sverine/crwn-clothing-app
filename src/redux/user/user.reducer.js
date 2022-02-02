import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser:null,
    error:null
}


const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser:action.payload,
                error:null
            }
            
            case UserActionTypes.SIGN_OUT_SUCCESS:
                return{
                    ...state,
                    currentUser:null,
                    error:null
                }
                
        //We can stack case type instead of writting 2 cases 
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return{
                ...state,
                error:action.payload
            }

        
        //Don't forget to always return the sate by default
        default:
            return state;
    }
}

export default userReducer;