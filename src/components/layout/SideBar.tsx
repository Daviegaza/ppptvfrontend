import { NavLink, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const NAV = [
  { to:'/', end:true, label:'Home', badge:null, icon:<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
  { to:'/explore', end:false, label:'Explore', badge:null, icon:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></> },
  { to:'/live', end:false, label:'Live', badge:'LIVE', icon:<><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14"/></> },
  { to:'/news', end:false, label:'News', badge:null, icon:<><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"/><polyline points="17 1 17 8 10 8"/></> },
  { to:'/debates', end:false, label:'Debates', badge:null, icon:<><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></> },
  { to:'/predictions', end:false, label:'Predictions', badge:null, icon:<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></> },
  { to:'/communities', end:false, label:'Communities', badge:null, icon:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></> },
]
const NAV2 = [
  { to:'/notifications', label:'Notifications', icon:<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></> },
  { to:'/messages', label:'Messages', icon:<><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></> },
  { to:'/bookmarks', label:'Bookmarks', icon:<><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></> },
  { to:'/profile', label:'Profile', icon:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
  { to:'/settings', label:'Settings', icon:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></> },
]

export const SideBar = () => {
  const { isDark, toggleTheme, unreadCount, conversations } = useApp()
  const unreadMessages = conversations.reduce((s,c) => s + c.unread, 0)
  const cls = ({ isActive }: { isActive: boolean }) => `nav-lnk${isActive ? ' on' : ''}`

  return (
    <nav className="sidebar">
      <div className="sb-logo">
        <div className="sb-mark"><svg viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg></div>
        <span className="sb-name">ppptv</span>
      </div>
      <div className="sb-nav">
        {NAV.map(n => (
          <NavLink key={n.to} to={n.to} end={n.end} className={cls}>
            <span className="ni"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{n.icon}</svg></span>
            <span className="nav-txt">{n.label}</span>
            {n.badge && <span className="nav-badge live-badge">{n.badge}</span>}
          </NavLink>
        ))}

        <div className="sb-section-label">You</div>

        {NAV2.map(n => (
          <NavLink key={n.to} to={n.to} className={cls}>
            <span className="ni"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{n.icon}</svg></span>
            <span className="nav-txt">{n.label}</span>
            {n.label==='Notifications' && unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
            {n.label==='Messages' && unreadMessages > 0 && <span className="nav-badge blue-badge">{unreadMessages}</span>}
          </NavLink>
        ))}

        <Link to="/compose" className="post-btn" style={{marginTop:8}}>Post</Link>

        <Link to="/admin" className="nav-lnk" style={{marginTop:8,background:'linear-gradient(135deg,rgba(232,32,58,.1),rgba(255,107,53,.05))',border:'1px solid rgba(232,32,58,.2)'}}>
          <span className="ni" style={{color:'var(--accent)'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
          <span className="nav-txt" style={{color:'var(--accent)',fontWeight:700}}>Admin HQ</span>
        </Link>
      </div>
      <div className="sb-foot">
        <div className="theme-row" onClick={toggleTheme} role="button" tabIndex={0}>
          <span style={{fontSize:13}}>{isDark ? '☀️ Light mode' : '🌙 Dark mode'}</span>
          <div className={`pill${isDark?' on':''}`}><div className="knob"/></div>
        </div>
        <Link to="/profile" className="user-row" style={{textDecoration:'none'}}>
          <div className="av av36" style={{background:'linear-gradient(135deg,#7c3aed,#a855f7)'}}>Y</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:700,color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>You</div>
            <div style={{fontSize:12,color:'var(--muted)'}}>@youhandle</div>
          </div>
        </Link>
      </div>
    </nav>
  )
}
