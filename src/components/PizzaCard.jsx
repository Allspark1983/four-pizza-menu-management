import { Link } from 'wouter';
// LO3: Data and behaviour arrive through props.
export default function PizzaCard({ pizza, onRequestDelete }) {
  return <article className="panel pizza-card h-100">
    <div className="pizza-art" aria-hidden="true"><span>✦</span><div className="pizza-disc" /></div>
    <div className="p-4"><div className="d-flex justify-content-between align-items-center gap-2 mb-3"><span className="size-tag">{pizza.size} INCHES</span><strong className="price">S${pizza.price.toFixed(2)}</strong></div>
      <h2 className="h4">{pizza.name}</h2><p className="text-secondary description">{pizza.description || 'No description provided.'}</p>
      <div className="d-flex gap-2"><Link href={`/edit-pizza/${pizza.id}`} className="btn btn-outline-dark flex-grow-1" aria-label={`Edit ${pizza.name}`}>Edit</Link><button className="btn btn-outline-danger" onClick={() => onRequestDelete(pizza)} aria-label={`Delete ${pizza.name}`}>Delete</button></div>
    </div>
  </article>;
}
