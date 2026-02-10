import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { TasksProvider } from './contexts/TasksContext'
import { HistoryProvider } from './contexts/HistoryContext'
import { TimeTrackingProvider } from './contexts/TimeTrackingContext'
import Layout from './components/Layout'
import KanbanBoard from './features/kanban/KanbanBoard'

function BoardRedirect() {
  const { domain } = useParams<{ domain?: string }>()
  return <Navigate to={domain ? `/${domain}` : '/'} replace />
}

function App() {
  return (
    <Router>
      <HistoryProvider>
        <TasksProvider>
          <TimeTrackingProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<KanbanBoard />} />
                <Route path="/:domain" element={<KanbanBoard />} />
                <Route path="/board/:domain?" element={<BoardRedirect />} />
              </Routes>
            </Layout>
          </TimeTrackingProvider>
        </TasksProvider>
      </HistoryProvider>
    </Router>
  )
}

export default App
