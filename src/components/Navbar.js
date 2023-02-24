import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>التمرينات البدنية</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>تسجيل خروج</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">تسجيل دخول</Link>
                            <Link to="/signup">تسجيل </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;