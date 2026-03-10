import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  Star, 
  ArrowRight, 
  Globe, 
  MessageSquare, 
  Mail, 
  Zap,
  BarChart3,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui-primitives';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactCount, setContactCount] = useState(500);

  // Pricing calculation logic (simplified for demo)
  const calculatePrice = (basePrice: number, contacts: number) => {
    if (contacts <= 500) return basePrice;
    const multiplier = Math.ceil((contacts - 500) / 500);
    return (basePrice + (multiplier * 10)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">Sendify</span>
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
                <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
                <a href="#migration" className="hover:text-indigo-600 transition-colors">Migration</a>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="btn-simple">
                Log in
              </Link>
              <Link to="/login" className="btn-simple">
                Start free
              </Link>
            </div>
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#features" className="block text-base font-medium text-gray-900 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#pricing" className="block text-base font-medium text-gray-900 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Pricing</a>
                <a href="#migration" className="block text-base font-medium text-gray-900 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Migration</a>
                <div className="pt-4 flex flex-col gap-3">
                  <Link to="/login" className="btn-simple w-full" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Link>
                  <Link to="/login" className="btn-simple w-full" onClick={() => setIsMenuOpen(false)}>
                    Start free
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-indigo-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight"
          >
            Start strong & grow <br className="hidden sm:block" />
            <span className="text-indigo-600">without limits</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto px-4"
          >
            Save upfront with our Starter Discount. Send SMS worldwide and enjoy award-winning support.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 max-w-3xl mx-auto mx-4 sm:mx-auto mb-16"
          >
            <label className="block text-sm font-medium text-gray-700 mb-4">
              How many people are you sending to?
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="100" 
                value={contactCount}
                onChange={(e) => setContactCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="w-full sm:w-auto min-w-[100px] px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 font-mono font-medium text-center text-indigo-600">
                {contactCount.toLocaleString()} contacts
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="btn-simple w-full sm:w-auto text-lg h-14 px-8">
                Start your free plan
              </Link>
              <p className="text-sm text-gray-500">No credit card | Cancel any time</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to grow</h2>
            <p className="text-gray-500 mt-4">Powerful tools to help you reach your audience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Email Marketing</h3>
              <p className="text-gray-600">Create beautiful emails with our drag-and-drop editor. No coding required.</p>
              <img 
                src="https://picsum.photos/seed/email_marketing/600/400" 
                alt="Email Marketing" 
                className="rounded-xl shadow-md mt-4 w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">SMS Campaigns</h3>
              <p className="text-gray-600">Reach customers instantly with SMS. High open rates guaranteed.</p>
              <img 
                src="https://picsum.photos/seed/sms_campaign/600/400" 
                alt="SMS Campaigns" 
                className="rounded-xl shadow-md mt-4 w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">AI Automation</h3>
              <p className="text-gray-600">Let AI write your copy and optimize your send times for maximum impact.</p>
              <img 
                src="https://picsum.photos/seed/ai_robot/600/400" 
                alt="AI Automation" 
                className="rounded-xl shadow-md mt-4 w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Simple, transparent pricing</h2>
            <p className="text-gray-500 mt-4">Choose the plan that fits your growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <PricingCard 
              title="Free"
              description="Best for starting businesses"
              price="0.00"
              buttonText="Start free"
              features={[
                "500 emails / month",
                "250 contacts",
                "Unlimited web push",
                "24/7 support",
                "Forms AI"
              ]}
            />

            {/* Standard Plan */}
            <PricingCard 
              title="Standard"
              description="Best for growing businesses focused on email marketing"
              price={calculatePrice(11.20, contactCount)}
              isPopular
              buttonText="Sign up"
              features={[
                "6,000 emails / month",
                "500 contacts",
                "$1 in free SMS credits",
                "Unlimited web push",
                "24/7 support",
                "Account expert (from $400)",
                "Forms AI"
              ]}
            />

            {/* Pro Plan */}
            <PricingCard 
              title="Pro"
              description="Best for high-volume senders adding SMS power"
              price={calculatePrice(41.30, contactCount)}
              buttonText="Sign up"
              features={[
                "Unlimited emails",
                "2,500 contacts",
                `$${calculatePrice(41.30, contactCount)} monthly SMS bonus`,
                "Unlimited web push",
                "24/7 support",
                "Account expert (from $400)",
                "Advanced reporting",
                "Personalized content"
              ]}
            />
          </div>

          <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Custom pricing</h3>
                <p className="text-gray-600">Best for businesses with custom needs, large amount of contacts or email volume.</p>
              </div>
              <Button variant="outline" size="lg" className="w-full md:w-auto">Let's talk</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 max-w-3xl mx-auto">
            We’re proud to be the highest-rated for our usability, ease of setup, and quality of support
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <RatingCard platform="Shopify" score="4.7 / 5" />
            <RatingCard platform="G2" score="4.6 / 5" />
            <RatingCard platform="WooCommerce" score="4.8 / 5" />
            <RatingCard platform="GetApp" score="4.5 / 5" />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CaseStudyCard 
              company="Salomon Japan"
              title="How Salomon Japan increases campaign revenue with automation"
              stats={[
                { value: "¥1.9M", label: "Avg revenue per campaign" },
                { value: "45%", label: "Email open rates" }
              ]}
            />
            <CaseStudyCard 
              company="LEGO Colombia"
              title="How LEGO Colombia’s strategic shift drove sales and engagement"
              stats={[
                { value: "26%", label: "Sales from automations" },
                { value: "10%", label: "Avg click through rate" }
              ]}
            />
            <CaseStudyCard 
              company="Rachel Riley"
              title="How Rachel Riley boosted BFCM sales by 77%"
              stats={[
                { value: "77%", label: "YoY revenue increase" },
                { value: "48%", label: "Total store revenue" }
              ]}
            />
          </div>
        </div>
      </section>

      {/* SMS Calculator */}
      <section className="py-24 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Calculate your SMS costs</h2>
              <p className="text-indigo-200 text-lg mb-8">
                At Sendify, you can easily buy SMS credits, no matter what plan you’re on. 
                Merchants on the Pro plan get free SMS credits equal to the price of their plan.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>SMS available worldwide</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>BONUS SMS credits included on all plans</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Dedicated toll-free US sending numbers</span>
                </li>
              </ul>
            </div>
            <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter number of SMS</label>
                  <input 
                    type="number" 
                    defaultValue={1000}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-500">Estimated cost</p>
                      <p className="text-3xl font-bold text-indigo-600">$15.00</p>
                    </div>
                    <p className="text-sm text-gray-500">$0.015 / SMS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
        <div className="space-y-4">
          <FaqItem question="It’s my first time trying email marketing. Can I use Sendify for free?" />
          <FaqItem question="Will the Free plan give me access to all the features of your paid plans?" />
          <FaqItem question="I can’t decide: should I choose the Pro plan or Standard?" />
          <FaqItem question="How can I pay?" />
          <FaqItem question="What if I need to send more emails than my monthly limit?" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">Sendify</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                The top-rated marketing automation platform for ecommerce.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-600">Reviews</a></li>
                <li><a href="#" className="hover:text-indigo-600">App Market</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600">Migration</a></li>
                <li><a href="#" className="hover:text-indigo-600">Academy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600">About us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600">Contact us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© Sendify 2026</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms of Use</a>
              <a href="#" className="hover:text-gray-900">Status</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PricingCard({ title, description, price, features, isPopular, buttonText }: any) {
  return (
    <div className={cn(
      "relative p-8 rounded-2xl border bg-white flex flex-col",
      isPopular ? "border-indigo-600 shadow-xl ring-1 ring-indigo-600" : "border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    )}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          Best Value
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm min-h-[40px]">{description}</p>
      </div>
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500">/mo</span>
        </div>
        {price > 0 && <p className="text-xs text-green-600 font-medium mt-2">SAVE 30% paying upfront</p>}
      </div>
      
      <Link to="/login" className="w-full mb-8">
        <button 
          className="btn-simple w-full"
        >
          {buttonText}
        </button>
      </Link>

      <ul className="space-y-4 flex-1">
        {features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RatingCard({ platform, score }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-center mb-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="font-bold text-2xl text-gray-900 mb-1">{score}</p>
      <p className="text-sm text-gray-500">{platform}</p>
    </div>
  );
}

function CaseStudyCard({ company, title, stats }: any) {
  // Generate a consistent seed based on company name
  const seed = company.replace(/\s+/g, '').toLowerCase();
  
  return (
    <div className="group cursor-pointer">
      <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-indigo-900/0 transition-colors z-10" />
        <img 
          src={`https://picsum.photos/seed/${seed}/600/400`} 
          alt={`${company} Case Study`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">Customer Case Study</p>
      <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
        {stats.map((stat: any, i: number) => (
          <div key={i}>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ question }: { question: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button 
        className="w-full py-6 flex justify-between items-center text-left hover:text-indigo-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg text-gray-900">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600">
              Yes! Our free plan includes all features, so you can try everything out before committing. 
              You get 500 emails/month and up to 250 contacts completely free, forever.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
