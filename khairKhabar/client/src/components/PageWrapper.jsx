import { motion } from "framer-motion";
const PageWrapper = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="min-h-screen"
		>
			{children}
		</motion.div>
	);
};

export default PageWrapper;
