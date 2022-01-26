export const setCurrentUser = (user) => ({
    //need to be the same name of the reducer. Because it won't never change, we use uppercase
    type:'SET_CURRENT_USER',
    payload:user
})