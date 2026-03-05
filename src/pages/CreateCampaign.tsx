import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShoppingBag, 
  RotateCcw, 
  Megaphone, 
  Bell, 
  Mail, 
  MessageSquare,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Button, Card, Input, Label } from '@/components/ui-primitives';
import { generateCampaignContent } from '@/lib/ai';
import { cn } from '@/lib/utils';

const GOALS = [
  { id: 'sales', icon: ShoppingBag, title: 'Increase Sales', desc: 'Promote a product or run a flash sale.' },
  { id: 'retention', icon: RotateCcw, title: 'Bring Customers Back', desc: 'Re-engage customers who haven\'t visited lately.' },
  { id: 'promotion', icon: Megaphone, title: 'Send Promotion', desc: 'Share a discount code or special offer.' },
  { id: 'update', icon: Bell, title: 'Announce Update', desc: 'Share news about your business or hours.' },
];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [goal, setGoal] = useState(searchParams.get('goal') || '');
  const [description, setDescription] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [channel, setChannel] = useState<'email' | 'sms'>('email');
  const [audience, setAudience] = useState('all');
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleGenerate = async () => {
    if (!description) return;
    setIsLoading(true);
    try {
      const content = await generateCampaignContent(goal, description, channel);
      setGeneratedContent(content || '');
      setStep(3);
    } catch (error) {
      console.error(error);
      // Handle error (toast)
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/?success=true');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span className={cn(step >= 1 && "text-indigo-600")}>1. Goal</span>
          <span className={cn(step >= 2 && "text-indigo-600")}>2. Content</span>
          <span className={cn(step >= 3 && "text-indigo-600")}>3. Review</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: '33%' }}
            animate={{ width: `${step * 33.33}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">What's your goal?</h1>
              <p className="text-gray-500 mt-2">Select a goal so our AI can craft the perfect message.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={cn(
                    "flex flex-col items-start p-6 rounded-xl border-2 transition-all text-left hover:shadow-md",
                    goal === g.id 
                      ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600" 
                      : "border-gray-200 bg-white hover:border-indigo-200"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-lg mb-4",
                    goal === g.id ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-600"
                  )}>
                    <g.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{g.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{g.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <Button 
                size="lg" 
                disabled={!goal} 
                onClick={() => setStep(2)}
                className="w-full sm:w-auto"
              >
                Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Let AI write it for you</h1>
              <p className="text-gray-500 mt-2">Describe what you want to say, and we'll handle the rest.</p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Channel</Label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setChannel('email')}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border font-medium transition-colors",
                        channel === 'email' 
                          ? "bg-indigo-50 border-indigo-600 text-indigo-700" 
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <Mail className="w-4 h-4" /> Email
                    </button>
                    <button
                      onClick={() => setChannel('sms')}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border font-medium transition-colors",
                        channel === 'sms' 
                          ? "bg-indigo-50 border-indigo-600 text-indigo-700" 
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <MessageSquare className="w-4 h-4" /> SMS
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">What's this campaign about?</Label>
                  <textarea
                    className="w-full min-h-[120px] p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                    placeholder="e.g. Offering 20% off all summer items this weekend only. Use code SUMMER20."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-between items-center mt-8">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button 
                size="lg" 
                disabled={!description || isLoading} 
                onClick={handleGenerate}
                isLoading={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 border-none"
              >
                <Sparkles className="w-4 h-4 mr-2" /> Generate Content
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Review & Send</h1>
              <p className="text-gray-500 mt-2">Make final tweaks before sending to your customers.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <Label className="mb-2 block">Message Content</Label>
                  <textarea
                    className="w-full min-h-[300px] p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-sm"
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={isLoading}>
                      <RotateCcw className="w-3 h-3 mr-2" /> Regenerate
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Campaign Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-gray-500 uppercase tracking-wider">Audience</Label>
                      <select 
                        className="w-full mt-1 p-2 bg-white border border-gray-200 rounded-md text-sm"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                      >
                        <option value="all">All Contacts (892)</option>
                        <option value="active">Active Customers (420)</option>
                        <option value="inactive">Inactive (30 days) (150)</option>
                        <option value="vip">VIPs (50)</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500 uppercase tracking-wider">Schedule</Label>
                      <div className="mt-2 space-y-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setScheduleType('now')}
                            className={cn(
                              "flex-1 py-2 px-3 text-sm rounded-md border transition-colors",
                              scheduleType === 'now'
                                ? "bg-indigo-50 border-indigo-600 text-indigo-700 font-medium"
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            Send Now
                          </button>
                          <button
                            onClick={() => setScheduleType('later')}
                            className={cn(
                              "flex-1 py-2 px-3 text-sm rounded-md border transition-colors",
                              scheduleType === 'later'
                                ? "bg-indigo-50 border-indigo-600 text-indigo-700 font-medium"
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            Schedule
                          </button>
                        </div>

                        {scheduleType === 'later' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="grid grid-cols-2 gap-2"
                          >
                            <div>
                              <Label htmlFor="date" className="text-xs mb-1 block">Date</Label>
                              <input
                                type="date"
                                id="date"
                                className="w-full p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            <div>
                              <Label htmlFor="time" className="text-xs mb-1 block">Time</Label>
                              <input
                                type="time"
                                id="time"
                                className="w-full p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                value={scheduledTime}
                                onChange={(e) => setScheduledTime(e.target.value)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Estimated Cost</span>
                        <span className="font-medium">$0.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Recipients</span>
                        <span className="font-medium">892</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Button 
                  size="lg" 
                  className="w-full text-lg h-14 shadow-xl shadow-indigo-200" 
                  onClick={handleSend}
                  isLoading={isLoading}
                  disabled={scheduleType === 'later' && (!scheduledDate || !scheduledTime)}
                >
                  {scheduleType === 'later' ? 'Schedule Campaign' : 'Send Campaign'} <SendIcon className="w-5 h-5 ml-2" />
                </Button>
                
                <Button variant="ghost" className="w-full" onClick={() => setStep(2)}>
                  Back to Edit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SendIcon(props: any) {
  return <ArrowRight {...props} />;
}
