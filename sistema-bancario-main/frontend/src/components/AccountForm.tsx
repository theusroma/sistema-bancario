import { useState } from "react";
import api from '../services/api';
import { useNavigate } from "react-router-dom"; // Adicionado para redirecionar

export default function AccountForm() {
    const [holder, setHolder] = useState('');
    const [balance] = useState(0);
    const navigate = useNavigate();

    const createAccount = async () => {
        if (!holder) {
            alert('Please enter a holder name.');
            return;
        }
        await api.post('/accounts/create', { holder, balance });
        alert('Account created successfully.');
        navigate('/accounts'); // Redireciona para a lista de contas
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create New Account</h2>
            <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Account Holder Name"
                    value={holder}
                    onChange={(e) => setHolder(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                />
            </div>
            <button 
                onClick={createAccount}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
            >
                Create Account
            </button>
            <div className="text-center pt-4">
                <button
                    onClick={() => navigate('/accounts')}
                    className="text-sm text-gray-500 hover:text-gray-700 transition duration-150"
                >
                    Existing Accounts
                </button>
            </div>
        </div>
    );
}