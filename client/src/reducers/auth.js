const initial = {
    "username": "",
    "password": "",
}

const authReducer = (state = initial, action) => {
    switch (action.type) {
        case "LOGIN":
            return {username: action.payload.username, password: action.payload.password};

        default:
            return state;
    }
}

export default authReducer;