import React, { useEffect, useState } from 'react';
import { projectService } from '../services/services';
import useAuthStore from '../stores/authStore';
import { FaSpinner, FaTrash, FaEye, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Dashboard() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAllProjects();
      setProjects(response.data.projects);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter((p) => p._id !== id));
        toast.success('Project deleted');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user?.name}!</h1>
      <p className="text-gray-600 mb-8">You have {projects.length} projects</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="card">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold flex-1">{project.title}</h3>
              <span className={`badge ${project.difficultyLevel === 'Beginner' ? 'badge-success' : project.difficultyLevel === 'Intermediate' ? 'badge-warning' : 'badge-primary'}`}>
                {project.difficultyLevel}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{project.tagline}</p>
            <div className="flex gap-2">
              <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                <FaEye /> View
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="btn btn-outline"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No projects yet. Start generating ideas!</p>
          <a href="/generate" className="btn btn-primary">
            Generate Projects
          </a>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
