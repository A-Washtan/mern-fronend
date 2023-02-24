import { WorkoutContext } from "../context/WoroutContext";
import { useContext } from "react";

export const useWoroutContext = () => {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error('useWoroutContext must be used with inside an WorkoutContextProvider')
    }
    return context
}