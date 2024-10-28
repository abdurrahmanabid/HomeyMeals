import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export function TermsAndConditions() {
  return (
    <div className="container mx-auto p-5 md:p-10">
      <Card>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Terms and Conditions
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            Introduction
          </h2>
          <p className="text-gray-600">
            Welcome to HomeyMeals. By accessing or using our platform, you agree
            to be bound by these Terms and Conditions. Please read them
            carefully before using our services.
          </p>
        </section>

        {/* Accounts */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            Accounts
          </h2>
          <p className="text-gray-600">
            To access certain features of our platform, users must register and
            maintain an active account. You are responsible for maintaining the
            confidentiality of your account and password and for restricting
            access to your computer. You agree to accept responsibility for all
            activities that occur under your account or password.
          </p>
        </section>

        {/* Ordering & Payment */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            Ordering & Payment
          </h2>
          <p className="text-gray-600">
            When ordering meals through HomeyMeals, you agree to provide
            accurate and current information. Payments are securely processed
            through our platform, and we do not store any payment information.
            Note that prices and availability of items may vary depending on the
            household sellers.
          </p>
        </section>

        {/* Cancellations & Refunds */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            Cancellations & Refunds
          </h2>
          <p className="text-gray-600">
            Orders may be canceled within a specified timeframe. Once an order
            has been prepared by the seller, it cannot be canceled, and no
            refund will be issued. Refunds for eligible cancellations will be
            processed within 7-10 business days.
          </p>
        </section>

        {/* User Conduct */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            User Conduct
          </h2>
          <p className="text-gray-600">
            As a user of HomeyMeals, you agree to use our platform for lawful
            purposes only. Any misuse of the platform, including fraudulent
            orders, harassment of other users, or violation of intellectual
            property rights, will result in account suspension or termination.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            Limitation of Liability
          </h2>
          <p className="text-gray-600">
            HomeyMeals is not liable for any indirect, consequential, or
            incidental damages arising out of or in connection with your use of
            the platform, including but not limited to food quality or delivery
            issues.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            Changes to Terms
          </h2>
          <p className="text-gray-600">
            HomeyMeals reserves the right to modify these terms at any time. We
            will notify users of significant changes, and your continued use of
            the platform constitutes acceptance of the modified terms.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us via our{" "}
            <Link to="/contact" className="text-cyan-600 hover:underline">
              Contact page
            </Link>
            .
          </p>
        </section>
      </Card>
    </div>
  );
}
