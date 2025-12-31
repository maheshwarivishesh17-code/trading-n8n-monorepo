import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface WorkflowDetail {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  description: string;
  createdAt: string;
  updatedAt: string;
  nodes: number;
  edges: number;
  executions: number;
  successRate: number;
}

export function WorkflowDetails() {
  const { id } = useParams<{ id: string }>();
  const [workflow, setWorkflow] = useState<WorkflowDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading workflow details
    const timer = setTimeout(() => {
      setWorkflow({
        id: id || 'unknown',
        name: `Workflow ${id?.slice(0, 6) || 'N/A'}`,
        status: 'active',
        description: 'Trading automation workflow with price triggers and limit orders',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        nodes: 5,
        edges: 4,
        executions: 45,
        successRate: 92,
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-surface text-foreground flex items-center justify-center">
        <div className="text-white/60">Loading workflow details...</div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="w-screen h-screen bg-surface text-foreground flex flex-col">
        <header className="flex items-center px-6 py-4 border-b bg-gradient-to-r from-primary/10 via-transparent to-secondary/5">
          <Link to="/dashboard" className="text-sm text-white/80 mr-2">← Back to Dashboard</Link>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">❌</div>
            <h2 className="text-xl font-medium text-white mb-2">Workflow Not Found</h2>
            <Link to="/dashboard">
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Back to Dashboard</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-surface text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary/10 via-transparent to-secondary/5">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm text-white/80">← Back</Link>
          <div>
            <h1 className="text-xl font-semibold text-white">{workflow.name}</h1>
            <p className="text-xs text-white/60">ID: {workflow.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/create-workflow`}>
            <Button size="sm" variant="outline">Edit</Button>
          </Link>
          <Link to={`/workflow/${workflow.id}/executions`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Executions</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl">
          {/* Status Card */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Status</h2>
              <div className="text-green-400 font-medium">● Active</div>
            </div>
            <p className="text-white/70">{workflow.description}</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4">
              <div className="text-xs text-white/60 mb-2">Nodes</div>
              <div className="text-2xl font-bold text-white">{workflow.nodes}</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4">
              <div className="text-xs text-white/60 mb-2">Edges</div>
              <div className="text-2xl font-bold text-white">{workflow.edges}</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4">
              <div className="text-xs text-white/60 mb-2">Executions</div>
              <div className="text-2xl font-bold text-white">{workflow.executions}</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4">
              <div className="text-xs text-white/60 mb-2">Success Rate</div>
              <div className="text-2xl font-bold text-green-400">{workflow.successRate}%</div>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Workflow Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Created</span>
                <span className="text-white">{workflow.createdAt}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Last Updated</span>
                <span className="text-white">{workflow.updatedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Total Executions</span>
                <span className="text-white">{workflow.executions}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
