import React from 'react';
import { Shield, Eye, Lock, Cookie } from 'lucide-react';

export const TermsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Terms of Service & Privacy Policy
                    </h1>
                    <p className="text-gray-600">
                        Last updated: December 2024
                    </p>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <a href="#terms" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
                        <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">Terms of Service</h3>
                    </a>
                    <a href="#privacy" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
                        <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">Privacy Policy</h3>
                    </a>
                    <a href="#data" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
                        <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">Data Security</h3>
                    </a>
                    <a href="#cookies" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
                        <Cookie className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">Cookie Policy</h3>
                    </a>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
                    {/* Terms of Service */}
                    <section id="terms">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Shield className="w-6 h-6 text-blue-600 mr-2" />
                            Terms of Service
                        </h2>
                        
                        <div className="space-y-4 text-gray-600">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h3>
                                <p>By accessing and using Scan'n Eat, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">2. Use of Service</h3>
                                <p>You agree to use Scan'n Eat only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the service. You must not misuse our service by knowingly introducing viruses, trojans, worms, or other malicious content.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">3. User Accounts</h3>
                                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">4. Content</h3>
                                <p>Recipe content is provided for informational purposes only. While we strive for accuracy, we do not guarantee that all nutritional information or cooking instructions are complete or error-free. Users should exercise their own judgment when preparing meals.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">5. Limitation of Liability</h3>
                                <p>Scan'n Eat shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of, or inability to access or use, the service.</p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* Privacy Policy */}
                    <section id="privacy">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Eye className="w-6 h-6 text-green-600 mr-2" />
                            Privacy Policy
                        </h2>
                        
                        <div className="space-y-4 text-gray-600">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Information We Collect</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Account information (name, email, password)</li>
                                    <li>Pantry inventory and saved recipes</li>
                                    <li>Scanned receipt images (temporarily, for processing)</li>
                                    <li>Usage data and preferences</li>
                                    <li>Device and browser information</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">How We Use Your Information</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Provide and improve our services</li>
                                    <li>Personalize recipe recommendations</li>
                                    <li>Send service-related notifications</li>
                                    <li>Analyze usage patterns and trends</li>
                                    <li>Prevent fraud and ensure security</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Information Sharing</h3>
                                <p>We do not sell your personal information to third parties. We may share data with service providers who assist in operating our platform, always under strict confidentiality agreements.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
                                <p>You have the right to access, correct, or delete your personal information. You can export your data or request account deletion at any time from your account settings.</p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* Data Security */}
                    <section id="data">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Lock className="w-6 h-6 text-purple-600 mr-2" />
                            Data Security
                        </h2>
                        
                        <div className="space-y-4 text-gray-600">
                            <p>We implement industry-standard security measures to protect your data:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>End-to-end encryption for sensitive data</li>
                                <li>Secure HTTPS connections for all communications</li>
                                <li>Regular security audits and updates</li>
                                <li>Protected database access and authentication</li>
                                <li>Automatic receipt image deletion after processing</li>
                            </ul>
                            <p className="mt-4">While we take all reasonable precautions, no internet transmission is 100% secure. Please use strong passwords and keep your login credentials confidential.</p>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* Cookie Policy */}
                    <section id="cookies">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Cookie className="w-6 h-6 text-orange-600 mr-2" />
                            Cookie Policy
                        </h2>
                        
                        <div className="space-y-4 text-gray-600">
                            <p>We use cookies and similar technologies to enhance your experience:</p>
                            
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                                <p>Required for the website to function properly, including authentication and security.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Performance Cookies</h3>
                                <p>Help us understand how visitors interact with our website by collecting anonymous information.</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Preference Cookies</h3>
                                <p>Remember your settings and preferences, such as language and dietary restrictions.</p>
                            </div>

                            <p className="mt-4">You can manage cookie preferences through your browser settings. Note that disabling certain cookies may limit functionality.</p>
                        </div>
                    </section>
                </div>

                {/* Contact */}
                <div className="mt-8 text-center bg-blue-50 rounded-lg p-6 border border-blue-100">
                    <p className="text-gray-700 mb-4">
                        Questions about our terms or privacy practices?
                    </p>
                    <a href="mailto:privacy@scanneat.com" className="text-blue-600 font-medium hover:text-blue-700">
                        privacy@scanneat.com
                    </a>
                </div>
            </div>
        </div>
    );
};
