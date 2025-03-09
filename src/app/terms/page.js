import React from "react";
import "./termsandconditions.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <Link href="/checkout" passHref>
        <Button startIcon={<ArrowBackIosIcon />} className="backButton">
          Back to Checkout
        </Button>
      </Link>
      <div className="terms-header">
        <p className="terms-dates">
          Effective Date: October 1, 2022
          <br />
          Last Updated: October 7, 2024
        </p>
        <p className="terms-title">
          Terms and Conditions for Annual Membership
        </p>
      </div>

      <div className="terms-section">
        <p className="section-title">Membership Overview</p>
        <p className="section-content">
          By subscribing to an annual group membership, you are granted access
          to a private WhatsApp group where members can offer and exchange homes
          for temporary accommodation in exchange for a fee. By joining, you
          agree to abide by the following terms and conditions.
        </p>
      </div>

      <div className="terms-section">
        <p className="section-title">Membership</p>
        <ul className="section-list">
          <li>
            Membership is valid for one year from the date of subscription.
          </li>
          <li>
            Your membership will automatically renew if you do not cancel.
          </li>
          <li>
            Renewal notices will be sent prior to the expiration of the
            membership.
          </li>
          <li>
            Failure to make a valid payment will result in removal from the
            group.
          </li>
        </ul>
      </div>

      <div className="terms-section">
        <p className="section-title">Eligibility</p>
        <ul className="section-list">
          <li>You must be at least 18 years old to join the group.</li>
          <li>
            Members must provide accurate personal information during
            registration.
          </li>
          <li>
            Each member is entitled to one account, which is non-transferable.
          </li>
        </ul>
      </div>

      <div className="terms-section">
        <p className="section-title">Group Conduct</p>
        <ul className="section-list">
          <li>
            All posts and exchanges must be related to housing offers or
            requests.
          </li>
          <li>
            Members must treat others respectfully and refrain from
            discriminatory, abusive, or offensive language.
          </li>
          <li>
            Spam, unsolicited promotions, and irrelevant content are prohibited.
          </li>
          <li>
            Members must comply with all local laws and may not engage in
            illegal activities, including but not limited to fraud, unauthorized
            transactions, or misuse of the group.
          </li>
        </ul>
      </div>

      <div className="terms-section">
        <p className="section-title">Home Listings</p>
        <p className="section-content">
          Members are responsible for providing accurate and complete
          information about their homes, including the rental fee, location,
          duration, and any terms specific to the stay.
        </p>
        <p className="section-content">
          The platform does not verify or endorse any listings. Members must
          perform due diligence before entering into any agreements.
        </p>
      </div>

      <div className="terms-section">
        <p className="section-title">Payments and Transactions</p>
        <p className="section-content">
          All financial transactions are made directly between the member
          offering the property and the member renting it. The group
          administrators are not involved in any payment process and cannot be
          held responsible for disputes.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
