import { useState } from 'react'
import { useApp } from '../context/AppContext'
import type { Notification } from '../types'

const ICONS: Record<string, string> = { like:'❤️', repost:'🔁', reply:'💬', follow:'👤', mention:'@️', breaking:'🔴', poll_ended:'📊' }

const NotifRow = ({ n, onRead }: { n: Notification; onRead: () => void }) => (
  <div onClick={onRead} style={{ display:'flex', gap:14, padding:'14px 20px', borderBottom:'1px solid var(--border)', cursor:'pointer', background: n.read ? 'transparent' : 'rgba(232,32,58,0.04)' }}
    onMouseEnter={e => (e.currentTarget.style.background='var(--surface2)')}
    onMouseLeave={e => (e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(232,32,58,0.04)')}
  >
    <div style={{ fontSize:20, width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background:'var(--surface2)', borderRadius:'50%' }}>{ICONS[n.type] ?? '🔔'}</div>
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
        <div className="av av32" style={{ background:n.actor.avatarColor }}>{n.actor.name[0]}</div>
        <span style={{ fontSize:14, fontWeight:700 }}>{n.actor.name}</span>
        {n.actor.verified && <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--blue)"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
      </div>
      <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.5 }}>{n.message}</div>
      {n.post && <div style={{ fontSize:12, color:'var(--muted)', marginTop:6, padding:'7px 10px', background:'var(--surface2)', borderRadius:'var(--r-sm)', borderLeft:'2px solid var(--border2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{n.post.content}</div>}
      <div style={{ fontSize:11, color:'var(--muted2)', marginTop:5, fontFamily:'var(--font-mono)' }}>{n.timestamp}</div>
    </div>
    {!n.read && <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)', flexShrink:0, marginTop:18 }}/>}
  </div>
)

export const NotificationsPage = () => {
  const { notifications, markAllRead, markRead, unreadCount } = useApp()
  const [filter, setFilter] = useState<'all'|'unread'>('all')
  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications

  return (
    <>
      <div className="page-hdr">
        <div className="page-title">Notifications {unreadCount > 0 && <span style={{ fontSize:14, fontWeight:700, color:'var(--accent)', marginLeft:6 }}>({unreadCount})</span>}</div>
        {unreadCount > 0 && <button onClick={markAllRead} style={{ marginLeft:'auto', fontSize:13, color:'var(--accent)', fontWeight:700, background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-body)' }}>Mark all read</button>}
      </div>
      <div style={{ display:'flex', borderBottom:'1px solid var(--border)' }}>
        {(['all','unread'] as const).map(f => (
          <button key={f} className={`tab-btn${filter===f?' on':''}`} onClick={() => setFilter(f)}>
            {f === 'unread' ? `Unread (${unreadCount})` : 'All'}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div style={{ padding:'60px 20px', textAlign:'center', color:'var(--muted)' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🔔</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, marginBottom:6 }}>All caught up!</div>
          <div style={{ fontSize:14 }}>When people like, reply, or follow you, you'll see it here.</div>
        </div>
      ) : filtered.map(n => <NotifRow key={n.id} n={n} onRead={() => markRead(n.id)} />)}
    </>
  )
}
