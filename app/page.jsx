export default function Page() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: '#e2e8f0',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', color: '#10b981' }}>
          📊 Trading Journal
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px' }}>
          Профессиональное приложение для отслеживания торговли
        </p>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <StatCard label="Total Trades" value="25" />
          <StatCard label="Win Rate" value="68%" />
          <StatCard label="Total Profit" value="+245.5%" />
          <StatCard label="Avg RR" value="1.8" />
        </div>

        {/* Trades Table */}
        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #334155' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Недавние сделки</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>#</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Пара</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Дата</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Направление</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Результат</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Профит</th>
              </tr>
            </thead>
            <tbody>
              <TradeRow num="1" pair="EURUSD" date="15.08.2026" dir="LONG" result="WIN" profit="+2.5%" />
              <TradeRow num="2" pair="GBPUSD" date="14.08.2026" dir="SHORT" result="LOSS" profit="-1.2%" />
              <TradeRow num="3" pair="USDJPY" date="13.08.2026" dir="LONG" result="WIN" profit="+3.1%" />
              <TradeRow num="4" pair="XAUUSD" date="12.08.2026" dir="LONG" result="WIN" profit="+1.8%" />
              <TradeRow num="5" pair="BTCUSD" date="11.08.2026" dir="SHORT" result="WIN" profit="+4.5%" />
            </tbody>
          </table>
        </div>

        {/* Info */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#1e293b',
          borderRadius: '8px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ marginTop: 0 }}>✅ Готово к использованию!</h3>
          <p style={{ color: '#94a3b8' }}>
            • Отслеживайте все ваши сделки<br/>
            • Анализируйте результаты<br/>
            • Улучшайте стратегию торговли
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center'
    }}>
      <p style={{ color: '#94a3b8', margin: '0 0 10px 0', fontSize: '14px' }}>{label}</p>
      <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>{value}</p>
    </div>
  );
}

function TradeRow({ num, pair, date, dir, result, profit }) {
  const resultColor = result === 'WIN' ? '#10b981' : '#ef4444';
  const profitColor = profit.includes('-') ? '#ef4444' : '#10b981';
  
  return (
    <tr style={{ borderBottom: '1px solid #334155' }}>
      <td style={{ padding: '12px' }}>{num}</td>
      <td style={{ padding: '12px', fontWeight: 'bold' }}>{pair}</td>
      <td style={{ padding: '12px', color: '#94a3b8' }}>{date}</td>
      <td style={{ padding: '12px' }}>
        <span style={{
          backgroundColor: dir === 'LONG' ? '#10b98133' : '#ef444433',
          color: dir === 'LONG' ? '#10b981' : '#ef4444',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {dir}
        </span>
      </td>
      <td style={{ padding: '12px' }}>
        <span style={{
          backgroundColor: resultColor === '#10b981' ? '#10b98133' : '#ef444433',
          color: resultColor,
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {result}
        </span>
      </td>
      <td style={{ padding: '12px', fontWeight: 'bold', color: profitColor }}>{profit}</td>
    </tr>
  );
}
