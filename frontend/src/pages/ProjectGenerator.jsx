import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { projectService } from '../services/services';
import { FaSpinner } from 'react-icons/fa';

const skills = [
  'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Django',
  'MongoDB', 'SQL', 'Machine Learning', 'Deep Learning', 'Web Development',
  'Mobile Development', 'Cloud Computing', 'DevOps', 'Data Science'
];

const interests = [
  'Web Development', 'Mobile Apps', 'AI/ML', 'Healthcare', 'E-commerce',
  'Social Media', 'Gaming', 'Education', 'Finance', 'IoT', 'Blockchain',
  'Cybersecurity', 'Data Visualization', 'Productivity Tools', 'Entertainment'
];

function ProjectGenerator() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    branch: '',
    year: '',
    skills: [],
    interests: [],
    projectType: 'web',
    difficulty: 'intermediate',
    teamSize: 2,
    duration: '2 months',
    preferredTechs: [],
    numberOfIdeas: 3,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await projectService.generateProjects(formData);
      toast.success('Projects generated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Generate Project Ideas</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl card">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div>
            <label className="label">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Branch</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics</option>
              <option value="EEE">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="AI/ML">AI/ML</option>
            </select>
          </div>

          <div>
            <label className="label">Year of Study</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div>
            <label className="label">Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="input"
            >
              <option value="web">Web Application</option>
              <option value="mobile">Mobile App</option>
              <option value="desktop">Desktop Application</option>
              <option value="aiml">AI/ML Project</option>
              <option value="iot">IoT Project</option>
            </select>
          </div>

          <div>
            <label className="label">Difficulty Level</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="input"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="label">Team Size</label>
            <input
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className="input"
              min="1"
              max="10"
            />
          </div>

          <div>
            <label className="label">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="input"
            >
              <option value="2 weeks">2 weeks</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
            </select>
          </div>
        </div>

        {/* Skills Selection */}
        <div className="mt-6">
          <label className="label">Select Your Skills (at least 2)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleMultiSelect('skills', skill)}
                className={`p-2 rounded-lg text-sm font-medium transition ${
                  formData.skills.includes(skill)
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Interests Selection */}
        <div className="mt-6">
          <label className="label">Select Your Interests (at least 2)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleMultiSelect('interests', interest)}
                className={`p-2 rounded-lg text-sm font-medium transition ${
                  formData.interests.includes(interest)
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Ideas */}
        <div className="mt-6">
          <label className="label">Number of Ideas to Generate</label>
          <select
            name="numberOfIdeas"
            value={formData.numberOfIdeas}
            onChange={handleChange}
            className="input"
          >
            <option value="1">1 Idea</option>
            <option value="3">3 Ideas</option>
            <option value="5">5 Ideas</option>
            <option value="10">10 Ideas</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-8 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Generating...
            </>
          ) : (
            'Generate Project Ideas'
          )}
        </button>
      </form>
    </div>
  );
}

export default ProjectGenerator;
