import { Handle, Position } from "@xyflow/react";
import { type Tradingmetadata } from "common/types"



export function hyperliquid({data}:{
    data: {
        metadata: Tradingmetadata
    }
}) {
    return <div className="p-4 border">
        hyperliquid Trade
        <div>{data.metadata.type}</div>
        <div>{data.metadata.qty}</div>
        <div>{data.metadata.symbol}</div>
        <Handle type="source" position={Position.Right}></Handle>
        <Handle type="target" position={Position.Left}></Handle>
        </div>
}