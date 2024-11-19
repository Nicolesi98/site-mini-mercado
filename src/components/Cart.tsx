import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onPlaceOrder: () => void;
  orderPlaced: boolean;
  getTotalPrice: () => number;
}

export function Cart({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onPlaceOrder,
  orderPlaced,
  getTotalPrice,
}: CartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Seu Carrinho</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center my-8">
              Seu carrinho está vazio
            </p>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 mb-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    R$ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={onPlaceOrder}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                  disabled={orderPlaced}
                >
                  {orderPlaced ? "Pedido Realizado!" : "Finalizar Pedido"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}