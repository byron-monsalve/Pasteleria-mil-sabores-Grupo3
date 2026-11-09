import { useState, useEffect } from 'react';
import { Navbar, type CurrentView } from './components/layout/Navbar';
import { ProductCard } from './components/common/ProductCard';
import { productService, type Product, type CartItem } from './data/productService';

const CART_STORAGE_KEY = 'PASTELERIA_MIL_SABORES_CART';
const ORDERS_STORAGE_KEY = 'PASTELERIA_MIL_SABORES_ORDERS';

export function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('pasteleria_user');
  });

  const reloadProducts = () => {
    setProducts(productService.getAll());
  };

  useEffect(() => {
    reloadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const isAdmin = userEmail === 'admin@pasteleria.cl' || (userEmail?.startsWith('admin') ?? false);

  const handleNavigate = (view: CurrentView) => {
    if (view === 'admin' && !isAdmin) {
      setCurrentView('login');
      return;
    }
    if (view === 'checkout' && !userEmail) {
      setCurrentView('login');
      return;
    }
    setCurrentView(view);
  };

  const categories = ['Todas', ...Array.from(new Set(products.map((p) => p.categoria)))];

  const filteredProducts =
    selectedCategory === 'Todas'
      ? products
      : products.filter((p) => p.categoria === selectedCategory);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.codigo === product.codigo);
      if (existing) {
        const nextQty = Math.min(existing.cantidad + quantity, product.stock);
        return prev.map((item) =>
          item.codigo === product.codigo ? { ...item, cantidad: nextQty } : item
        );
      }
      return [...prev, { ...product, cantidad: Math.min(quantity, product.stock) }];
    });
  };

  const handleUpdateQuantity = (codigo: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.codigo === codigo) {
            const newQty = item.cantidad + delta;
            return newQty > 0 && newQty <= item.stock ? { ...item, cantidad: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.cantidad > 0)
    );
  };

  const handleRemoveFromCart = (codigo: string) => {
    setCart((prev) => prev.filter((item) => item.codigo !== codigo));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleProceedToCheckout = (discount: number) => {
    setAppliedDiscount(discount);
    if (!userEmail) {
      setCurrentView('login');
    } else {
      setCurrentView('checkout');
    }
  };

  const handlePaymentError = () => {
    setCurrentView('payment-error');
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    if (email === 'admin@pasteleria.cl' || email.startsWith('admin')) {
      setCurrentView('admin');
    } else {
      setCurrentView('catalog');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pasteleria_user');
    setUserEmail(null);
    setCurrentView('home');
  };

  const totalCartUnits = cart.reduce((acc, item) => acc + item.cantidad, 0);
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartUnits}
        userEmail={userEmail}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      <main className="container flex-grow-1">

        {currentView === 'catalog' && (
          <div className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <h2 className="mb-1" style={{ fontSize: '2rem' }}>Catálogo de Productos</h2>
                <p className="small mb-0" style={{ color: 'var(--color-texto-principal)' }}>
                  Selecciona tu categoría preferida
                </p>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm ${
                      selectedCategory === cat ? 'btn-custom' : 'btn-outline-secondary'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div key={product.codigo} className="col-12 col-sm-6 col-lg-3">
                  <div
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (!target.closest('button')) {
                        handleOpenDetail(product);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={(prod) => handleAddToCart(prod, 1)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <footer className="py-4 mt-5 border-top" style={{ backgroundColor: 'var(--color-chocolate)', color: 'white' }}>
        <div className="container text-center small">
          <p className="mb-1 fw-bold">Pastelería Mil Sabores - 50 Años de Tradición Repostera</p>
          <p className="mb-0 text-white-50">
            &copy; 2026 Pastelería Mil Sabores. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;