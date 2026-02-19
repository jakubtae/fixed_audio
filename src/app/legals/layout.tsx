import { Header1 } from "@/components/elements/h1";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header1>Legals Page</Header1>
      <div className="flex flex-row gap-4 p-4 w-full items-center justify-center">
        <Button variant="link_inherit" asChild>
          <Link href="/legals/terms-of-service" className="font-semibold p-4">
            Terms of Service
          </Link>
        </Button>
        <Button variant="link_inherit" asChild>
          <Link href="/legals/privacy-policy" className="font-semibold p-4">
            Privacy Policy
          </Link>
        </Button>

        <Button variant="link_inherit" asChild>
          <Link href="/legals/dmca-copyright" className="font-semibold p-4">
            DMCA Copyright
          </Link>
        </Button>
      </div>
      {children}
    </div>
  );
}
