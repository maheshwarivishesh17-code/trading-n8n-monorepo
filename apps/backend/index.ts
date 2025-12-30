import express from 'express';
import mongoose from 'mongoose';
import { signupSchema } from '../../packages/common/types';
import {UserModel} from 'db/client';
mongoose.connect(process.env.MONGO_URL!);

const app = express(); 
app.use(express.json());

app.post("signup", async (req, res) => {
    const {success,data} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(403).json({message:"incorrect inputs"});
        return
    }
    try{
    const user = await UserModel.create({
        username: data.username,
        password: data.password
    });
    res.json({id: user._id});
}    catch(e){  
    return res.status(411).json({message:"username already exists"});

}
})

app.post("signin", (req, res) => {

})

app.post("/workflow", (req, res) => {

})
app.put("/workflow", (req, res) => {

})

app.get("/workflow/workflowId", (req, res) => {

})

app.get("/workflow/executions/:workflowId", (req, res) => {

})

app.post("/credentials", (req, res) => {

})

app.get("/credentials", (req, res) => {

})
app.get("nodes", (req, res) => {

})
app.listen(process.env.PORT || 3000);