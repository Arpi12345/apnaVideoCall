import{BrowserRouter as Router, Route,  Routes, BrowserRouter,} from 'react-router-dom';
import Landing from './pages/Landing';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Authentication from './pages/authentication';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';





function App() {
  return (
    <div className="App">
    
      <Router future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/auth' element={  <Authentication /> } />
        <Route path='/home' element={<HomeComponent/>} />
       
        <Route path='/history' element={< History/>} />

        <Route path='/:url' element= { < VideoMeetComponent /> } />
      </Routes>
      </AuthProvider>
      </Router>
  
   
    </div>
  );
}

export default App;
