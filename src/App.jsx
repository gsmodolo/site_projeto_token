import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import PromptBank from "./pages/PromptBank.jsx";
import Content from "./pages/Content.jsx";
import PromptBuilder from "./pages/PromptBuilder.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/monte-seu-prompt" element={<PromptBuilder />} />
        <Route path="/banco-de-prompts" element={<PromptBank />} />
        {/* Ferramentas agora é uma seção de Conteúdo; mantém links antigos funcionando. */}
        <Route path="/ferramentas" element={<Navigate to="/conteudo#ferramentas" replace />} />
        <Route path="conteudo" element={<Content />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
