import { Handle, Position } from "@xyflow/react";
import { type TimerNodeMetadata } from "common/types";


export function timer({data}:{
    data:{
        metadata:TimerNodeMetadata
    },
    isConnectable:boolean
}){

    return <div className="p-4 border">
        Every{data.metadata.time} seconds
        <Handle type="source" position={Position.Right}></Handle>
    </div>
}