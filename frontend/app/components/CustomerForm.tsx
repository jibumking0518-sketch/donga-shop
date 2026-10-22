"use client";

import { useState } from "react";

type Customer = {
  name: string;
  email: string;
  product: string;
};

export default function CustomerForm({ products }: { products: string[] }) {
  const [form, setForm] = useState<Customer>({
    name: "",
    email: "",
    product: products[0] ?? "",
  });
  const [submitted, setSubmitted] = useState<Customer | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(form);
  }

  return (
    <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-zinc-900">고객 등록</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-zinc-900">
        <label className="flex flex-col gap-1">
          이름
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="rounded border border-zinc-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          이메일
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="rounded border border-zinc-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          관심 상품
          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            className="rounded border border-zinc-300 px-3 py-2"
          >
            {products.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="mt-2 rounded bg-blue-900 py-2 font-semibold text-white hover:bg-blue-800"
        >
          등록하기
        </button>
      </form>

      {submitted && (
        <div className="mt-6 rounded bg-zinc-100 p-4 text-zinc-800">
          <p className="mb-2 font-semibold">등록된 정보</p>
          <p>이름: {submitted.name}</p>
          <p>이메일: {submitted.email}</p>
          <p>관심 상품: {submitted.product}</p>
        </div>
      )}
    </section>
  );
}
