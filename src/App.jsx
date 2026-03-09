import { useState } from 'react';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import CVPreview from './components/CVPreview';
import './App.css';

const initialGeneral = { name: '', email: '', phone: '' };

function App() {
  // Lifted state — shared between editor forms and the live preview
  const [general, setGeneral] = useState(initialGeneral);
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>CV Builder</h1>
      </header>
      <div className="app-body">
        {/* ── Left: editor forms ── */}
        <aside className="editor-panel">
          <GeneralInfo data={general} onSave={setGeneral} />
          <Education entries={educationList} onChange={setEducationList} />
          <Experience entries={experienceList} onChange={setExperienceList} />
        </aside>

        {/* ── Right: live preview ── */}
        <main className="preview-panel">
          <CVPreview
            general={general}
            educationList={educationList}
            experienceList={experienceList}
          />
        </main>
      </div>
      <footer className="app-footer">
        Made with ❤️ by{' '}
        <a
          href="https://github.com/stevenstank"
          target="_blank"
          rel="noreferrer"
        >
          stevenstank
        </a>
      </footer>
    </div>
  );
}

export default App;
