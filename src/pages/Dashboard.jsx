import { Link } from 'wouter';
import Icon from '../components/Icon';
// LO4: Read the same parent-owned array used by the menu.
export default function Dashboard({ pizzas }) {
  const average = pizzas.length ? pizzas.reduce((sum, p) => sum + p.price, 0) / pizzas.length : 0;
  const stats = [
    ['Pizzas on the menu', pizzas.length, 'Ready for your next update', 'pizza'],
    ['Sizes represented', new Set(pizzas.map(p => p.size)).size, '8, 10 and 14 inch options', 'size'],
    ['Average menu price', `S$${average.toFixed(2)}`, 'Across all menu records', 'price'],
    ['Starting price', pizzas.length ? `S$${Math.min(...pizzas.map(p=>p.price)).toFixed(2)}` : '—', 'Lowest listed price', 'dashboard'],
  ];
  return <>
    <section className="page-heading"><div><span className="eyebrow">A GOOD DAY STARTS HERE</span><h1>A fresh look at your menu.</h1><p>Keep your pizzas, sizes and prices in good order.</p></div><Link className="button button-primary" href="/add-pizza"><Icon name="plus"/>Add a pizza</Link></section>
    <div className="stats-grid">{stats.map(([label,value,note,icon])=><section className="stat-card" key={label}><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon name={icon}/></span></div><strong className="stat">{value}</strong><p>{note}</p></section>)}</div>
    <div className="dashboard-grid"><section className="panel"><div className="panel-heading"><div><h2>Latest on the menu</h2><p>Your most recently added pizzas.</p></div><Link className="text-link" href="/pizzas">View menu</Link></div>
    {pizzas.length ? <div className="recent-list">{[...pizzas].reverse().slice(0,4).map(pizza=><Link key={pizza.id} className="recent-item" href={`/edit-pizza/${pizza.id}`}><span className="pizza-tile"><Icon name="pizza"/></span><span className="recent-copy"><strong>{pizza.name}</strong><small>{pizza.size} inches · S${pizza.price.toFixed(2)}</small></span><span className="recent-action">Edit →</span></Link>)}</div>:<div className="empty-state"><h3>Your menu starts here</h3><p>Add your first pizza to begin.</p><Link href="/add-pizza" className="button button-primary">Add a pizza</Link></div>}</section>
    <section className="feature-panel"><span className="feature-kicker">THE RIGHT SIZE FOR EVERY TABLE</span><h2>Little cravings.<br/>Big gatherings.</h2><p>A pizza for every appetite. Keep your sizes and prices ready for the next order.</p><div className="size-illustration" aria-label="8 inch, 10 inch and 14 inch pizzas"><div className="size-circle small">8<span>inch</span></div><div className="size-circle medium">10<span>inch</span></div><div className="size-circle large">14<span>inch</span></div></div><Link className="button button-light" href="/pizzas">Manage your menu</Link></section></div>
    <section className="quick-links" aria-label="Quick actions"><Link href="/pizzas"><span className="quick-icon"><Icon name="search"/></span><span><strong>Find a favourite</strong><small>Search by name and size.</small></span></Link><Link href="/add-pizza"><span className="quick-icon"><Icon name="plus"/></span><span><strong>Something new on the menu?</strong><small>Create your next menu item.</small></span></Link></section>
    <section className="size-breakdown" aria-label="Menu by size">{[8,10,14].map(size=><article key={size}><div className="size-panel-title"><strong>{size}<small> inches</small></strong><span className="subtle-badge">{({8:4,10:6,14:8})[size]} slices</span></div><p>{pizzas.filter(p=>p.size===size).length} menu records</p></article>)}</section>
  </>;
}
