"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/app/providers/language-provider";
import { motion, AnimatePresence } from "motion/react";

// Definicja typów dla statusu wysyłki
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

// Typ dla błędów walidacji
interface FormErrors {
    user_name?: string;
    user_email?: string;
    message?: string;
}

export default function FooterForm() {
    const { t } = useLanguage();
    const formRef = useRef<HTMLFormElement>(null);
    
    // Status wysyłki
    const [status, setStatus] = useState<FormStatus>('idle');
    const [globalError, setGlobalError] = useState("");

    // Stan formularza
    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        message: ""
    });

    // Stan błędów walidacji
    const [errors, setErrors] = useState<FormErrors>({});

    // Stan Honeypot
    const [honeypot, setHoneypot] = useState("");

    // Zmienne środowiskowe
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // --- LOGIKA WALIDACJI (ENGLISH) ---
    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case "user_name":
                if (value.trim().length < 2) return "At least 2 characters!";
                return undefined;
            case "user_email":
                // Regex: sprawdza czy jest tekst, małpa, tekst, kropka, tekst
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email (must contain '@' and domain).";
                return undefined;
            case "message":
                if (value.trim().length < 10) return "Message is too short (min. 10 characters).";
                return undefined;
            default:
                return undefined;
        }
    };

    // Obsługa zmiany w inputach
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Czyścimy błąd w trakcie pisania (lepsze UX)
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Walidacja przy utracie fokusu (Blur)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Walidacja Całości
        const newErrors: FormErrors = {};
        let isValid = true;

        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key as keyof typeof formData]);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (!isValid) return;

        // 2. HONEYPOT check
        if (honeypot !== "") {
            setStatus('success'); 
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        // 3. Config check
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setGlobalError("Service configuration error. Contact admin.");
            setStatus('error');
            return;
        }

        if (status === 'sending' || !formRef.current) return;

        setStatus('sending');
        setGlobalError("");

        try {
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);

            setStatus('success');
            setFormData({ user_name: "", user_email: "", message: "" });
            setErrors({});
            formRef.current.reset();

            setTimeout(() => setStatus('idle'), 5000);

        } catch (error: unknown) {
            console.error("EmailJS Error:", error);
            setStatus('error');
            setGlobalError("Something went wrong. Please try again later.");
        }
    };

    // --- STYLE ---
    const getInputClass = (fieldName: keyof FormErrors) => `
        w-full p-6 bg-zinc-50 
        border-2 outline-none
        transition-all duration-200 ease-in-out
        font-medium placeholder:text-zinc-400 text-zinc-900
        disabled:opacity-50 disabled:cursor-not-allowed
        
        /* Focus State - Thick Border */
        focus:bg-white focus:border-4 focus:border-blue-800
        
        /* Error State */
        ${errors[fieldName] 
            ? 'border-red-600 bg-red-50 focus:border-red-600' 
            : 'border-zinc-300'
        }
    `;

    return (
        <section className="flex flex-col items-center justify-center w-full text-neutral-900">
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-5 relative">
                
                {/* Honeypot */}
                <div className="opacity-0 absolute top-0 left-0 h-0 w-0 z-[-1] overflow-hidden">
                    <input type="text" name="website_url_check" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                {/* --- NAME --- */}
                <div className="relative group">
                    <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={status === 'sending'}
                        placeholder={t.form.namePlaceholder}
                        className={getInputClass('user_name')}
                    />
                    <AnimatePresence>
                        {errors.user_name && (
                            <motion.p 
                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="text-red-600 text-xs font-bold absolute left-1 mt-0.5"
                            >
                                {errors.user_name}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- EMAIL --- */}
                <div className="relative group">
                    <input
                        type="email"
                        name="user_email"
                        id="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={status === 'sending'}
                        placeholder={t.form.emailPlaceholder}
                        className={getInputClass('user_email')}
                    />
                     <AnimatePresence>
                        {errors.user_email && (
                            <motion.p 
                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="text-red-600 text-xs font-bold absolute left-1 mt-0.5"
                            >
                                {errors.user_email}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- MESSAGE --- */}
                <div className="relative group">
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={status === 'sending'}
                        placeholder={t.form.msgPlaceholder}
                        rows={5}
                        className={`${getInputClass('message')} resize-none`}
                    />
                     <AnimatePresence>
                        {errors.message && (
                            <motion.p 
                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="text-red-600 text-xs font-bold absolute left-1 mt-0.5"
                            >
                                {errors.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- Global Error --- */}
                <AnimatePresence>
                    {status === 'error' && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="text-red-600 text-sm font-semibold text-center mt-2"
                        >
                            {globalError}
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* --- SUBMIT BUTTON --- */}
                <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className={`
                        w-full p-5 rounded-sm bg-zinc-50 drop-shadow-md mt-2
                        font-bold  tracking-wide
                        transition-all duration-300 ease-out
                        outline-0  outline-transparent
                        
                        ${/* IDLE */ ""}
                        ${status === 'idle' 
                            ? "text-blue-900 hover:outline-3 hover:outline-blue-700 hover:scale-[1.01] cursor-pointer" 
                            : ""}

                        ${/* SENDING */ ""}
                        ${status === 'sending' 
                            ? "text-blue-900 opacity-75 cursor-wait scale-100" 
                            : ""}

                        ${/* SUCCESS */ ""}
                        ${status === 'success' 
                            ? "text-green-700 outline-3 outline-green-600 cursor-default scale-100" 
                            : ""}
                        
                        ${/* ERROR */ ""}
                        ${status === 'error' 
                            ? "text-red-700 outline-3 outline-red-600 hover:scale-[1.02] cursor-pointer" 
                            : ""}
                    `}
                >
                    {status === 'idle' && t.form.btnSend}
                    {status === 'sending' && "Sending..."}
                    {status === 'success' && t.form.successTitle}
                    {status === 'error' && "Try Again"}
                </button>
            </form>
        </section>
    );
}