import { create } from 'zustand';

const useProjectStore = create((set) => ({
  projects: [],
  savedProjects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  setProjects: (projects) => set({ projects }),
  setSavedProjects: (savedProjects) => set({ savedProjects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addProject: (project) => set((state) => ({
    projects: [...state.projects, project],
  })),
  removeProject: (projectId) => set((state) => ({
    projects: state.projects.filter((p) => p._id !== projectId),
  })),
}));

export default useProjectStore;
