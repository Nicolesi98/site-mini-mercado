import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isService?: boolean;
}

export function ProductCard({ product, onAddToCart, isService }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        {isService && product.serviceDetails ? (
          <div className="space-y-2 mb-4">
            <p className="font-semibold">Valor: {product.serviceDetails.price}</p>
            <p className="text-sm">Disponibilidade: {product.serviceDetails.availability}</p>
            <p className="text-sm">Condições: {product.serviceDetails.conditions}</p>
          </div>
        ) : (
          <p className="text-2xl font-bold text-emerald-600 mb-4">
            R$ {product.price.toFixed(2)}
          </p>
        )}

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          {isService ? "Selecionar Serviço" : "Adicionar ao Carrinho"}
        </button>
      </div>
    </div>
  );
}