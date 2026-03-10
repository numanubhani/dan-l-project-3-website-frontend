import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowUpRight, Users, Mail, MessageSquare, TrendingUp, DollarSign, Send, Sparkles, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui-primitives';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 700 },
];

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const showSuccess = searchParams.get('success') === 'true';

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setSearchParams({}, { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, setSearchParams]);

  return (
    <div className="space-y-8 relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 right-0 z-50 bg-green-50 text-green-800 px-4 py-3 rounded-lg shadow-sm border border-green-200 flex items-center gap-3"
          >
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Campaign Sent Successfully!</p>
              <p className="text-xs text-green-600">Your messages are on their way.</p>
            </div>
            <button onClick={() => setSearchParams({}, { replace: true })} className="ml-2 text-green-600 hover:text-green-800">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Good morning, Jane</h1>
          <p className="text-gray-500 dark:text-gray-400">Here's how your campaigns are performing.</p>
        </div>
        <Link to="/campaigns/new">
          <Button size="lg" className="w-full sm:w-auto shadow-indigo-200 dark:shadow-none shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value="$12,450" 
          change="+12%" 
          icon={DollarSign} 
          trend="up"
        />
        <StatCard 
          title="Messages Sent" 
          value="1,204" 
          change="+5%" 
          icon={SendIcon} 
          trend="up"
        />
        <StatCard 
          title="Open Rate" 
          value="42.8%" 
          change="-2%" 
          icon={Mail} 
          trend="down"
        />
        <StatCard 
          title="Active Contacts" 
          value="892" 
          change="+8%" 
          icon={Users} 
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue over time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" strokeOpacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      backgroundColor: 'var(--color-bg-tooltip, #fff)',
                      color: 'var(--color-text-tooltip, #000)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4f46e5" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestion & Recent */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">AI Suggestion</h3>
                  <p className="text-indigo-100 text-sm mb-4">
                    Your "Weekend Sale" campaign usually performs well on Fridays. Want to draft one for tomorrow?
                  </p>
                  <Link to="/campaigns/new?goal=promotion">
                    <Button variant="secondary" size="sm" className="w-full text-indigo-600 border-none hover:bg-white/90">
                      Draft Campaign
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Campaign Sent', target: 'Spring Sale', time: '2h ago', icon: SendIcon, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' },
                  { action: 'New Contact', target: 'mike@gmail.com', time: '5h ago', icon: Users, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' },
                  { action: 'Goal Reached', target: '$1k Revenue', time: '1d ago', icon: TrendingUp, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", item.color)}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.target}</p>
                    </div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon, trend }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className={cn(
            "flex items-center text-xs font-medium px-2 py-1 rounded-full",
            trend === 'up' ? "text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400" : "text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400"
          )}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : null}
            {change}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function SendIcon(props: any) {
  return <Send {...props} />;
}

function SparklesIcon(props: any) {
  return <Sparkles {...props} />;
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
