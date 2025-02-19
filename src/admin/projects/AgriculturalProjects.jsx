import { useEffect, useState } from "react";
import { adminService } from "../../api-service/adminAuth";

const AgricultureProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await adminService.allAllocatedProducts();

      if (result.success) {
        setProjects(result.response || []);
      } else {
        setError(result.error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    return project.crop_type.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleStatusChange = async (id, status) => {
    const result = await adminService.updateProducts(id, status);

    if (result.success) {
      const updatedProjects = await adminService.allAllocatedProducts();
      if (updatedProjects.success) {
        setProjects(updatedProjects.response || []);
      } else {
        setError(updatedProjects.error);
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="agriculture-projects-container">
      <h2 className="agriculture-projects-title">Your Agriculture Projects</h2>
      <div className="agriculture-projects-search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
      </div>
      {error && <p className="agriculture-projects-error">{error}</p>}
      {filteredProjects.length === 0 ? (
        <p className="agriculture-projects-empty">No projects found.</p>
      ) : (
          <>
            <div className="agriculture-projects-list">
              {filteredProjects.map((project, index) => (
                  <div key={index} className="agriculture-project-card">
                    <h3 className="agriculture-project-card-title">{project.crop_type}</h3>
                    <p className="agriculture-project-card-info"><strong>Location:</strong> {project.location}</p>
                    <p className="agriculture-project-card-info"><strong>Land
                      Size:</strong> {project.land_size} {project.land_size_unit}</p>
                    <p className="agriculture-project-card-info"><strong>Expected
                      Yield:</strong> {project.expected_yield} {project.expected_yield_unit}</p>
                    <div className="agriculture-project-card-info">
                      <strong>Project Status:</strong>
                      <select
                          defaultValue={project.status}
                          onChange={(e) => handleStatusChange(project.id, e.target.value)}
                      >
                        {["approved", "pending", "rejected"].map((status, idx) => (
                            <option key={idx} value={status}>
                              {status}
                            </option>
                        ))}
                      </select>
                    </div>

                    <div className="agriculture-projects-inputs">
                      <h4>Create new input</h4>
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const data = {
                          project_id: e.target.elements.project_id.value,
                          input_id: e.target.elements.input_id.value,
                          quantity: e.target.elements.quantity.value,
                        };

                        const result = await adminService.createInput(data);

                        if (result.success) {
                          const updatedProjects = await adminService.allAllocatedProducts();
                          if (updatedProjects.success) {
                            setProjects(updatedProjects.response || []);
                          } else {
                            setError(updatedProjects.error);
                          }
                        } else {
                          setError(result.error);
                        }
                      }}>
                        <label>
                          Project ID:
                          <input type="text" name="project_id"/>
                        </label>
                        <br/>
                        <label>
                          Input ID:
                          <input type="number" name="input_id"/>
                        </label>
                        <br/>
                        <label>
                          Quantity:
                          <input type="number" name="quantity"/>
                        </label>
                        <br/>
                        <button type="submit">Allocate</button>
                      </form>
                    </div>
                  </div>
              ))}
            </div>


          </>


      )}

    </div>
  );
};

export default AgricultureProjects;