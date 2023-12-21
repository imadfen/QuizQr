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
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path="creators">
        <Route
          index
          element={
            <Layout>
              <Creators />
            </Layout>
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

function Layout(props: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col cursor-default">
      <Navbar />
      <div className="flex-grow h-full w-full px-20 py-10">
        {props.children}
      </div>
    </div>
  );
}
