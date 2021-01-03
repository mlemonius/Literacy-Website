export const login = (id, pw) => {
    return {
        type: "LOGIN",
        payload: {
            username: id,
            password: pw, 
        }
    }
}