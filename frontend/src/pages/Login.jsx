import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login as loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            const response = await loginApi(formData);

            login(response.data.token);

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.error ||
                "Login failed."
            );

        }

    }

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Distributed Rate Limiter</h1>

                <p>Login to your dashboard</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <p>{error}</p>
                    )}

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );

}

export default Login;