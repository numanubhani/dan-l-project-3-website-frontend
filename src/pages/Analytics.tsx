import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Download,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui-primitives';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

const revenueData = [
  { name: 'Mon', value: 1200 },
  { name: 'Tue', value: 2100 },
  { name: 'Wed', value: 1800 },
  { name: 'Thu', value: 2400 },
  { name: 'Fri', value: 3200 },
  { name: 'Sat', value: 4500 },
  { name: 'Sun', value: 3800 },
];

const channelData = [
  { name: 'Email', value: 65, color: '#4f46e5' },
  { name: 'SMS', value: 35, color: '#8b5cf6' },
];

const campaignPerformance = [
  { name: 'Summer Sale', sent: 1200, opened: 800, clicked: 400 },
  { name: 'Welcome', sent: 800, opened: 600, clicked: 200 },
  { name: 'Cart Recovery', sent: 400, opened: 300, clicked: 150 },
  { name: 'Newsletter', sent: 2000, opened: 900, clicked: 100 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState('Last 7 Days');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Deep dive into your marketing performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">
            <Calendar className="w-4 h-4 mr-2" /> {dateRange}
          </Button>
          <Button variant="outline" className="bg-white">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Revenue" 
          value="$18,245" 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign} 
        />
        <MetricCard 
          title="Avg. Open Rate" 
          value="45.2%" 
          change="+2.1%" 
          trend="up" 
          icon={Mail} 
        />
        <MetricCard 
          title="Click-Through Rate" 
          value="12.8%" 
          change="-0.5%" 
          trend="down" 
          icon={ArrowUpRight} 
        />
        <MetricCard 
          title="Total Subscribers" 
          value="2,450" 
          change="+120" 
          trend="up" 
          icon={Users} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Attribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4f46e5" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Channel Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                  <p className="text-xs text-gray-500">Traffic</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-md text-indigo-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">Email</span>
                </div>
                <span className="font-bold text-gray-900">65%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-md text-purple-600">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">SMS</span>
                </div>
                <span className="font-bold text-gray-900">35%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignPerformance} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="sent" name="Sent" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="opened" name="Opened" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicked" name="Clicked" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, change, trend, icon: Icon }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-gray-50 rounded-lg">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
          <div className={cn(
            "flex items-center text-xs font-medium px-2 py-1 rounded-full",
            trend === 'up' ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
          )}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {change}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
