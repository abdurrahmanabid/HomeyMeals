import { motion } from "framer-motion";
import {
      ArrowRightLeft,
      Github,
      Linkedin,
      MessageSquare,
      ShoppingCart,
      Star,
      Twitter,
      Utensils
} from "lucide-react";
import React from "react";
import abid from "../assets/imgs/abid.jpg";
import borat from "../assets/imgs/borat.jpg";

const AboutUs = () => {
  const profiles = [
    {
      name: "Md Abdur Rahman Abid",
      role: "Founder & CEO",
      image: abid,
      username: "@AbidRahman",
      website: "homeymeals.com",
      stats: {
        "Projects Led": "15",
        "Happy Clients": "1.2K",
        "Years of Experience": "5",
      },
    },
    {
      name: "Lailatul Borat",
      image: borat,
      role: "Co-Founder & Head of Operations",
      username: "@LailatulBorat",
      website: "homeymeals.com",
      stats: {
        "Operational Excellence": "99%",
        "Successful Campaigns": "12",
        "Team Leadership": "7 Years",
      },
    },
  ];

  const icons = {
    "Projects Led": <Utensils className="w-5 h-5" />,
    "Happy Clients": <Star className="w-5 h-5" />,
    "Years of Experience": <ArrowRightLeft className="w-5 h-5" />,
    "Operational Excellence": <ShoppingCart className="w-5 h-5" />,
    "Successful Campaigns": <Star className="w-5 h-5" />,
    "Team Leadership": <ArrowRightLeft className="w-5 h-5" />,
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-accent5 to-accent4 p-8 gap-5">
      {profiles.map((profile, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-3xl p-6 relative overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-500"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent3/50 to-accent2/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Profile Section */}
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent2 to-accent1 rounded-full animate-pulse opacity-75" />
                <div className="relative rounded-full overflow-hidden w-24 h-24 ring-2 ring-accent5">
                  <img
                    src={profile.image}
                    alt="profile"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary mb-1 animate-fadeIn">
                  {profile.name}
                </h2>
                <p className="text-secondary animate-fadeIn delay-200">
                  {profile.role}
                </p>
                <div className="text-gray-600 text-sm mt-2">
                  <span>{profile.username}</span> •
                  <a
                    href={profile.website}
                    className="ml-2 text-accent1 hover:text-accent2 transition-colors"
                  >
                    {profile.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {[
                {
                  icon: <Linkedin className="w-4 h-4" />,
                  color: "hover:bg-accent1",
                },
                {
                  icon: <Twitter className="w-4 h-4" />,
                  color: "hover:bg-accent2",
                },
                {
                  icon: <Github className="w-4 h-4" />,
                  color: "hover:bg-accent3",
                },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  href="#"
                  className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 ${social.color} hover:text-white transition-all duration-300`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Message Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-secondary to-primary text-white py-3 rounded-xl mb-6 flex items-center justify-center gap-2 group/btn hover:shadow-lg transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5 group-hover/btn:animate-bounce" />
              Message Now
            </motion.button>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(profile.stats).map(([label, value]) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.1 }}
                  className="p-3 rounded-xl bg-accent5 hover:bg-accent4 transition-colors duration-300 group/stat"
                >
                  <div className="flex items-center justify-center mb-2 text-secondary group-hover/stat:text-primary transition-colors">
                    {icons[label]}
                  </div>
                  <div className="text-lg font-bold text-primary text-center mb-1">
                    {value}
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AboutUs;
