import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebaseConfig";
import { PageLayout } from "./components/PageLayout";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import HairCutPage from "./pages/HairCutPage";

function App() {
  const [authUser] = useAuthState(auth)

  return (
    <PageLayout>
      <Routes>
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/auth' />} />
        <Route path='/cuts' element={authUser ? <HairCutPage /> : <Navigate to='/auth' />} />
      </Routes>
    </PageLayout>
  )
}

export default App
