import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Editor from './pages/Editor';
import Preview from './pages/Preview';
import Order from './pages/Order';
import './App.css';

function App() {
  return (
    <ProjectProvider>
      <div className="app">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-inner">
            <Link to="/" className="navbar-logo">
              <span>💕</span> LovePage
            </Link>
            <div className="navbar-links">
              <NavLink to="/" end>Accueil</NavLink>
              <NavLink to="/templates">Templates</NavLink>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/editor/:templateId" element={<Editor />} />
            <Route path="/preview/:projectId" element={<Preview />} />
            <Route path="/love/:projectId" element={<Preview />} />
            <Route path="/order/:projectId" element={<Order />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>
            Fait avec <span className="footer-heart">&#10084;</span> pour la Saint-Valentin 2026
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
            LovePage - Créez et partagez votre amour
          </p>
        </footer>
      </div>
    </ProjectProvider>
  );
}

export default App;
