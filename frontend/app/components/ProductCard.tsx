type ProductCardProps = {
  name: string;
  price: number;
  color: string;
};

export default function ProductCard({ name, price, color }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="h-40 w-full" style={{ backgroundColor: color }} />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-zinc-900">{name}</h2>
        <p className="mt-1 text-zinc-600">{price.toLocaleString("ko-KR")}원</p>
      </div>
    </div>
  );
}
