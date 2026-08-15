'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, getDaysInMonth, startOfMonth } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchTrades();
  }, []);

  async function fetchTrades() {
    try {
      const response = await fetch('/api/trades');
      if (response.ok) {
        setTrades(await response.json());
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentDate);
  const startDate = new Date(year, month, 1);
  const startingDayOfWeek = startDate.getDay();

  // Group trades by date
  const tradesByDate: { [key: string]: any[] } = {};
  trades.forEach((trade) => {
    const dateKey = format(new Date(trade.closeDate), 'yyyy-MM-dd');
    if (!tradesByDate[dateKey]) {
      tradesByDate[dateKey] = [];
    }
    tradesByDate[dateKey].push(trade);
  });

  // Calculate daily performance
  const dailyPerformance: { [key: string]: number } = {};
  Object.entries(tradesByDate).forEach(([dateKey, dayTrades]) => {
    const profit = dayTrades.reduce((acc, t) => acc + t.profitPercent, 0);
    dailyPerformance[dateKey] = profit;
  });

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const weeks: any[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getDateKey = (day: number) => format(new Date(year, month, day), 'yyyy-MM-dd');
  const getDayPerformance = (day: number) => dailyPerformance[getDateKey(day)] || 0;
  const getPerformanceColor = (profit: number) => {
    if (profit > 0) return 'bg-green-500/20 text-green-400';
    if (profit < 0) return 'bg-red-500/20 text-red-400';
    return 'bg-yellow-500/20 text-yellow-400';
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Calendar</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1))}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <p className="text-lg font-semibold w-48 text-center">{format(currentDate, 'MMMM yyyy')}</p>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1))}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-2">
                    {week.map((day, dayIndex) => {
                      if (!day) {
                        return <div key={dayIndex} className="aspect-square" />;
                      }

                      const performance = getDayPerformance(day);
                      const dateKey = getDateKey(day);
                      const dayTrades = tradesByDate[dateKey] || [];

                      return (
                        <div
                          key={day}
                          className={`aspect-square p-2 rounded-lg border border-border flex flex-col items-center justify-center text-center hover:bg-secondary/30 transition-colors cursor-pointer ${
                            dayTrades.length > 0 ? getPerformanceColor(performance) : ''
                          }`}
                        >
                          <p className="font-semibold text-sm">{day}</p>
                          {dayTrades.length > 0 && (
                            <>
                              <p className="text-xs">{dayTrades.length} trade{dayTrades.length > 1 ? 's' : ''}</p>
                              <p className="text-xs font-bold">{performance > 0 ? '+' : ''}{performance.toFixed(2)}%</p>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="mt-8 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/20 rounded border border-green-500/50" />
              <span className="text-sm text-muted-foreground">Profit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/20 rounded border border-red-500/50" />
              <span className="text-sm text-muted-foreground">Loss</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500/20 rounded border border-yellow-500/50" />
              <span className="text-sm text-muted-foreground">Break Even</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
