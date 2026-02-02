import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TasksProvider } from './contexts/TasksContext'
import { HistoryProvider } from './contexts/HistoryContext'
import { TimeTrackingProvider } from './contexts/TimeTrackingContext'
import Layout from './components/Layout'
import Dashboard from './features/dashboard/Dashboard'
import KanbanBoard from './features/kanban/KanbanBoard'

function App() {
  return (
    <Router>
      <HistoryProvider>
        <TasksProvider>
          <TimeTrackingProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/board/:domain?" element={<KanbanBoard />} />
              </Routes>
            </Layout>
          </TimeTrackingProvider>
        </TasksProvider>
      </HistoryProvider>
    </Router>
  )
}

export default App
