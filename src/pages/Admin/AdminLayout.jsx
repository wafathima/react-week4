import { Outlet, NavLink} from "react-router-dom";
import { LayoutDashboard,Users,Package,ShoppingBag,UserCircle2,LogOut } from "lucide-react";

export default function AdminLayout (){
    return (
        <div className="flex min-h-screen">

            <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between">
                <div>

                <h2 className="text-3xl font-extrabold text-center mt-8 mb-10 tracking-wide mt-10">L I O</h2>

                <nav className="flex flex-col gap-3 px-4">
                   <SidebarLink to="/admin/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
                   <SidebarLink to="/admin/users" icon={<Users />} label="Users" />
                   <SidebarLink to="/admin/products" icon={<Package />} label="Products" />
                   <SidebarLink to="/admin/orders" icon={<ShoppingBag />} label="Orders" />
                </nav>
                </div>

            <div className="border-t border-gray-700 p-4 flex items-center gap-3 bg-gray-800">
            <UserCircle2 className="w-10 h-10 text-gray-300"/>
            <div>
                <p className="font-semibold">Admin</p>
                <p className="text-gray-400 text-sm">admin@gmail.com</p>
            </div>

            <LogOut  className="w-5 h-5 text-gray-400 ml-auto hover:text-white cursor-pointer" />
         </div>
          </aside>

              <main className="flex-1 bg-gray-100 p-8">
              <Outlet/>
              </main>
        </div>
    )
};

        function SidebarLink({to, icon, label}){
             return (
                 <NavLink
                   to={to}
                   className={({isActive})=>
                   `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                     }`
                    }
                  >
                    {icon}
                      <span>{label}</span>
                         </NavLink>
    )
}


