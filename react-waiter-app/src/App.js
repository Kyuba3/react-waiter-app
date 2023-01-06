import { Container } from "react-bootstrap"
import { Routes, Route } from "react-router-dom";
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/table/:id' element={<></>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;