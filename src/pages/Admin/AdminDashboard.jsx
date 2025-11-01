import { Users, DollarSign, ShoppingBag, TrendingUp} from "lucide-react";
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,BarChart,Bar } from "recharts";

export default function AdminDashboard(){
  const stats = [
    {title: "Total Users", value:"1,678", change:"+12.5%",color:"text-blue-600",icon:<Users/>},
    {title: "Total Revenue", value:"$1,23,678", change:"+8.97%",color:"text-green-600",icon:<DollarSign/>},
    {title: "Total Orders", value:"348", change:"+6.5%",color:"text-purple-600",icon:<ShoppingBag/>},
    {title: "Conversion Rate", value:"89%", change:"-2.7%",color:"text-orange-600",icon:<TrendingUp/>}
  ];

  const salesData =[
   {month:"Jan",profit:38000},
   {month:"Feb",profit:55000},
   {month:"Mar",profit:34000},
   {month:"Apr",profit:46000},
   {month:"May",profit:65000},
   {month:"Jun",profit:50000},
   {month:"Jul",profit:41000},
   {month:"Aug",profit:53000},

  ];

  const barData =[
    {name:"Men'Shoe",sales:4000},
    {name:"Women'Shoe",sales:7000},
    {name:"Sports'Shoe",sales:8900},
    {name:"Ballet'Shoe",sales:2400},
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 mt-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
       {stats.map((item,i)=>(
        <div 
        key={i}
         className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition"
        >
        <div>
          <p className="text-gray-500">{item.title}</p>
          <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
          <span className={`${item.color} text-sm font-medium`}>
            {item.change} from last month
          </span>
        </div>
        <div className={`bg-gray-100 p-3 rounded-full ${item.color}`}>
          {item.icon}
        </div>
        </div>
       ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Monthly Profit</h3>
        <ResponsiveContainer  width="100%" height={250}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis  dataKey="month"/>
          <YAxis/>
          <Tooltip/>
          <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3}/>
        </LineChart>
        </ResponsiveContainer>
        </div>
       
       <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Category-wise Sales</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
       </div>
      </div>
    </div>

    
  )
}


