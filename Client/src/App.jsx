import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Stacks from "./pages/Stacks";
import Builder from "./pages/Builder";
import { StackProvider } from "./context/StackContext";

export default function App() {
  return (
    <StackProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Stacks />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </Layout>
    </StackProvider>
  );
}
