const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

export const updateUser = (user) => ({
    type: 'UPDATE_USER',
    payload: {
        user: user
    }
})

export const loginSuccess = (user, token) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        user: user,
        token: token,
    }
})

export const registerSuccess = (user, token) => ({
    type: 'REGISTER_SUCCESS',
    payload: {
        user: user,
        token: token,
    }
})

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: {
        error: error
    }
})

export const authError = (error) => ({
    type: 'AUTH_ERROR',
    payload: {
        error: error
    }
})

export const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS',
})

export const authenticateUser = (user, token) => ({
    type: 'AUTHENTICATE_USER',
    payload: {
        user: user,
        token: token,
    }
})

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'AUTHENTICATE_USER':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                error: null,
                isLoading: false
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                error: null,
                isLoading: false
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAILURE':
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                error: action.payload.error,
                isLoading: false
            };
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                error: null,
                isLoading: false
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: {...state.user, ...action.payload.user}
            }

        default:
            return state;
    }
}

export default authReducer;