import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Page } from "./Page";
import { routes } from "@/services/navigation/routes";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Page />}>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <div className="w-dvw h-dvh bg-black">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
