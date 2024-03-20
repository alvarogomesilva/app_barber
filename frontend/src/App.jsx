import { Navigate, Route, Routes } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { PageLayout } from "./components/PageLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const [authUser] = useAuthState(auth)

  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
      </Routes>
    </PageLayout>
  )
}

export default App
