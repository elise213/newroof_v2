import Link from "next/link";
import Image from "next/image";

export const Footer = () => (
  <footer className="footer">
    <div className="footer-div-1">
      <div className="sitemap">
        <Link href="/">HOME</Link>
        <a href="https://billing.stripe.com/p/login/5kA9BZ1aE7ZDgAo9AA">
          ACCOUNT
        </a>
        <Link href="/terms">RULES & TERMS</Link>
        <Link href="/contact">
          CONTACT
          <Image
            className="whats"
            src="/img/WhatsApp.svg.png"
            alt="WhatsApp Icon"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
    <div className="footer-div-2">
      <p className="footer-text">RICKY'S HOMESHARING</p>

      <p style={{ fontSize: "12px", color: "white" }}>
        © 2025 Ricky's Homesharing, All Rights Reserved
      </p>
    </div>
  </footer>
);
