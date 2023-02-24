import { useEffect } from 'react'
import { useWoroutContext } from '../hooks/useWoroutContext'
import { useAuthContext } from '../hooks/useAuthContext'



import WorkoutsDetails from '../components/WorkoutsDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWoroutContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_WORKOUT", payload: json })
            }
        }
        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutsDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;