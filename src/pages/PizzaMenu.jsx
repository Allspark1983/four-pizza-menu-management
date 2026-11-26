import { useState } from 'react';
import { Link } from 'wouter';
import PizzaCard from '../components/PizzaCard';
export default function PizzaMenu({ pizzas, onDelete }) {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState('all');
  const [pending, setPending] = useState(null);
  const visible = pizzas.filter(p => p.name.toLowerCase().includes(search.trim().toLowerCase()) && (size === 'all' || p.size === Number(size)));
  return <><div className="page-heading"><div><p className="eyebrow">YOUR COLLECTION</p><h1>Pizza menu</h1><p className="text-secondary">{pizzas.length} menu items. Made to be managed simply.</p></div><Link href="/add-pizza" className="btn btn-primary">+ Add pizza</Link></div>
    <div className="panel menu-filter p-3 mb-4 row g-3 mx-0"><div className="col-md-8"><label htmlFor="search" className="form-label">Search by name</label><input id="search" className="form-control" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a pizza…" /></div><div className="col-md-4"><label htmlFor="filter-size" className="form-label">Size</label><select id="filter-size" className="form-select" value={size} onChange={e => setSize(e.target.value)}><option value="all">All sizes</option>{[8,10,14].map(s => <option key={s} value={s}>{s} inches</option>)}</select></div></div>
    {pending && <section className="alert alert-warning" aria-label="Confirm deletion"><p>Delete <strong>{pending.name}</strong> ({pending.size} inches) from the menu?</p><button className="btn btn-danger me-2" onClick={() => { onDelete(pending.id); setPending(null); }}>Confirm delete</button><button className="btn btn-outline-dark" onClick={() => setPending(null)}>Keep pizza</button></section>}
    {/* LO3/LO4: Transform shared records into components with stable unique keys. */}
    {visible.length ? <div className="row g-4">{visible.map(pizza => <div className="col-md-6 col-lg-4" key={pizza.id}><PizzaCard pizza={pizza} onRequestDelete={setPending} /></div>)}</div> : <div className="panel p-5 text-center"><h2 className="h4">{pizzas.length ? 'No matching pizzas' : 'Your menu is empty'}</h2><p>{pizzas.length ? 'Try another search or size.' : 'Add your first pizza to get started.'}</p><Link href="/add-pizza">Add a pizza</Link></div>}
  </>;
}
