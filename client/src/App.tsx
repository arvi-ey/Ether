import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import DashBoard from './components/Dashboard/DashBoard'
import Analytics from './components/Analytics/Analytics'
import Projects from './components/Projects/Projects'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/protected/ProtectedRoute'
import ProjectForm from './components/Projects/ProjectForm'
import Tasks from './components/Tasks/Tasks'
import TaskForm from './components/Tasks/TaskForm'
import Mytasks from './components/Mytasks/Mytasks'
import MyTaskForm from './components/Mytasks/MyTaskForm'

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />



      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route element={<DashBoard />}>
            <Route path="/dashboard" element={<Analytics />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/create" element={<ProjectForm />} />
            <Route path="/projects/update/:id" element={<ProjectForm />} />
            <Route path="/projects/:id/tasks" element={<Tasks />} />
            <Route path="/projects/:id/tasks/create" element={<TaskForm />} />
            <Route path="/projects/:id/tasks/edit/:taskid" element={<TaskForm />} />
            <Route path="/mytasks" element={<Mytasks />} />
            <Route path="/mytasks/:taskid" element={<MyTaskForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
