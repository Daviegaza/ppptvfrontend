import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { PostCard } from '../components/feed/PostCard'
import { YOU } from '../data/mockData'

const fmt = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n)

export const ProfilePage = () => {
  const { posts, bookmarkedPosts } = useApp()
  const [tab, setTab] = useState<'posts'|'replies'|'media'|'likes'|'bookmarks'>('posts')
  const myPosts = posts.filter(p => p.author.id === 'me' || p.author.handle === 'youhandle').slice(0,5)
  const mediaP = posts.filter(p => p.image).slice(0,6)

  return (
    <>
      <div className="page-hdr">
        <div className="page-title">Profile</div>
      </div>
      {/* Banner */}
      <div style={{ height:140, background:'linear-gradient(135deg,#1e1e2e,#2d1b69,#0f172a)', position:'relative' }}>
        <div style={{ position:'absolute', bottom:-48, left:20 }}>
          <div className="av" style={{ width:96, height:96, fontSize:36, background: YOU.avatarColor, border:'4px solid var(--bg)' }}>Y</div>
        </div>
        <button style={{ position:'absolute', bottom:12, right:16, padding:'7px 16px', background:'none', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'var(--r-full)', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-display)' }}>Edit profile</button>
      </div>
      <div style={{ paddingTop:60, paddingLeft:20, paddingRight:20, paddingBottom:16, borderBottom:'1px solid var(--border)' }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, lineHeight:1.1 }}>You</div>
        <div style={{ fontSize:14, color:'var(--muted)', marginTop:2 }}>@youhandle</div>
        <div style={{ fontSize:14, color:'var(--text2)', marginTop:10, lineHeight:1.5 }}>ppptv user · Nairobi, KE 🇰🇪</div>
        <div style={{ display:'flex', gap:24, marginTop:14 }}>
          {[['Following', YOU.following],['Followers', YOU.followers],['Posts', YOU.postsCount ?? 12]].map(([k,v]) => (
            <div key={k as string}>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:16 }}>{fmt(v as number)}</span>
              <span style={{ fontSize:13, color:'var(--muted)', marginLeft:5 }}>{k}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap' }}>
          {['📅 Joined Jan 2025','📍 Nairobi, KE','🌐 ppptv.com/youhandle'].map(t => (
            <span key={t} style={{ fontSize:12, color:'var(--muted)', display:'flex', alignItems:'center', gap:4 }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="tab-bar">
        {(['posts','replies','media','likes','bookmarks'] as const).map(t => (
          <button key={t} className={`tab-btn${tab===t?' on':''}`} onClick={() => setTab(t)} style={{ textTransform:'capitalize' }}>{t}</button>
        ))}
      </div>
      {tab === 'posts' && (
        myPosts.length > 0
          ? myPosts.map((p,i) => <PostCard key={p.id} post={p} delay={i*30} />)
          : <div style={{ padding:'40px 20px', textAlign:'center', color:'var(--muted)' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>✍️</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:800, marginBottom:4 }}>No posts yet</div>
              <div style={{ fontSize:13 }}>Share your thoughts with the world — post something!</div>
            </div>
      )}
      {tab === 'media' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, padding:2 }}>
          {mediaP.map(p => <img key={p.id} src={p.image} alt="" style={{ width:'100%', aspectRatio:'1', objectFit:'cover', cursor:'pointer' }} />)}
        </div>
      )}
      {tab === 'bookmarks' && (bookmarkedPosts.length > 0 ? bookmarkedPosts.map((p,i) => <PostCard key={p.id} post={p} delay={i*30} />) : <div style={{ padding:'40px 20px', textAlign:'center', color:'var(--muted)' }}><div style={{ fontSize:32, marginBottom:8 }}>🔖</div><div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:800 }}>No bookmarks</div></div>)}
      {(tab === 'replies' || tab === 'likes') && (
        <div style={{ padding:'40px 20px', textAlign:'center', color:'var(--muted)' }}>
          <div style={{ fontSize:32, marginBottom:8 }}>😶</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:800, marginBottom:4 }}>Nothing here yet</div>
        </div>
      )}
    </>
  )
}
