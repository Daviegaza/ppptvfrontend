import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const MORE_LINKS = [
  { to:'/news', label:'News', icon:<path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"/> },
  { to:'/debates', label:'Debates', icon:<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/> },
  { to:'/predictions', label:'Predictions', icon:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
  { to:'/communities', label:'Communities', icon:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></> },
  { to:'/messages', label:'Messages', icon:<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/> },
  { to:'/bookmarks', label:'Bookmarks', icon:<path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/> },
  { to:'/profile', label:'Profile', icon:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
  { to:'/settings', label:'Settings', icon:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></> },
  { to:'/admin', label:'Admin HQ', icon:<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
]

export const BottomBar = () => {
  const { isDark, toggleTheme, unreadCount, conversations } = useApp()
  const [open, setOpen] = useState(false)
  const unreadMsg = conversations.reduce((s,c) => s+c.unread, 0)
  const cls = ({ isActive }: { isActive: boolean }) => `bb-btn${isActive?' on':''}`

  return (
    <>
      {open && <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:199 }}/>}
      <div className="drawer" style={{ bottom: open?60:'-100%' }}>
        <div style={{ width:40, height:4, borderRadius:2, background:'var(--border)', margin:'12px auto 16px' }}/>
        {MORE_LINKS.map(m => (
          <NavLink key={m.to} to={m.to} onClick={() => setOpen(false)}
            style={({ isActive }) => ({ display:'flex', alignItems:'center', gap:16, padding:'13px 24px', color: isActive?'var(--accent)':'var(--text)', fontWeight: isActive?700:500, fontSize:15, textDecoration:'none', borderBottom:'1px solid var(--border)' })}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">{m.icon}</svg>
            {m.label}
          </NavLink>
        ))}
        <div onClick={() => { toggleTheme(); setOpen(false) }} style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 24px', cursor:'pointer', borderBottom:'1px solid var(--border)', fontSize:15, color:'var(--text)' }}>
          <span style={{ fontSize:20 }}>{isDark?'☀️':'🌙'}</span>{isDark?'Light mode':'Dark mode'}
          <div className={`pill${isDark?' on':''}`} style={{ marginLeft:'auto', pointerEvents:'none' }}><div className="knob"/></div>
        </div>
      </div>
      <nav className="bottom-bar">
        <div className="bb-row">
          <NavLink to="/" end className={cls}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span className="bb-lbl">Home</span></NavLink>
          <NavLink to="/explore" className={cls}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span className="bb-lbl">Explore</span></NavLink>
          <div className="bb-btn"><Link to="/compose"><button className="fab"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" width="20" height="20"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button></Link></div>
          <NavLink to="/notifications" className={cls}><div style={{ position:'relative' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>{unreadCount>0&&<span className="bb-dot">{unreadCount}</span>}</div><span className="bb-lbl">Alerts</span></NavLink>
          <button className={`bb-btn${open?' on':''}`} onClick={() => setOpen(p=>!p)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg><span className="bb-lbl">More</span></button>
        </div>
      </nav>
    </>
  )
}
