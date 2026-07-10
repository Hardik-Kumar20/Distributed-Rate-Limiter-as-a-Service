import { useEffect, useState } from "react";

import Layout from "../components/layout";

import { getApplications } from "../api/application";

import "../styles/dashboard.css";

function Apikeys() {

    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    async function loadApplications() {
        try {

            const response = await getApplications();

            setApplications(response.data);

            if (response.data.length > 0) {
                setSelectedApplication(response.data[0].id);
            }

        } catch (err) {

            console.error("Failed to load applications:", err);

        }
    }

    return (
        <Layout>

            <h1 className="page-title">
                API Keys
            </h1>

            <div className="application-form">

                <select
                    value={selectedApplication}
                    onChange={(e) =>
                        setSelectedApplication(e.target.value)
                    }
                >

                    {applications.map((app) => (
                        <option
                            key={app.id}
                            value={app.id}
                        >
                            {app.name}
                        </option>
                    ))}

                </select>

            </div>

        </Layout>
    );
}

export default Apikeys;