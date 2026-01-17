import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold">
              GAiN Africa
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 max-w-md">
              Global Adventist internet Network- Bringing together Adventist
              media and communications professionals across Africa to share
              knowledge, build partnerships, and advance the mission.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/events"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/presenters"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Presenters
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-primary-foreground/70">
                info@gainafrica.org
              </li>
              <li className="text-sm text-primary-foreground/70">
                Follow us on social media
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8">
          <p className="text-center text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} GAiN Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
