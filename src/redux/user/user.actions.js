import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
    //need to be the same name of the reducer. Because it won't never change, we use uppercase
    type: UserActionTypes.SET_CURRENT_USER,
    payload:user
})