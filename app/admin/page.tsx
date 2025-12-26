export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-900">Dashboard</h1>
      <p className="mt-2 text-stone-600">Welcome back, Boss.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
          <h3 className="text-sm font-medium text-stone-500">Total Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-stone-900">$0.00</p>
        </div>
        
        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
          <h3 className="text-sm font-medium text-stone-500">Total Orders</h3>
          <p className="mt-2 text-3xl font-bold text-stone-900">0</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
          <h3 className="text-sm font-medium text-stone-500">Active Products</h3>
          <p className="mt-2 text-3xl font-bold text-stone-900">--</p>
        </div>
      </div>
    </div>
  );
}