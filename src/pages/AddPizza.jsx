import { useLocation } from 'wouter';
import PizzaForm from '../components/PizzaForm';
export default function AddPizza({ onSave }) {
  const [, navigate] = useLocation();
  function handleSave(details) { onSave(details); navigate('/pizzas'); }
  return <div className="form-page"><p className="eyebrow">GROW YOUR MENU</p><h1>Add a pizza</h1><p className="text-secondary mb-4">Enter the details below. Fields marked * are required.</p><PizzaForm onSave={handleSave} /></div>;
}
