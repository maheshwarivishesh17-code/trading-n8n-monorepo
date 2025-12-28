/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';
import{ PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { timer } from '@/nodes/triggers/timer';
import { lighter} from '@/nodes/actions/lighter';
import { ActionSheet } from './ActionSheet';
import { hyperliquid } from '@/nodes/actions/hyperliquid';
import { backpack } from '@/nodes/actions/backpack';
import { Button } from './ui/button';
import {type PriceTriggerMetadata, type TimerNodeMetadata, type Tradingmetadata } from 'common/types';


const nodeTypes = {
  "price-trigger": PriceTrigger,
  "timer": timer,
  "lighter": lighter,
  "hyper-liquid": hyperliquid,
  "backpack": backpack
};

export type Nodekind="timer"|"price-trigger"|"hyper-liquid"|"backpack"|"lighter";
interface Nodetype {
  type:Nodekind,  
  data:{
      kind:"action" | "trigger",
      metadata:NodeMetadata
    },
    id:string,
    position:{x:number,y:number},
}
export type NodeMetadata= Tradingmetadata | PriceTriggerMetadata | TimerNodeMetadata ;
interface Edge{ id:string,
      source:string,
      target:string,
}

export function CreateWorkflow(){
    const [nodes, setNodes] = useState<Nodetype[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedAction, setSelectedAction] = useState<{
     position: { 
      x: number,
       y: number,
       },
      startingNodeId: string,
     } | null>(null);
 
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const POSITION_OFFSET = 50;
  const onConnectEnd = useCallback(
    (_params:any, connectionInfo:any) => {
      if (!connectionInfo.isValid) { 
        console.log(connectionInfo)
        setSelectedAction({
          startingNodeId: connectionInfo.fromNode.id,
          position: {
            x: connectionInfo.from.x + POSITION_OFFSET,
            y: connectionInfo.from.y + POSITION_OFFSET,
          }
                });
    console.log(connectionInfo.fromNode.id);
    console.log(connectionInfo.fromNode.to);
  }
},   
 [] 
  );
  return (
    <div className="w-screen h-screen bg-surface text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 border-b bg-gradient-to-r from-primary/10 via-transparent to-secondary/5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Workflow Builder</h1>
          <span className="text-sm text-muted-foreground">Design automations visually</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { setNodes([]); setEdges([]); }}>Clear</Button>
          <Button size="sm">New Workflow</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 min-w-[18rem] border-r bg-gradient-to-b from-white/40 to-transparent p-4">
          <div className="rounded-md p-3 shadow-sm bg-card/60">
            <h2 className="text-sm font-medium">Actions</h2>
            <p className="text-xs text-muted-foreground mt-2">Drag triggers and actions into the canvas or connect nodes to build flows.</p>
          </div>
        </aside>

        <main className="flex-1 relative">
          {!nodes.length && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <TriggerSheet onSelect={(type,metadata)=> {
                setNodes([...nodes,{
                id:Math.random().toString(),
                type,
                data: {
                  kind: "trigger",
                  metadata,
                },
                position:{x:0,y:0},
              }])
            }} />
            </div>
          )}

          {selectedAction && <ActionSheet  onSelect={(type,metadata)=> {
              const nodeId=Math.random().toString();
              setNodes([...nodes,{
              id:nodeId,
              type,
              data: {
                kind: "action",
                metadata,
              },
              position: selectedAction.position
            }])
            setEdges([...edges,{
              id:`${selectedAction.startingNodeId}-${nodeId}`,
              source:selectedAction.startingNodeId,
              target:nodeId,
            }])
            setSelectedAction(null);
          }} />}

          <div className="absolute inset-0">
            <ReactFlow
              nodeTypes={nodeTypes}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onConnectEnd={onConnectEnd}
              fitView
            />
          </div>
        </main>
      </div>
    </div>
  );

}