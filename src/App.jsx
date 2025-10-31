// Componenst
import NavBar from "./Components/NavBar";
import { useEffect } from "react";
import Footer from "./Components/Footer";
import { HomeView } from "./View/HomeView";
import { BrowserRouter, Routes, Route } from "react-router";
import { ComicsView } from "./View/ComicsView";
import Characters from "./View/Characters";
import EventsView from "./View/EventsView";
import NotFound from "./View/NotFound";
import MarvelSaga from "./View/MarvelSaga";
function App() {
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <main className="relative bg-black/55 min-h-screen">
        <div className="absolute z-50 w-full">
          <NavBar></NavBar>
        </div>
        <Routes>
          <Route path="/" element={<HomeView></HomeView>}></Route>
          <Route path="/comics" element={<ComicsView></ComicsView>}></Route>
          <Route path="/characters" element={<Characters></Characters>}></Route>
          <Route path="/events" element={<EventsView></EventsView>}></Route>
          <Route path="/saga" element={<MarvelSaga></MarvelSaga>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
