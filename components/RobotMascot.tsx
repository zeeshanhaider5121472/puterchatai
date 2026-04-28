// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useAppContext } from '@/context/AppContext';

// export default function RobotMascot() {
//   const { robotMood } = useAppContext();
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [isClient, setIsClient] = useState(false); // Prevents SSR rendering

//   useEffect(() => {
//     setIsClient(true); // Now we are in the browser
//     const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
//     window.addEventListener('mousemove', handleMouse);
//     return () => window.removeEventListener('mousemove', handleMouse);
//   }, []);

//   const calcEyeOffset = (axis: 'x' | 'y') => {
//     if (!isClient) return 0; // Don't run on server
//     const center = axis === 'x' ? window.innerWidth / 2 : window.innerHeight / 2;
//     const diff = axis === 'x' ? mousePos.x - center : mousePos.y - center;
//     return Math.min(Math.max(diff / 100, -3), 3);
//   };

//   const eyeX = calcEyeOffset('x');
//   const eyeY = calcEyeOffset('y');

//   // Return null on the server to prevent window errors
//   if (!isClient) return null; 

//   return (
//     <motion.div 
//       className="fixed bottom-24 left-8 z-30 hidden lg:block"
//       animate={robotMood === 'jumping' ? { y: [-10, -30, -10] } : { y: 0 }}
//       transition={{ duration: 0.5, repeat: robotMood === 'jumping' ? Infinity : 0 }}
//     >
//       <motion.svg width="80" height="100" viewBox="0 0 100 120" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}>
//         {/* Antenna */}
//         <motion.path d="M50 20 L50 5" stroke="#a855f7" strokeWidth="3" fill="none" />
//         <motion.circle cx="50" cy="5" r="4" fill="#a855f7" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        
//         {/* Head */}
//         <rect x="20" y="20" width="60" height="50" rx="15" fill="#1e1e2e" stroke="#a855f7" strokeWidth="2" />
        
//         {/* Eyes */}
//         <g>
//           <circle cx="38" cy="45" r="8" fill="white" />
//           <circle cx="62" cy="45" r="8" fill="white" />
//           <motion.circle 
//             cx="38" cy="45" r="4" fill="#0f172a"
//             animate={{ cx: 38 + eyeX, cy: 45 + eyeY }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//           />
//           <motion.circle 
//             cx="62" cy="45" r="4" fill="#0f172a"
//             animate={{ cx: 62 + eyeX, cy: 45 + eyeY }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//           />
//         </g>

//         {/* Mouth Reactions */}
//         {robotMood === 'laughing' && (
//           <motion.path d="M35 60 Q50 75 65 60" stroke="#a855f7" strokeWidth="3" fill="none" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.3, repeat: Infinity }} />
//         )}
//         {robotMood === 'sleeping' && (
//           <>
//             <line x1="30" y1="58" x2="46" y2="58" stroke="#a855f7" strokeWidth="3" />
//             <line x1="54" y1="58" x2="70" y2="58" stroke="#a855f7" strokeWidth="3" />
//             <motion.text x="75" y="35" fontSize="12" fill="#a855f7" animate={{ opacity: [0, 1, 0], y: [20, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>Z</motion.text>
//           </>
//         )}
//         {(robotMood === 'idle' || robotMood === 'jumping') && (
//           <path d="M38 60 L62 60" stroke="#a855f7" strokeWidth="3" />
//         )}

//         {/* Body */}
//         <rect x="30" y="70" width="40" height="30" rx="8" fill="#1e1e2e" stroke="#a855f7" strokeWidth="2" />
//       </motion.svg>
//     </motion.div>
//   );
// }