import { useEffect, useState } from "react";

import Layout from "../components/layout";
import {  getApplications,
        createApplication,
        deleteApplication, } from "../api/application";

import "../styles/dashboard.css";

function Applications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        plan: "free",
    });
    
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        loadApplications();
    }, []);

    async function loadApplications() {
        try {
            const response = await getApplications();
            setApplications(response.data);
        } catch (err) {
            console.error("Failed to load applications:", err);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    
    async function handleSubmit(e) {
    
        e.preventDefault();
    
        setCreating(true);
    
        try {
    
            await createApplication(formData);
    
            setFormData({
                name: "",
                plan: "free",
            });
    
            await loadApplications();
    
        } catch (err) {
    
            console.error(err);
    
        } finally {
    
            setCreating(false);
    
        }
    }

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Delete this application?"
        );
    
        if (!confirmed) return;
    
        try {
    
            await deleteApplication(id);
    
            await loadApplications();
    
        } catch (err) {
    
            console.error(err);
    
        }
    
    }

    return (
        <Layout>

            <h1 className="page-title">Applications</h1>


            <form
                className="application-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Application Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                >
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                </select>

                <button
                    type="submit"
                    disabled={creating}
                >
                    {creating ? "Creating..." : "Create Application"}
                </button>

            </form>

            {loading ? (
                <p>Loading...</p>
            ) : applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <div className="applications-grid">

                    {applications.map((app) => (
                        <div
                            key={app.id}
                            className="application-card"
                        >
                            <h3>{app.name}</h3>

                            <p>
                                <strong>Plan:</strong> {app.plan}
                            </p>

                            <p>
                                <strong>Created:</strong>{" "}
                                {new Date(app.created_at).toLocaleDateString()}
                            </p>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(app.id)}
                            >
                                Delete
                            </button>

                        </div>
                    ))}

                </div>
            )}

        </Layout>
    );
}

export default Applications;