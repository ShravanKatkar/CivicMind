import React from 'react';
import Card from '../../../components/common/Card';
import { MoreHorizontal } from 'lucide-react';

const getWorkers = (district) => [
    { id: 1, name: 'Rajesh Kumar', role: 'Field Op', status: 'Active', site: `Site B (${district || 'Mumbai'})`, battery: '82%' },
    { id: 2, name: 'Amit Singh', role: 'Supervisor', status: 'Active', site: `Site A (${district || 'Mumbai'})`, battery: '95%' },
    { id: 3, name: 'Priya D.', role: 'Specialist', status: 'Offline', site: '-', battery: '-' },
];

const WorkerTable = ({ district }) => {
    // Regenerate worker list when district changes
    const workers = React.useMemo(() => getWorkers(district), [district]);
    return (
        <Card className="!p-0 overflow-hidden border border-gray-100">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                    <tr>
                        <th className="p-4 pl-6">Worker Name</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Current Site</th>
                        <th className="p-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {workers.map(worker => (
                        <tr key={worker.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 pl-6 font-medium flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                                    {worker.name.charAt(0)}
                                </div>
                                {worker.name}
                            </td>
                            <td className="p-4 text-gray-500">{worker.role}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${worker.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {worker.status}
                                </span>
                            </td>
                            <td className="p-4 text-gray-500">{worker.site}</td>
                            <td className="p-4">
                                <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                                    <MoreHorizontal size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
};

export default WorkerTable;
