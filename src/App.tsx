import Timeline from './components/Timeline/Timeline'
import { timelineItems } from './mocks/timelineItems'
import './App.css'

function App() {
  return (
    <div style={{ 
      padding: '20px',
      minHeight: '100vh',
      background: '#1a1a1a'
    }}>
      <Timeline 
        title="Project Timeline" 
        subtitle="Horizontal scroll to explore events"
        items={timelineItems} 
      />
    </div>
  )
}

export default App
