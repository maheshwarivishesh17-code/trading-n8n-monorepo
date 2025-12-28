
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import { CreateWorkflow } from './components/CreateWorkflow';
export default function App() {
  return <div>
    <BrowserRouter>
    <Routes>
    <Route path="/create-workflow" element={<CreateWorkflow />}/>
    </Routes>
    </BrowserRouter>
  </div>
 
}