import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileEdit, 
  ArrowUpRight,
  BarChart2
} from 'lucide-react';
import { Button, Card, Input } from '@/components/ui-primitives';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const CAMPAIGNS = [
  { 
    id: 1, 
    name: 'Summer Flash Sale', 
    status: 'Sent', 
    channel: 'email', 
    sentAt: '2 days ago', 
    sentCount: 892, 
    openRate: '42%', 
    clickRate: '12%', 
    revenue: '$1,240' 
  },
  { 
    id: 2, 
    name: 'Abandoned Cart Recovery', 
    status: 'Active', 
    channel: 'email', 
    sentAt: 'Ongoing', 
    sentCount: 145, 
    openRate: '65%', 
    clickRate: '28%', 
    revenue: '$3,450' 
  },
  { 
    id: 3, 
    name: 'VIP Exclusive Offer', 
    status: 'Scheduled', 
    channel: 'sms', 
    sentAt: 'Tomorrow, 10:00 AM', 
    sentCount: 50, 
    openRate: '-', 
    clickRate: '-', 
    revenue: '-' 
  },
  { 
    id: 4, 
    name: 'Weekly Newsletter', 
    status: 'Draft', 
    channel: 'email', 
    sentAt: '-', 
    sentCount: '-', 
    openRate: '-', 
    clickRate: '-', 
    revenue: '-' 
  },
  { 
    id: 5, 
    name: 'Customer Feedback Request', 
    status: 'Sent', 
    channel: 'email', 
    sentAt: '1 week ago', 
    sentCount: 850, 
    openRate: '38%', 
    clickRate: '5%', 
    revenue: '$0' 
  },
];

const TABS = ['All', 'Sent', 'Scheduled', 'Drafts', 'Active'];

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = CAMPAIGNS.filter(c => {
    const matchesTab = activeTab === 'All' || c.status === activeTab || (activeTab === 'Active' && c.status === 'Active');
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500">View and manage your email and SMS campaigns.</p>
        </div>
        <Link to="/campaigns/new">
          <Button className="shadow-lg shadow-indigo-200">
            <Plus className="w-4 h-4 mr-2" /> Create Campaign
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden border-gray-200 shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg self-start">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                    activeTab === tab
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search & Filter */}
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search campaigns..." 
                  className="pl-9 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="px-3">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 w-[40%]">Campaign</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Sent</th>
                <th className="px-6 py-3">Open Rate</th>
                <th className="px-6 py-3">Revenue</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <motion.tr 
                  key={campaign.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-lg flex-shrink-0",
                        campaign.channel === 'email' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                      )}>
                        {campaign.channel === 'email' ? <Mail className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          {campaign.channel === 'email' ? 'Email' : 'SMS'} • {campaign.sentCount !== '-' ? `${campaign.sentCount} recipients` : 'Not sent yet'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={campaign.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {campaign.sentAt}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {campaign.openRate !== '-' ? (
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{campaign.openRate}</span>
                        <span className="text-xs text-gray-400">({campaign.clickRate} clicks)</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {campaign.revenue}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <BarChart2 className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileEdit className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {filteredCampaigns.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No campaigns found</h3>
              <p className="mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    Sent: "bg-green-50 text-green-700 border-green-200",
    Active: "bg-blue-50 text-blue-700 border-blue-200",
    Scheduled: "bg-amber-50 text-amber-700 border-amber-200",
    Draft: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const icons = {
    Sent: CheckCircle2,
    Active: ArrowUpRight,
    Scheduled: Clock,
    Draft: FileEdit,
  };

  const Icon = icons[status as keyof typeof icons] || FileEdit;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
      styles[status as keyof typeof styles] || styles.Draft
    )}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}
