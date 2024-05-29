import './App.css';
import Home from './components/Home';
import Login from './components/Login'
import SignUp from './components/SignUp'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './components/screens/HomeScreen';
import UserManagement from './components/screens/UserManagement';
import ProjectDetails from './components/screens/ProjectDetails';
import UserProgress from './components/screens/UserProgress';
import Sales from './components/screens/Sales';
import SalesAddNewProject from './components/screens/SalesAddNewProject';
import CTOLanding from './components/screens/CTOLanding';
import MomGeneration from './components/screens/MomGeneration';
import SrsGeneration from './components/screens/SrsGeneration';
import UserKanban from './components/screens/UserKanban';
import LeadLanding from './components/screens/LeadLanding';
import UserStories from './components/screens/UserStories';
import DevLanding from './components/screens/DevLanding';
import Devprogress from './components/screens/Devprogress';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route
       path="/"
        Component={Home}>
      </Route>
    <Route
       path="admin/home"
        Component={HomeScreen}>
      </Route>
      <Route
       path="/login"
        Component={Login}>
      </Route>
      <Route
       path="signup"
        Component={SignUp}>
      </Route>
      <Route
       path="admin/usermanagement"
        Component={UserManagement}>
      </Route>
      <Route
       path="admin/projectdetails"
        Component={ProjectDetails}>
      </Route>
      <Route
       path="admin/userprogress"
        Component={UserProgress}>
      </Route>
      <Route
       path="sales/home"
        Component={Sales}>
      </Route>
      <Route
       path="sales/add"
        Component={SalesAddNewProject}>
      </Route>
      <Route
       path="cto/home"
        Component={CTOLanding}>
      </Route>
      <Route
       path="mom"
        Component={MomGeneration}>
      </Route>
      <Route
       path="srs"
        Component={SrsGeneration}>
      </Route>
      <Route
       path="user/kanban/:id"
        Component={UserKanban}>
      </Route>
      {/* /lead/home */}
      <Route
       path="/lead/home"
        Component={LeadLanding}>
      </Route>
      <Route
       path="/lead/us/:id"
        Component={UserStories}>
      </Route>
      <Route
       path="/dev/landing/:id"
        Component={DevLanding}>
      </Route>
      <Route
       path="/dev/progress"
        Component={Devprogress}>
      </Route>
      
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
