import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Mini-Mercado Santos</h3>
            <p className="text-gray-300">
              CNPJ: 00.000.000/0001-00
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="text-gray-300">
              <li>Telefone: (11) 1234-5678</li>
              <li>WhatsApp: (11) 91234-5678</li>
              <li>Email: contato@minimercadosantos.com</li>
              <li>Endereço: Rua dos Santos, 123 - SP</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Horário de Funcionamento</h3>
            <p className="text-gray-300">
              Segunda a Sábado: 08:00 - 20:00
              <br />
              Domingo: 08:00 - 13:00
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>© 2024 Mini-Mercado Santos. Todos os direitos reservados.</p>
          <p className="mt-2">
            Desenvolvido por Equipe Santos
          </p>
        </div>
      </div>
    </footer>
  );
}