import { useApp } from '../context/AppContext'
import type { Prediction } from '../types'

const fmt = (n: number) => n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n)

const PredictionCard = ({ pred }: { pred: Prediction }) => {
  const { voteOnPrediction } = useApp()
  const total = pred.options.reduce((s,o) => s+o.votes, 0) || 1
  return (
    <div style={{ padding:'20px', borderBottom:'1px solid var(--border)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
        <div className="av av36" style={{ background:pred.author.avatarColor }}>{pred.author.name[0]}</div>
        <div>
          <div style={{ fontWeight:700, fontSize:14, display:'flex', alignItems:'center', gap:5 }}>{pred.author.name} {pred.author.verified && <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--blue)"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}</div>
          <div style={{ fontSize:12, color:'var(--muted)' }}>{pred.timestamp} · {pred.category}</div>
        </div>
        <div style={{ marginLeft:'auto' }}>
          <span style={{ fontSize:11, fontWeight:800, fontFamily:'var(--font-display)', padding:'3px 8px', borderRadius:'var(--r-full)', background: pred.status==='open'?'rgba(34,197,94,0.15)':'var(--surface3)', color: pred.status==='open'?'var(--green)':'var(--muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>{pred.status}</span>
        </div>
      </div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:800, lineHeight:1.3, marginBottom:6 }}>{pred.question}</div>
      {pred.description && <div style={{ fontSize:13, color:'var(--text2)', marginBottom:14, lineHeight:1.5 }}>{pred.description}</div>}
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:12 }}>
        {pred.options.map(opt => {
          const pct = Math.round((opt.votes/total)*100)
          const isV = pred.voted === opt.id
          return (
            <div key={opt.id} onClick={() => pred.voted == null && voteOnPrediction(pred.id, opt.id)} style={{ position:'relative', border:`1px solid ${isV?'var(--accent)':'var(--border2)'}`, borderRadius:'var(--r-sm)', padding:'10px 14px', cursor: pred.voted==null?'pointer':'default', overflow:'hidden', transition:'border-color 150ms' }}>
              <div style={{ position:'absolute', top:0, left:0, bottom:0, width: pred.voted!=null?`${pct}%`:'0%', background: isV?'var(--accent-bg)':'rgba(59,130,246,0.08)', transition:'width 600ms ease' }}/>
              <div style={{ position:'relative', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:14, fontWeight: isV?700:500 }}>{opt.text}</span>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:'var(--blue)', fontFamily:'var(--font-mono)' }}>{opt.odds}</span>
                  {pred.voted!=null && <span style={{ fontSize:13, fontWeight:700, color: isV?'var(--accent)':'var(--muted)', fontFamily:'var(--font-mono)' }}>{pct}%</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ display:'flex', gap:16, fontSize:12, color:'var(--muted)', flexWrap:'wrap' }}>
        <span>🗳️ {fmt(pred.totalVotes)} votes</span>
        <span>❤️ {fmt(pred.likes)}</span>
        <span>💬 {fmt(pred.comments)}</span>
        <span>⏰ Closes {pred.deadline}</span>
      </div>
      <div style={{ display:'flex', gap:6, marginTop:10, flexWrap:'wrap' }}>
        {pred.tags.map(t => <span key={t} style={{ fontSize:12, color:'var(--blue)', fontWeight:500 }}>#{t}</span>)}
      </div>
    </div>
  )
}

export const PredictionsPage = () => {
  const { predictions } = useApp()
  const open = predictions.filter(p => p.status === 'open')
  const resolved = predictions.filter(p => p.status === 'resolved')
  return (
    <>
      <div className="page-hdr"><div className="page-title">Predictions</div></div>
      <div style={{ padding:'14px 20px', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ fontSize:14, color:'var(--text2)', lineHeight:1.5 }}>Make bold predictions, vote on outcomes, and track your accuracy. The wisdom — and folly — of the crowd.</div>
      </div>
      <div style={{ padding:'14px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid var(--border)' }}>🔮 Open Predictions ({open.length})</div>
      {open.map(p => <PredictionCard key={p.id} pred={p} />)}
      {resolved.length > 0 && (
        <>
          <div style={{ padding:'16px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', borderTop:'3px solid var(--surface3)', marginTop:8 }}>✅ Resolved</div>
          {resolved.map(p => <PredictionCard key={p.id} pred={p} />)}
        </>
      )}
    </>
  )
}
