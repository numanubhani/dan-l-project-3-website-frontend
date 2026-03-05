import { useState } from 'react';
import { 
  User, 
  Building, 
  CreditCard, 
  Bell, 
  Shield, 
  Mail, 
  Smartphone,
  Save,
  Upload
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/components/ui-primitives';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const SECTIONS = [
  { id: 'general', label: 'General', icon: Building },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your workspace and account preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  activeSection === section.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <section.icon className={cn(
                  "w-4 h-4",
                  activeSection === section.id ? "text-indigo-600" : "text-gray-400"
                )} />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === 'general' && <GeneralSettings />}
              {activeSection === 'profile' && <ProfileSettings />}
              {activeSection === 'billing' && <BillingSettings />}
              {activeSection === 'notifications' && <NotificationsSettings />}
              
              {activeSection === 'security' && (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                    <p>Two-factor authentication and password management coming soon.</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function NotificationsSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
          <div className="space-y-3">
            {[
              { id: 'campaign_sent', label: 'Campaign Sent', desc: 'Get notified when a campaign is successfully sent.' },
              { id: 'weekly_report', label: 'Weekly Report', desc: 'Receive a weekly summary of your performance.' },
              { id: 'payment_success', label: 'Payment Successful', desc: 'Get notified when your subscription renews.' },
            ].map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id={item.id} 
                  defaultChecked 
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <label htmlFor={item.id} className="text-sm font-medium text-gray-900 block">{item.label}</label>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 space-y-4">
          <h4 className="text-sm font-medium text-gray-900">In-App Alerts</h4>
          <div className="space-y-3">
            {[
              { id: 'new_subscriber', label: 'New Subscriber', desc: 'Show an alert when someone joins your list.' },
              { id: 'low_credits', label: 'Low SMS Credits', desc: 'Warn me when my SMS credits are running low.' },
            ].map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id={item.id} 
                  defaultChecked 
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <label htmlFor={item.id} className="text-sm font-medium text-gray-900 block">{item.label}</label>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workspace Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
              <Building className="w-8 h-8" />
            </div>
            <div>
              <Button variant="outline" size="sm" className="mb-2">
                <Upload className="w-3 h-3 mr-2" /> Upload Logo
              </Button>
              <p className="text-xs text-gray-500">Recommended size: 400x400px</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input id="workspace-name" defaultValue="Jane's Bakery" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" defaultValue="https://janesbakery.com" className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sender Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="sender-name">Sender Name</Label>
              <Input id="sender-name" defaultValue="Jane from Bakery" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="sender-email">Reply-To Email</Label>
              <div className="flex gap-2 mt-1">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="sender-email" defaultValue="hello@janesbakery.com" className="pl-9" />
                </div>
                <Button variant="secondary">Verify</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" defaultValue="Jane" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" defaultValue="Doe" className="mt-1" />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" defaultValue="jane@bakery.com" className="mt-1" disabled />
          <p className="text-xs text-gray-500 mt-1">Contact support to change your email.</p>
        </div>
        <div className="pt-4 flex justify-end">
          <Button>Save Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white border-none">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-200 font-medium mb-1">Current Plan</p>
              <h3 className="text-3xl font-bold">Pro Plan</h3>
              <p className="text-indigo-200 text-sm mt-2">$29/month • Renews on Aug 1, 2024</p>
            </div>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/20">
              Active
            </span>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 flex gap-3">
            <Button variant="secondary" className="bg-white text-indigo-900 hover:bg-indigo-50 border-none">
              Manage Subscription
            </Button>
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              View Invoices
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center border border-gray-200">
                <span className="font-bold text-xs text-gray-600">VISA</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-xs text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <Button variant="outline" className="w-full mt-4">
            <PlusIcon className="w-4 h-4 mr-2" /> Add Payment Method
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function PlusIcon(props: any) {
  return <div {...props}><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div>
}
