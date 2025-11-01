import { useEffect,useState } from "react"
import Navbar from "../../components/Navbar";

export default function AdminProducts(){
   
  const [products,setProducts] = useState([]);
  const [editingProduct ,setEditingProduct] =useState(null);
  const [newProduct,setNewProduct]=useState({
    name:"",
    category:"",
    price:"",
    image:"",
    description:"",
   
  });

  useEffect(()=>{
    fetch("http://localhost:5001/products")
    .then((res)=>res.json())
    .then((data)=>setProducts(data))
    .catch((err)=>console.error("Error fetching product:",err))
  },[]);

  const handleDelete = async(id)=>{
    await fetch(`http://localhost:5001/products/${id}`,{
      method:"DELETE",
    });
    setProducts(products.filter((p)=>p.id !==id));
  };

  const handleAdd = async (e)=>{
   e.preventDefault();
   const res =await fetch("http://localhost:5001/products",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify(newProduct),
   });

   const data = await res.json();
   setProducts([...products,data]);
   setNewProduct({name:"", price:"",image:"",description:"",category:""})
  };

  const handleEdit = async (e) =>{
    e.preventDefault();
    const res = await fetch (`http://localhost:5001/products/${editingProduct.id}`,{
      method:"PUT",
      headers:{"Content-Type" : "application/json"},
      body:JSON.stringify(editingProduct),
    });
    const data = await res.json();
    setProducts(products.map((p)=>(p.id ===data.id ? data:p)));
     setEditingProduct(null);
  }

    return (
      <div>
        <Navbar/>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 mt-12">Manage Products</h1>

        {/* {add} */}
        <form onSubmit={handleAdd} className="mb-6 space-y-3">
        <input
        placeholder="Name"
        value={newProduct.name}
        onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}
        className="border p-2 rounded w-full"
        />

         <input
        placeholder="Category"
        value={newProduct.category}
        onChange={(e)=> setNewProduct({...newProduct, category:e.target.value})}
        className="border p-2 rounded w-full"

        />

        <input
         placeholder="Price"
         value={newProduct.price}
         onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}
         className="border p-2 rounded w-full"
         />

        <input
        placeholder="Image URL"
        value={newProduct.image}
        onChange={(e)=> setNewProduct({...newProduct,image:e.target.value})}
        className="border p-2 rounded w-full"
        />

        <textarea
        placeholder="Description"
        value={newProduct.description}
        onChange={(e)=> setNewProduct({...newProduct,description:e.target.value})}
        className="border p-2 rounded w-full"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
         Add Product
        </button>
        </form>

        {/* {pdct list} */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
        

       <tbody>
        {products.map((p)=>(
           <tr key={p.id}>
            <td  className="border p-2">{p.id}</td>
            <td  className="border p-2">{p.name}</td>
            <td  className="border p-2">${p.price}</td>
            <td  className="border p-2">
              <img src={p.image} alt={p.name}
              className="w-16 h-16 object-cover"
              />
            </td>
             <td className="border p-2 space-x-2">
              <button 
              onClick={()=>setEditingProduct(p)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
              >
              Edit
              </button>
             
              <button
              onClick={()=>handleDelete(p.id)}
               className="bg-red-500 text-white px-3 py-1 rounded"
              >
              Delete
              </button>
             </td>
           </tr>
        ))}
       </tbody>
       </table>
        
        {/* {edit} */}
        {editingProduct &&(
          <form
          onSubmit={handleEdit} className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">Edit Product</h2>
            
            <input
            placeholder="Name"
            value={editingProduct.name}
            onChange={(e)=>
              setEditingProduct({...editingProduct, name:e.target.value})
            }
             className="border p-2 rounded w-full"
            />

            <input
            placeholder="Category"
            value={editingProduct.category}
            onChange={(e)=>
              setEditingProduct({...editingProduct,category:e.target.value})
            }
            className="border p-2 rounded w-full"
            />

            <input
            placeholder="price"
            value={editingProduct.price}
            onChange={(e)=>
              setEditingProduct({...editingProduct,price:e.target.value})
            }
             className="border p-2 rounded w-full"
            />
            <input
            placeholder="Image URL"
            value={editingProduct.image}
            onChange={(e)=>
              setEditingProduct({...editingProduct,image:e.target.value})
            }
              className="border p-2 rounded w-full"
            />
            <textarea
            placeholder="Description"
            value={editingProduct.description}
            onChange={(e)=>
              setEditingProduct({...editingProduct,description:e.target.value})
            }
            className="border p-2 rounded w-full"
            />
            <button  className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Product
            </button>
          </form>
        )}

      </div>
      </div>
    )
  }


