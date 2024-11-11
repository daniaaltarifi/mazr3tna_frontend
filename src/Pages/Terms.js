import React from 'react';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';


function Terms() {
    const [theme] = useThemeHook();
    window.scrollTo(0, 0);

    return (
        <section 
            className={
                theme 
                    ? 'bg-light-black text-light margin_section full-screen-slider' 
                    : 'bg-light text-black margin_section full-screen-slider'
            } 
            data-aos="fade-up"
        >
            <div className="container py-5">
                <h2 className="mb-4 text-center">Terms of service
                </h2>
                <div className=" ms-3">
                    <h5>OVERVIEW</h5>
                    <p>
                    This website is operated by Hadiyyeh. Throughout the site, the terms “we”, “us” and “our” refer to Hadiyyeh. Hadiyyeh offers this website, including all information, tools, and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.

By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
                    </p>
                    <h5>SECTION 1 - ONLINE STORE TERMS</h5>
                    <p>
                    By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
You must not transmit any worms or viruses or any code of a destructive nature.
A breach or violation of any of the Terms will result in an immediate termination of your Services.
                    </p>
                    <h5>SECTION 2 - GENERAL CONDITIONS</h5>
                    <p>
                    We reserve the right to refuse Service to anyone for any reason at any time.
You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us.
The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
                    </p>
                  
                </div>
            </div>
        </section>
  )
}

export default Terms