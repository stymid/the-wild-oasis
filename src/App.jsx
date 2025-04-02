import GlobalStyles from "./styles/GlobalStyles";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Bookings />} path="bookings" />
            <Route element={<Cabins />} path="cabins" />
            <Route element={<Users />} path="users" />
            <Route element={<Settings />} path="settings" />
            <Route element={<Account />} path="account" />
          </Route>
          <Route element={<Login />} path="login" />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: {
            duration: 5000,
            style: {
              color: "red",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
