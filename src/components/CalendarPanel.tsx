// src/components/CalendarPanel.tsx
// 'use client';

// import { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import "../styles/globals.css";

// export default function CalendarPanel() {
//   const [value, setValue] = useState<Date | null>(new Date());

//   return (
//     <div className="bg-red backdrop-blur-md p-4 rounded-xl border border-white/20">
//       <h2 className="text-lg font-heading text-white text-opacity-90 mb-2">Your Calendar</h2>
//       {/* <Calendar
//         onChange={(val) => setValue(val as Date | null)}
//         value={value}
//         className="w-full text-white"
//       /> */}

//       <iframe
//   src="https://calendar.google.com/calendar/embed?src=youremail@gmail.com&ctz=America%2FLos_Angeles"
//   className="w-full h-[400px] rounded-xl bgcolor=%23111111"
// ></iframe>

//     </div>
//   );
// }
