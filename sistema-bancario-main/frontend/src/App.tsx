import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AccountForm from "./components/AccountForm";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      {/* Container Principal: Define a altura mínima da tela */}
      <div className="min-h-screen bg-gray-50 p-4"> 
        
        {/* Navigation Bar: Centralizado com mx-auto */}
        <nav className="bg-white shadow-md p-4 mb-8 rounded-lg flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-indigo-700">Banking System</h1>
          
          {/* Links Lado a Lado */}
          <div className="flex space-x-4">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Menu
            </Link>

            <Link to="/accounts" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Existing Accounts
            </Link>
          </div>
        </nav>

        {/* Content Area: Centralizado com mx-auto e com margem do topo para não ficar colado */}
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-xl rounded-lg">
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