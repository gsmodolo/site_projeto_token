import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import PromptBank from "./pages/PromptBank.jsx";
import AITools from "./pages/AITools.jsx";
import Content from "./pages/Content.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/banco-de-prompts" element={<PromptBank />} />
        <Route path="/ferramentas" element={<AITools />} />
        <Route path="conteudo" element={<Content />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
