import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessScreenProps {
  orderNumber: string;
  onClose: () => void;
}

export function SuccessScreen({ orderNumber, onClose }: SuccessScreenProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido Realizado!</h2>
          <p className="text-gray-600 mb-6">
            Seu pedido foi recebido e está sendo processado.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Número do Pedido</p>
            <p className="text-2xl font-bold text-emerald-600">{orderNumber}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Você receberá um e-mail com os detalhes do seu pedido.
          </p>
          <button
            onClick={onClose}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}