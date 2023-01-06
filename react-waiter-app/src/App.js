import { Container } from "react-bootstrap"
import { Routes, Route } from "react-router-dom";
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTables } from "./redux/tablesRedux";

const App = () => {
  
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);
  
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