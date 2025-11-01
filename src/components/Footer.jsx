import {FaInstagram, FaTwitter, FaFacebookF,FaYoutube, FaPinterest} from "react-icons/fa"

export default function Footer(){
    return (
        <footer className="bg-gray-200 text-black py-10 px-6">
            <div className="max-w-6xl max-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* {support} */}
                <div>
                    <h3 className="text-black font-semibold mb-4">SUPPORT</h3>
                    <ul className="space-y-2 text-sm"> 
                        <li><a href="#" className="hover:text-gray-600">Contact us</a></li>
                        <li><a href="#" className="hover:text-gray-600">Promotions & Sale</a></li>
                        <li><a href="#" className="hover:text-gray-600">Track Order</a></li>
                        <li><a href="#" className="hover:text-gray-600">Shoe Care</a></li>
                        <li><a href="#" className="hover:text-gray-600">Tech Glossary</a></li>
                        <li><a href="#" className="hover:text-gray-600">Return / Exchange</a></li>
                    </ul>
                </div>

                {/* {about} */}
                <div>
                    <h3 className="text-black font-semibold mb-4">ABOUT</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-gray-600">Company</a></li>
                        <li><a href="#" className="hover:text-gray-600">Corporate News</a></li>
                        <li><a href="#" className="hover:text-gray-600">Press Center</a></li>
                        <li><a href="#" className="hover:text-gray-600">Investors</a></li>
                        <li><a href="#" className="hover:text-gray-600">Careers</a></li>
                        <li><a href="#" className="hover:text-gray-600">Store Locator</a></li>
                    </ul>
                </div>

               {/* {social icons} */}
               <div className="md:text-right">
                <h3 className="text-black font-semibold mb-4">STAY UP TO DATE</h3>
                <div className="flex md:justify-end gap-5 text-xl">
                    <a href="#" className="hover:text-red-500"><FaYoutube/></a>
                    <a href="#" className="hover:text-sky-400"><FaTwitter/></a>
                    <a href="#" className="hover:text-pink-500"><FaInstagram/></a>
                    <a href="#" className="hover:text-blue-500"><FaFacebookF/></a>
                    <a href="#" className="hover:text-red-400"><FaPinterest/></a>
                </div>
               </div>
            </div>

             {/* {bottom} */}
             <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-black">
                © {new Date().getFullYear()} LIO. All rights reserved.
             </div>

        </footer>
    )
}