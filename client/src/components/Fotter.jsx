// client/src/components/Footer.jsx
const Footer = () => {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", url: "#" },
        { text: "Best Sellers", url: "#" },
        { text: "Offers & Deals", url: "#" },
        { text: "Contact Us", url: "#" },
        { text: "FAQs", url: "#" },
      ],
    },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-yellow-400/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img
            className="w-14 md:w-14"
            src="../../Slogo.png"
            alt="logo"
          />
          <p className="max-w-[410px] mt-6">
            Serving Sri Lankan families with fresh, quality groceries and
            friendly service. Your trusted neighborhood store for all your daily
            needs.
          </p>
        </div>
        {/* Links container */}
        <div className="w-full md:w-auto">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="text-sm flex flex-wrap gap-4 md:gap-6">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:underline transition block">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;