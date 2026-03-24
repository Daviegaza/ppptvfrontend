import { Routes, Route, useLocation } from 'react-router-dom'
import { SideBar }           from './components/layout/SideBar'
import { RightPanel }        from './components/layout/RightPanel'
import { BottomBar }         from './components/layout/BottomBar'
import { LiveTicker }        from './components/layout/LiveTicker'
import { ToastContainer }    from './components/ui/Toast'
import { HomePage }          from './pages/HomePage'
import { ExplorePage }       from './pages/ExplorePage'
import { LivePage }          from './pages/LivePage'
import { NewsPage }          from './pages/NewsPage'
import { PostPage }          from './pages/PostPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { MessagesPage }      from './pages/MessagesPage'
import { BookmarksPage }     from './pages/BookmarksPage'
import { ProfilePage }       from './pages/ProfilePage'
import { DebatesPage }       from './pages/DebatesPage'
import { PredictionsPage }   from './pages/PredictionsPage'
import { CommunitiesPage }   from './pages/CommunitiesPage'
import { SettingsPage }      from './pages/SettingsPage'
import { AdminPage }         from './pages/admin/AdminPage'
import { useApp }            from './context/AppContext'

export default function App() {
  const location = useLocation()
  const { toasts } = useApp()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <>
        <AdminPage />
        <ToastContainer toasts={toasts} />
      </>
    )
  }

  return (
    <div className="app-shell">
      <SideBar />
      <main className="main-col">
        <LiveTicker />
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/explore"      element={<ExplorePage />} />
          <Route path="/live"         element={<LivePage />} />
          <Route path="/news"         element={<NewsPage />} />
          <Route path="/debates"      element={<DebatesPage />} />
          <Route path="/predictions"  element={<PredictionsPage />} />
          <Route path="/communities"  element={<CommunitiesPage />} />
          <Route path="/notifications"element={<NotificationsPage />} />
          <Route path="/messages"     element={<MessagesPage />} />
          <Route path="/bookmarks"    element={<BookmarksPage />} />
          <Route path="/profile"      element={<ProfilePage />} />
          <Route path="/settings"     element={<SettingsPage />} />
          <Route path="/post/:id"     element={<PostPage />} />
          <Route path="*"             element={<HomePage />} />
        </Routes>
      </main>
      <RightPanel />
      <BottomBar />
      <ToastContainer toasts={toasts} />
    </div>
  )
}
