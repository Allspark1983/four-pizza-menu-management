import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'wouter';
import Dashboard from './pages/Dashboard';
import PizzaMenu from './pages/PizzaMenu';
import AddPizza from './pages/AddPizza';
import EditPizza from './pages/EditPizza';

export default function App() {
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
    <header className="app-header"><div className="container header-inner">
      <Link href="/" className="brand"><span className="brand-mark" aria-hidden="true">4</span><span>FOUR PIZZA<small>MENU MANAGEMENT</small></span></Link>
      <nav aria-label="Main navigation" className="d-flex flex-wrap gap-2">
        <Link href="/" className="nav-link">Dashboard</Link>
        <Link href="/pizzas" className="nav-link">Pizza menu</Link>
        <Link href="/add-pizza" className="btn btn-primary">+ Add pizza</Link>
      </nav>
    </div></header>
    <main className="container py-4 py-md-5">
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
    <footer className="container pb-4 footer-note">Four Pizza · Staff menu workspace <span>Assessment edition · Changes reset on refresh</span></footer>
  </>;
}
