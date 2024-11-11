import React from 'react';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';

function Refund() {
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
                <h2 className="mb-4 text-center">Refund Policy</h2>
                <div className=" ms-3">
                    <p >
                        At Hadiyyeh, we strive to provide the best customer experience possible. If for any reason you are not completely satisfied with your purchase, we offer a hassle-free return policy to ensure your peace of mind. 
                        You have 7 days from the date of receiving your item to request a return. During this period, you can evaluate your purchase and decide if it meets your expectations. To be eligible for a return, your item must be in the same condition as when you received it. It should be unworn, unused, and in its original packaging. Please ensure that all tags are still attached. Additionally, you will need to provide the receipt or proof of purchase.
                        To start a return, please contact us at <a href="mailto:info@hadiyyehjo.com">info@hadiyyehjo.com</a>, or our Instagram page at <a href="https://www.instagram.com/hadiyyehjo" target="_blank" rel="noopener noreferrer">@hadiyyehjo</a>. Our dedicated customer service team will guide you through the process and provide you with the necessary instructions. 
                        We understand that sometimes unforeseen circumstances may occur during transit. If you receive a defective, damaged, or incorrect item, please inspect it upon reception and contact us immediately. Our team will evaluate the issue and make it right. 
                        Please note that we are unable to accept returns on sale items or gift cards. These items are final sale and cannot be refunded or exchanged. 
                        At Hadiyyeh, we value your satisfaction and want to ensure that you are completely happy with your purchase. If you have any further questions or concerns regarding our return policy, please don't hesitate to contact us at <a href="mailto:info@hadiyyehjo.com">info@hadiyyehjo.com</a>. Our team is here to assist you.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Refund;
