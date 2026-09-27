import { useState, useEffect, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { VILLA_IMAGES } from '../data/villaImages';
import WhatsAppIcon from '../components/WhatsAppIcon';
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  MapPin,
  Plane,
  Coffee,
  Car,
  ChevronRight,
  Check,
  Copy,
  Edit3,
  BadgeCheck,
  Home as HomeIcon,
} from 'lucide-react';

interface BookingProps {
  onNavigate: (page: string, extra?: string) => void;
}

export default function Booking({ onNavigate }: BookingProps) {
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Today and tomorrow dates for defaults
  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const defaultCheckOutStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  }, []);

  // Form State
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(defaultCheckOutStr);
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Feedback / Error / Submit states
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submittedMethod, setSubmittedMethod] = useState<'whatsapp' | 'email' | null>(null);
  const [copied, setCopied] = useState(false);

  // Calculate total nights
  const totalNights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [checkIn, checkOut]);

  // Format readable dates
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  // Validate Step 1
  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};

    if (!fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!email.trim() || !email.includes('@')) errors.email = 'Please enter a valid email address';
    if (!phone.trim()) errors.phone = 'Please enter your phone / WhatsApp number';
    if (!checkIn) errors.checkIn = 'Please select a check-in date';
    if (!checkOut) errors.checkOut = 'Please select a check-out date';
    else if (new Date(checkOut) <= new Date(checkIn)) {
      errors.checkOut = 'Check-out date must be after check-in date';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 160, behavior: 'smooth' });
    }
  };

  // ── PREPARE MESSAGES ──
  const fullPhone = phone.trim();
  const totalGuestsText = `${adults} Adult(s)${Number(children) > 0 ? `, ${children} Child(ren)` : ''}`;
  const addonsText = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None requested';
  const requestsText = specialRequests.trim() || 'None';

  // WhatsApp Message
  const rawWhatsAppText = `🌿 *THE VILLA CLOVER - RESERVATION REQUEST* 🌿

👤 *Guest Name:* ${fullName}
📧 *Email:* ${email}
📞 *Phone / WhatsApp:* ${fullPhone}

📅 *Check-in Date:* ${formatDate(checkIn)}
📅 *Check-out Date:* ${formatDate(checkOut)}
🌙 *Duration:* ${totalNights} Night(s)
👥 *Guests:* ${totalGuestsText}

🏡 *Accommodation:* Entire 2-Bedroom Private Villa (1 AC Room + 1 Non-AC Room)
✨ *Selected Add-ons:* ${addonsText}
💬 *Special Requests:* ${requestsText}

💰 *Payment Policy:* No advance payment needed (Pay upon arrival at the villa - Cash or Bank Transfer)

_Please let me know about availability and confirmation. Thank you!_`;

  const whatsappUrl = `https://wa.me/94774384915?text=${encodeURIComponent(rawWhatsAppText)}`;

  // Email Subject & Body
  const emailRecipient = 'info@thevillaclover.com';
  const emailSubject = encodeURIComponent(
    `Booking Request: ${fullName || 'Guest'} - The Villa Clover (${checkIn} to ${checkOut})`
  );
  const rawEmailBody = `THE VILLA CLOVER - DIRECT RESERVATION REQUEST
==================================================

GUEST DETAILS:
• Full Name: ${fullName}
• Email Address: ${email}
• Phone / WhatsApp: ${fullPhone}

STAY DETAILS:
• Check-in Date: ${formatDate(checkIn)} (${checkIn})
• Check-out Date: ${formatDate(checkOut)} (${checkOut})
• Total Duration: ${totalNights} Night(s)
• Total Guests: ${totalGuestsText}
• Accommodation: Entire 2-Bedroom Villa (1 AC Room + 1 Non-AC Room)

ADDITIONAL PREFERENCES:
• Requested Add-ons: ${addonsText}
• Special Requests & Arrival Notes:
${requestsText}

PAYMENT TERMS:
• No advance payment required.
• Payment in Cash or Bank Transfer upon arrival in Galle, Sri Lanka.

==================================================
Sent from The Villa Clover Direct Booking Portal`;

  const mailtoUrl = `mailto:${emailRecipient}?subject=${emailSubject}&body=${encodeURIComponent(
    rawEmailBody
  )}`;

  // Handle WhatsApp Booking Click
  const handleConfirmWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmittedMethod('whatsapp');
  };

  // Handle Email Booking Click
  const handleConfirmEmail = () => {
    window.location.href = mailtoUrl;
    setSubmittedMethod('email');
  };

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(rawWhatsAppText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="page-enter bg-[#fbf9f5] min-h-screen text-[#0d1b2a] w-full overflow-x-hidden">
      {/* ── HEADER BANNER ── */}
      <header
        className="relative pt-28 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-12 text-center overflow-hidden w-full"
        style={{ background: '#0d1b2a' }}
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('${VILLA_IMAGES.hero}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/80 via-[#0d1b2a]/95 to-[#0d1b2a]" />

        {/* Top Back Button */}
        <div className="relative z-20 max-w-5xl mx-auto mb-4 sm:mb-6 text-left">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#c9a96e] hover:text-white border border-amber-300/30 hover:border-amber-300/60 text-xs font-medium backdrop-blur-sm transition-all duration-300 cursor-pointer group shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-2">
          <p className="section-label mb-2 sm:mb-3">Direct Reservation</p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.85rem, 5.5vw, 3.8rem)',
              fontWeight: 400,
              color: 'white',
              lineHeight: 1.15,
            }}
          >
            Book Your Private Stay
          </h1>
          <div className="gold-divider mx-auto mt-3 sm:mt-4 mb-3 sm:mt-4" />
          <p
            className="text-white/70 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed px-1"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Direct reservation with instant personalized confirmation via WhatsApp or Email. Exclusive access to the entire 2-bedroom sanctuary with zero advance payment.
          </p>

          {/* Guarantee Badges - Balanced Flex Row on Mobile */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-7 text-[10.5px] sm:text-xs text-amber-200/90 font-medium max-w-full">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-amber-300/20 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 text-amber-300 shrink-0" />
              <span>Zero Prepayment</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-amber-300/20 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 text-amber-300 shrink-0" />
              <span>Pay on Arrival</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-amber-300/20 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 text-amber-300 shrink-0" />
              <span>Direct Confirmation</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── STEP PROGRESS BAR (Balanced & Zero Overflow on Mobile) ── */}
      <div className="bg-white border-b border-slate-200/80 sticky top-20 z-20 shadow-xs w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 w-full">
          {/* Step 1 Tab */}
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer min-w-0 ${
              step === 1 ? 'text-[#1e3a5f]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-xs shrink-0 transition-all ${
                step === 1
                  ? 'bg-[#1e3a5f] text-[#c9a96e] ring-3 ring-[#1e3a5f]/15'
                  : step > 1
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {step > 1 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
            </div>
            <div className="text-left min-w-0">
              <p className="leading-none text-[9px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-normal">
                Step 1
              </p>
              <p className="mt-0.5 text-xs sm:text-sm truncate font-medium">
                <span className="sm:hidden">Stay Details</span>
                <span className="hidden sm:inline">Stay & Guest Details</span>
              </p>
            </div>
          </button>

          <div className="flex-1 mx-1.5 sm:mx-6 h-0.5 bg-slate-200 min-w-[20px] max-w-[50px] sm:max-w-[200px] relative overflow-hidden shrink-0">
            <div
              className={`h-full bg-[#1e3a5f] transition-all duration-500 ${
                step === 2 ? 'w-full' : 'w-0'
              }`}
            />
          </div>

          {/* Step 2 Tab */}
          <button
            onClick={() => {
              if (validateStep1()) setStep(2);
            }}
            className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer min-w-0 ${
              step === 2 ? 'text-[#1e3a5f]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-xs shrink-0 transition-all ${
                step === 2
                  ? 'bg-[#1e3a5f] text-[#c9a96e] ring-3 ring-[#1e3a5f]/15'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              2
            </div>
            <div className="text-left min-w-0">
              <p className="leading-none text-[9px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-normal">
                Step 2
              </p>
              <p className="mt-0.5 text-xs sm:text-sm truncate font-medium">
                <span className="sm:hidden">Confirm Method</span>
                <span className="hidden sm:inline">Choose Booking Method</span>
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 pb-24 sm:pb-16 w-full">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start w-full">
          {/* ── LEFT COLUMN: FORMS & ACTIONS (7 COLS) ── */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 w-full min-w-0">
            {/* SUBMISSION CONFIRMATION MODAL / BANNER */}
            {submittedMethod && (
              <div className="p-4 sm:p-6 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-950 shadow-sm animate-fade-in w-full">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-emerald-900 leading-tight">
                      Booking Request Dispatched via{' '}
                      {submittedMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}!
                    </h3>
                    <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                      Thank you, <strong className="font-semibold">{fullName || 'Guest'}</strong>! Your reservation inquiry has been sent directly to The Villa Clover. We will confirm your dates and reservation promptly.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3.5">
                      <button
                        onClick={handleCopyDetails}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-white text-emerald-900 border border-emerald-300 text-xs font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                      </button>
                      <button
                        onClick={() => onNavigate('home')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-emerald-800 text-white text-xs font-medium hover:bg-emerald-900 transition-colors cursor-pointer"
                      >
                        <span>Return to Home</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: FORM */}
            {step === 1 && (
              <form
                onSubmit={handleContinueToStep2}
                className="bg-white p-4 sm:p-7 rounded-md border border-slate-200/90 shadow-sm space-y-5 w-full"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-amber-800 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#c9a96e]" />
                    <span>Guest & Stay Information</span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
                      color: '#0d1b2a',
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    Enter Your Reservation Details
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please provide your contact info and stay dates. In Step 2, you can choose to confirm via WhatsApp or Email.
                  </p>
                </div>

                {/* Primary Guest Details */}
                <div className="space-y-3.5 pt-1">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (formErrors.fullName) setFormErrors((p) => ({ ...p, fullName: '' }));
                        }}
                        placeholder="Enter Your Full Name"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xs focus:bg-white focus:border-[#0d1b2a] focus:ring-1 focus:ring-[#0d1b2a] outline-none transition-all"
                      />
                    </div>
                    {formErrors.fullName && (
                      <p className="text-rose-600 text-xs mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (formErrors.email) setFormErrors((p) => ({ ...p, email: '' }));
                          }}
                          placeholder="Enter Your Email"
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xs focus:bg-white focus:border-[#0d1b2a] focus:ring-1 focus:ring-[#0d1b2a] outline-none transition-all"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-rose-600 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Phone / WhatsApp <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (formErrors.phone) setFormErrors((p) => ({ ...p, phone: '' }));
                          }}
                          placeholder="Enter Your Phone Number"
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xs focus:bg-white focus:border-[#0d1b2a] focus:ring-1 focus:ring-[#0d1b2a] outline-none transition-all"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-rose-600 text-xs mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dates & Guests */}
                <div className="pt-3 border-t border-slate-100">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#c9a96e]" />
                    <span>Dates & Party Size</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xs focus:bg-white focus:border-[#0d1b2a] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        min={checkIn || todayStr}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xs focus:bg-white focus:border-[#0d1b2a] outline-none"
                      />
                    </div>
                  </div>
                  {formErrors.checkOut && (
                    <p className="text-rose-600 text-xs mt-1">{formErrors.checkOut}</p>
                  )}

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Adults
                      </label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xs focus:bg-white focus:border-[#0d1b2a] outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} Adult{num > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Children (under 12)
                      </label>
                      <select
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xs focus:bg-white focus:border-[#0d1b2a] outline-none cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Child' : 'Children'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Stay Add-ons & Requests */}
                <div className="pt-3 border-t border-slate-100">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#c9a96e]" />
                    <span>Optional Add-ons & Assistance</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'Airport Pickup / Hire', icon: Plane, label: 'Airport Hire & Transfer' },
                      { id: 'Welcome Ceylon Tea', icon: Coffee, label: 'Ceylon Tea upon arrival' },
                      { id: 'Tuk-Tuk & Galle Tours', icon: Car, label: 'Tuk-Tuk & Fort Tour Tips' },
                      { id: 'Early Check-in / Late Check-out', icon: Clock, label: 'Flexible timing request' },
                    ].map((addon) => {
                      const Icon = addon.icon;
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`flex items-center gap-2 p-2 rounded-xs border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-amber-50/70 border-amber-400/80 text-[#0d1b2a]'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                              isChecked
                                ? 'bg-[#0d1b2a] border-[#0d1b2a] text-amber-300'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <Icon className="w-3.5 h-3.5 text-[#c9a96e] shrink-0" />
                          <span className="text-[11px] sm:text-xs font-medium truncate">{addon.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Special Requests Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Special Requests / Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Estimated arrival time, dietary requests, or questions..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xs focus:bg-white focus:border-[#0d1b2a] outline-none"
                  />
                </div>

                {/* Submit Step 1 Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xs bg-[#0d1b2a] text-[#c9a96e] hover:bg-[#1e3a5f] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer hover:shadow-lg active:scale-[0.99]"
                >
                  <span>Continue to Select Booking Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* ── STEP 2: PROFESSIONAL LUXURY BOOKING METHOD SELECTION ── */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in w-full">
                {/* 1. Header & Review Receipt Section */}
                <div className="bg-white p-4 sm:p-6 rounded-md border border-slate-200/90 shadow-sm w-full">
                  <div className="pb-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 text-amber-800 text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
                      <BadgeCheck className="w-3.5 h-3.5 text-[#c9a96e] shrink-0" />
                      <span>Step 2 · Confirmation</span>
                    </div>
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.3rem, 3.8vw, 1.75rem)',
                        color: '#0d1b2a',
                        fontWeight: 600,
                        lineHeight: 1.2,
                      }}
                      className="break-words mb-3"
                    >
                      Choose How to Confirm Your Booking
                    </h2>

                    <button
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-medium cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3 h-3 text-slate-500" />
                      <span>Edit Stay Details</span>
                    </button>
                  </div>

                  {/* 2. Structured Stay Review Receipt */}
                  <div className="mt-4 p-3 sm:p-4 rounded-xs bg-[#fbf9f4] border border-amber-200/60 w-full">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1 shrink-0">
                        <HomeIcon className="w-3.5 h-3.5 text-[#c9a96e] shrink-0" />
                        <span>Reservation Summary</span>
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-[#1e3a5f] bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs whitespace-nowrap shrink-0">
                        {totalNights} Night{totalNights === 1 ? '' : 's'} Stay
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 text-xs">
                      <div className="min-w-0">
                        <p className="text-slate-400 text-[9px] sm:text-[10px] uppercase font-medium">Guest & Contact</p>
                        <p className="font-semibold text-[#0d1b2a] mt-0.5 text-xs sm:text-sm truncate">{fullName || 'Guest'}</p>
                        <p className="text-slate-600 text-[11px] break-all">{fullPhone} · {email}</p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-slate-400 text-[9px] sm:text-[10px] uppercase font-medium">Stay & Guests</p>
                        <p className="font-semibold text-[#0d1b2a] mt-0.5 text-xs sm:text-sm">
                          {formatDate(checkIn)} → {formatDate(checkOut)}
                        </p>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {totalGuestsText} · 2-Bedroom Villa (1 AC + 1 Non-AC)
                        </p>
                      </div>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="mt-2.5 pt-2.5 border-t border-amber-200/40 flex flex-wrap items-center gap-1">
                        <span className="text-[9.5px] font-medium text-slate-500 mr-0.5">Add-ons:</span>
                        {selectedAddons.map((add) => (
                          <span
                            key={add}
                            className="px-1.5 py-0.5 rounded text-[9.5px] font-medium bg-amber-100/70 text-amber-900 border border-amber-300/40"
                          >
                            ✓ {add}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. TWO LUXURY PRO-TIER BOOKING OPTION CARDS */}
                <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full">
                  {/* OPTION 1: WHATSAPP INSTANT BOOKING */}
                  <div className="relative bg-white rounded-md border-2 border-emerald-500/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group w-full">
                    {/* Top Accent Ribbon */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-1.5 px-3.5 sm:px-5 flex items-center justify-between text-white text-[11px] sm:text-xs font-semibold tracking-wide">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>Recommended · Fastest Direct Booking</span>
                      </span>
                      <span className="hidden sm:inline-flex text-emerald-100 text-[10px] font-normal">
                        Direct WhatsApp
                      </span>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
                        <div className="flex items-start sm:items-center gap-3">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md ring-3 ring-emerald-50 mt-0.5 sm:mt-0">
                            <WhatsAppIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                className="text-xl sm:text-2xl font-bold text-[#0d1b2a] leading-tight"
                              >
                                Book via WhatsApp
                              </h3>
                              <span className="inline-flex px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[10.5px] font-semibold whitespace-nowrap">
                                ⚡ Instant
                              </span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm font-semibold text-emerald-800">
                              <span>The Villa Clover</span>
                              <span className="text-emerald-400 font-bold">•</span>
                              <span className="font-bold text-emerald-950 tracking-wide text-xs sm:text-sm">
                                +94 77 438 4915
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        Sends your formatted reservation slip directly on WhatsApp. Best for instant responses and fast room confirmation.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 my-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span>Direct chat with The Villa Clover</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span>Pre-filled reservation details</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span>Instant availability check</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span>Zero advance prepayment</span>
                        </div>
                      </div>

                      {/* WhatsApp Confirm Action Button */}
                      <button
                        onClick={handleConfirmWhatsApp}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer active:scale-[0.99]"
                      >
                        <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <span>Send Booking via WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* OPTION 2: EMAIL RESERVATION DESK */}
                  <div className="relative bg-white rounded-md border border-slate-300 shadow-sm hover:border-[#0d1b2a] hover:shadow-xl transition-all duration-300 overflow-hidden group w-full">
                    {/* Top Accent Ribbon */}
                    <div className="bg-[#0d1b2a] py-1.5 px-3.5 sm:px-5 flex items-center justify-between text-[#c9a96e] text-[11px] sm:text-xs font-semibold tracking-wide">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#c9a96e] shrink-0" />
                        <span>Official Booking Desk · Email</span>
                      </span>
                      <span className="hidden sm:inline-flex text-white/60 text-[10px] font-normal">
                        Replies in 2–3 hours
                      </span>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
                        <div className="flex items-start sm:items-center gap-3">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0d1b2a] text-[#c9a96e] flex items-center justify-center shrink-0 shadow-md ring-3 ring-slate-100 mt-0.5 sm:mt-0">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9a96e]" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                className="text-xl sm:text-2xl font-bold text-[#0d1b2a] leading-tight"
                              >
                                Book via Email Desk
                              </h3>
                              <span className="inline-flex px-2.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-[10.5px] font-semibold whitespace-nowrap">
                                ✉️ Written
                              </span>
                            </div>
                            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-700 break-all sm:break-normal">
                              {emailRecipient}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        Sends a formal reservation inquiry directly to our villa booking inbox. We will reply promptly with confirmation details.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 my-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#1e3a5f] shrink-0 stroke-[2.5]" />
                          <span>Official written record in inbox</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#1e3a5f] shrink-0 stroke-[2.5]" />
                          <span>Detailed arrival guide sent back</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#1e3a5f] shrink-0 stroke-[2.5]" />
                          <span>Sent to verified booking email</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#1e3a5f] shrink-0 stroke-[2.5]" />
                          <span>Free cancellation guaranteed</span>
                        </div>
                      </div>

                      {/* Email Confirm Action Button */}
                      <button
                        onClick={handleConfirmEmail}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xs bg-[#0d1b2a] hover:bg-[#1e3a5f] text-[#c9a96e] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer active:scale-[0.99]"
                      >
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a96e]" />
                        <span>Send Booking Request via Email</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Trust & Assurance Footer */}
                <div className="p-3.5 rounded-md bg-amber-50/60 border border-amber-200/60 flex items-center gap-3 text-xs text-amber-950 w-full">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-amber-900">Direct Reservation Guarantee</p>
                    <p className="text-[11px] text-amber-800 leading-snug">
                      100% direct connection with The Villa Clover. No middleman commissions or hidden booking fees.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN: STICKY LIVE SUMMARY CARD (5 COLS) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-4 w-full min-w-0">
            <div className="bg-white rounded-md border border-slate-200/90 shadow-md overflow-hidden w-full">
              {/* Card Thumbnail */}
              <div className="relative h-36 sm:h-44 overflow-hidden w-full">
                <img
                  src={VILLA_IMAGES.hero}
                  alt="The Villa Clover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#0d1b2a]/30 to-transparent" />
                <div className="absolute bottom-2.5 left-3.5 right-3.5 text-white">
                  <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#c9a96e]">
                    Entire Private Sanctuary
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    The Villa Clover — Galle
                  </h3>
                </div>
              </div>

              {/* Summary Details */}
              <div className="p-3.5 sm:p-5 space-y-3.5 w-full">
                {/* Dates & Nights Box - Perfectly Proportioned on Mobile */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 bg-[#fbf9f4] rounded-xs border border-amber-200/50 text-xs gap-1.5 w-full">
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-400 text-[9px] uppercase font-medium">Check-In</p>
                    <p className="font-semibold text-slate-800 text-[10.5px] sm:text-xs mt-0.5 truncate">
                      {formatDate(checkIn) || 'Select Date'}
                    </p>
                  </div>
                  <div className="text-center px-2 py-0.5 bg-white rounded border border-amber-200/80 font-bold text-[#1e3a5f] text-[10.5px] sm:text-xs shadow-2xs whitespace-nowrap shrink-0">
                    {totalNights} Night{totalNights === 1 ? '' : 's'}
                  </div>
                  <div className="text-right min-w-0 flex-1">
                    <p className="text-slate-400 text-[9px] uppercase font-medium">Check-Out</p>
                    <p className="font-semibold text-slate-800 text-[10.5px] sm:text-xs mt-0.5 truncate">
                      {formatDate(checkOut) || 'Select Date'}
                    </p>
                  </div>
                </div>

                {/* Key Villa Features */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Entire 2-Bedroom Villa</strong> (1 AC + 1 Non-AC)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Scenic Rooftop Lounge & Tropical Garden Swing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Modern Equipped Kitchen & Washing Machine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free High-Speed WiFi & Secure Private Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>10 Mins to Galle Fort & 15 Mins to Unawatuna</span>
                  </div>
                </div>

                {/* Payment & Terms Assurance Box */}
                <div className="p-3 rounded-xs bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-0.5">
                  <p className="font-semibold flex items-center gap-1.5 text-amber-900 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Pay On Arrival · Zero Prepayment</span>
                  </p>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    No credit card or advance deposit required. Pay conveniently upon arrival via Cash or Bank Transfer.
                  </p>
                </div>

                {/* Host Contact Strip - Clean Wrapping on Mobile */}
                <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#c9a96e] shrink-0" />
                    <span>Galle 80000, Sri Lanka</span>
                  </span>
                  <a
                    href="tel:+94774384915"
                    className="font-semibold text-[#1e3a5f] hover:text-amber-700 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Phone className="w-3 h-3 text-[#c9a96e] shrink-0" />
                    <span>+94 77 438 4915</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
