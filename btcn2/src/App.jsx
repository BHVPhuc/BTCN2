import './App.css'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import NavBar from './components/layout/NavBar'

function App() {
  return (
    <div className='flex flex-col min-h-screen items-center p-1'>
      <Header/>
      <NavBar/>
      {/* <Main/> */}
      <Footer/>
    </div>
  )
}

export default App
