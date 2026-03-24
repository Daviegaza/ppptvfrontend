import { useApp } from '../context/AppContext'
import { PostCard } from '../components/feed/PostCard'

export const BookmarksPage = () => {
  const { bookmarkedPosts } = useApp()
  return (
    <>
      <div className="page-hdr">
        <div className="page-title">Bookmarks</div>
        <div style={{ marginLeft:'auto', fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)' }}>{bookmarkedPosts.length} saved</div>
      </div>
      {bookmarkedPosts.length === 0 ? (
        <div style={{ padding:'60px 20px', textAlign:'center', color:'var(--muted)' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🔖</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, marginBottom:6 }}>No bookmarks yet</div>
          <div style={{ fontSize:14 }}>Tap the bookmark icon on any post to save it here.</div>
        </div>
      ) : (
        <>
          <div style={{ padding:'12px 20px', background:'var(--surface)', borderBottom:'1px solid var(--border)', fontSize:13, color:'var(--muted)' }}>
            Posts you've saved appear here — only visible to you.
          </div>
          {bookmarkedPosts.map((p, i) => <PostCard key={p.id} post={p} delay={i * 30} />)}
        </>
      )}
    </>
  )
}
