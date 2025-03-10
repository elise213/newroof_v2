import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => (
  <footer className="footer">
    <div className="footer-div-1">
      <div className="sitemap">
        <Link href="/" passHref>
          HOME
        </Link>
        <Link
          href="https://billing.stripe.com/p/login/5kA9BZ1aE7ZDgAo9AA"
          passHref
        >
          ACCOUNT
        </Link>
        <Link href="/terms" passHref>
          RULES & TERMS
        </Link>
        <Link href="/contact" passHref>
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
      <Link href="/" passHref>
        <p className="footer-text">RICKY'S HOMESHARING</p>
      </Link>

      <p style={{ fontSize: "12px", color: "white" }}>
        © 2025 Ricky's Homesharing, All Rights Reserved
      </p>
    </div>
  </footer>
);
