import qoranLogo from '/public/logo.png'
import './App.css'

function App() {

  return (
    <>
      <div>
          <img src={qoranLogo} className="logo" alt="Qoran logo" />
          <h1>Daily Qoran</h1>
      </div>
      <p className="read-the-docs">
        Lets start knowing more about the Quran
      </p>
    </>
  )
}

export default App
