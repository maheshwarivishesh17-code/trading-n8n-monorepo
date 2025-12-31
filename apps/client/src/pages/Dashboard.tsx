/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  executions: number;
  lastRun?: string;
}

export function Dashboard() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch workflows from localStorage for now
    try {
      const stored = localStorage.getItem('workflows');
      const items = stored ? JSON.parse(stored) : [];
      const withStatus = items.map((item: any) => ({
        ...item,
        status: 'active' as const,
        executions: Math.floor(Math.random() * 100),
        lastRun: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      }));
      setWorkflows(withStatus);
    } catch (error) {
      console.error('Failed to load workflows:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'inactive': return 'text-gray-400';
      case 'error': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  return (
    <div className="w-screen h-screen bg-surface text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary/10 via-transparent to-secondary/5">
        <div>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <p className="text-sm text-black/60">Manage your trading workflows</p>
        </div>
        <div className="flex gap-3">
          <Link to="/create-workflow">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">New Workflow</Button>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            className="px-4 py-2 text-sm border border-white/20 rounded hover:bg-white/5"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white/60">Loading workflows...</div>
          </div>
        ) : workflows.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h2 className="text-xl font-medium text-white mb-2">No Workflows Yet</h2>
              <p className="text-white/60 mb-6">Create your first trading workflow to get started</p>
              <Link to="/create-workflow">
                <Button className="bg-blue-600 hover:bg-blue-700">Create Workflow</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all hover:bg-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{workflow.name}</h3>
                    <div className={`text-sm mt-1 ${getStatusColor(workflow.status)}`}>
                      ● {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Executions</span>
                    <span className="text-white font-medium">{workflow.executions}</span>
                  </div>
                  {workflow.lastRun && (
                    <div className="flex justify-between text-white/70">
                      <span>Last Run</span>
                      <span className="text-white font-medium">{workflow.lastRun}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link to={`/workflow/${workflow.id}`} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">View</Button>
                  </Link>
                  <Link to={`/workflow/${workflow.id}/executions`} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">Executions</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
