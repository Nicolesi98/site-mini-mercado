import React, { useState, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Cart } from './components/Cart';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { CustomerForm } from './components/CustomerForm';
import { ErrorToast } from './components/ErrorToast';
import { SuccessScreen } from './components/SuccessScreen';
import { CartItem, Product, CustomerData } from './types';
import { products } from './data/products';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const categoryRefs = {
    "Frutas e Verduras": useRef<HTMLDivElement>(null),
    "Não Perecíveis": useRef<HTMLDivElement>(null),
    "Higiene e Limpeza": useRef<HTMLDivElement>(null),
    "Serviços": useRef<HTMLDivElement>(null),
  };

  const scrollToCategory = (category: string) => {
    categoryRefs[category as keyof typeof categoryRefs]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    const service = cart.find(item => item.category === "Serviços");
    if (service) {
      setSelectedService(service.name);
      setShowForm(true);
      setIsCartOpen(false);
    } else {
      setError("Por favor, selecione um serviço de entrega ou retirada antes de finalizar o pedido.");
    }
  };

  const generateOrderNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleFormSubmit = (customerData: CustomerData) => {
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    setShowForm(false);
    setShowSuccess(true);
    console.log('Pedido finalizado:', { customerData, cart, orderNumber: newOrderNumber });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setCart([]);
    setOrderPlaced(false);
  };

  const categories = ["Frutas e Verduras", "Não Perecíveis", "Higiene e Limpeza", "Serviços"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
      
      <header className="bg-emerald-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/859/859270.png" 
                alt="Cart Icon" 
                className="w-8 h-8 invert"
              />
              <h1 className="text-3xl font-bold">Mini-Mercado Santos</h1>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">
                Carrinho ({cart.length})
              </span>
            </button>
          </div>
          <nav className="flex gap-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className="text-white hover:text-emerald-200 transition-colors whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {showForm ? (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Dados do Cliente</h2>
            <CustomerForm onSubmit={handleFormSubmit} selectedService={selectedService} />
          </div>
        ) : (
          categories.map(category => (
            <section 
              key={category} 
              ref={categoryRefs[category as keyof typeof categoryRefs]}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-emerald-500 pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter(product => product.category === category)
                  .map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      isService={category === "Serviços"}
                    />
                  ))}
              </div>
            </section>
          ))
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onPlaceOrder={handlePlaceOrder}
        orderPlaced={orderPlaced}
        getTotalPrice={getTotalPrice}
      />

      {showSuccess && (
        <SuccessScreen
          orderNumber={orderNumber}
          onClose={handleSuccessClose}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;