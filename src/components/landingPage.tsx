import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useState } from "react";
import { ClaimFormDialog } from "@/components/ClaimFormDialog";

const Landing = () => {
  const navigate = useNavigate();
  const [showClaimForm, setShowClaimForm] = useState(false);

  const bubbles = [
    {
      size: "w-36 h-36",
      position: "top-12 left-10",
      y: [-20, 20, -20],
      opacity: 0.2,
      duration: 18,
    },
    {
      size: "w-44 h-44",
      position: "bottom-16 right-10",
      y: [0, 25, 0],
      opacity: 0.15,
      duration: 20,
    },
    {
      size: "w-56 h-56",
      position: "top-1/3 left-1/2 -translate-x-1/2",
      y: [-25, 25, -25],
      opacity: 0.1,
      duration: 22,
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-background to-primary-light overflow-hidden flex items-center justify-center px-4">
      {/* Floating Bubbles */}
      {bubbles.map((bubble, idx) => (
        <motion.div
          key={idx}
          className={`${bubble.size} ${bubble.position} absolute rounded-full bg-gradient-to-br from-primary/30 via-primary-light to-background blur-[48px]`}
          style={{ opacity: bubble.opacity }}
          animate={{ y: bubble.y }}
          transition={{
            repeat: Infinity,
            duration: bubble.duration,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 w-full max-w-2xl"
      >
        <div className="backdrop-blur-xl bg-card/60 rounded-[2rem] p-8 md:p-12 text-center shadow-2xl border border-border/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ClaimIQ Health Insurance
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Simplifying health insurance claims for users and administrators.
            Fast, secure, and hassle-free experience tailored for you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl"
                onClick={() => setShowClaimForm(true)}
              >
                Apply for Claim
              </Button>
              <ClaimFormDialog open={showClaimForm} onOpenChange={setShowClaimForm} />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl"
                onClick={() => navigate("/admin")}
              >
                Admin Portal
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Wave */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-r from-primary-light via-primary/20 to-background rounded-t-[50%] opacity-40"
      />
    </div>
  );
};

export default Landing;
