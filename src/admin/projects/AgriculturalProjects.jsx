import { useEffect, useState } from "react";
import { adminService } from "../../api-service/adminAuth";

const AgricultureProjects = () => {
  const [projects, setProjects] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [selectedInputId, setSelectedInputId] = useState("");
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

    const fetchInventories = async () => {
      const result = await adminService.getinventoryDataInput();
      if (result.success) {
        setInventories(result.response || []);
      }
    };

    fetchProjects();
    fetchInventories();
  }, []);

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

  const handleAllocate = async (e, projectId) => {
    e.preventDefault();
    const quantity = e.target.quantity.value;

    const results = await adminService.allocations(projectId, selectedInputId, quantity);

    if (results.success) {
        alert(results.message)
    }
    console.log(projectId, selectedInputId, quantity);
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
      {projects.length === 0 ? (
        <p className="agriculture-projects-empty">No projects found.</p>
      ) : (
        <div className="agriculture-projects-list">
          {projects.map((project) => (
            <div key={project.id} className="agriculture-project-card">
              <h3 className="agriculture-project-card-title">{project.crop_type}</h3>
              <p className="agriculture-project-card-info">
                <strong>Location:</strong> {project.location}
              </p>
              <p className="agriculture-project-card-info">
                <strong>Land Size:</strong> {project.land_size} {project.land_size_unit}
              </p>
              <p className="agriculture-project-card-info">
                <strong>Expected Yield:</strong> {project.expected_yield} {project.expected_yield_unit}
              </p>
              <div className="agriculture-project-card-info">
                <strong>Project Status:</strong>
                <select
                  defaultValue={project.status}
                  onChange={(e) => handleStatusChange(project.id, e.target.value)}
                >
                  {["approved", "pending", "rejected"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {project.status === "approved" && (
                <div className="agriculture-projects-inputs">
                  <form onSubmit={(e) => handleAllocate(e, project.id)}>
                    <label>
                      Input ID:
                      <select onChange={(e) => setSelectedInputId(e.target.value)}>
                        <option value="">Select Input</option>
                        {inventories.map((inventory) => (
                          <option key={inventory.id} value={inventory.id}>
                            {inventory.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <br />
                    <label>
                      Quantity:
                      <input type="number" name="quantity" />
                    </label>
                    <br />
                    <button type="submit">Allocate</button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgricultureProjects;