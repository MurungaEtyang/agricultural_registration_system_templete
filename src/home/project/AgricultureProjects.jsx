import { useEffect, useState } from "react";
import { authService } from "../../api-service/authService";

const AgricultureProjects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            const result = await authService.GetAgricultureProjectForm();

            if (result.success) {
                setProjects(result.response || []);
            } else {
                setError(result.error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="agriculture-projects-container">
            <h2 className="agriculture-projects-title">Your Agriculture Projects</h2>
            {error && <p className="agriculture-projects-error">{error}</p>}
            {projects.length === 0 ? (
                <p className="agriculture-projects-empty">No projects found.</p>
            ) : (
                <div className="agriculture-projects-list">
                    {projects.map((project, index) => (
                        <div key={index} className="agriculture-project-card">
                            <h2 className="agriculture-project-card-title">{project.project_name}</h2>
                            <p className="agriculture-project-card-info"><strong>Crop Type:</strong> {project.crop_type}
                            </p>
                            <p className="agriculture-project-card-info"><strong>Location:</strong> {project.location}</p>
                            <p className="agriculture-project-card-info"><strong>Land Size:</strong> {project.land_size} {project.land_size_unit}</p>
                            <p className="agriculture-project-card-info"><strong>Expected Yield:</strong> {project.expected_yield} {project.expected_yield_unit}</p>
                            <p className="agriculture-project-card-info"><strong>Project Status:</strong> {project.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AgricultureProjects;
