import { Route, Routes } from "react-router-dom"

import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import { PageLayout } from "./components/PageLayout"

function App() {

  return (
    <PageLayout>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
    </PageLayout>
  )
}

export default App
