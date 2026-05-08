import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-and-di',
  imports: [FormsModule,CommonModule],
  templateUrl: './services-and-di.html',
  styleUrl: './services-and-di.scss',
})
export class ServicesAndDI {


  // Modern inject() function — preferred in Angular 17+
  private productService = inject(ProductService);

  // Expose service signals directly to template
  products      = this.productService.products;
  totalProducts = this.productService.totalProducts;
  inStockCount  = this.productService.inStockCount;
  categories    = this.productService.categories;

  // Local UI state
  selectedCategory = 'All';
  newProduct = { name: '', price: 0, category: 'Electronics', inStock: true };

  get filteredProducts() {
    return this.selectedCategory === 'All'
      ? this.products()
      : this.productService.getByCategory(this.selectedCategory);
  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.price) return;
    this.productService.addProduct(this.newProduct);
    this.newProduct = { name: '', price: 0, category: 'Electronics', inStock: true };
  }

  removeProduct(id: number)        { this.productService.removeProduct(id); }
  toggleStock(id: number)          { this.productService.toggleStock(id); }
  setCategory(category: string)    { this.selectedCategory = category; }

   trackByProductId(_: number, p: any) { return p.id; }

}
