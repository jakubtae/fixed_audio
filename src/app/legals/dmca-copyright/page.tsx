const TermsOfServicePage: React.FC = () => {
  return (
    <div id="dcma" className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto text-white-800">
        <h1 className="text-3xl font-bold mb-6">
          nobsounds DMCA Copyright Policy
        </h1>

        <div className="space-y-6 text-white-700">
          <p>
            nobsounds ("Company") has adopted the following general policy
            toward copyright infringement in accordance with the{" "}
            <a
              href="http://lcweb.loc.gov/copyright/legislation/dmca.pdf"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Millennium Copyright Act.
            </a>
            &nbsp;The address of the Designated Agent to Receive Notification of
            Claimed Infringement ("Designated Agent") is listed at the end of
            this policy.
          </p>

          <div className="bg-blue-50 p-4 border-l-4 border-blue-400 text-black">
            <p className="font-semibold text-lg mb-2">
              Procedure for Reporting Copyright Infringement:
            </p>
            <p>
              If you believe that material or content residing on or accessible
              through Company's websites or services infringes a copyright,
              please send a notice of copyright infringement containing the
              following information to the Designated Agent listed below:
            </p>
          </div>

          <ol className="list-decimal pl-6 space-y-3">
            <li className="pl-2">
              A physical or electronic signature of a person authorized to act
              on behalf of the owner of the copyright that has been allegedly
              infringed;
            </li>
            <li className="pl-2">
              Identification of works or materials being infringed;
            </li>
            <li className="pl-2">
              Identification of the material that is claimed to be infringing
              including information regarding the location of the infringing
              materials that the copyright owner seeks to have removed, with
              sufficient detail so that Company is capable of finding and
              verifying its existence;
            </li>
            <li className="pl-2">
              Contact information about the notifier including address,
              telephone number and, if available, e-mail address;
            </li>
            <li className="pl-2">
              A statement that the notifier has a good faith belief that the
              material is not authorized by the copyright owner, its agent, or
              the law; and
            </li>
            <li className="pl-2">
              A statement made under penalty of perjury that the information
              provided is accurate and the notifying party is authorized to make
              the complaint on behalf of the copyright owner.
            </li>
          </ol>

          <p>
            If we receive a takedown notice in accordance with the foregoing, we
            will remove the material cited in the notice and attempt to notify
            any user who uploaded the allegedly infringing material if we have
            their contact information. Any such user will have the opportunity
            to submit a "counter-notice" as set forth below. If we determine
            that any user has repeatedly infringed upon the intellectual
            property rights of others, we will disable any accounts that user
            has with us when appropriate.
          </p>

          <div className="bg-green-50 p-4 border-l-4 border-green-400 text-black">
            <p className="font-semibold text-lg mb-2">
              Procedure to Deliver Counter-Notice:
            </p>
            <p>
              If any user believes any material removed is either not infringing
              or that such user has the right to post and use such material from
              the copyright owner, the copyright owner's agent, or pursuant to
              the law, the user must send a counter-notice containing the
              following information to the Designated Agent listed below:
            </p>
          </div>

          <ol className="list-decimal pl-6 space-y-3">
            <li className="pl-2">
              A physical or electronic signature of the user;
            </li>
            <li className="pl-2">
              Identification of the material that has been removed and the
              location at which the material appeared before it was removed;
            </li>
            <li className="pl-2">
              A statement that the user has a good faith belief that the
              material was removed as a result of mistake or a misidentification
              of the material; and
            </li>
          </ol>

          <p>
            The user's name, address, telephone number, and, if available,
            e-mail address and a statement that such person or entity consents
            to the jurisdiction of the Federal Court for the judicial district
            in which the user's address is located, or if the user's address is
            located outside the United States, for any judicial district in
            which Company is located, and that such person or entity will accept
            service of process from the person who provided notification of the
            alleged infringement.
          </p>

          <p>
            If a counter-notice is received by the Designated Agent, Company
            will forward a copy of the counter-notice to the original
            complaining party informing that person that Company may restore the
            removed material following 10 days. The original complaining party
            will then have 10 days to notify us that he or she has filed legal
            action relating to the allegedly infringing material. If Company
            does not receive any such notification within 10 days, we may
            restore the material, at our discretion.
          </p>

          <div className="bg-white-50 p-4 rounded-lg border">
            <p className="font-semibold text-lg mb-2">Contact Information</p>
            <p>
              Please contact the Designated Agent to Receive Notification of
              Claimed Infringement for Company at{" "}
              <a
                href="mailto:dmca@nobsounds.com"
                className="text-blue-600 hover:underline font-medium"
              >
                dmca@nobsounds.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
