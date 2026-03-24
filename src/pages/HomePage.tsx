import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { StoryRail }  from '../components/feed/StoryRail'
import { ComposeBox } from '../components/feed/ComposeBox'
import { PostCard }   from '../components/feed/PostCard'

const TABS = ['For You', 'Following', 'News', 'Breaking', 'Sports', 'Tech', 'Culture']

export const HomePage = () => {
  const { posts, breakingAlerts, dismissAlert } = useApp()
  const [tab, setTab] = useState('For You')

  const filtered = posts.filter(p => {
    if (tab === 'Following') return ['aminahassan','kwamem_tech','drdavidosei'].includes(p.author.handle)
    if (tab === 'News')      return p.type === 'news' || p.type === 'breaking'
    if (tab === 'Breaking')  return p.type === 'breaking' || p.isBreaking
    if (tab === 'Sports')    return p.tags?.some(t => ['AFCON','HarambeStars','KenyaFootball','Football'].includes(t))
    if (tab === 'Tech')      return p.tags?.some(t => ['AfricaTech','Fintech','AIGenevaPact','GhanaEV','AI'].includes(t))
    if (tab === 'Culture')   return p.tags?.some(t => ['NairobiMusicSummit','AfrobeatsGlobal','Culture'].includes(t))
    return true
  })

  const pinned  = filtered.filter(p => p.isPinned)
  const regular = filtered.filter(p => !p.isPinned)
  const ordered = [...pinned, ...regular]

  return (
    <>
      <div className="page-hdr">
        <div className="page-title">Home</div>
      </div>

      {breakingAlerts.slice(0, 2).map(a => (
        <div key={a.id} className="breaking-banner" onClick={() => dismissAlert(a.id)}>
          <span className={`breaking-badge ${a.urgency}`}>
            {a.urgency === 'critical' ? '🔴 BREAKING' : a.urgency === 'urgent' ? '⚡ URGENT' : '📌 NEWS'}
          </span>
          <div style={{ flex: 1 }}>
            <div className="breaking-text">{a.headline}</div>
            <div className="breaking-time">{a.source} · {a.timestamp}</div>
          </div>
          <button
            onClick={e => { e.stopPropagation(); dismissAlert(a.id) }}
            style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:20, lineHeight:1, padding:'0 4px' }}
          >×</button>
        </div>
      ))}

      <StoryRail />

      <div className="tab-bar">
        {TABS.map(t => (
          <button key={t} className={`tab-btn${tab === t ? ' on' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <ComposeBox />

      {ordered.length === 0 ? (
        <div style={{ padding:'60px 20px', textAlign:'center', color:'var(--muted)' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, marginBottom:6 }}>Nothing here yet</div>
          <div style={{ fontSize:14 }}>Try a different tab or check back soon</div>
        </div>
      ) : (
        ordered.map((p, i) => <PostCard key={p.id} post={p} delay={i * 25} />)
      )}
    </>
  )
}
