import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full px-4 lg:px-8 py-4 bg-[#942424] text-[#EBF4DD] text-center text-sm shadow-[inset_0px_4px_13px_-44px_rgba(0,0,0,0.1)]">
      © 2026 nobsounds. All rights reserved.
      <Link href="/legals/terms-of-service" className="ml-4 underline">
        Terms of Service
      </Link>
      <Link href="/legals/privacy-policy" className="ml-4 underline">
        Privacy Policy
      </Link>
      <Link href="/legals/dmca-copyright" className="ml-4 underline">
        DCMA - Copyright
      </Link>
    </footer>
  );
};

export default Footer;
