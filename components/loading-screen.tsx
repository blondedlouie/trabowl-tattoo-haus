"use client";
import { motion } from "framer-motion";
export const LoadingScreen = () => <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: .7, duration: .5 }} className="pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-ink"><p className="font-heading text-4xl text-neon">TRABOWL</p></motion.div>;
