'use client';

import { InventoryItem } from './types';

const STORAGE_KEY = 'clinic-inventory';

const demoData: InventoryItem[] = [
  { id: '1', name: 'Disposable Gloves', category: 'PPE', quantity: 1200, minQuantity: 200, supplier: 'MedSupply Co', lastUpdated: '2026-06-20' },
  { id: '2', name: 'Face Masks', category: 'PPE', quantity: 80, minQuantity: 150, supplier: 'MedSupply Co', lastUpdated: '2026-06-21' },
  { id: '3', name: 'Dental Bibs', category: 'Consumables', quantity: 45, minQuantity: 100, supplier: 'DentalPro', lastUpdated: '2026-06-22' },
  { id: '4', name: 'Sterilization Pouches', category: 'Sterilization', quantity: 300, minQuantity: 50, supplier: 'CleanMed', lastUpdated: '2026-06-23' },
  { id: '5', name: 'Local Anesthetic', category: 'Medications', quantity: 24, minQuantity: 10, supplier: 'PharmaPlus', lastUpdated: '2026-06-24' },
];

export function getItems(): InventoryItem[] {
  if (typeof window === 'undefined') return demoData;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as InventoryItem[]) : demoData;
}

export function saveItems(items: InventoryItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function resetDemo(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData));
}
