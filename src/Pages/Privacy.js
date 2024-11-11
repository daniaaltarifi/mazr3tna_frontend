import React from "react";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";

function Privacy() {
  const [theme] = useThemeHook();
  window.scrollTo(0, 0);
  return (
    <section
      className={
        theme
          ? "bg-light-black text-light margin_section full-screen-slider"
          : "bg-light text-black margin_section full-screen-slider"
      }
      data-aos="fade-up"
    >
      <div className="container py-5">
        <div className=" ms-3">
          <h2>Privacy Policy</h2>
          <p>
            Privacy Policy Your privacy is important to us. This privacy policy
            explains how we collect, use, and protect your information.
            Information Collection We may collect personal information such as
            your name, email address, and payment information when you register
            on our site or make a purchase. How We Use Your Information The
            information we collect may be used to personalize your experience,
            improve customer service, and process transactions. Data Protection
            We implement a variety of security measures to maintain the safety
            of your personal information. Your Consent By using our site, you
            consent to our privacy policy. Changes to Our Privacy Policy We may
            update this privacy policy from time to time. We will notify you
            about significant changes in the way we treat personal information
            by sending a notice to the primary email address specified in your
            account or by placing a prominent notice on our site. Contact Us If
            you have any questions about this privacy policy, the practices of
            this site, or your dealings with this site, please contact us.
          </p>
          <h5>Changes to This Privacy Policy</h5>
          <p>
            We may update this Privacy Policy from time to time, including to
            reflect changes to our practices or for other operational, legal, or
            regulatory reasons. We will post the revised Privacy Policy on the
            Site, update the "Last updated" date, and take any other steps
            required by applicable law.
          </p>
          <h5>How We Collect and Use Your Personal Information</h5>
          <p>
            To provide the Services, we collect and have collected over the past
            12 months personal information about you from a variety of sources,
            as set out below. The information that we collect and use varies
            depending on how you interact with us. In addition to the specific
            uses set out below, we may use the information we collect about you
            to communicate with you, provide the Services, comply with any
            applicable legal obligations, enforce any applicable terms of
            service, and protect or defend the Services, our rights, and the
            rights of our users or others.
          </p>
          <h5>Data Protection</h5>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information.
          </p>
          <h5>Your Consent</h5>
          <p>By using our site, you consent to our privacy policy.</p>
          <h5>Changes to Our Privacy Policy</h5>
          <p>
            We may update this privacy policy from time to time. We will notify
            you about significant changes in the way we treat personal
            information by sending a notice to the primary email address
            specified in your account or by placing a prominent notice on our
            site.
          </p>
          <h5>Contact Us</h5>
          <p>
            Should you have any questions about our privacy practices or this
            Privacy Policy, or if you would like to exercise any of the rights
            available to you, email us at{" "}
            <a href="mailto:info@hadiyyehjo.com">info@hadiyyehjo.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Privacy;
