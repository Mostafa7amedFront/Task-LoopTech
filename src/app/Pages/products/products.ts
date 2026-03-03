import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdcutsServices } from '../../Core/service/prodcuts.service';
import { IProduct } from '../../Core/Interface/iproduct';
import { ShortenPipe } from '../../Shared/pipes/shorten-pipe';

type SortOption = 'default' | 'priceAsc' | 'priceDesc' | 'rateDesc' | 'titleAsc';

@Component({
  selector: 'app-products',
  imports: [ShortenPipe, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, OnDestroy {
  private readonly _serviceProducts = inject(ProdcutsServices);
  private loadingIntervalId: ReturnType<typeof setInterval> | null = null;

  allProducts = signal<IProduct[]>([]);
  searchTerm = signal('');
  sortOption = signal<SortOption>('default');
  isLoading = signal(true);
  loadingPercent = signal(0);

  filteredProducts = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    let products = [...this.allProducts()];

    if (search) {
      products = products.filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search),
      );
    }

    switch (this.sortOption()) {
      case 'priceAsc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rateDesc':
        products.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'titleAsc':
        products.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        products.sort((a, b) => a.id - b.id);
    }

    return products;
  });

  ngOnInit(): void {
    this.startLoading();
  }

  ngOnDestroy(): void {
    this.clearLoadingInterval();
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  onSortChange(sort: string): void {
    this.sortOption.set(sort as SortOption);
  }

  private startLoading(): void {
    this.isLoading.set(true);
    this.loadingPercent.set(0);

    this.loadingIntervalId = setInterval(() => {
      const nextPercent = this.loadingPercent() + 20;

      if (nextPercent >= 100) {
        this.loadingPercent.set(100);
        this.allProducts.set(this._serviceProducts.Products());
        this.isLoading.set(false);
        this.clearLoadingInterval();
        return;
      }

      this.loadingPercent.set(nextPercent);
    }, 250);
  }

  private clearLoadingInterval(): void {
    if (!this.loadingIntervalId) {
      return;
    }

    clearInterval(this.loadingIntervalId);
    this.loadingIntervalId = null;
  }
}
