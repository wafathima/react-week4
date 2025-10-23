import {FaInstagram, FaTwitter, FaFacebookF,FaYoutube, FaPinterest} from "react-icons/fa"

export default function Footer(){
    return (
        <footer className="bg-black text-gray-300 py-10 px-6">
            <div className="max-w-6xl max-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* {support} */}
                <div>
                    <h3 className="text-white font-semibold mb-4">SUPPORT</h3>
                    <ul className="space-y-2 text-sm"> 
                        <li><a href="#" className="hover:text-white">Contact us</a></li>
                        <li><a href="#" className="hover:text-white">Promotions & Sale</a></li>
                        <li><a href="#" className="hover:text-white">Track Order</a></li>
                        <li><a href="#" className="hover:text-white">Shoe Care</a></li>
                        <li><a href="#" className="hover:text-white">Tech Glossary</a></li>
                        <li><a href="#" className="hover:text-white">Return / Exchange</a></li>
                    </ul>
                </div>

                {/* {about} */}
                <div>
                    <h3 className="text-white font-semibold mb-4">ABOUT</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Company</a></li>
                        <li><a href="#" className="hover:text-white">Corporate News</a></li>
                        <li><a href="#" className="hover:text-white">Press Center</a></li>
                        <li><a href="#" className="hover:text-white">Investors</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Store Locator</a></li>
                    </ul>
                </div>

               {/* {social icons} */}
               <div className="md:text-right">
                <h3 className="text-white font-semibold mb-4">STAY UP TO DATE</h3>
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
             <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} LIO. All rights reserved.
             </div>

        </footer>
    )
}