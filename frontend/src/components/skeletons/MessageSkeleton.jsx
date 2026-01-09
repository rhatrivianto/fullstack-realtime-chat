// // Removed duplicate MessageSkeleton declaration and export

// import { useEffect, useState } from "react";

// const MessageSkeleton = () => {
//   const [testMode, setTestMode] = useState(true);

//   console.log("🔧 MessageSkeleton RENDERED - testMode:", testMode);
//   console.log("🔧 skeletonMessages length:", testMode ? 0 : 6);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       console.log("🕒 Timer finished - setting testMode to false");
//       setTestMode(false);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   const skeletonMessages = testMode ? [] : Array(6).fill(null);

//   return (
//     <div className="flex-1 overflow-y-auto p-4 space-y-4  bg-red-100">
//       {testMode && (
//         <div className="bg-red-500 text-white p-4 text-center border-4 border-yellow-400 font-bold text-lg">
//           🚨 TEST MODE AKTIF!
//           <br />
//           skeletonMessages = {skeletonMessages.length} items
//           <br />
//           {skeletonMessages.length === 0
//             ? "ARRAY KOSONG - TIDAK ADA SKELETON!"
//             : "ARRAY ADA - 6 SKELETON"}
//         </div>
//       )}
//       {/* ✅ FIX: HAPUS </div> YANG TIDAK PERLU */}
//       <div
//         className={testMode ? "bg-blue-100 border-2 border-blue-500 p-2" : ""}
//       >
//         {/* ✅ SKELETON MESSAGES HARUS DI DALAM DIV BIRU */}
//         {skeletonMessages.map((_, idx) => (
//           <div
//             key={idx}
//             className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
//           >
//             <div className="chat-image avatar">
//               <div className="size-10 rounded-full">
//                 <div className="skeleton w-full h-full rounded-full" />
//               </div>
//             </div>

//             <div className="chat-header mb-1">
//               <div className="skeleton h-4 w-16" />
//             </div>

//             <div className="chat-bubble bg-transparent p-0">
//               <div className="skeleton h-16 w-[200px]" />
//             </div>
//           </div>
//         ))}

//         {/* ✅ TAMPILAN JIKA ARRAY KOSONG */}
//         {skeletonMessages.length === 0 && (
//           <div className="text-center text-gray-500 py-8 bg-green-100 border-2 border-green-500">
//             📭 ARRAY SKELETON MESSAGES KOSONG!
//             <br />
//             Tidak ada elemen yang di-render oleh .map()
//           </div>
//         )}
//       </div>{" "}
//       {/* ✅ INI PENUTUP DIV BIRU YANG BENAR */}
//     </div>
//   );
// };

// export default MessageSkeleton;

import { useEffect, useState } from "react";

const MessageSkeleton = () => {
  const [testMode, setTestMode] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setTestMode(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          // ✅ TEST: Hilangkan conditional className
          className={`chat ${
            testMode ? "" : idx % 2 === 0 ? "chat-start" : "chat-end"
          }`}
        >
          {testMode && (
            <div className="bg-blue-100 text-xs p-l text-center">
              🔧 No chat-start/chat-end classes
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
