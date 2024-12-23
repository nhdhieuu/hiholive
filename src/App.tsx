import "./App.css";
import { MainRoute } from "@/routes/MainRoute.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <main>
      <MainRoute />
      <ToastContainer />
    </main>
  );
}

export default App;
