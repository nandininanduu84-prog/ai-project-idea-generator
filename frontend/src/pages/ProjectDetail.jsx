import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectService, aiService } from '../services/services';
import { toast } from 'react-toastify';
import { FaSpinner, FaDownload, FaWand2, FaComments } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedRefine, setSelectedRefine] = useState('');
  const [refining, setRefining] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await projectService.getProjectById(id);
      setProject(response.data.project);
    } catch (error) {
      toast.error('Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!project) return;
    const element = document.getElementById('project-content');
    const opt = {
      margin: 10,
      filename: `${project.title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatLoading(true);
    try {
      const response = await aiService.chatAboutProject({
        projectId: id,
        message: chatMessage,
      });
      setChatResponse(response.data.response);
      setChatMessage('');
    } catch (error) {
      toast.error('Failed to get response');
    } finally {
      setChatLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!selectedRefine) return;

    setRefining(true);
    try {
      const response = await aiService.refineProject({
        projectId: id,
        refinementType: selectedRefine,
      });
      setProject(response.data.project);
      setSelectedRefine('');
      toast.success('Project refined successfully!');
    } catch (error) {
      toast.error('Failed to refine project');
    } finally {
      setRefining(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-12 text-center">
        <p className="text-gray-600">Project not found</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div id="project-content" className="card mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-xl text-gray-600">{project.tagline}</p>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="btn btn-primary flex items-center gap-2"
          >
            <FaDownload /> Download PDF
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Difficulty</p>
            <p className="font-bold">{project.difficultyLevel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-bold">{project.estimatedDuration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Team Size</p>
            <p className="font-bold">{project.teamSize} members</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Type</p>
            <p className="font-bold">{project.projectType}</p>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
            <p className="text-gray-700">{project.problemStatement}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              {project.keyFeatures.map((feature, idx) => (
                <li key={idx} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {project.aiFeatures?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">AI Components</h2>
              <ul className="list-disc list-inside space-y-2">
                {project.aiFeatures.map((feature, idx) => (
                  <li key={idx} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-primary">Frontend</p>
                <p className="text-gray-700">{project.techStack?.frontend?.join(', ')}</p>
              </div>
              <div>
                <p className="font-bold text-primary">Backend</p>
                <p className="text-gray-700">{project.techStack?.backend?.join(', ')}</p>
              </div>
              <div>
                <p className="font-bold text-primary">Database</p>
                <p className="text-gray-700">{project.techStack?.database?.join(', ')}</p>
              </div>
              <div>
                <p className="font-bold text-primary">APIs</p>
                <p className="text-gray-700">{project.techStack?.apis?.join(', ')}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Refinement Section */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaWand2 /> Refine Project
        </h2>
        <div className="flex gap-4">
          <select
            value={selectedRefine}
            onChange={(e) => setSelectedRefine(e.target.value)}
            className="input flex-1"
          >
            <option value="">Select refinement type...</option>
            <option value="easier">Make it Easier</option>
            <option value="advanced">Make it Advanced</option>
            <option value="addAI">Add More AI Features</option>
            <option value="addFeatures">Add More Features</option>
            <option value="reduceDuration">Reduce Duration</option>
          </select>
          <button
            onClick={handleRefine}
            disabled={!selectedRefine || refining}
            className="btn btn-primary"
          >
            {refining ? 'Refining...' : 'Refine'}
          </button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaComments /> Ask AI About This Project
        </h2>
        <form onSubmit={handleChat} className="mb-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask anything about this project..."
              className="input flex-1"
            />
            <button
              type="submit"
              disabled={chatLoading}
              className="btn btn-primary"
            >
              {chatLoading ? 'Loading...' : 'Send'}
            </button>
          </div>
        </form>
        {chatResponse && (
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
            <p className="text-gray-700">{chatResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
