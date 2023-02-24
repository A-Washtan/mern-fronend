import { useWoroutContext } from '../hooks/useWoroutContext'
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutsDetails = ({ workout }) => {
    const { dispatch } = useWoroutContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>الوزن(kg): </strong>{workout.load}</p>
            <p><strong>عدد التكرار: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutsDetails