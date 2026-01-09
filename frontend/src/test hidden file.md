import { useState, useEffect } from "react";

const ChatContainer = () => {
const [simulateLoading, setSimulateLoading] = useState(true); // ← State tambahan

useEffect(() => {
// Simulasi loading 3 detik
const timer = setTimeout(() => {
setSimulateLoading(false);
}, 3000);
return () => clearTimeout(timer);
}, []);

if (isMessagesLoading || simulateLoading) { // ← Tambahkan kondisi
return (
<div className="flex-1 flex flex-col overflow-auto">
<ChatHeader />
{/_ <MessageSkeleton /> _/}
<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-100">
<div className="text-center text-blue-600 mt-8">
⏳ Loading... (Tanpa Skeleton)
</div>
</div>
<MessageInput />
</div>
);
}
