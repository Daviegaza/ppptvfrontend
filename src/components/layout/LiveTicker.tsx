import { useApp } from '../../context/AppContext'

export const LiveTicker = () => {
  const { tickerItems } = useApp()
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div className="ticker">
      <div className="ticker-lbl">LIVE</div>
      <div className="ticker-track">
        <div className="ticker-inner">
          {doubled.map((x, i) => (
            <span key={i}>
              <span style={{ marginRight: 8, opacity: 0.5 }}>●</span>{x}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
