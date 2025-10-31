import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AccountForm from "./components/AccountForm";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      {/* Container Principal: Fundo cinza CLARO para dar contraste com o "cartão" branco */}
      <div className="min-h-screen bg-gray-100 p-6"> 
        
        {/* Navigation Bar: Barra de navegação com cor primária e sombra pronunciada */}
        <nav className="bg-indigo-600 shadow-xl p-4 mb-10 rounded-xl flex justify-between items-center max-w-5xl mx-auto">
          {/* Título: Cor branca para contraste e melhor fonte */}
          <h1 className="text-3xl font-extrabold text-white">
            <Link to="/" className="hover:text-indigo-200">Banking System</Link>
          </h1>
          
          {/* Links com foco em branco e transição */}
          <div className="flex space-x-6">
            <Link to="/" className="text-white hover:text-indigo-200 font-semibold transition duration-150 ease-in-out">
              Open Account
            </Link>

            <Link to="/accounts" className="text-white hover:text-indigo-200 font-semibold transition duration-150 ease-in-out">
              Accounts List
            </Link>
          </div>
        </nav>

        {/* Content Area: O "cartão" principal que hospeda as rotas. Ele fica no centro. */}
        <div className="max-w-5xl mx-auto bg-white p-8 border border-gray-200 shadow-2xl rounded-xl">
          <Routes>
            <Route path="/" element={<AccountForm />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions/:id" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;