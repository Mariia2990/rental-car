import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header/Header";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);
const CatalogDetailPage = lazy(() =>
  import("./pages/CatalogDetailPage/CatalogDetailPage.jsx")
);

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CatalogDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" />
    </>
  );
};
