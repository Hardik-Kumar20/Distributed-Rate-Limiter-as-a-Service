import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                RateLimiter
            </div>

            <button
                className="logout-btn"
                onClick={logout}
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar;