import { useAuthContext } from "./useAuthContext"
import { useWoroutContext } from './useWoroutContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: woroutdispatch } = useWoroutContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
        woroutdispatch({ type: 'SET_WORKOUT', payload: null })
    }

    return { logout }
}