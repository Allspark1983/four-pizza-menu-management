import { useState } from 'react';
import { Link } from 'wouter';

// LO3: Reusable form receives initial values and a save callback through props.
export default function PizzaForm({ initialPizza, onSave }) {
  // LO2: Separate useState hooks and controlled form inputs.
  const [name, setName] = useState(initialPizza?.name ?? '');
  const [size, setSize] = useState(String(initialPizza?.size ?? '10'));
  const [price, setPrice] = useState(String(initialPizza?.price ?? ''));
  const [description, setDescription] = useState(initialPizza?.description ?? '');
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    const amount = Number(price);
    if (!name.trim()) next.name = 'Enter a pizza name.';
    if (!['8', '10', '14'].includes(size)) next.size = 'Select a valid size.';
    if (!price.trim() || !Number.isFinite(amount) || amount <= 0 || amount > 9999.99 || Math.abs(amount * 100 - Math.round(amount * 100)) > 0.000001) next.price = 'Enter a price from S$0.01 to S$9,999.99, with at most two decimal places.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSave({ name: name.trim(), size: Number(size), price: amount, description: description.trim() });
  }
  return <form onSubmit={handleSubmit} noValidate className="panel p-4">
    <div className="row g-4">
      <div className="col-12"><label htmlFor="pizza-name" className="form-label">Pizza name <span aria-hidden="true">*</span></label>
        <input id="pizza-name" className="form-control" value={name} maxLength={80} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} onChange={e => setName(e.target.value)} placeholder="e.g. Margherita" />
        {errors.name && <p id="name-error" className="text-danger mt-1" role="alert">{errors.name}</p>}</div>
      <div className="col-md-6"><label htmlFor="pizza-size" className="form-label">Size (inches) *</label>
        <select id="pizza-size" className="form-select" value={size} onChange={e => setSize(e.target.value)} aria-invalid={!!errors.size}><option value="8">8 inches · 4 slices</option><option value="10">10 inches · 6 slices</option><option value="14">14 inches · 8 slices</option></select>
        {errors.size && <p className="text-danger" role="alert">{errors.size}</p>}</div>
      <div className="col-md-6"><label htmlFor="pizza-price" className="form-label">Price (S$) *</label>
        <input id="pizza-price" type="number" className="form-control" min="0.01" max="9999.99" step="0.01" value={price} required aria-invalid={!!errors.price} aria-describedby={errors.price ? 'price-error' : undefined} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
        {errors.price && <p id="price-error" className="text-danger mt-1" role="alert">{errors.price}</p>}</div>
      <div className="col-12"><label htmlFor="pizza-description" className="form-label">Description</label><textarea id="pizza-description" className="form-control" rows="3" maxLength={300} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the ingredients and flavour." /></div>
      <div className="col-12"><div className="preview"><small>LIVE PREVIEW</small><strong>{name.trim() || 'Your pizza name'}</strong><span>{size} inches · {price && Number.isFinite(Number(price)) ? `S$${Number(price).toFixed(2)}` : 'Enter a price'}</span></div></div>
      <div className="col-12 d-flex gap-3"><button className="btn btn-primary" type="submit">{initialPizza ? 'Save changes' : 'Add pizza'}</button><Link href="/pizzas" className="btn btn-outline-secondary">Cancel</Link></div>
    </div>
  </form>;
}
