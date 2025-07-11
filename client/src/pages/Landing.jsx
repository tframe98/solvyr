import { motion } from 'framer-motion';
import { SignUpButton } from '@clerk/clerk-react';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  EyeIcon,
  ArrowRightIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import solvyrLogo from '../assets/solvyrlogo.png';

const Landing = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: "Smart Budgeting",
      description: "AI-powered budget recommendations and real-time spending analysis to keep you on track."
    },
    {
      icon: EyeIcon,
      title: "Visual Insights",
      description: "Beautiful charts and graphs that transform your financial data into actionable insights."
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Login",
      description: "Bank-level security with Clerk authentication to protect your financial information."
    }
  ];

  const timeline = [
    {
      step: "01",
      title: "Sign Up",
      description: "Create your account in seconds with secure authentication"
    },
    {
      step: "02", 
      title: "Connect Accounts",
      description: "Link your bank accounts and credit cards securely"
    },
    {
      step: "03",
      title: "Set Budgets",
      description: "Create personalized budgets for different categories"
    },
    {
      step: "04",
      title: "Track & Grow",
      description: "Monitor your progress and watch your savings grow"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      content: "Solvyr completely transformed how I manage my finances. The visual insights are incredible!",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Entrepreneur", 
      content: "Finally, a budgeting app that actually helps me save money. The AI recommendations are spot on.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Marketing Manager",
      content: "The interface is so clean and intuitive. I can see my financial health at a glance.",
      rating: 5,
      avatar: "EW"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-slate-50 to-slate-100 dark:from-gray-900 dark:via-black dark:to-gray-900"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-40 right-10 w-96 h-96 bg-slate-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight"
              variants={itemVariants}
            >
              Master Your
              <span className="block text-gradient-primary"> Financial Future</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Transform your relationship with money through intelligent budgeting, 
              beautiful insights, and secure financial management.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <SignUpButton mode="modal">
                <button className="btn btn-primary btn-lg group">
                  Start Your Journey
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignUpButton>
              <button className="btn btn-outline btn-lg">
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">10K+</div>
                <div className="text-slate-600 dark:text-slate-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">$2M+</div>
                <div className="text-slate-400">Saved by Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">4.9★</div>
                <div className="text-slate-600 dark:text-slate-400">User Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Powerful Features for Modern Finance
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to take control of your financial life
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card text-center p-8 hover:shadow-lg transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Get started in minutes with our simple 4-step process
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {timeline.map((item, index) => (
              <motion.div
                key={item.step}
                className="relative text-center"
                variants={itemVariants}
              >
                {/* Connector Line */}
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-600 z-0" />
                )}
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their financial lives
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="card p-6"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 italic">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-cyan-100 mb-8">
              Join thousands of users who are already taking control of their financial future
            </p>
            <SignUpButton mode="modal">
              <button className="btn bg-white text-orange-600 hover:bg-slate-100 btn-lg">
                Get Started Free
              </button>
            </SignUpButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img src={solvyrLogo} alt="Solvyr Logo" className="w-8 h-8 mr-2 inline-block align-middle" />
              <span className="text-xl font-bold text-white">Solvyr</span>
            </div>
            <p className="text-slate-400 mb-4">
              Master your financial future with intelligent budgeting and beautiful insights
            </p>
            <div className="text-slate-500 text-sm">
              © 2024 Solvyr. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 