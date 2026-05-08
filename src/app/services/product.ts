import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Private signal — internal state
  private _products = signal<Product[]>([
    { id: 1, name: 'Laptop',     price: 999,  category: 'Electronics', inStock: true  },
    { id: 2, name: 'Mouse',      price: 29,   category: 'Electronics', inStock: false },
    { id: 3, name: 'Keyboard',   price: 79,   category: 'Electronics', inStock: true  },
    { id: 4, name: 'Desk Chair', price: 299,  category: 'Furniture',   inStock: true  },
    { id: 5, name: 'Monitor',    price: 499,  category: 'Electronics', inStock: false },
    { id: 6, name: 'Bookshelf',  price: 149,  category: 'Furniture',   inStock: true  },
  ]);

  // Public read-only exposure — consumers can read but not mutate
  readonly products = this._products.asReadonly();

  // Computed signals — auto-update when _products changes
  readonly totalProducts  = computed(() => this._products().length);
  readonly inStockCount   = computed(() => this._products().filter(p => p.inStock).length);
  readonly categories     = computed(() =>
    [...new Set(this._products().map(p => p.category))]
  );

  // ── CRUD Methods ──────────────────────────────────────────────
  getById(id: number): Product | undefined {
    return this._products().find(p => p.id === id);
  }

  getByCategory(category: string): Product[] {
    return this._products().filter(p => p.category === category);
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newProduct = {
      ...product,
      id: Math.max(...this._products().map(p => p.id)) + 1
    };
    this._products.update(products => [...products, newProduct]);
  }

  removeProduct(id: number): void {
    this._products.update(products => products.filter(p => p.id !== id));
  }

  toggleStock(id: number): void {
    this._products.update(products =>
      products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p)
    );
  }
}