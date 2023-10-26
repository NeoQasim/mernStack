import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { Container } from "react-bootstrap"
// import HomeScreen from "./screens/HomeScreen"
Outlet

const App = () => {
  return (
    <>
      <Header />
      <Container >
        <Outlet />
      </Container>
    </>
  )
}

export default App