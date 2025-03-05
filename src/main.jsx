import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/home.page'
import SignInPage from './pages/sign-in.page'
import SignUpPage from './pages/sign-up.page'
import RootLayout from './layouts/root-layout.layout'
import MainLayout from './layouts/main-layout.layout'
import ProductsPage from './pages/products.page'
import { store } from './lib/store'
import { Provider } from 'react-redux'
import ProductPage from './pages/product.page'
import AdminLayout from './layouts/admin-layout.layout'
import AdminPage from './pages/admin.page'
import CreateProductPage from './pages/admin/createProduct/create-product.page'
import AdminProductsPage from './pages/admin/products/admin-products.page'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Route>
          <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProductsPage/>} />
            <Route path="/admin/products/create" element={<CreateProductPage />} />
          </Route>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
