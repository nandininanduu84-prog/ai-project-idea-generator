import React, { useEffect, useState } from 'react';
import { projectService } from '../services/services';
import { toast } from 'react-toastify';
import { FaSpinner, FaTrash, FaEye, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SavedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    try {
      const isFavorite = filter === 'favorites' ? 'true' : undefined;
      const response = await projectService.getSavedProjects({ isFavorite });
      setProjects(response.data.savedProjects);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to remove this project?')) {
      try {
        await projectService.deleteProject(projectId);
        setProjects(projects.filter((p) => p.projectId._id !== projectId));
        toast.success('Project removed');
      } catch (error) {
        toast.error('Failed to remove project');
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Saved Projects</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`btn ${filter === 'favorites' ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`}
          >
            <FaHeart /> Favorites
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((saved) => {
          const project = saved.projectId;
          return (
            <div key={saved._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold flex-1">{project.title}</h3>
                {saved.isFavorite && <FaHeart className="text-red-500" />}
              </div>
              <p className="text-gray-600 text-sm mb-4">{project.tagline}</p>
              {saved.notes && (
                <p className="text-sm bg-yellow-50 p-2 rounded mb-4 text-gray-700">
                  {saved.notes}
                </p>
              )}
              <div className="flex gap-2">
                <Link
                  to={`/project/${project._id}`}
                  className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <FaEye /> View
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="btn btn-outline"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No saved projects yet</p>
        </div>
      )}
    </div>
  );
}

export default SavedProjects;
