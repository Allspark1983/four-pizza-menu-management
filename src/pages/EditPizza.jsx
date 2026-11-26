import { Link, useLocation } from 'wouter';
import PizzaForm from '../components/PizzaForm';
export default function EditPizza({ id, pizzas, onSave }) {
  const [, navigate] = useLocation();
  const pizza = pizzas.find(p => p.id === id);
  if (!pizza) return <><h1>Pizza not found</h1><p>This item may have been deleted or reset after a refresh.</p><Link href="/pizzas">Return to menu</Link></>;
  function handleSave(details) { onSave(id, details); navigate('/pizzas'); }
  return <div className="form-page"><p className="eyebrow">REFINE YOUR MENU</p><h1>Edit pizza</h1><p className="text-secondary mb-4">Update {pizza.name}. Fields marked * are required.</p><PizzaForm key={pizza.id} initialPizza={pizza} onSave={handleSave} /></div>;
}
