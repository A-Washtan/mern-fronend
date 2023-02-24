import { useState } from "react"
import { useWoroutContext } from '../hooks/useWoroutContext'
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
    const { dispatch } = useWoroutContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('يرجى تسجيل الدخول')
            return
        }
        const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_WORKOUT', payload: json })

        }
    }
    return (
        <form className="create" onSubmit={handelSubmit}>
            <h3>أضف تمرين جديد</h3>

            <label>عنوان التدريب</label>
            <input type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>الاوزان(Kg) </label>
            <input type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>عدد التمرين</label>
            <input type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>اضف تمرين</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm