import { type Tradingmetadata } from "common/types"
import { Handle, Position } from "@xyflow/react";



export function lighter({data}:{
    data: {
        metadata: Tradingmetadata
    }
}) {
    return <div className="p-4 border">
        lighter Trade
        <div>{data.metadata.type}</div>
        <div>{data.metadata.qty}</div>
        <div>{data.metadata.symbol}</div>
        <Handle type="source" position={Position.Right}></Handle>
        <Handle type="target" position={Position.Left}></Handle>
        </div>
}