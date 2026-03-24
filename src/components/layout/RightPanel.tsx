import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { SUGGESTIONS } from '../../data/mockData'

const fmt = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n)

export const RightPanel = () => {
  const { trending, breakingAlerts, followingUsers, toggleFollow } = useApp()
  const [q, setQ] = useState('')
  const filtered = trending.filter(t => !q || t.tag.toLowerCase().includes(q.toLowerCase()) || t.category.toLowerCase().includes(q.toLowerCase()))

  return (
    <aside className="rp">
      <div className="s-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input className="s-inp" type="search" placeholder="Search ppptv" value={q} onChange={e => setQ(e.target.value)} />
      </div>

      {breakingAlerts.length > 0 && (
        <div className="rp-card">
          <div className="rp-title">🔴 Breaking</div>
          {breakingAlerts.slice(0, 3).map(a => (
            <div key={a.id} style={{ padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
              <div style={{ fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.5px', fontFamily:'var(--font-display)', marginBottom:3, color: a.urgency==='critical'?'var(--accent)':a.urgency==='urgent'?'var(--orange)':'var(--blue)' }}>{a.category} · {a.urgency.toUpperCase()}</div>
              <div style={{ fontSize:13, fontWeight:600, lineHeight:1.4, color:'var(--text)' }}>{a.headline}</div>
              <div style={{ fontSize:11, color:'var(--muted)', marginTop:3, fontFamily:'var(--font-mono)' }}>{a.timestamp}</div>
            </div>
          ))}
        </div>
      )}

      <div className="rp-card">
        <div className="rp-title">Trending</div>
        {filtered.slice(0, 7).map((t, i) => (
          <div key={t.id} className="trend-row">
            <div className="trend-n">{String(i+1).padStart(2,'0')}</div>
            <div style={{ flex:1 }}>
              <div className="trend-cat">{t.category}</div>
              <div className="trend-tag">{t.tag}</div>
              <div className="trend-cnt">{fmt(t.postCount)} posts · <span className="trend-up">▲{t.change}%</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="rp-card">
        <div className="rp-title">Who to follow</div>
        {SUGGESTIONS.slice(0, 5).map(u => {
          const isFollowing = followingUsers.includes(u.handle)
          return (
            <div key={u.id} className="who-row">
              <div className="av av36" style={{ background:u.avatarColor }}>{u.name[0]}</div>
              <div className="who-info">
                <div className="who-name">{u.name}{u.verified && <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--blue)"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}</div>
                <div className="who-handle">@{u.handle}</div>
              </div>
              <button className={`f-btn${isFollowing?' on':''}`} onClick={() => toggleFollow(u.handle)}>
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          )
        })}
      </div>

      <p style={{ fontSize:11, color:'var(--muted2)', lineHeight:1.9, padding:'0 4px' }}>
        © 2025 ppptv · <a href="#" style={{color:'inherit'}}>Terms</a> · <a href="#" style={{color:'inherit'}}>Privacy</a> · <a href="#" style={{color:'inherit'}}>About</a>
      </p>
    </aside>
  )
}
