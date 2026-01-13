"use client";
import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-white">
          nobsounds Privacy Policy
        </h1>

        <div className="space-y-6">
          <p className="text-white">
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            https://www.nobsounds.com/ (the "Site").
          </p>

          <div className="bg-blue-200/80 p-4 border-l-4 border-blue-400">
            <h2 className="text-xl font-semibold mb-3">
              PERSONAL INFORMATION WE COLLECT
            </h2>
            <p>
              When you visit the Site, we automatically collect certain
              information about your device, including information about your
              web browser, IP address, time zone, and some of the cookies that
              are installed on your device. Additionally, as you browse the
              Site, we collect information about the individual web pages or
              products that you view, what websites or search terms referred you
              to the Site, and information about how you interact with the Site.
              We refer to this automatically-collected information as "Device
              Information."
            </p>
          </div>

          <div className="bg-gray-300/80 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">
              We collect Device Information using the following technologies:
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">"Cookies"</span> are data files
                that are placed on your device or computer and often include an
                anonymous unique identifier. For more information about cookies,
                and how to disable cookies, visit{" "}
                <a
                  href="http://www.allaboutcookies.org"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://www.allaboutcookies.org
                </a>
                .
              </li>
              <li>
                <span className="font-medium">"Log files"</span> track actions
                occurring on the Site, and collect data including your IP
                address, browser type, Internet service provider, referring/exit
                pages, and date/time stamps.
              </li>
              <li>
                <span className="font-medium">
                  "Web beacons," "tags," and "pixels"
                </span>{" "}
                are electronic files used to record information about how you
                browse the Site.
              </li>
            </ul>
          </div>

          <p className="text-white">
            Additionally when register we collect your e-mail for login purpose.
          </p>

          <p className="text-white">
            When we talk about "Personal Information" in this Privacy Policy, we
            are talking both about Device Information and Order Information.
          </p>

          <div className="bg-green-50 p-4 border-l-4 border-green-400">
            <h2 className="text-xl font-semibold mb-3">
              HOW DO WE USE YOUR PERSONAL INFORMATION?
            </h2>
            <p>We use your e-mail to login to user favorites area.</p>
          </div>

          <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400">
            <h2 className="text-xl font-semibold mb-3">
              SHARING YOUR PERSONAL INFORMATION
            </h2>
            <p>
              We share your Personal Information with third parties to help us
              use your Personal Information, as described above. We also use
              Google Analytics to help us understand how our users use the
              Site--you can read more about how Google uses your Personal
              Information here:{" "}
              <a
                href="https://www.google.com/intl/en/policies/privacy/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.google.com/intl/en/policies/privacy/
              </a>
              . You can also opt-out of Google Analytics here:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>
            <p className="mt-3">
              Finally, we may also share your Personal Information to comply
              with applicable laws and regulations, to respond to a subpoena,
              search warrant or other lawful request for information we receive,
              or to otherwise protect our rights.
            </p>
          </div>

          {/* <div className="bg-purple-50 p-4 border-l-4 border-purple-400">
            <h2 className="text-xl font-semibold mb-3">
              BEHAVIOURAL ADVERTISING
            </h2>
            <p>We also use your data for advertising purposes</p>
            <p className="mt-3">
              We use third-party advertising companies who serve ads to help
              keep content free. For these partners, we put additional
              restrictions on how your data can be used to prevent it from
              misuse. For instance, we do not allow these partners to take your
              information for profiling and personalising ads on other sites.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">
              Please review the following for a full list of partners and
              purposes:
            </h3>
            <p>
              All or partial advertising on this Website or App is managed by
              Playwire LLC. If Playwire publisher advertising services are used,
              Playwire LLC may collect and use certain aggregated and anonymized
              data for advertising purposes. To learn more about the types of
              data collected, how data is used and your choices as a user,
              please visit{" "}
              <a
                href="https://www.playwire.com/privacy-policy"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.playwire.com/privacy-policy
              </a>
              .
            </p>
            <p className="mt-3 p-3 bg-white rounded border">
              <strong>For EU Users only:</strong> If you are located in
              countries that are part of the European Economic Area, in the
              United Kingdom or Switzerland, and publisher advertising services
              are being provided by Playwire LLC, you were presented with
              messaging from our Consent Management Platform (CMP) around your
              privacy choices as a user in regards to digital advertising,
              applicable vendors, cookie usage and more. If you'd like to
              revisit the choices you have made previously on this Website or
              App, please{" "}
              <span
                className="text-red-600 cursor-pointer font-medium hover:underline"
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).ramp) {
                    (window as any).ramp.showCmpModal();
                  }
                }}
              >
                click here
              </span>
              .
            </p>
          </div> */}

          <div className="bg-red-50 p-4 border-l-4 border-red-400">
            <h2 className="text-xl font-semibold mb-3">DO NOT TRACK</h2>
            <p>
              Please note that we do not alter our Site's data collection and
              use practices when we see a Do Not Track signal from your browser.
            </p>
          </div>

          <div className="bg-indigo-50 p-4 border-l-4 border-indigo-400">
            <h2 className="text-xl font-semibold mb-3">YOUR RIGHTS</h2>
            <p>
              If you are a European resident, you have the right to access
              personal information we hold about you and to ask that your
              personal information be corrected, updated, or deleted. If you
              would like to exercise this right, please contact us through the
              contact information below.
            </p>
            <p className="mt-3">
              Additionally, if you are a European resident we note that we are
              processing your information in order to fulfill contracts we might
              have with you (for example if you make an order through the Site),
              or otherwise to pursue our legitimate business interests listed
              above. Additionally, please note that your information will be
              transferred outside of Europe, including to Canada and the United
              States.
            </p>
          </div>

          <div className="bg-teal-50 p-4 border-l-4 border-teal-400">
            <h2 className="text-xl font-semibold mb-3">DATA RETENTION</h2>
            <p>
              When you place an order through the Site, we will maintain your
              Order Information for our records unless and until you ask us to
              delete this information.
            </p>
          </div>

          <div className="bg-orange-50 p-4 border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold mb-3">CHANGES</h2>
            <p>
              We may update this privacy policy from time to time in order to
              reflect, for example, changes to our practices or for other
              operational, legal or regulatory reasons.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-300">
            <h2 className="text-2xl font-bold mb-4">CONTACT US</h2>
            <p className="text-lg">
              For more information about our privacy practices, if you have
              questions, or if you would like to make a complaint, please
              contact us by e-mail at{" "}
              <a
                href="mailto:contact@nobsounds.com"
                className="text-blue-600 hover:underline font-semibold"
              >
                contact@nobsounds.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
