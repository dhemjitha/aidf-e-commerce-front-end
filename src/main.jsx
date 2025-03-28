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
import AdminProductPage from './pages/admin/products/admin-product.page'
import { ClerkProvider } from '@clerk/clerk-react'
import AccountPage from './pages/account.page'
import ProtectedLayout from './layouts/protected-layout.layoout'
import AdminProtectedLayout from './layouts/admin-protected-layout.layout'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      },
    }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route element={<ProtectedLayout />}>
                  <Route path="/account" element={<AccountPage />} />
                </Route>
              </Route>
              <Route element={<ProtectedLayout />}>
                <Route element={<AdminProtectedLayout />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/products" element={<AdminProductsPage />} />
                    <Route path="/admin/products/create" element={<CreateProductPage />} />
                    <Route path="/admin/products/:id" element={<AdminProductPage />} />
                  </Route>
                </Route>
              </Route>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>,
)
