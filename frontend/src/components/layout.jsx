import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <div className="layout">

            <Navbar />

            <div className="layout-body">

                <Sidebar />

                <main className="page-content">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;