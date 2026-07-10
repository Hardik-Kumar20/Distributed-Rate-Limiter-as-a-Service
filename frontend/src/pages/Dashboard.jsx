import { useEffect, useState } from "react";

import Layout from "../components/layout";
import MetricCard from "../components/MetricCard";
import { getMetrics } from "../api/metrics";
import { getApplications } from "../api/application";
import { getApiKeys } from "../api/apiKey";

import "../styles/dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState({
        totalRequests: 0,
        allowedRequests: 0,
        blockedRequests: 0,
        applications: 0,
        apiKeys: 0,
    });

    useEffect(() => {
        async function loadDashboard() {
            try {
        
                const [metricsResponse, applicationsResponse] = await Promise.all([
                    getMetrics(),
                    getApplications(),
                ]);
        
                const applications = applicationsResponse.data;
        
                let apiKeyCount = 0;
        
                for (const app of applications) {
        
                    const response = await getApiKeys(app.id);
        
                    apiKeyCount += response.data.length;
                }
        
                setStats({
                    totalRequests: metricsResponse.data.totalRequests,
                    allowedRequests: metricsResponse.data.allowedRequests,
                    blockedRequests: metricsResponse.data.blockedRequests,
                    applications: applications.length,
                    apiKeys: apiKeyCount,
                });
        
            } catch (err) {
        
                console.error(err);
        
            }
        }
        loadDashboard();
    }, []);



    return (
        <Layout>
            <h1 className="page-title">Dashboard</h1>

            <div className="metrics-grid">

            <MetricCard
                title="Total Requests"
                value={stats.totalRequests}
            />

            <MetricCard
                title="Allowed Requests"
                value={stats.allowedRequests}
            />

            <MetricCard
                title="Blocked Requests"
                value={stats.blockedRequests}
            />

            <MetricCard
                title="Applications"
                value={stats.applications}
            />

            <MetricCard
                title="API Keys"
                value={stats.apiKeys}
            />

            </div>

        </Layout>
    );
}

export default Dashboard;