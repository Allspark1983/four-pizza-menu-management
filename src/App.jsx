import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Switch, useLocation } from 'wouter';
import Icon from './components/Icon';
import Dashboard from './pages/Dashboard';
import PizzaMenu from './pages/PizzaMenu';
import AddPizza from './pages/AddPizza';
import EditPizza from './pages/EditPizza';

export default function App() {
  const [location] = useLocation();
  const pageTitle = location === '/' ? 'Overview' : location === '/pizzas' ? 'Pizza menu' : location === '/add-pizza' ? 'Add pizza' : location.startsWith('/edit-pizza/') ? 'Edit pizza' : 'Workspace';
  // LO4: Lift records into the common parent; all routes share this source of truth.
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [attempt, setAttempt] = useState(0);

  // LO2: Effect + Axios consume a JSON resource, with cleanup and error handling.
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    async function loadPizzas() {
      try {
        const { data } = await axios.get('/json/pizzas.json', { signal: controller.signal });
        if (!Array.isArray(data)) throw new Error('Invalid menu data');
        if (!controller.signal.aborted) setPizzas(data);
      } catch (err) {
        if (!controller.signal.aborted) setError('The menu could not be loaded. Please try again.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadPizzas();
    return () => controller.abort();
  }, [attempt]);

  // LO4: Immutable array operations; do not mutate existing state objects.
  function addPizza(details) {
    setPizzas(current => [...current, { ...details, id: crypto.randomUUID() }]);
    setNotice('Pizza added successfully.');
  }
  function updatePizza(id, details) {
    setPizzas(current => current.map(pizza => pizza.id === id ? { ...pizza, ...details, id } : pizza));
    setNotice('Pizza updated successfully.');
  }
  function deletePizza(id) {
    setPizzas(current => current.filter(pizza => pizza.id !== id));
    setNotice('Pizza deleted successfully.');
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <aside className="sidebar" aria-label="Workspace navigation">
      <Link href="/" className="brand"><span className="brand-mark" aria-hidden="true">4</span><span><span className="brand-name">four pizza<span className="brand-period">.</span></span><span className="brand-caption">MENU WORKSPACE</span></span></Link>
      <div className="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation" className="main-nav">
        {[['/', 'Dashboard', 'dashboard'], ['/pizzas', 'Pizza menu', 'pizza'], ['/add-pizza', 'Add pizza', 'plus']].map(([href, label, icon]) => <Link key={href} href={href} className={`nav-link ${location === href ? 'active' : ''}`} aria-current={location === href ? 'page' : undefined}><Icon name={icon} /><span>{label}</span></Link>)}
      </nav>
      <div className="sidebar-note"><span className="note-symbol" aria-hidden="true">✦</span><h2>Made for sharing.</h2><p>A little care behind every slice.</p></div>
      <div className="sidebar-footer"><span className="staff-avatar" aria-hidden="true">FP</span><span><strong>Four Pizza team</strong><small>Menu administration</small></span></div>
    </aside>
    <div className="workspace">
    <header className="topbar"><span className="topbar-title">Four Pizza <span>/</span> {pageTitle}</span><span className="demo-badge">Sample menu · SGD</span></header>
    <main id="main" className="main-content" tabIndex={-1}>
      {notice && <div className="alert alert-success d-flex justify-content-between align-items-center" role="status">{notice}<button type="button" className="btn-close" aria-label="Dismiss notification" onClick={() => setNotice('')} /></div>}
      {loading ? <div className="panel p-5" role="status">Loading your menu…</div> : error ? <div className="alert alert-danger" role="alert">{error}<button className="btn btn-outline-danger ms-3" onClick={() => setAttempt(a => a + 1)}>Retry</button></div> :
        // LO5: Four client-side routes. App remains mounted across route changes.
        <Switch>
          <Route path="/"><Dashboard pizzas={pizzas} /></Route>
          <Route path="/pizzas"><PizzaMenu pizzas={pizzas} onDelete={deletePizza} /></Route>
          <Route path="/add-pizza"><AddPizza onSave={addPizza} /></Route>
          <Route path="/edit-pizza/:id">{params => <EditPizza id={params.id} pizzas={pizzas} onSave={updatePizza} />}</Route>
          <Route><h1>Page not found</h1><Link href="/">Return to dashboard</Link></Route>
        </Switch>}
    </main>
    <footer className="workspace-footer"><span>Four Pizza menu workspace</span><span>Assessment edition · Changes reset on refresh</span></footer>
    </div>
  </>;
}
