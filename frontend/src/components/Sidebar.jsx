import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <NavLink to="/">
                Dashboard
            </NavLink>

            <NavLink to="/applications">
                Applications
            </NavLink>

            <NavLink to="/apikeys">
                API Keys
            </NavLink>

            <NavLink to="/metrics">
                Metrics
            </NavLink>

        </aside>
    );
}

export default Sidebar;