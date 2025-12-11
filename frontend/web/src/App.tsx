import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { DishDetailsPage } from './pages/DishDetailsPage';
import { ScanPage } from './pages/ScanPage';
import { CartPage } from './pages/CartPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { IngredientsPage } from './pages/IngredientsPage';
import { FAQPage } from './pages/FAQPage';
import { HelpPage } from './pages/HelpPage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ManageCatalogPage } from './pages/admin/ManageCatalogPage';
import { ManageUsersPage } from './pages/admin/ManageUsersPage';
import { SavedRecipesPage } from './pages/SavedRecipesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Public Routes - Wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DishDetailsPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/saved-recipes" element={<SavedRecipesPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="catalog" element={<ManageCatalogPage />} />
            <Route path="users" element={<ManageUsersPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
