'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InventoryItem } from '@/lib/types';
import { getItems, resetDemo, saveItems } from '@/lib/storage';
import { AlertTriangle, Package, Plus, RotateCcw, Trash2 } from 'lucide-react';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState<Partial<InventoryItem>>({});

  useEffect(() => {
    setItems(getItems());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveItems(items);
  }, [items, loaded]);

  const lowStock = useMemo(() => items.filter((i) => i.quantity <= i.minQuantity), [items]);
  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))),
    [items]
  );

  const addItem = () => {
    if (!form.name || !form.category) return;
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      quantity: Number(form.quantity) || 0,
      minQuantity: Number(form.minQuantity) || 0,
      supplier: form.supplier || '—',
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    setItems((prev) => [newItem, ...prev]);
    setForm({});
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (!loaded) return null;

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Inventory Tracker</h1>
            <p className="mt-2 text-slate-600">Manage medical supplies and low-stock alerts</p>
          </div>
          <Button variant="secondary" onClick={() => { resetDemo(); setItems(getItems()); }}>
            <RotateCcw size={16} className="mr-2" /> Reset demo
          </Button>
        </header>

        <section className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <p className="text-sm font-medium text-slate-500">Total items</p>
            <p className="mt-1 text-2xl font-bold">{items.length}</p>
          </Card>
          <Card>
            <p className="text-sm font-medium text-slate-500">Categories</p>
            <p className="mt-1 text-2xl font-bold">{categories.length}</p>
          </Card>
          <Card>
            <p className="text-sm font-medium text-slate-500">Low stock</p>
            <p className="mt-1 text-2xl font-bold text-danger">{lowStock.length}</p>
          </Card>
          <Card>
            <p className="text-sm font-medium text-slate-500">In stock</p>
            <p className="mt-1 text-2xl font-bold text-primary">{items.length - lowStock.length}</p>
          </Card>
        </section>

        <section className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
          <Input placeholder="Item name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Category" value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input type="number" placeholder="Quantity" value={form.quantity || ''} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
          <Input type="number" placeholder="Min quantity" value={form.minQuantity || ''} onChange={(e) => setForm({ ...form, minQuantity: Number(e.target.value) })} />
          <Input placeholder="Supplier" value={form.supplier || ''} onChange={(e) => setForm({ ...form, supplier: e.target.value })} />
          <div className="sm:col-span-2 lg:col-span-5">
            <Button onClick={addItem}>
              <Plus size={16} className="mr-2" /> Add item
            </Button>
          </div>
        </section>

        <section>
          <Card>
            <CardTitle>Inventory</CardTitle>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="pb-3 font-medium">Item</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium">Min</th>
                    <th className="pb-3 font-medium">Supplier</th>
                    <th className="pb-3 font-medium">Last updated</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const isLow = item.quantity <= item.minQuantity;
                    return (
                      <tr key={item.id} className="border-b border-slate-100 last:border-0">
                        <td className="py-3 font-medium">{item.name}</td>
                        <td className="py-3">{item.category}</td>
                        <td className="py-3">
                          <span className={`font-semibold ${isLow ? 'text-danger' : 'text-slate-700'}`}>
                            {item.quantity}
                          </span>
                          {isLow && <AlertTriangle size={14} className="ml-1 inline text-danger" />}
                        </td>
                        <td className="py-3 text-slate-500">{item.minQuantity}</td>
                        <td className="py-3">{item.supplier}</td>
                        <td className="py-3 text-slate-500">{item.lastUpdated}</td>
                        <td className="py-3 text-right">
                          <button onClick={() => deleteItem(item.id)} className="text-slate-400 hover:text-danger">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {items.length === 0 && <p className="py-8 text-center text-slate-500">No items yet.</p>}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
