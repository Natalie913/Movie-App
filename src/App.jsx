import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import './index.css'

export default function App() {
  return (
    <div className='dark:bg-gray-dark-main flex flex-col'>
      <Navbar />
      <div className='flex-1'>
        <AppRoutes />
      </div>
    </div>
  )
}
 
