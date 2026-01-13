"use client";
// TermsOfServicePage.tsx
import React, { useState, useEffect } from "react";

const TermsOfServicePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("agreement");
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Obsługa scrollowania do sekcji
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Obsługa przycisku "Back to Top"
  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 300);

    // Aktualizacja aktywnej sekcji podczas scrollowania
    const sections = [
      "agreement",
      "services",
      "ip",
      "user-reps",
      "prohibited",
      "contributions",
      "privacy",
      "dmca",
      "liability",
      "contact",
    ];

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Terms of Service
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Last updated: January 12, 2026
              </p>

              <div className="space-y-1">
                {[
                  {
                    id: "agreement",
                    label: "Agreement to Terms",
                    icon: "check-circle",
                    color: "text-green-500",
                  },
                  {
                    id: "services",
                    label: "Our Services",
                    icon: "globe",
                    color: "text-blue-500",
                  },
                  {
                    id: "ip",
                    label: "Intellectual Property",
                    icon: "copyright",
                    color: "text-purple-500",
                  },
                  {
                    id: "user-reps",
                    label: "User Representations",
                    icon: "user-check",
                    color: "text-indigo-500",
                  },
                  {
                    id: "prohibited",
                    label: "Prohibited Activities",
                    icon: "ban",
                    color: "text-red-500",
                  },
                  {
                    id: "contributions",
                    label: "User Generated Contributions",
                    icon: "edit",
                    color: "text-yellow-500",
                  },
                  {
                    id: "privacy",
                    label: "Privacy Policy",
                    icon: "shield-alt",
                    color: "text-teal-500",
                  },
                  {
                    id: "dmca",
                    label: "DMCA Policy",
                    icon: "gavel",
                    color: "text-gray-700",
                  },
                  {
                    id: "liability",
                    label: "Limitations of Liability",
                    icon: "exclamation-triangle",
                    color: "text-orange-500",
                  },
                  {
                    id: "contact",
                    label: "Contact Us",
                    icon: "envelope",
                    color: "text-pink-500",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left py-2 px-3 rounded-md transition-colors flex items-center ${
                      activeSection === item.id
                        ? "bg-gray-100 font-medium text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 mr-2 ${item.color}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href={`#icon-${item.icon}`} />
                    </svg>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Quick Actions:</p>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handlePrint}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Print Terms
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {/* Header */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  TERMS OF SERVICE
                </h1>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Last updated January 12, 2026</span>
                </div>
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="text-gray-800">
                    <span className="font-bold">Important:</span> These Legal
                    Terms constitute a legally binding agreement. By accessing
                    our Services, you agree to be bound by these Terms.
                  </p>
                </div>
              </div>

              {/* SVG Icons Definitions */}
              <svg className="hidden">
                <symbol id="icon-check-circle" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </symbol>
                <symbol id="icon-globe" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                    clipRule="evenodd"
                  />
                </symbol>
                <symbol id="icon-copyright" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 100-2h-1V6z"
                    clipRule="evenodd"
                  />
                </symbol>
                <symbol id="icon-user-check" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </symbol>
                <symbol id="icon-ban" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                    clipRule="evenodd"
                  />
                </symbol>
                <symbol id="icon-edit" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </symbol>
                <symbol id="icon-shield-alt" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </symbol>
                <symbol id="icon-gavel" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </symbol>
                <symbol id="icon-exclamation-triangle" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </symbol>
                <symbol id="icon-envelope" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </symbol>
              </svg>

              {/* Content Sections */}
              <div className="space-y-12">
                {/* Agreement Section */}
                <section id="agreement" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-check-circle" />
                    </svg>
                    AGREEMENT TO OUR LEGAL TERMS
                  </h2>
                  <p className="mb-4">
                    We are <strong>NoBSound</strong> ("Company," "we," "us,"
                    "our").
                  </p>
                  <p className="mb-4">
                    We operate the website{" "}
                    <a
                      href="https://www.nobsounds.com/"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.nobsounds.com/
                    </a>{" "}
                    (the "Site"), as well as any other related products and
                    services that refer or link to these legal terms (the "Legal
                    Terms") (collectively, the "Services").
                  </p>
                  <p className="mb-4">
                    You can contact us by email at{" "}
                    <a
                      href="mailto:contact@nobsounds.com"
                      className="text-blue-600 hover:underline"
                    >
                      contact@nobsounds.com
                    </a>
                  </p>
                  <p className="mb-4">
                    These Legal Terms constitute a legally binding agreement
                    made between you, whether personally or on behalf of an
                    entity ("you"), and NoBSound, concerning your access to and
                    use of the Services. You agree that by accessing the
                    Services, you have read, understood, and agreed to be bound
                    by all of these Legal Terms.{" "}
                    <strong className="text-red-600">
                      IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN
                      YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND
                      YOU MUST DISCONTINUE USE IMMEDIATELY.
                    </strong>
                  </p>
                  <div className="text-sm text-gray-500 mt-6">Page 1</div>
                </section>

                {/* Services Section */}
                <section id="services" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-globe" />
                    </svg>
                    1. OUR SERVICES
                  </h2>
                  <p className="mb-4">
                    The information provided when using the Services is not
                    intended for distribution to or use by any person or entity
                    in any jurisdiction or country where such distribution or
                    use would be contrary to law or regulation or which would
                    subject us to any registration requirement within such
                    jurisdiction or country.
                  </p>
                  <p className="mb-4">
                    The Services are not tailored to comply with
                    industry-specific regulations (Health Insurance Portability
                    and Accountability Act (HIPAA), Federal Information Security
                    Management Act (FISMA), etc.), so if your interactions would
                    be subjected to such laws, you may not use the Services.
                  </p>
                  <div className="text-sm text-gray-500 mt-6">Page 2</div>
                </section>

                {/* Intellectual Property Section */}
                <section id="ip" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-copyright" />
                    </svg>
                    2. INTELLECTUAL PROPERTY RIGHTS
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                    Our Intellectual Property
                  </h3>
                  <p className="mb-4">
                    We are the owner or the licensee of all intellectual
                    property rights in our Services, including all source code,
                    databases, functionality, software, website designs, audio,
                    video, text, photographs, and graphics in the Services
                    (collectively, the "Content"), as well as the trademarks,
                    service marks, and logos contained therein (the "Marks").
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                    Your Use of Our Services
                  </h3>
                  <p className="mb-4">
                    Subject to your compliance with these Legal Terms, we grant
                    you a non-exclusive, non-transferable, revocable license to:
                  </p>
                  <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>access the Services; and</li>
                    <li>
                      download or print a copy of any portion of the Content to
                      which you have properly gained access, solely for your
                      personal, non-commercial use or internal business purpose.
                    </li>
                  </ul>

                  <div className="text-sm text-gray-500 mt-6">Page 3-5</div>
                </section>

                {/* User Representations Section */}
                <section id="user-reps" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-user-check" />
                    </svg>
                    3. USER REPRESENTATIONS
                  </h2>
                  <p className="mb-4">
                    By using the Services, you represent and warrant that:
                  </p>
                  <ol className="list-decimal pl-5 mb-4 space-y-2">
                    <li>
                      all registration information you submit will be true,
                      accurate, current, and complete;
                    </li>
                    <li>
                      you will maintain the accuracy of such information and
                      promptly update such registration information as
                      necessary;
                    </li>
                    <li>
                      you have the legal capacity and you agree to comply with
                      these Legal Terms;
                    </li>
                    <li>you are not under the age of 13;</li>
                    <li>
                      you are not a minor in the jurisdiction in which you
                      reside, or if a minor, you have received parental
                      permission to use the Services;
                    </li>
                    <li>
                      you will not access the Services through automated or
                      non-human means, whether through a bot, script or
                      otherwise;
                    </li>
                    <li>
                      you will not use the Services for any illegal or
                      unauthorized purpose; and
                    </li>
                    <li>
                      your use of the Services will not violate any applicable
                      law or regulation.
                    </li>
                  </ol>
                  <div className="text-sm text-gray-500 mt-6">Page 5</div>
                </section>

                {/* Prohibited Activities Section */}
                <section id="prohibited" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-ban" />
                    </svg>
                    5. PROHIBITED ACTIVITIES
                  </h2>
                  <p className="mb-4">
                    You may not access or use the Services for any purpose other
                    than that for which we make the Services available. As a
                    user of the Services, you agree not to:
                  </p>
                  <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>
                      Systematically retrieve data or other content from the
                      Services to create or compile a collection, compilation,
                      database, or directory without written permission from us.
                    </li>
                    <li>
                      Trick, defraud, or mislead us and other users, especially
                      in any attempt to learn sensitive account information.
                    </li>
                    <li>
                      Circumvent, disable, or otherwise interfere with
                      security-related features of the Services.
                    </li>
                    <li>
                      Disparage, tarnish, or otherwise harm, in our opinion, us
                      and/or the Services.
                    </li>
                    <li>
                      Use any information obtained from the Services in order to
                      harass, abuse, or harm another person.
                    </li>
                    <li>
                      Make improper use of our support services or submit false
                      reports of abuse or misconduct.
                    </li>
                  </ul>
                  <div className="text-sm text-gray-500 mt-6">Page 6-7</div>
                </section>

                {/* User Generated Contributions Section */}
                <section id="contributions" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-edit" />
                    </svg>
                    6. USER GENERATED CONTRIBUTIONS
                  </h2>
                  <p className="mb-4">
                    The Services may invite you to chat, contribute to, or
                    participate in blogs, message boards, online forums, and
                    other functionality. When you create or make available any
                    Contributions, you thereby represent and warrant that:
                  </p>
                  <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>
                      The creation and distribution of your Contributions do not
                      infringe the proprietary rights of any third party.
                    </li>
                    <li>
                      You are the creator and owner of or have the necessary
                      licenses, rights, consents, releases, and permissions to
                      use and to authorize us to use your Contributions.
                    </li>
                    <li>
                      Your Contributions are not false, inaccurate, or
                      misleading.
                    </li>
                    <li>
                      Your Contributions are not unsolicited or unauthorized
                      advertising.
                    </li>
                    <li>
                      Your Contributions are not obscene, lewd, lascivious,
                      filthy, violent, harassing, or otherwise objectionable.
                    </li>
                  </ul>
                  <div className="text-sm text-gray-500 mt-6">Page 7-8</div>
                </section>

                {/* Privacy Policy Section */}
                <section id="privacy" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-teal-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-shield-alt" />
                    </svg>
                    13. PRIVACY POLICY
                  </h2>
                  <p className="mb-4">
                    We care about data privacy and security. By using the
                    Services, you agree to be bound by our Privacy Policy posted
                    on the Services, which is incorporated into these Legal
                    Terms.
                  </p>
                  <p className="mb-4">
                    Please be advised the Services are hosted in{" "}
                    <strong>Poland</strong>. If you access the Services from any
                    other region of the world with laws or other requirements
                    governing personal data collection, use, or disclosure that
                    differ from applicable laws in Poland, then through your
                    continued use of the Services, you are transferring your
                    data to Poland.
                  </p>
                  <div className="text-sm text-gray-500 mt-6">Page 11</div>
                </section>

                {/* DMCA Section */}
                <section id="dmca" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-gavel" />
                    </svg>
                    14. DIGITAL MILLENNIUM COPYRIGHT ACT (DMCA) NOTICE AND
                    POLICY
                  </h2>
                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                    Designated Copyright Agent
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg my-4">
                    <p>
                      <strong>Jakub Szczechowicz</strong>
                    </p>
                    <p>Attn: Copyright Agent</p>
                    <p>Puławska 7</p>
                    <p>Warsaw, 00-001 Poland</p>
                    <p>
                      Email:{" "}
                      <a
                        href="mailto:copyright@nobsounds.com"
                        className="text-blue-600 hover:underline"
                      >
                        copyright@nobsounds.com
                      </a>
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 mt-6">Page 11-12</div>
                </section>

                {/* Limitations of Liability Section */}
                <section id="liability" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-exclamation-triangle" />
                    </svg>
                    21. LIMITATIONS OF LIABILITY
                  </h2>
                  <p className="mb-4 font-semibold">
                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS
                    BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
                    INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
                    PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS
                    OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE
                    SERVICES.
                  </p>
                  <p className="mb-4">
                    NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN,
                    OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS
                    OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO{" "}
                    <strong>$2.00 USD</strong>.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
                    <p className="text-gray-800">
                      <span className="font-bold">Legal Note:</span> Certain US
                      state laws and international laws do not allow limitations
                      on implied warranties or the exclusion or limitation of
                      certain damages. If these laws apply to you, some or all
                      of the above disclaimers or limitations may not apply to
                      you, and you may have additional rights.
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 mt-6">Page 16</div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="scroll-mt-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 text-pink-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <use href="#icon-envelope" />
                    </svg>
                    27. CONTACT US
                  </h2>
                  <p className="mb-4">
                    In order to resolve a complaint regarding the Services or to
                    receive further information regarding use of the Services,
                    please contact us at:
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg mt-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          NoBSound
                        </h3>
                        <p className="text-gray-700 mb-2">
                          <svg
                            className="w-5 h-5 inline mr-2 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <a
                            href="mailto:contact@nobsounds.com"
                            className="text-blue-600 hover:underline"
                          >
                            contact@nobsounds.com
                          </a>
                        </p>
                        <p className="text-gray-700">
                          <svg
                            className="w-5 h-5 inline mr-2 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <a
                            href="https://www.nobsounds.com/"
                            className="text-blue-600 hover:underline"
                          >
                            https://www.nobsounds.com/
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-6">Page 18</div>
                </section>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
                <p>© 2026 NoBSound. All rights reserved.</p>
                <p className="mt-2">
                  These Terms of Service were last updated on January 12, 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default TermsOfServicePage;
