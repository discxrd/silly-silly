import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Page } from "./Page";
import { routes } from "@/services/navigation";
import { QueryClientProvider } from "@/services/query-client-provider";

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
    <QueryClientProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
