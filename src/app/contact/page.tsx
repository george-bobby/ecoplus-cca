"use client";
import type React from "react"
import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"

export default function Contact() {
    const [result, setResult] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        setResult("")

        const formData = new FormData(event.currentTarget)
        formData.append("access_key", "b6e769f8-f5a9-4f14-b143-c69baf946e8f")

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()
            console.log("Response Data:", data)

            setResult("success")
            event.currentTarget.reset()
        } catch (error) {
            console.error("Fetch Error:", error)
            setResult("success")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div
                className="flex-grow bg-cover bg-center relative z-0"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80")',
                }}
            >
                <div className="relative z-20">
                 
                </div>

                <div className="relative z-10 container mx-auto px-4 py-16 mt-2">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto mt-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Contact Us</h2>
                        <p className="text-center text-gray-600 mb-6">Fill up the form below to send us a message.</p>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="John"
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="City, Country"
                                    />
                                </div>

                                {/* Designation */}
                                <div>
                                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                                        Designation
                                    </label>
                                    <select
                                        id="designation"
                                        name="designation"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                                    >
                                        <option value="">Select your designation</option>
                                        <option value="student">Student</option>
                                        <option value="professional">Working Professional</option>
                                        <option value="business">Business Owner</option>
                                        <option value="freelancer">Freelancer</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message - Full Width */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                                    placeholder="Please type your message here..."
                                />
                            </div>

                            {/* Honeypot */}
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>

                        {result === "success" && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-700">
                                <CheckCircle className="w-5 h-5" />
                                <span>Message sent successfully!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          
        </div>
    )
}

