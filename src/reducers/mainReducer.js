const initialState = { 
    name : ''
}

const mainReducer = (state = initialState, action) =>{ 
    switch ( action.type ) { 
        case "TEST" : 
            return {

            }
        default :
            return state
    }
};

export default mainReducer;