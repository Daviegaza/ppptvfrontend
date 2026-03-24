import { useState } from 'react'
import { useApp } from '../context/AppContext'

const fmt = (n: number) => n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n)
const CATS = ['All','Politics','Business','Sports','Technology','Health','Culture']

export const LivePage = () => {
  const { streams } = useApp()
  const [cat, setCat] = useState('All')
  const [featured, setFeatured] = useState(streams.find(s => s.isFeatured && s.isLive) ?? streams[0])

  const live   = streams.filter(s => s.isLive)
  const ended  = streams.filter(s => !s.isLive)
  const filtered = live.filter(s => cat === 'All' || s.category === cat)

  return (
    <>
      <div className="page-hdr">
        <div className="page-title">
          Live
          <span style={{ marginLeft:10, fontSize:11, fontWeight:800, background:'var(--accent)', color:'#fff', padding:'2px 8px', borderRadius:'var(--r-xs)', fontFamily:'var(--font-display)', letterSpacing:'1px', verticalAlign:'middle' }}>
            {live.length} ON AIR
          </span>
        </div>
      </div>

      {featured && (
        <div className="live-hero">
          <img src={featured.thumbnail} alt={featured.title} className="live-hero-img" />
          <div className="live-hero-overlay">
            <div className="live-badge"><div className="live-dot"/>{featured.isLive ? 'LIVE NOW' : 'ENDED'}</div>
            <div className="live-title">{featured.title}</div>
            <div className="live-viewers">
              {featured.isLive ? `👁 ${fmt(featured.viewers)} watching · ${featured.host.name} · ${featured.startedAt}` : `Stream ended · ${featured.host.name}`}
            </div>
            {featured.description && <div style={{ fontSize:13, color:'rgba(255,255,255,0.65)', marginTop:6, lineHeight:1.4 }}>{featured.description}</div>}
            {featured.isLive && (
              <button style={{ marginTop:14, padding:'10px 24px', background:'var(--accent)', color:'#fff', border:'none', borderRadius:'var(--r-full)', fontFamily:'var(--font-display)', fontWeight:800, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>
                <div className="live-dot" style={{ background:'#fff' }}/> Watch Live
              </button>
            )}
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:8, padding:'14px 20px', overflowX:'auto', borderBottom:'1px solid var(--border)', scrollbarWidth:'none' }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding:'6px 14px', borderRadius:'var(--r-full)', fontSize:13, fontWeight:700, fontFamily:'var(--font-display)', border:`1px solid ${cat===c?'var(--accent)':'var(--border2)'}`, background: cat===c?'var(--accent-bg)':'none', color: cat===c?'var(--accent)':'var(--text2)', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>{c}</button>
        ))}
      </div>

      <div style={{ padding:'14px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px' }}>
        🔴 Live Now · {filtered.length} stream{filtered.length !== 1 ? 's' : ''}
      </div>

      <div className="live-grid">
        {filtered.map(s => (
          <div key={s.id} className="live-card" onClick={() => setFeatured(s)}>
            <div className="live-thumb">
              <img src={s.thumbnail} alt={s.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              <span className="live-thumb-badge">LIVE</span>
            </div>
            <div className="live-card-info">
              <div className="live-card-cat">{s.category}</div>
              <div className="live-card-title">{s.title}</div>
              <div className="live-card-host" style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div className="av av32" style={{ background:s.host.avatarColor, display:'inline-flex', fontSize:11 }}>{s.host.name[0]}</div>
                {s.host.name}
                {s.host.verified && <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--blue)"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
              </div>
              <div className="live-card-viewers">👁 {fmt(s.viewers)} watching</div>
            </div>
            {s.isFeatured && <span style={{ alignSelf:'flex-start', fontSize:10, fontWeight:800, background:'var(--yellow)', color:'#000', padding:'2px 7px', borderRadius:'var(--r-xs)', fontFamily:'var(--font-display)', letterSpacing:'0.5px' }}>FEATURED</span>}
          </div>
        ))}
      </div>

      {ended.length > 0 && (
        <>
          <div style={{ padding:'20px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px' }}>Recently Ended</div>
          <div className="live-grid">
            {ended.map(s => (
              <div key={s.id} className="live-card" style={{ opacity:0.65 }}>
                <div className="live-thumb">
                  <img src={s.thumbnail} alt={s.title} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(40%)' }}/>
                  <span className="live-thumb-badge" style={{ background:'var(--muted2)' }}>ENDED</span>
                </div>
                <div className="live-card-info">
                  <div className="live-card-cat">{s.category}</div>
                  <div className="live-card-title">{s.title}</div>
                  <div className="live-card-host">{s.host.name}</div>
                  <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>Ended · {s.startedAt}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ height:40 }}/>
    </>
  )
}
