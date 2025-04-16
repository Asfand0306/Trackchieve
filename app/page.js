export default function Page() {
  return (
    
    <div className="flex flex-col items-center justify-center h-screen p-7 bg-#131214">
      <h1 className="text-4xl font-bold p-10 (">Welcome to Trackchieve</h1>
      <h2 className="text-2xl font-bold">Sign In</h2>
      <div className="flex gap-4 mt-4">
        <button className="px-4 py-2 text-lg font-medium bg-blue-500 text-white rounded hover:bg-blue-600">
          
          Sign in with Steam
        </button>
        <button className="px-4 py-2 text-lg font-medium bg-gray-500 text-white rounded hover:bg-gray-600">
          Guest Sign In
        </button>
      </div>
    </div>
  );
}
// This is a Next.js page component that renders a welcome message.