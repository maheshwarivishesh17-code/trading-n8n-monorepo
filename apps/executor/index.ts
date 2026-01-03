import {WorkflowModel,ExecutionModel} from 'db/client';
import { execute } from './execute';
import mongoose from "mongoose";

async function main() {

    await mongoose.connect(process.env.MONGO_URL!);
    while (1) {
     const workflows= await WorkflowModel.find({});
     workflows.map(async workflow => {
     const trigger = workflow.nodes.find(x => x.data?.kind === "TRIGGER");  
    
        if (!trigger) {
            return;
        }

        switch (trigger?.type) {
        case "timer":
            const timeinS = trigger.data?.metadata?.time;
            const execution = await ExecutionModel.findOne({
                workflowId: workflow.id,
            }).sort({
                starttime: "desc"
            })   
            
            
            if (!execution || new Date(execution.starttime).getTime() >= Date.now() - timeinS) {
              const execution = await ExecutionModel.create({
                workflowId:workflow.id,
                status:"PENDING",
                startTime:new Date()
              });
              await execute(workflow.nodes,workflow.edges);

              execution.endtime=new Date()
              execution.status="success"
              await execution.save()
            }
     
    }  });
}
}

main()