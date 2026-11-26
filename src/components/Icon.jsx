// Small inline SVGs keep the interface within the permitted library list.
export default function Icon({ name }) {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    pizza: <><path d="m3 21 6-18c6 1 10 5 12 11Z"/><path d="M8 6c5 1 8 4 10 8"/><circle cx="9" cy="13" r="1"/><circle cx="13" cy="16" r="1"/></>,
    price: <><path d="M12 2v20M17 6H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H6"/></>,
    size: <><circle cx="12" cy="12" r="9"/><path d="m6 18 12-12M13 6h5v5M6 13v5h5"/></>,
    search: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.pizza}</svg>;
}
