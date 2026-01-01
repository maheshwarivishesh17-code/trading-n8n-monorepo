import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Execution {
  id: string;
  status: 'success' | 'failed' | 'running';
  startTime: string;
  endTime?: string;
  duration?: string;
  nodeExecutions: number;
  errorMessage?: string;
}

export function WorkflowExecution() {
  const { id } = useParams<{ id: string }>();
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading executions
    const timer = setTimeout(() => {
      const mockExecutions: Execution[] = [
        {
          id: '1',
          status: 'success',
          startTime: new Date(Date.now() - 60 * 1000).toLocaleString(),
          endTime: new Date(Date.now() - 45 * 1000).toLocaleString(),
          duration: '15s',
          nodeExecutions: 5,
        },
        {
          id: '2',
          status: 'success',
          startTime: new Date(Date.now() - 5 * 60 * 1000).toLocaleString(),
          endTime: new Date(Date.now() - 4 * 60 * 1000).toLocaleString(),
          duration: '1m 2s',
          nodeExecutions: 5,
        },
        {
          id: '3',
          status: 'failed',
          startTime: new Date(Date.now() - 15 * 60 * 1000).toLocaleString(),
          endTime: new Date(Date.now() - 14 * 60 * 1000).toLocaleString(),
          duration: '30s',
          nodeExecutions: 3,
          errorMessage: 'Failed to connect to exchange API',
        },
        {
          id: '4',
          status: 'success',
          startTime: new Date(Date.now() - 30 * 60 * 1000).toLocaleString(),
          endTime: new Date(Date.now() - 29 * 60 * 1000).toLocaleString(),
          duration: '58s',
          nodeExecutions: 5,
        },
        {
          id: '5',
          status: 'running',
          startTime: new Date(Date.now() - 2 * 60 * 1000).toLocaleString(),
          nodeExecutions: 2,
        },
      ];
      setExecutions(mockExecutions);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const getStatusColor = (status: Execution['status']) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-500/10';
      case 'failed': return 'text-red-400 bg-red-500/10';
      case 'running': return 'text-blue-400 bg-blue-500/10';
      default: return 'text-white/60';
    }
  };

  const getStatusBadge = (status: Execution['status']) => {
    switch (status) {
      case 'success': return '✓ Success';
      case 'failed': return '✕ Failed';
      case 'running': return '⟳ Running';
      default: return status;
    }
  };

  return (
    <div className="w-screen h-screen bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary/10 via-transparent to-secondary/5">
        <div className="flex items-center gap-4">
          <Link to={`/workflow/${id}`} className="text-sm text-foreground/80">← Back</Link>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Workflow Executions</h1>
            <p className="text-xs text-foreground/60">ID: {id?.slice(0, 12)}...</p>
          </div>
        </div>
        <Link to="/dashboard">
          <Button size="sm" variant="outline">Dashboard</Button>
        </Link>
        
      </header>

      <main className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-foreground/60">Loading executions...</div>
          </div>
        ) : executions.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h2 className="text-xl font-medium text-foreground mb-2">No Executions Yet</h2>
              <p className="text-foreground/60">Run your workflow to see execution history</p>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-4xl">
            <div className="space-y-3">
              {executions.map((execution) => (
                <div
                  key={execution.id}
                  className="bg-card backdrop-blur border border-border rounded-lg p-4 hover:border-border/80 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(execution.status)}`}>
                        {getStatusBadge(execution.status)}
                      </div>
                      <div>
                        <div className="text-sm text-foreground/80">Execution #{execution.id}</div>
                        <div className="text-xs text-foreground/50">Started: {execution.startTime}</div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      {execution.duration && (
                        <div className="text-foreground/80">Duration: {execution.duration}</div>
                      )}
                      <div className="text-foreground/60">{execution.nodeExecutions} nodes executed</div>
                    </div>
                  </div>

                  {execution.endTime && (
                    <div className="text-xs text-foreground/50 mb-2">
                      Ended: {execution.endTime}
                    </div>
                  )}

                  {execution.errorMessage && (
                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-300">
                      <span className="font-medium">Error: </span>
                      {execution.errorMessage}
                    </div>
                  )}

                  <div className="mt-3 flex gap-2">
                    <button className="text-xs px-2 py-1 rounded border border-border text-foreground/70 hover:bg-card/80">
                      View Details
                    </button>
                    {execution.status === 'failed' && (
                      <button className="text-xs px-2 py-1 rounded border border-border text-foreground/70 hover:bg-card/80">
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
