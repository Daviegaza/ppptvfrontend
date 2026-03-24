import { useApp } from '../context/AppContext'

const fmt = (n: number) => n >= 1000 ? `${(n/1000).toFixed(0)}K` : String(n)

export const CommunitiesPage = () => {
  const { communities, joinCommunity } = useApp()
  const joined = communities.filter(c => c.isJoined)
  const suggested = communities.filter(c => !c.isJoined)
  const featured = communities.filter(c => c.isFeatured)

  return (
    <>
      <div className="page-hdr"><div className="page-title">Communities</div></div>
      {joined.length > 0 && (
        <>
          <div style={{ padding:'14px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid var(--border)' }}>✅ Your Communities ({joined.length})</div>
          {joined.map(c => (
            <div key={c.id} style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', display:'flex', gap:14, alignItems:'flex-start' }}>
              <div style={{ width:52, height:52, borderRadius:'var(--r-md)', background:c.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{c.name[0]}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:800, fontSize:15, fontFamily:'var(--font-display)', marginBottom:3 }}>{c.name}</div>
                <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.4, marginBottom:8 }}>{c.description}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>👥 {fmt(c.members)} members · 📝 {fmt(c.posts)} posts · {c.category}</div>
              </div>
              <button onClick={() => joinCommunity(c.id)} style={{ padding:'7px 16px', borderRadius:'var(--r-full)', border:'1px solid var(--border2)', background:'var(--surface3)', color:'var(--text)', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-display)', flexShrink:0 }}>Leave</button>
            </div>
          ))}
        </>
      )}
      <div style={{ padding:'14px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid var(--border)', borderTop: joined.length > 0 ? '3px solid var(--surface3)' : 'none', marginTop: joined.length > 0 ? 8 : 0 }}>🔥 Featured</div>
      {featured.filter(c => !c.isJoined).map(c => (
        <div key={c.id} style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)' }}>
          <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
            <div style={{ width:56, height:56, borderRadius:'var(--r-md)', background:c.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0, fontFamily:'var(--font-display)', fontWeight:800, color:'#fff' }}>{c.name[0]}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:800, fontSize:15, fontFamily:'var(--font-display)', marginBottom:3 }}>{c.name}</div>
              <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.4, marginBottom:8 }}>{c.description}</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginBottom:10 }}>👥 {fmt(c.members)} members · 📝 {fmt(c.posts)} posts</div>
              <button onClick={() => joinCommunity(c.id)} style={{ padding:'8px 20px', borderRadius:'var(--r-full)', border:'1px solid var(--border2)', background:'none', color:'var(--text)', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-display)' }}>Join</button>
            </div>
          </div>
        </div>
      ))}
      <div style={{ padding:'14px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid var(--border)', borderTop:'3px solid var(--surface3)', marginTop:8 }}>All Communities</div>
      {suggested.map(c => (
        <div key={c.id} style={{ display:'flex', gap:12, padding:'14px 20px', borderBottom:'1px solid var(--border)', alignItems:'center' }}>
          <div style={{ width:44, height:44, borderRadius:'var(--r-sm)', background:c.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0, fontFamily:'var(--font-display)', fontWeight:800, color:'#fff' }}>{c.name[0]}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontWeight:700, fontSize:14 }}>{c.name}</div>
            <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{fmt(c.members)} members · {c.category}</div>
          </div>
          <button onClick={() => joinCommunity(c.id)} style={{ padding:'6px 14px', borderRadius:'var(--r-full)', border:'1px solid var(--border2)', background:'none', color:'var(--text)', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'var(--font-display)', flexShrink:0 }}>Join</button>
        </div>
      ))}
    </>
  )
}
