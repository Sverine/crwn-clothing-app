const INITIAL_STATE = {
    currentUser:null
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_CURRENT_USER':
            return{
                ...state,
                currentUser:action.payload
            }
        
        //Don't forget to always return the sate by default
        default:
            return state;
    }
}

export default userReducer;