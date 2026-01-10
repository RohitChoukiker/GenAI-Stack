import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Stacks from "./pages/Stacks";
import Builder from "./pages/Builder";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Stacks />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </Layout>
  );
}
