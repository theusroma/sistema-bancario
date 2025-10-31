import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface Account {
    id: number;
    holder: string;
    balance: number;
}

export default function Accounts() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const navigate = useNavigate();

    const loadAccounts = () => {
        api.get('/accounts').then((res) => setAccounts(res.data));
    };
    
    useEffect(() => {
        loadAccounts();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Available Accounts</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accounts.map((account) => (
                    <div 
                        key={account.id} 
                        className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <p className="text-sm font-light text-gray-500 mb-1">Account ID: {account.id}</p>
                            <p className="text-xl font-bold text-gray-900 mb-3">Holder: {account.holder}</p>
                            <p className="text-2xl font-extrabold text-green-600">
                                Balance: ${account.balance.toFixed(2)}
                            </p>
                        </div>
                        <button 
                            onClick={() => navigate(`/transactions/${account.id}`)}
                            className="mt-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition duration-150"
                        >
                            See Transactions & Operations
                        </button>
                    </div>
                ))}
            </div>

            {accounts.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No accounts found. Create one to get started.</p>
            )}
        </div>
    );
}