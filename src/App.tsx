import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button.tsx";
import { MainRoute } from "@/routes/MainRoute.tsx";

function App() {
  return (
    <main>
      <MainRoute />
    </main>
  );
}

export default App;
