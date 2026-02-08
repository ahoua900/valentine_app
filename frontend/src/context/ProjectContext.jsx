import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProjectContext = createContext();

const initialState = {
  projects: JSON.parse(localStorage.getItem('lovepage_projects') || '[]'),
  currentProject: null,
};

function projectReducer(state, action) {
  switch (action.type) {
    case 'CREATE_PROJECT': {
      const newProject = {
        id: uuidv4(),
        templateId: action.payload.templateId,
        photos: {},
        texts: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        published: false,
        shareLink: null,
      };
      const updated = [...state.projects, newProject];
      localStorage.setItem('lovepage_projects', JSON.stringify(updated));
      return { ...state, projects: updated, currentProject: newProject };
    }

    case 'UPDATE_PHOTO': {
      const { projectId, slotId, photoData } = action.payload;
      const projects = state.projects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            photos: { ...p.photos, [slotId]: photoData },
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      localStorage.setItem('lovepage_projects', JSON.stringify(projects));
      const current = projects.find(p => p.id === projectId) || state.currentProject;
      return { ...state, projects, currentProject: current };
    }

    case 'UPDATE_TEXT': {
      const { projectId, slotId, text } = action.payload;
      const projects = state.projects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            texts: { ...p.texts, [slotId]: text },
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      localStorage.setItem('lovepage_projects', JSON.stringify(projects));
      const current = projects.find(p => p.id === projectId) || state.currentProject;
      return { ...state, projects, currentProject: current };
    }

    case 'PUBLISH_PROJECT': {
      const { projectId } = action.payload;
      const shareLink = `${window.location.origin}/love/${projectId}`;
      const projects = state.projects.map(p => {
        if (p.id === projectId) {
          return { ...p, published: true, shareLink, updatedAt: new Date().toISOString() };
        }
        return p;
      });
      localStorage.setItem('lovepage_projects', JSON.stringify(projects));
      const current = projects.find(p => p.id === projectId) || state.currentProject;
      return { ...state, projects, currentProject: current };
    }

    case 'LOAD_PROJECT': {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      return { ...state, currentProject: project || null };
    }

    case 'DELETE_PROJECT': {
      const projects = state.projects.filter(p => p.id !== action.payload.projectId);
      localStorage.setItem('lovepage_projects', JSON.stringify(projects));
      return { ...state, projects, currentProject: null };
    }

    default:
      return state;
  }
}

export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
