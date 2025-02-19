import { useState } from "react";
import "./AgricultureProjectForm.css";
import { authService } from "../../api-service/authService";

const AgricultureProjectForm = () => {
    const [formData, setFormData] = useState({
        crop_type: "",
        expected_yield: "",
        land_size: "",
        location: "",
        land_size_unit: "acres",
        expected_yield_unit: "kgs",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await authService.AgricultureProjectForm(
            formData.crop_type,
            formData.expected_yield,
            formData.land_size,
            formData.location,
            formData.land_size_unit,
            formData.expected_yield_unit
        );

        setMessage(result.message || "Agriculture Project Created Successfully!");
        setLoading(false);

        setTimeout(() => {
            setMessage("");
            setLoading(false);
        }, 5000);
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Create Agriculture Project</h2>
                {message && <div className="alert">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Crop Type</label>
                    <input
                        type="text"
                        name="crop_type"
                        value={formData.crop_type}
                        onChange={handleChange}
                        placeholder="Enter crop type (e.g., Coffee)"
                        required
                    />

                    <div className="form-row">
                        <div>
                            <label>Expected Yield</label>
                            <input
                                type="number"
                                name="expected_yield"
                                value={formData.expected_yield}
                                onChange={handleChange}
                                placeholder="Enter yield"
                                required
                            />
                        </div>
                        <div>
                            <label>Yield Unit</label>
                            <select
                                name="expected_yield_unit"
                                value={formData.expected_yield_unit}
                                onChange={handleChange}
                            >
                                <option value="kgs">Kgs</option>
                                <option value="tons">Tons</option>
                                <option value="bags">Bags</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div>
                            <label>Land Size</label>
                            <input
                                type="number"
                                name="land_size"
                                value={formData.land_size}
                                onChange={handleChange}
                                placeholder="Enter land size"
                                required
                            />
                        </div>
                        <div>
                            <label>Land Size Unit</label>
                            <select
                                name="land_size_unit"
                                value={formData.land_size_unit}
                                onChange={handleChange}
                            >
                                <option value="acres">Acres</option>
                                <option value="hectares">Hectares</option>
                                <option value="square meters">Square Meters</option>
                            </select>
                        </div>
                    </div>

                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter location (e.g., Thika, Kenya)"
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Create Project"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AgricultureProjectForm;