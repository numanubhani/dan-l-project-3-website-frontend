import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, Tag } from 'lucide-react';
import { Button, Card, Input } from '@/components/ui-primitives';
import { cn } from '@/lib/utils';

const CONTACTS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 (555) 123-4567', tags: ['VIP', 'Active'], lastActive: '2 days ago' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '+1 (555) 987-6543', tags: ['New'], lastActive: '5 hours ago' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1 (555) 456-7890', tags: ['Inactive'], lastActive: '1 month ago' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '+1 (555) 234-5678', tags: ['VIP'], lastActive: '1 day ago' },
  { id: 5, name: 'Evan Wright', email: 'evan@example.com', phone: '+1 (555) 876-5432', tags: [], lastActive: '3 days ago' },
];

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = CONTACTS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500">Manage your customer list and segments.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary">Import CSV</Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Contact
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="hidden sm:flex">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Contact Info</th>
                <th className="px-6 py-3">Tags</th>
                <th className="px-6 py-3">Last Active</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        {contact.name.charAt(0)}
                      </div>
                      {contact.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-3 h-3" /> {contact.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Phone className="w-3 h-3" /> {contact.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {contact.tags.map(tag => (
                        <span key={tag} className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium border",
                          tag === 'VIP' ? "bg-amber-50 text-amber-700 border-amber-200" :
                          tag === 'Active' ? "bg-green-50 text-green-700 border-green-200" :
                          tag === 'Inactive' ? "bg-gray-100 text-gray-600 border-gray-200" :
                          "bg-blue-50 text-blue-700 border-blue-200"
                        )}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {contact.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
