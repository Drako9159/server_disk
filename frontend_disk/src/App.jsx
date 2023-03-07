import Disk from "./pages/Disk";
import Layout from "./components/Layout";
import Wrapper from "./components/Wrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Layout>
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Disk />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </Layout>
  );
}
