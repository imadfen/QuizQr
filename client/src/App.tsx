import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Creators from "./pages/Creators";
import checkLogin from "./utils/checkLogin";
import Login from "./pages/Login";
import { PropsWithChildren } from "react";
import Navbar from "./components/Navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NoPage />}>
      <Route
        path="/"
        element={
          <ClientLayout>
            <Home />
          </ClientLayout>
        }
      />
      <Route path="creators">
        <Route
          index
          element={
            <AdminLayout>
              <Creators />
            </AdminLayout>
          }
          loader={async () => {
            const result = await checkLogin();
            if (!result) {
              return redirect("/creators/login");
            } else {
              return null;
            }
          }}
        />
        <Route
          path="login"
          element={<Login />}
          loader={async () => {
            const result = await checkLogin();
            if (result) {
              return redirect("/creators");
            } else {
              return null;
            }
          }}
        />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

function ClientLayout(props: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col cursor-default">
      <Navbar isAdmin={false} />
      <div className="flex-grow h-full w-full">{props.children}</div>
    </div>
  );
}

function AdminLayout(props: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col cursor-default">
      <Navbar isAdmin />
      <div className="flex-grow h-full w-full">{props.children}</div>
    </div>
  );
}
