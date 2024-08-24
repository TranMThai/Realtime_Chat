export const getToken = () => {
    return localStorage.getItem('user')
}

export const saveToken = (token: string) => {
    return localStorage.setItem('user', token)
}

export const deleteToken = () => {
    return localStorage.removeItem('user')
}