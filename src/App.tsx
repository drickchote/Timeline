import Timeline from './components/Timeline/Timeline'
import { timelineItems } from './mocks/timelineItems'
import './App.css'

function App() {
  return (
      <Timeline 
        title="Project Timeline" 
        subtitle="Visualize your project timeline"
        items={timelineItems} 
      />
  )
}

export default App
