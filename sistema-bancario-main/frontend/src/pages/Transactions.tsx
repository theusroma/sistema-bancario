import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface Transaction {
    id: number;
    value: number;
    type: string;
    date: string;
}

export default function Transactions() {
    const { id } = useParams<{ id: string }>();
    const [transactions, setTransaction] = useState<Transaction[]>([]);
    const [value, setValue] = useState<number>(0);
    const [destinationId, setDestinationId] = useState<string>('');
    const [accountBalance, setAccountBalance] = useState<number>(0);

    const loadTransactions = () => {
        // Fetch account details to get current balance
        api.get(`/accounts`).then((res) => {
            const currentAccount = res.data.find((acc: { id: number }) => acc.id === Number(id));
            if (currentAccount) {
                setAccountBalance(currentAccount.balance);
            }
        });

        // Fetch transactions
        api.get(`/accounts/${id}/transactions`).then((res) => setTransaction(res.data));
    };

    useEffect(() => {
        loadTransactions();
    }, [id]);

    const handleAction = async (action: 'deposit' | 'withdraw' | 'transfer') => {
        if (value <= 0) {
            alert('Please enter a positive value.');
            return;
        }

        try {
            if (action === 'deposit') {
                await api.post(`/accounts/${id}/deposit?value=${value}`);
            } else if (action === 'withdraw') {
                await api.post(`/accounts/${id}/withdraw?value=${value}`);
            } else if (action === 'transfer') {
                if (!destinationId) {
                    alert('Please enter a destination account ID for transfer.');
                    return;
                }
                await api.post(`/accounts/${id}/transfer/${destinationId}?value=${value}`);
            }
            alert(`${action.charAt(0).toUpperCase() + action.slice(1)} successful!`);
            setValue(0); // Clear value after success
            setDestinationId(''); // Clear destination after success
            loadTransactions(); // Reload transactions and balance
        } catch (error: any) {
            // Assumindo que a API retorna erro com uma propriedade 'response.data'
            alert(`Operation failed: ${error.response?.data || error.message || 'Check console for details.'}`);
            console.error(error);
        }
    }

    // Helper to determine transaction style
    const getTransactionStyle = (type: string) => {
        const lowerType = type.toLowerCase();
        if (lowerType.includes('deposit') || lowerType.includes('received')) {
            return 'bg-green-50 text-green-800 border-green-300';
        }
        if (lowerType.includes('withdraw') || lowerType.includes('transfer to account')) {
            return 'bg-red-50 text-red-800 border-red-300';
        }
        return 'bg-gray-50 text-gray-800 border-gray-300';
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-800">Account {id}</h2>
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-center shadow-inner">
                <p className="text-xl font-medium text-indigo-700">Current Balance:</p>
                <p className="text-3xl font-extrabold text-green-600">
                    ${accountBalance.toFixed(2)}
                </p>
            </div>

            {/* Operations Form */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-md space-y-4">
                <h3 className="text-xl font-medium mb-4 text-gray-700">Financial Operations</h3>
                
                <input
                    type="number"
                    placeholder="Value (e.g., 100.00)"
                    value={value || ''}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    min="0"
                />

                <div className="flex space-x-4 mb-4">
                    <button 
                        onClick={() => handleAction('deposit')}
                        className="flex-1 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-150"
                    >
                        Deposit
                    </button>
                    <button 
                        onClick={() => handleAction('withdraw')}
                        className="flex-1 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-150"
                    >
                        Withdraw
                    </button>
                </div>
                
                <div className="space-y-4 border-t pt-4">
                    <h4 className="text-lg font-medium text-gray-700">Transfer</h4>
                    <input
                        type="text"
                        placeholder="Destination Account ID"
                        value={destinationId}
                        onChange={(e) => setDestinationId(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    />
                    <button 
                        onClick={() => handleAction('transfer')}
                        className="w-full py-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition duration-150"
                    >
                        Transfer
                    </button>
                </div>
            </div>

            {/* Transactions Statement */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Statement</h3>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {transactions.length === 0 && (
                        <li className="p-4 text-center text-gray-500">No transactions recorded yet.</li>
                    )}
                    {/* Reverse para mostrar as mais recentes primeiro */}
                    {[...transactions].reverse().map((t) => (
                        <li key={t.id} className={`p-4 border-l-4 ${getTransactionStyle(t.type)}`}>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{t.type}</span>
                                <span className="text-lg font-mono">
                                    {t.type.toLowerCase().includes('deposit') || t.type.toLowerCase().includes('received') ? '+' : '-'}
                                    {t.value.toFixed(2)}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(t.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}