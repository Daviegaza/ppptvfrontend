import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { PostCard } from '../components/feed/PostCard'
import { CATEGORIES } from '../data/mockData'

const FEATURED = [
  { id:'e1', category:'World',      headline:'Geneva AI Safety Pact — What 47 nations agreed to and what it means',            img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', source:'ppptv World',   time:'2h ago',  reads:'284K' },
  { id:'e2', category:'Health',     headline:'94% efficacy: The malaria vaccine that could save 400,000 lives a year',          img:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', source:'ppptv Health',  time:'4h ago',  reads:'198K' },
  { id:'e3', category:'Business',   headline:"NSE record: What's driving Nairobi's historic stock market surge",                img:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', source:'NSE Watch',     time:'6h ago',  reads:'97K'  },
  { id:'e4', category:'Sports',     headline:'Historic night: Harambee Stars qualify for AFCON 2025 with stunning 3-1 win',    img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', source:'ppptv Sports',  time:'8h ago',  reads:'1.2M' },
  { id:'e5', category:'Technology', headline:"Ghana's first EV is here — and it's made entirely in Accra",                     img:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80', source:'Tech Africa',   time:'10h ago', reads:'78K'  },
  { id:'e6', category:'Culture',    headline:'Nairobi becomes the centre of the world: Africa Global Music Summit opens',       img:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', source:'ppptv Culture', time:'12h ago', reads:'145K' },
]

const CAT_COLORS: Record<string,string> = { World:'var(--accent)', Health:'var(--green)', Business:'var(--yellow)', Sports:'var(--orange)', Technology:'var(--blue)', Culture:'var(--purple)', Politics:'var(--accent)', Climate:'var(--green)', Science:'var(--blue)', Local:'var(--muted)' }

export const ExplorePage = () => {
  const { posts, trending } = useApp()
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')

  const featFiltered = FEATURED.filter(f =>
    (cat === 'All' || f.category === cat) && (!q || f.headline.toLowerCase().includes(q.toLowerCase()))
  )
  const postFiltered = posts.filter(p =>
    (cat === 'All' || p.newsCategory === cat || p.tags?.includes(cat)) &&
    (!q || p.content.toLowerCase().includes(q.toLowerCase()) || p.author.name.toLowerCase().includes(q.toLowerCase()))
  ).slice(0, 8)

  return (
    <>
      <div className="page-hdr"><div className="page-title">Explore</div></div>

      <div style={{ padding:'12px 20px', borderBottom:'1px solid var(--border)' }}>
        <div className="s-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="s-inp" type="search" placeholder="Search news, topics, people…" value={q} onChange={e => setQ(e.target.value)} autoFocus />
          {q && <button onClick={() => setQ('')} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:18, lineHeight:1, padding:0 }}>×</button>}
        </div>
      </div>

      <div style={{ display:'flex', gap:8, padding:'12px 20px', overflowX:'auto', borderBottom:'1px solid var(--border)', scrollbarWidth:'none' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding:'6px 14px', borderRadius:'var(--r-full)', fontSize:13, fontWeight:700, fontFamily:'var(--font-display)', border:`1px solid ${cat===c?(CAT_COLORS[c]??'var(--accent)'):'var(--border2)'}`, background: cat===c?((CAT_COLORS[c]??'var(--accent)')+'18'):'none', color: cat===c?(CAT_COLORS[c]??'var(--accent)'):'var(--text2)', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>{c}</button>
        ))}
      </div>

      {!q && (
        <div style={{ padding:'12px 20px', borderBottom:'1px solid var(--border)', background:'var(--surface)' }}>
          <div style={{ fontSize:11, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', fontFamily:'var(--font-display)', marginBottom:10 }}>🔥 Trending Now</div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {trending.slice(0, 7).map(t => (
              <button key={t.id} onClick={() => setQ(t.tag.replace('#',''))} style={{ padding:'5px 12px', background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--r-full)', fontSize:13, fontWeight:600, color:'var(--text2)', cursor:'pointer', fontFamily:'var(--font-body)' }}>
                {t.tag} <span style={{ fontSize:11, color:'var(--green)', fontFamily:'var(--font-mono)' }}>+{t.change}%</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {featFiltered.length > 0 && (
        <>
          <div style={{ padding:'16px 20px 8px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px' }}>
            {q ? `Stories matching "${q}"` : 'Featured Stories'}
          </div>
          <div className="explore-grid">
            {featFiltered.map(f => (
              <div key={f.id} className="explore-card">
                <img src={f.img} alt="" className="explore-card-img" />
                <div className="explore-cat" style={{ color: CAT_COLORS[f.category]??'var(--accent)' }}>{f.category}</div>
                <div className="explore-headline">{f.headline}</div>
                <div className="explore-meta">{f.source} · {f.time} · {f.reads} reads</div>
              </div>
            ))}
          </div>
        </>
      )}

      {postFiltered.length > 0 && (
        <>
          <div style={{ padding:'16px 20px 0', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px' }}>
            {q ? 'Posts' : cat === 'All' ? 'Latest Posts' : `${cat} Posts`}
          </div>
          {postFiltered.map((p, i) => <PostCard key={p.id} post={p} delay={i * 30} />)}
        </>
      )}

      {q && featFiltered.length === 0 && postFiltered.length === 0 && (
        <div style={{ padding:'60px 20px', textAlign:'center', color:'var(--muted)' }}>
          <div style={{ fontSize:36, marginBottom:10 }}>🔍</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, marginBottom:6 }}>No results for "{q}"</div>
          <div style={{ fontSize:14 }}>Try a different search term or browse categories above</div>
        </div>
      )}
    </>
  )
}
