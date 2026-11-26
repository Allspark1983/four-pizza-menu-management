import { Link } from 'wouter';
// LO4: Read the same parent-owned array used by the menu.
export default function Dashboard({ pizzas }) {
  const average = pizzas.length ? pizzas.reduce((sum, p) => sum + p.price, 0) / pizzas.length : 0;
  return <><section className="hero panel mb-4"><div><p className="eyebrow">THE STAFF WORKSPACE</p><h1>A fresh look at<br />your menu.</h1><p>Keep every pizza, size and price in good order.</p><Link href="/pizzas" className="btn btn-primary">Manage the menu →</Link></div><div className="hero-seal" aria-hidden="true">FOUR<br /><b>4</b><br />PIZZA</div></section>
    <div className="row g-3 mb-4">{[['Pizzas on the menu', pizzas.length], ['Sizes represented', new Set(pizzas.map(p => p.size)).size], ['Average menu price', `S$${average.toFixed(2)}`]].map(([label, value]) => <div className="col-md-4" key={label}><section className="panel p-4"><p className="text-secondary mb-2">{label}</p><strong className="stat">{value}</strong></section></div>)}</div>
    <section className="panel p-4"><h2 className="h4">One place for every menu update</h2><p className="text-secondary">Add a new favourite, adjust a price, or retire a pizza. Your changes appear across the workspace immediately.</p><Link href="/add-pizza" className="btn btn-outline-dark">Create a menu item</Link><p className="small text-secondary mt-3 mb-0">Sample menu and prices for assessment. This frontend demonstration keeps changes in memory until the page is refreshed.</p></section>
  </>;
}
