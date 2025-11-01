import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus, removeFromOrder } from "../../features/orders/ordersSlice";

export default function AdminOrdersPage() {
  const orders = useSelector((state) => state.orders.items);
  const dispatch = useDispatch();

  const handleStatusChange = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  return (
    <div>
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-2xl bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Products</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{order.id}
                  </td>

                  <td className="py-4">
                    {order.items.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 mb-2">
                     <img
                     src={p.image}
                     alt={p.name}
                      className="w-10 h-10 object-cover rounded-md border"
                       />
                        <div>
                     <p className="font-medium text-gray-800">{p.name}</p>
                     <p className="text-sm text-gray-500">
                     Qty: {p.qty} — ₹{p.price * p.qty}
                     </p>
                     </div>
                     </div>
                     ))}
                    </td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ${order.total || order.items.reduce((a, it) => a + it.price * it.qty, 0)}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.timestamp).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-orange-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="Proceeding">Proceeding</option>
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      onClick={() => dispatch(removeFromOrder(order.id))}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}
