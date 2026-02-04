import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PricingPlans = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const plans = [
    {
      name: "Start",
      monthlyPrice: 99,
      features: [
        "Up to 4 bookings per month",
        "Basic customer support",
        "7 day free trial",
        "Mobile responsive",
      ],
      color: "blue",
      popular: false,
    },
    {
      name: "Plus",
      monthlyPrice: 199,
      features: [
        "Up to 10 bookings per month",
        "Standard customer support",
        "Faster priority service",
        "7 day free trial",
        "Email notifications",
        "Basic analytics",
      ],
      color: "purple",
      popular: true,
    },
    {
      name: "Pro",
      monthlyPrice: 249,
      features: [
        "Up to 25 bookings per month",
        "Verified badge",
        "Instant priority service",
        "7 day free trial",
        "Priority support 24/7",
        "Advanced analytics",
        "Featured listing",
      ],
      color: "orange",
      popular: false,
    },
  ];

  const handleSelectPlan = (plan) => {
    if (!isAuthenticated) {
      navigate("/signup");
      return;
    }
    // TODO: Integrate with payment gateway
    alert(
      `Selected ${plan.name} plan for ₹${plan.monthlyPrice || plan.price}/month. 7 day free trial included! Payment integration coming soon!`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Grow your business with the perfect plan for your needs
          </p>
          <p className="text-lg text-green-600 font-semibold">
            🎉 Get 7 Days Free Trial with Every Plan!
          </p>
        </div>

        {/* Service Business Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Service Business Plans
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Monthly subscription - Renew every month
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                  plan.popular ? "ring-4 ring-purple-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}

                <div
                  className={`p-8 text-white ${
                    plan.color === "blue"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600"
                      : plan.color === "purple"
                        ? "bg-gradient-to-br from-purple-500 to-purple-600"
                        : "bg-gradient-to-br from-orange-500 to-orange-600"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold">
                      ₹{plan.monthlyPrice}
                    </span>
                    <span className="text-xl">/month</span>
                  </div>
                </div>

                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg
                          className={`w-6 h-6 mr-3 flex-shrink-0 ${
                            plan.color === "blue"
                              ? "text-blue-600"
                              : plan.color === "purple"
                                ? "text-purple-600"
                                : "text-orange-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                        : plan.color === "blue"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-orange-600 text-white hover:bg-orange-700"
                    }`}
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Feature
                  </th>
                  {plans.map((plan, index) => (
                    <th
                      key={index}
                      className="text-center py-4 px-6 font-semibold text-gray-900"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">Business Listings</td>
                  <td className="py-4 px-6 text-center">1</td>
                  <td className="py-4 px-6 text-center">Up to 5</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">Lead Generation</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓ Priority</td>
                  <td className="py-4 px-6 text-center">✓ Instant</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">Analytics</td>
                  <td className="py-4 px-6 text-center">Basic</td>
                  <td className="py-4 px-6 text-center">Advanced</td>
                  <td className="py-4 px-6 text-center">Custom Dashboard</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">Support</td>
                  <td className="py-4 px-6 text-center">Email</td>
                  <td className="py-4 px-6 text-center">24/7 Phone</td>
                  <td className="py-4 px-6 text-center">Dedicated Manager</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">SEO Optimization</td>
                  <td className="py-4 px-6 text-center">-</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">API Access</td>
                  <td className="py-4 px-6 text-center">-</td>
                  <td className="py-4 px-6 text-center">-</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                We offer a 14-day free trial for all plans. No credit card
                required to start.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, UPI, and net
                banking payments.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. Your access
                will continue until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
