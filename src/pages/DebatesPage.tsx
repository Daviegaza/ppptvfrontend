import { useState } from 'react'
import { DEBATES } from '../data/mockData'
import type { Debate } from '../types'

const DebateCard = ({ d }: { d: Debate }) => {
  const [side, setSide] = useState<'for'|'against'|null>(null)
  const forVotes = d.forCount + (side === 'for' ? 1 : 0)
  const againstVotes = d.againstCount + (side === 'against' ? 1 : 0)
  const total = forVotes + againstVotes
  const forPct = Math.round((forVotes / total) * 100)
  return (
    <div style={{ padding:'20px', borderBottom:'1px solid var(--border)' }}>
      {d.isFeatured && <div style={{ fontSize:10, fontWeight:800, color:'var(--orange)', textTransform:'uppercase', letterSpacing:'1px', fontFamily:'var(--font-display)', marginBottom:8 }}>🔥 Featured Debate</div>}
      <div style={{ fontSize:11, fontWeight:800, color:'var(--blue)', textTransform:'uppercase', letterSpacing:'0.5px', fontFamily:'var(--font-display)', marginBottom:6 }}>{d.category}</div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:800, lineHeight:1.3, marginBottom:8 }}>{d.topic}</div>
      <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.5, marginBottom:14 }}>{d.description}</div>
      <div style={{ display:'flex', gap:8, marginBottom:14 }}>
        <button onClick={() => setSide(s => s==='for' ? null : 'for')} style={{ flex:1, padding:'10px', border:`2px solid ${side==='for'?'var(--green)':'var(--border2)'}`, borderRadius:'var(--r-md)', background: side==='for'?'rgba(34,197,94,0.1)':'none', color:side==='for'?'var(--green)':'var(--text2)', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all 150ms' }}>👍 For</button>
        <button onClick={() => setSide(s => s==='against' ? null : 'against')} style={{ flex:1, padding:'10px', border:`2px solid ${side==='against'?'var(--accent)':'var(--border2)'}`, borderRadius:'var(--r-md)', background: side==='against'?'var(--accent-bg)':'none', color:side==='against'?'var(--accent)':'var(--text2)', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all 150ms' }}>👎 Against</button>
      </div>
      <div style={{ fontSize:12, display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ color:'var(--green)', fontWeight:700 }}>For · {forPct}%</span>
        <span style={{ color:'var(--accent)', fontWeight:700 }}>{100-forPct}% · Against</span>
      </div>
      <div style={{ height:8, borderRadius:4, background:'var(--accent)', overflow:'hidden', marginBottom:10 }}>
        <div style={{ height:'100%', width:`${forPct}%`, background:'var(--green)', transition:'width 600ms ease' }}/>
      </div>
      <div style={{ display:'flex', gap:16, fontSize:12, color:'var(--muted)', flexWrap:'wrap' }}>
        <span>💬 {d.totalPosts.toLocaleString()} posts</span>
        <span>🗳️ {(forVotes+againstVotes).toLocaleString()} votes</span>
        <span>🕐 Ends {d.endsAt}</span>
      </div>
      <div style={{ display:'flex', gap:6, marginTop:10, flexWrap:'wrap' }}>
        {d.tags.map(t => <span key={t} style={{ fontSize:12, color:'var(--blue)', fontWeight:500 }}>#{t}</span>)}
      </div>
    </div>
  )
}

export const DebatesPage = () => (
  <>
    <div className="page-hdr"><div className="page-title">Debates</div></div>
    <div style={{ padding:'14px 20px', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>
      <div style={{ fontSize:14, color:'var(--text2)', lineHeight:1.5 }}>Vote, argue, and change minds. The best debates on what matters most in Africa and beyond.</div>
    </div>
    <div style={{ padding:'14px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid var(--border)' }}>Active Debates</div>
    {DEBATES.map(d => <DebateCard key={d.id} d={d} />)}
  </>
)
