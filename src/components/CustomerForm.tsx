import React from 'react';
import DatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import { CustomerData } from '../types';

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void;
  selectedService: string;
}

export function CustomerForm({ onSubmit, selectedService }: CustomerFormProps) {
  const [formData, setFormData] = React.useState<CustomerData>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    gender: '',
    deliveryDate: new Date(),
    deliveryTime: '',
    serviceType: selectedService,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const minTime = "08:00";
  const maxTime = "20:00";
  const timeSlots = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo *</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CPF *</label>
          <InputMask
            mask="999.999.999-99"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone *</label>
          <InputMask
            mask="(99)99999-9999"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Endereço *</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gênero</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="masculino"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="text-emerald-600"
              />
              <span className="ml-2">Masculino</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="feminino"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="text-emerald-600"
              />
              <span className="ml-2">Feminino</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="outro"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="text-emerald-600"
              />
              <span className="ml-2">Outro</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data de {selectedService === 'Retirada no Local' ? 'Retirada' : 'Entrega'} *</label>
          <DatePicker
            selected={formData.deliveryDate}
            onChange={(date: Date) => setFormData({ ...formData, deliveryDate: date })}
            minDate={new Date()}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Horário de {selectedService === 'Retirada no Local' ? 'Retirada' : 'Entrega'} *</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={formData.deliveryTime}
            onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
          >
            <option value="">Selecione um horário</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Confirmar Pedido
        </button>
      </div>
    </form>
  );
}