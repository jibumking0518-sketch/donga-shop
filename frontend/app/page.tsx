import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CustomerForm from "./components/CustomerForm";

const products = [
  { name: "동아고 후드티", price: 35000, color: "#1e3a8a" },
  { name: "텀블러", price: 15000, color: "#0d9488" },
  { name: "에코백", price: 12000, color: "#d97706" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50">
      <Header />
      <main className="flex w-full max-w-4xl flex-col items-center gap-12 px-4 py-12">
        <section className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </section>
        <CustomerForm products={products.map((p) => p.name)} />
      </main>
    </div>
  );
}
