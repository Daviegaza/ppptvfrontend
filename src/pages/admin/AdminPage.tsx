import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import type { BreakingAlert, TrendingTopic } from '../../types'
import { AUTHORS } from '../../data/mockData'

const ADMIN_NAV = [
  { id:'dashboard',  label:'Dashboard',     icon:<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></> },
  { id:'publish',    label:'Publish Post',  icon:<><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></> },
  { id:'breaking',   label:'Breaking News', icon:<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></> },
  { id:'moderation', label:'Moderation',    icon:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></> },
  { id:'trending',   label:'Trending',      icon:<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></> },
  { id:'live',       label:'Live Streams',  icon:<><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14"/></> },
  { id:'analytics',  label:'Analytics',     icon:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> },
]

const fmt = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n)

/* ─── Dashboard ─── */
const Dashboard = () => {
  const { posts, streams, trending, breakingAlerts } = useApp()
  const flagged   = posts.filter(p => p.isFlagged).length
  const liveCount = streams.filter(s => s.isLive).length
  const totalV    = posts.reduce((s,p) => s+p.views, 0)
  const totalL    = posts.reduce((s,p) => s+p.likes, 0)
  const stats = [
    { label:'Total Posts',      value:posts.length,             delta:'+3 today',         up:true },
    { label:'Live Now',         value:liveCount,                delta:`${liveCount} on air`, up:true },
    { label:'Breaking Alerts',  value:breakingAlerts.length,    delta:'active now',        up:false },
    { label:'Flagged Content',  value:flagged,                  delta: flagged>0?'review now':'all clear', up:flagged===0 },
    { label:'Trending Topics',  value:trending.length,          delta:'in feed',           up:true },
    { label:'Total Views',      value:fmt(totalV),              delta:'cumulative',        up:true },
    { label:'Total Likes',      value:fmt(totalL),              delta:'cumulative',        up:true },
    { label:'Total Reposts',    value:fmt(posts.reduce((s,p)=>s+p.reposts,0)), delta:'cumulative', up:true },
    { label:'Total Comments',   value:fmt(posts.reduce((s,p)=>s+p.comments,0)), delta:'cumulative', up:true },
  ]
  return (
    <>
      <div className="admin-hdr">
        <div>
          <div className="admin-hdr-title">HQ Dashboard</div>
          <div className="admin-hdr-sub">{new Date().toLocaleDateString('en-KE',{ weekday:'long', year:'numeric', month:'long', day:'numeric' })}</div>
        </div>
        <Link to="/" style={{ padding:'8px 16px', background:'var(--surface3)', border:'1px solid var(--border2)', borderRadius:'var(--r-full)', fontSize:13, fontWeight:700, color:'var(--text)', fontFamily:'var(--font-display)', textDecoration:'none' }}>← View App</Link>
      </div>
      <div className="admin-content">
        <div className="stats-grid" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ fontSize:28 }}>{s.value}</div>
              <div className={`stat-delta ${s.up?'up':'down'}`}>{s.up?'▲':'▼'} {s.delta}</div>
            </div>
          ))}
        </div>
        <div className="admin-panel">
          <div className="admin-panel-hdr"><div className="admin-panel-title">Recent Posts</div></div>
          <table className="admin-table">
            <thead><tr><th>Author</th><th>Content</th><th>Type</th><th>Views</th><th>Status</th></tr></thead>
            <tbody>
              {posts.slice(0,10).map(p => (
                <tr key={p.id}>
                  <td><div style={{ display:'flex', alignItems:'center', gap:8 }}><div className="av av32" style={{ background:p.author.avatarColor }}>{p.author.name[0]}</div><div><div style={{ fontWeight:600, fontSize:13 }}>{p.author.name}</div><div style={{ fontSize:11, color:'var(--muted)' }}>{p.timestamp}</div></div></div></td>
                  <td style={{ maxWidth:260 }}><div style={{ fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.content}</div></td>
                  <td><span style={{ fontSize:11, fontWeight:700, background: p.type==='breaking'?'var(--accent-bg)':p.type==='live'?'rgba(34,197,94,0.1)':'var(--surface3)', color: p.type==='breaking'?'var(--accent)':p.type==='live'?'var(--green)':'var(--muted)', padding:'2px 8px', borderRadius:'var(--r-full)', fontFamily:'var(--font-display)' }}>{p.type.toUpperCase()}</span></td>
                  <td style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--muted)' }}>{fmt(p.views)}</td>
                  <td>{p.isFlagged?<span style={{ fontSize:11, fontWeight:700, color:'var(--accent)', background:'var(--accent-bg)', padding:'2px 8px', borderRadius:'var(--r-full)' }}>🚩 Flagged</span>:p.isPinned?<span style={{ fontSize:11, fontWeight:700, color:'var(--blue)', background:'rgba(59,130,246,0.1)', padding:'2px 8px', borderRadius:'var(--r-full)' }}>📌 Pinned</span>:<span style={{ fontSize:11, fontWeight:700, color:'var(--green)', background:'rgba(34,197,94,0.1)', padding:'2px 8px', borderRadius:'var(--r-full)' }}>✓ Live</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

/* ─── Publish Post ─── */
const PublishPost = () => {
  const { addPost, addToast } = useApp()
  const [form, setForm] = useState({ content:'', type:'news', category:'World', source:'ppptv', region:'', imageUrl:'', isBreaking:false, isPinned:false })
  const [busy, setBusy] = useState(false)
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p => ({ ...p, [k]:e.target.value }))
  const publish = async () => {
    if (!form.content.trim()) { addToast('Content is required', 'error'); return }
    setBusy(true); await new Promise(r => setTimeout(r, 500))
    addPost({ id:`admin-${Date.now()}`, author:AUTHORS.ppptv, content:form.content.trim(), timestamp:'just now', type:form.type as any, likes:0, comments:0, reposts:0, views:0, newsSource:form.source||undefined, newsCategory:form.category||undefined, region:form.region||undefined, image:form.imageUrl||undefined, isBreaking:form.isBreaking, isPinned:form.isPinned })
    setForm({ content:'', type:'news', category:'World', source:'ppptv', region:'', imageUrl:'', isBreaking:false, isPinned:false }); setBusy(false)
  }
  return (
    <>
      <div className="admin-hdr"><div><div className="admin-hdr-title">Publish Post</div><div className="admin-hdr-sub">Compose and publish content directly to the feed</div></div></div>
      <div className="admin-content">
        <div className="admin-panel">
          <div className="admin-panel-hdr"><div className="admin-panel-title">New Post</div></div>
          <div className="admin-panel-body">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
              <div className="form-field" style={{ marginBottom:0 }}><label className="form-label">Post Type</label><select className="form-select" value={form.type} onChange={set('type')}>{['regular','news','breaking','live','debate'].map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}</select></div>
              <div className="form-field" style={{ marginBottom:0 }}><label className="form-label">Category</label><select className="form-select" value={form.category} onChange={set('category')}>{['World','Politics','Business','Technology','Health','Sports','Culture','Science','Local','Climate'].map(c=><option key={c} value={c}>{c}</option>)}</select></div>
            </div>
            <div className="form-field"><label className="form-label">Content *</label><textarea className="form-textarea" rows={6} placeholder="Write your post content…" value={form.content} onChange={set('content')} style={{ minHeight:140 }}/><div style={{ fontSize:12, color:form.content.length>280?'var(--accent)':'var(--muted)', textAlign:'right', marginTop:4 }}>{form.content.length}/280</div></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <div className="form-field"><label className="form-label">Source</label><input className="form-input" type="text" value={form.source} onChange={set('source')}/></div>
              <div className="form-field"><label className="form-label">Region</label><input className="form-input" type="text" placeholder="e.g. Nairobi, KE" value={form.region} onChange={set('region')}/></div>
            </div>
            <div className="form-field"><label className="form-label">Image URL (optional)</label><input className="form-input" type="url" placeholder="https://…" value={form.imageUrl} onChange={set('imageUrl')}/></div>
            {form.imageUrl && <div style={{ marginBottom:14, borderRadius:'var(--r-md)', overflow:'hidden', border:'1px solid var(--border)', maxHeight:200 }}><img src={form.imageUrl} alt="preview" style={{ width:'100%', height:200, objectFit:'cover' }} onError={e=>(e.currentTarget.style.display='none')}/></div>}
            <div style={{ display:'flex', gap:20, marginBottom:20 }}>
              {[{key:'isBreaking',label:'🔴 Breaking'},{key:'isPinned',label:'📌 Pinned'}].map(opt=>(
                <label key={opt.key} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:14, fontWeight:500 }}>
                  <input type="checkbox" checked={form[opt.key as keyof typeof form] as boolean} onChange={e=>setForm(p=>({...p,[opt.key]:e.target.checked}))} style={{ accentColor:'var(--accent)', width:16, height:16 }}/>{opt.label}
                </label>
              ))}
            </div>
            <button className="btn btn-primary" onClick={publish} disabled={busy} style={{ width:'100%', justifyContent:'center', padding:13 }}>{busy?'Publishing…':'🚀 Publish Post'}</button>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Breaking News ─── */
const BreakingNews = () => {
  const { addBreakingAlert, breakingAlerts, dismissAlert } = useApp()
  const [form, setForm] = useState({ headline:'', summary:'', category:'World', urgency:'urgent' as 'normal'|'urgent'|'critical', source:'ppptv Breaking' })
  const [busy, setBusy] = useState(false)
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p=>({...p,[k]:e.target.value}))
  const publish = async () => {
    if (!form.headline.trim()) return; setBusy(true); await new Promise(r=>setTimeout(r,400))
    addBreakingAlert({ id:`b${Date.now()}`, headline:form.headline.trim(), summary:form.summary||undefined, category:form.category, urgency:form.urgency, timestamp:'just now', source:form.source })
    setForm({ headline:'', summary:'', category:'World', urgency:'urgent', source:'ppptv Breaking' }); setBusy(false)
  }
  const urgencyColor = { normal:'var(--blue)', urgent:'var(--orange)', critical:'var(--accent)' }
  return (
    <>
      <div className="admin-hdr"><div><div className="admin-hdr-title">Breaking News</div><div className="admin-hdr-sub">Push urgent alerts to the ticker and homepage banners</div></div></div>
      <div className="admin-content">
        <div className="admin-panel">
          <div className="admin-panel-hdr"><div className="admin-panel-title">🔴 New Breaking Alert</div></div>
          <div className="admin-panel-body">
            <div className="form-field"><label className="form-label">Headline *</label><input className="form-input" type="text" placeholder="Clear, concise breaking news headline…" value={form.headline} onChange={set('headline')}/></div>
            <div className="form-field"><label className="form-label">Summary (optional)</label><textarea className="form-textarea" rows={3} placeholder="Add more context…" value={form.summary} onChange={set('summary')}/></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <div className="form-field"><label className="form-label">Category</label><select className="form-select" value={form.category} onChange={set('category')}>{['World','Politics','Business','Health','Technology','Sports','Local','Conflict','Disaster'].map(c=><option key={c} value={c}>{c}</option>)}</select></div>
              <div className="form-field"><label className="form-label">Source</label><input className="form-input" type="text" value={form.source} onChange={set('source')}/></div>
            </div>
            <div className="form-field"><label className="form-label">Urgency Level</label>
              <div className="urgency-btns">
                {(['normal','urgent','critical'] as const).map(u=>(
                  <button key={u} className={`urgency-btn${form.urgency===u?` on ${u}`:''}`} onClick={()=>setForm(p=>({...p,urgency:u}))}>{u==='normal'?'🔵 Normal':u==='urgent'?'🟠 Urgent':'🔴 Critical'}</button>
                ))}
              </div>
            </div>
            {form.headline && <div style={{ marginBottom:16, padding:'12px 16px', borderLeft:`3px solid ${urgencyColor[form.urgency]}`, background:`${urgencyColor[form.urgency]}12`, borderRadius:'0 var(--r-sm) var(--r-sm) 0' }}>
              <div style={{ fontSize:11, fontWeight:800, color:urgencyColor[form.urgency], textTransform:'uppercase', letterSpacing:'1px', fontFamily:'var(--font-display)' }}>Preview · {form.category} · {form.urgency.toUpperCase()}</div>
              <div style={{ fontSize:14, fontWeight:700, marginTop:4 }}>{form.headline}</div>
              {form.summary && <div style={{ fontSize:13, color:'var(--text2)', marginTop:4 }}>{form.summary}</div>}
            </div>}
            <button className="btn btn-primary" onClick={publish} disabled={busy||!form.headline.trim()} style={{ width:'100%', justifyContent:'center', padding:13 }}>{busy?'Pushing…':'🔴 Push Breaking Alert'}</button>
          </div>
        </div>
        {breakingAlerts.length > 0 && (
          <div className="admin-panel">
            <div className="admin-panel-hdr"><div className="admin-panel-title">Active Alerts ({breakingAlerts.length})</div></div>
            <table className="admin-table">
              <thead><tr><th>Headline</th><th>Category</th><th>Urgency</th><th>Time</th><th>Action</th></tr></thead>
              <tbody>
                {breakingAlerts.map(a=>(
                  <tr key={a.id}>
                    <td style={{ fontWeight:600, fontSize:13, maxWidth:280 }}>{a.headline}</td>
                    <td style={{ fontSize:12 }}>{a.category}</td>
                    <td><span style={{ fontSize:11, fontWeight:700, color:urgencyColor[a.urgency], background:urgencyColor[a.urgency]+'18', padding:'2px 8px', borderRadius:'var(--r-full)', fontFamily:'var(--font-display)' }}>{a.urgency.toUpperCase()}</span></td>
                    <td style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--font-mono)' }}>{a.timestamp}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={()=>dismissAlert(a.id)}>Dismiss</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

/* ─── Moderation ─── */
const Moderation = () => {
  const { posts, deletePost, approvePost, featurePost, pinPost } = useApp()
  const flagged = posts.filter(p => p.isFlagged)
  return (
    <>
      <div className="admin-hdr"><div><div className="admin-hdr-title">Content Moderation</div><div className="admin-hdr-sub">Review, approve, pin, or remove content from the platform</div></div></div>
      <div className="admin-content">
        {flagged.length > 0 ? (
          <div className="admin-panel" style={{ border:'1px solid rgba(232,32,58,0.3)', marginBottom:16 }}>
            <div className="admin-panel-hdr" style={{ background:'var(--accent-bg)' }}><div className="admin-panel-title" style={{ color:'var(--accent)' }}>🚩 Flagged Content ({flagged.length})</div></div>
            <table className="admin-table">
              <thead><tr><th>Author</th><th>Content</th><th>Reason</th><th>Actions</th></tr></thead>
              <tbody>{flagged.map(p=>(
                <tr key={p.id}>
                  <td><div style={{ display:'flex', alignItems:'center', gap:8 }}><div className="av av32" style={{ background:p.author.avatarColor }}>{p.author.name[0]}</div><span style={{ fontSize:13, fontWeight:600 }}>@{p.author.handle}</span></div></td>
                  <td style={{ fontSize:13, maxWidth:240 }}><div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.content}</div><div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{p.timestamp}</div></td>
                  <td style={{ fontSize:12, color:'var(--orange)' }}>{p.flagReason??'Reported by users'}</td>
                  <td><div style={{ display:'flex', gap:6 }}><button className="btn btn-success btn-sm" onClick={()=>approvePost(p.id)}>✓ Approve</button><button className="btn btn-danger btn-sm" onClick={()=>deletePost(p.id)}>✕ Remove</button></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        ) : (
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:24, textAlign:'center', marginBottom:16 }}>
            <div style={{ fontSize:28, marginBottom:8 }}>✅</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:800 }}>No flagged content</div>
            <div style={{ fontSize:14, color:'var(--muted)', marginTop:4 }}>All content is clean.</div>
          </div>
        )}
        <div className="admin-panel">
          <div className="admin-panel-hdr"><div className="admin-panel-title">All Posts ({posts.length})</div></div>
          <table className="admin-table">
            <thead><tr><th>Author</th><th>Content</th><th>Engagement</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{posts.slice(0,20).map(p=>(
              <tr key={p.id}>
                <td><div style={{ display:'flex', alignItems:'center', gap:8 }}><div className="av av32" style={{ background:p.author.avatarColor }}>{p.author.name[0]}</div><div><div style={{ fontSize:13, fontWeight:600 }}>{p.author.name}</div><div style={{ fontSize:11, color:'var(--muted)' }}>{p.timestamp}</div></div></div></td>
                <td style={{ maxWidth:220 }}><div style={{ fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.content}</div></td>
                <td style={{ fontSize:12, color:'var(--muted)' }}><div>❤ {fmt(p.likes)}</div><div>👁 {fmt(p.views)}</div></td>
                <td>{p.isFlagged?<span style={{ fontSize:11,fontWeight:700,color:'var(--accent)',background:'var(--accent-bg)',padding:'2px 7px',borderRadius:'var(--r-full)' }}>Flagged</span>:p.isPinned?<span style={{ fontSize:11,fontWeight:700,color:'var(--blue)',background:'rgba(59,130,246,0.1)',padding:'2px 7px',borderRadius:'var(--r-full)' }}>Pinned</span>:<span style={{ fontSize:11,fontWeight:700,color:'var(--green)',background:'rgba(34,197,94,0.1)',padding:'2px 7px',borderRadius:'var(--r-full)' }}>Live</span>}</td>
                <td><div style={{ display:'flex', gap:4 }}><button className="btn btn-secondary btn-sm" onClick={()=>pinPost(p.id)} title="Pin">📌</button><button className="btn btn-danger btn-sm" onClick={()=>deletePost(p.id)} title="Delete">✕</button></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </>
  )
}

/* ─── Trending Manager ─── */
const TrendingManager = () => {
  const { trending, addTrendingTopic, removeTrendingTopic } = useApp()
  const [form, setForm] = useState({ tag:'', category:'World', postCount:'' })
  const add = () => {
    if (!form.tag.trim()) return
    addTrendingTopic({ id:`t${Date.now()}`, tag:form.tag.startsWith('#')?form.tag:`#${form.tag}`, category:form.category, postCount:parseInt(form.postCount)||Math.floor(Math.random()*50000)+5000, change:Math.floor(Math.random()*200)+20 })
    setForm({ tag:'', category:'World', postCount:'' })
  }
  return (
    <>
      <div className="admin-hdr"><div><div className="admin-hdr-title">Trending Manager</div><div className="admin-hdr-sub">Control what topics trend on ppptv</div></div></div>
      <div className="admin-content">
        <div className="admin-panel">
          <div className="admin-panel-hdr"><div className="admin-panel-title">Add Trending Topic</div></div>
          <div className="admin-panel-body">
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr auto', gap:12, alignItems:'flex-end' }}>
              <div className="form-field" style={{ marginBottom:0 }}><label className="form-label">Hashtag</label><input className="form-input" type="text" placeholder="#TopicName" value={form.tag} onChange={e=>setForm(p=>({...p,tag:e.target.value}))} onKeyDown={e=>e.key==='Enter'&&add()}/></div>
              <div className="form-field" style={{ marginBottom:0 }}><label className="form-label">Category</label><select className="form-select" value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>{['World','Politics','Business','Tech','Health','Sports','Culture','Climate'].map(c=><option key={c} value={c}>{c}</option>)}</select></div>
              <div className="form-field" style={{ marginBottom:0 }}><label className="form-label">Post Count</label><input className="form-input" type="number" placeholder="Auto" value={form.postCount} onChange={e=>setForm(p=>({...p,postCount:e.target.value}))}/></div>
              <button className="btn btn-primary" onClick={add} style={{ alignSelf:'flex-end' }}>+ Add</button>
            </div>
          </div>
        </div>
        <div className="admin-panel">
          <div className="admin-panel-hdr"><div className="admin-panel-title">Current Trending ({trending.length})</div></div>
          <table className="admin-table">
            <thead><tr><th>#</th><th>Topic</th><th>Category</th><th>Posts</th><th>Growth</th><th>Action</th></tr></thead>
            <tbody>{trending.map((t,i)=>(
              <tr key={t.id}>
                <td style={{ fontFamily:'var(--font-mono)', color:'var(--muted2)', fontWeight:700 }}>{String(i+1).padStart(2,'0')}</td>
                <td style={{ fontWeight:700, color:'var(--blue)' }}>{t.tag}</td>
                <td style={{ fontSize:12 }}>{t.category}</td>
                <td style={{ fontFamily:'var(--font-mono)', fontSize:13 }}>{fmt(t.postCount)}</td>
                <td style={{ color:'var(--green)', fontWeight:700, fontSize:13 }}>+{t.change}%</td>
                <td><button className="btn btn-danger btn-sm" onClick={()=>removeTrendingTopic(t.id)}>Remove</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </>
  )
}

/* ─── Live Manager ─── */
const LiveManager = () => {
  const { streams, featureStream, endStream } = useApp()
  return (
    <>
      <div className="admin-hdr"><div><div className="admin-hdr-title">Live Streams</div><div className="admin-hdr-sub">Manage live broadcasts and feature streams on the homepage</div></div></div>
      <div className="admin-content">
        <div className="admin-panel">
          <div className="admin-panel-hdr"><div className="admin-panel-title">All Streams ({streams.length})</div></div>
          <table className="admin-table">
            <thead><tr><th>Stream</th><th>Host</th><th>Category</th><th>Viewers</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{streams.map(s=>(
              <tr key={s.id}>
                <td><div style={{ display:'flex', alignItems:'center', gap:10 }}><img src={s.thumbnail} alt="" style={{ width:60, height:38, objectFit:'cover', borderRadius:4 }}/><div style={{ fontSize:13, fontWeight:600, maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.title}</div></div></td>
                <td><div style={{ display:'flex', alignItems:'center', gap:6 }}><div className="av av32" style={{ background:s.host.avatarColor }}>{s.host.name[0]}</div><span style={{ fontSize:13 }}>{s.host.name}</span></div></td>
                <td style={{ fontSize:12 }}>{s.category}</td>
                <td style={{ fontFamily:'var(--font-mono)', fontSize:13, color:s.isLive?'var(--accent)':'var(--muted)' }}>{s.isLive?`👁 ${fmt(s.viewers)}`:'—'}</td>
                <td><span style={{ fontSize:11, fontWeight:700, color:s.isLive?'var(--green)':'var(--muted)', background:s.isLive?'rgba(34,197,94,0.1)':'var(--surface3)', padding:'2px 8px', borderRadius:'var(--r-full)' }}>{s.isLive?'🔴 LIVE':'ENDED'}</span>{s.isFeatured&&<span style={{ marginLeft:6, fontSize:11, fontWeight:700, color:'var(--yellow)', background:'rgba(234,179,8,0.15)', padding:'2px 7px', borderRadius:'var(--r-full)' }}>⭐</span>}</td>
                <td><div style={{ display:'flex', gap:6 }}><button className="btn btn-secondary btn-sm" onClick={()=>featureStream(s.id)}>{s.isFeatured?'Unfeature':'⭐ Feature'}</button>{s.isLive&&<button className="btn btn-danger btn-sm" onClick={()=>endStream(s.id)}>End</button>}</div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </>
  )
}

/* ─── Analytics ─── */
const Analytics = () => {
  const { posts } = useApp()
  const totV = posts.reduce((s,p)=>s+p.views,0)
  const totL = posts.reduce((s,p)=>s+p.likes,0)
  const totR = posts.reduce((s,p)=>s+p.reposts,0)
  const totC = posts.reduce((s,p)=>s+p.comments,0)
  const topPost = [...posts].sort((a,b)=>b.views-a.views)[0]
  const typeBreakdown = posts.reduce((acc,p)=>{ acc[p.type]=(acc[p.type]||0)+1; return acc },{} as Record<string,number>)
  const BAR = [{ l:'Mon',v:42 },{ l:'Tue',v:78 },{ l:'Wed',v:61 },{ l:'Thu',v:95 },{ l:'Fri',v:88 },{ l:'Sat',v:54 },{ l:'Sun',v:71 }]
  const maxB = Math.max(...BAR.map(d=>d.v))
  return (
    <>
      <div className="admin-hdr"><div><div className="admin-hdr-title">Analytics</div><div className="admin-hdr-sub">Platform performance and content insights</div></div></div>
      <div className="admin-content">
        <div className="stats-grid">
          {[['Total Views',fmt(totV)],['Total Likes',fmt(totL)],['Total Reposts',fmt(totR)],['Total Comments',fmt(totC)],['Avg Engagement',`${((totL+totR+totC)/posts.length/1000).toFixed(1)}K`],['Posts Published',String(posts.length)]].map(([k,v])=>(
            <div key={k} className="stat-card"><div className="stat-label">{k}</div><div className="stat-value" style={{ fontSize:24 }}>{v}</div><div className="stat-delta up">▲ this week</div></div>
          ))}
        </div>
        <div className="admin-panel">
          <div className="admin-panel-hdr"><div className="admin-panel-title">Posts This Week</div></div>
          <div className="admin-panel-body">
            <div style={{ display:'flex', alignItems:'flex-end', gap:10, height:140 }}>
              {BAR.map(d=>(
                <div key={d.l} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6, height:'100%', justifyContent:'flex-end' }}>
                  <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)' }}>{d.v}</div>
                  <div style={{ width:'100%', background:'var(--accent)', borderRadius:'var(--r-xs) var(--r-xs) 0 0', height:`${(d.v/maxB)*100}px`, opacity:0.85 }}/>
                  <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)' }}>{d.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <div className="admin-panel">
            <div className="admin-panel-hdr"><div className="admin-panel-title">Post Types</div></div>
            <div className="admin-panel-body">
              {Object.entries(typeBreakdown).map(([type,count])=>(
                <div key={type} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <div style={{ width:90, fontSize:12, fontWeight:700, color:'var(--text2)', textTransform:'capitalize' }}>{type}</div>
                  <div style={{ flex:1, height:8, background:'var(--surface3)', borderRadius:4, overflow:'hidden' }}><div style={{ height:'100%', background:'var(--accent)', width:`${(count/posts.length)*100}%`, borderRadius:4 }}/></div>
                  <div style={{ fontSize:12, fontFamily:'var(--font-mono)', color:'var(--muted)', minWidth:24, textAlign:'right' }}>{count}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="admin-panel">
            <div className="admin-panel-hdr"><div className="admin-panel-title">Top Post</div></div>
            <div className="admin-panel-body">
              {topPost && (<>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                  <div className="av av36" style={{ background:topPost.author.avatarColor }}>{topPost.author.name[0]}</div>
                  <div><div style={{ fontSize:13, fontWeight:700 }}>{topPost.author.name}</div><div style={{ fontSize:11, color:'var(--muted)' }}>{topPost.timestamp}</div></div>
                </div>
                <div style={{ fontSize:13, lineHeight:1.5, color:'var(--text2)', marginBottom:12, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical' }}>{topPost.content}</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {[['Views',topPost.views],['Likes',topPost.likes],['Reposts',topPost.reposts],['Comments',topPost.comments]].map(([k,v])=>(
                    <div key={k as string} style={{ background:'var(--surface2)', borderRadius:'var(--r-sm)', padding:'8px 10px' }}>
                      <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-display)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px' }}>{k}</div>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, marginTop:2 }}>{fmt(v as number)}</div>
                    </div>
                  ))}
                </div>
              </>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Main Admin Page ─── */
export const AdminPage = () => {
  const [active, setActive] = useState('dashboard')
  const { posts, breakingAlerts } = useApp()
  const flaggedCount = posts.filter(p=>p.isFlagged).length

  const panels: Record<string, React.ReactNode> = {
    dashboard:  <Dashboard/>,
    publish:    <PublishPost/>,
    breaking:   <BreakingNews/>,
    moderation: <Moderation/>,
    trending:   <TrendingManager/>,
    live:       <LiveManager/>,
    analytics:  <Analytics/>,
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div style={{ width:28, height:28, background:'var(--accent)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M5 3l14 9-14 9V3z"/></svg>
          </div>
          <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:16 }}>ppptv</span>
          <span className="admin-logo-badge">HQ</span>
        </div>
        {ADMIN_NAV.map(n=>(
          <button key={n.id} className={`admin-nav-lnk${active===n.id?' on':''}`} onClick={()=>setActive(n.id)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{n.icon}</svg>
            <span style={{ flex:1 }}>{n.label}</span>
            {n.id==='moderation'&&flaggedCount>0&&<span style={{ fontSize:10, fontWeight:800, background:'var(--accent)', color:'#fff', padding:'1px 6px', borderRadius:'var(--r-full)', fontFamily:'var(--font-display)' }}>{flaggedCount}</span>}
            {n.id==='breaking'&&breakingAlerts.length>0&&<span style={{ fontSize:10, fontWeight:800, background:'var(--orange)', color:'#fff', padding:'1px 6px', borderRadius:'var(--r-full)', fontFamily:'var(--font-display)' }}>{breakingAlerts.length}</span>}
          </button>
        ))}
        <div style={{ marginTop:'auto', paddingTop:12, borderTop:'1px solid var(--border)' }}>
          <Link to="/" className="admin-nav-lnk">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            View App
          </Link>
        </div>
      </aside>
      <div className="admin-main">{panels[active]}</div>
    </div>
  )
}
