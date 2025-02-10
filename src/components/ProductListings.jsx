import { useState } from 'react'
import BrandTab from './BrandTab'
import ProductCard from './ProductCard'

function ProductListings() {

    const products = [
        {
            "_id": "1",
            "name": "Asus TUF Gaming A15 Laptop",
            "brand": "Laptop, Asus",
            "rating": 4.7,
            "reviews": 4578,
            "image": "/assets/products/asus-tuf-gaming-a15.webp",
            "price": 1989,
            "description": "Power through gaming and work with the ASUS TUF Gaming A15, featuring the NVIDIA® GeForce RTX™ 4070 for stunning graphics and smooth performance. Powered by up to an AMD Ryzen™ 7 5800H processor, 16GB RAM, and 1TB SSD, it offers fast load times and ample storage. The 15.6-inch 3-sided NanoEdge display provides immersive visuals, while features like Webcam Shield, ASUS Antibacterial Guard, and WiFi 6 ensure security and connectivity. Pre-loaded with Windows 11 Home, it’s ready for both play and productivity.",
            "__v": 0
        },
        {
            "_id": "2",
            "name": "DELL Latitude 9330",
            "brand": "Laptop, DELL",
            "rating": 3.5,
            "reviews": 2533,
            "image": "/assets/products/dell-latitude.webp",
            "price": 1160,
            "description": "Boost your productivity with the Dell Latitude 9330 2-in-1, the ultimate business laptop. Powered by up to a 12th-gen Intel Core i7-1260U processor and Intel Iris Xe Graphics, it combines performance and efficiency seamlessly. Featuring a 13.3-inch QHD+ Touch display with ComfortView+ technology, it offers sharp visuals and reduced eye strain. With 16GB DDR5 RAM and up to 1TB PCIe NVMe SSD, you’ll enjoy fast multitasking and ample storage. Its 2-in-1 design adds versatility for work on the go. Elevate your business game with the Dell Latitude 9330",
            "__v": 0
        },
        {
            "_id": "3",
            "name": "MacBook Pro M2",
            "brand": "Laptop, Apple",
            "rating": 4.9,
            "reviews": 3110,
            "image": "/assets/products/macbooks-pro-m2.webp",
            "price": 2199,
            "description": "Experience unparalleled performance with the MacBook Pro M2. Powered by Apple's advanced M2 chip, it delivers incredible speed, efficiency, and power for demanding tasks. Choose from 13-inch or 14-inch Retina displays with True Tone for stunning visuals and vibrant colors. Equipped with up to 24GB unified memory and up to 2TB SSD, it ensures seamless multitasking and ample storage. Enjoy a quieter, more efficient design with an all-day battery life to keep you productive on the go. With macOS and a sleek, lightweight build, the MacBook Pro M2 redefines what a laptop can do.",
            "__v": 0
        },
        {
            "_id": "4",
            "name": "MSI Stealth 16 AI Studio Laptop",
            "brand": "Laptop, MSI",
            "rating": 4.6,
            "reviews": 1300,
            "image": "/assets/products/msi-stealth.jpg",
            "price": 5095,
            "description": "Meet the MSI Stealth 16 AI Studio A1VHG-028SG, a powerhouse designed for professionals and creators. It features an Intel® Core™ Ultra 9 185H processor, 32GB DDR5 RAM, NVIDIA® GeForce RTX™ 4080 GPU, and a stunning 16 UHD+ Mini LED display with 120Hz refresh and 100% DCI-P3 accuracy. With 2TB NVMe SSD, Intel® Killer™ Wi-Fi 7, and Hi-Res Dynaudio sound, this sleek 1.99kg laptop delivers unmatched performance. Equipped with Thunderbolt™ 4 and HDMI™ 2.1, it's perfect for work and play",
            "__v": 0
        },
        {
            "_id": "5",
            "name": "DELL XPS 14",
            "brand": "Laptop, DELL",
            "rating": 4.1,
            "reviews": 4400,
            "image": "/assets/products/dell-xps-14.jpg",
            "price": 1160,
            "description": "Experience premium performance and design with the Dell XPS 14. Powered by up to an Intel Core Ultra 7 155H processor and Nvidia RTX 4050 graphics, it delivers exceptional speed and power for work and entertainment. Choose between a stunning 14.5-inch FHD+ display or a vibrant 3.2K OLED touchscreen for crystal-clear visuals. With up to 64GB LPDDR5X RAM and up to 4TB PCIe Gen 4.0 NVMe storage, it’s built to handle demanding tasks and store everything you need. Sleek, powerful, and versatile, the Dell XPS 14 is perfect for professionals on the go.",
            "__v": 0
        },
        {
            "_id": "6",
            "name": "MSI Cyborg 15 Gaming Laptop",
            "brand": "Laptop, MSI",
            "rating": 6.7,
            "reviews": 7893,
            "image": "/assets/products/msi-cyborg.jpg",
            "price": 1399,
            "description": "Level up your gaming experience with the MSI Cyborg 15 Gaming Laptop. Powered by the 13th Gen Intel Core i7-13620H processor, 16GB RAM, and NVIDIA GeForce RTX 4060 8GB GDDR6 graphics, it delivers lightning-fast performance for immersive gameplay. The 15.6 FHD display with a 144Hz refresh rate ensures smooth visuals, while the 512GB SSD offers ample storage for games and files. Pre-installed with Windows 11 Home and backed by a 2-year warranty, this laptop is built for performance and reliability.",
            "__v": 0
        },
        {
            "_id": "7",
            "name": "Asus VivoBook Laptop",
            "brand": "Laptop, Asus",
            "rating": 4.3,
            "reviews": 2234,
            "image": "/assets/products/asus-vivobook.webp",
            "price": 1198,
            "description": "Experience power and style with the 2024 Asus VivoBook S14 OLED (S5406MA-QD188W). Featuring an Intel Core Ultra 9 185H Processor, 16GB DDR5 RAM, 1TB PCIe NVME SSD, and Intel Arc Graphics, it delivers seamless performance. Enjoy stunning visuals on the 14 WUXGA OLED display and stay productive with its lightweight 1.3kg design and 75Wh battery. Pre-installed with Windows 11 Home and backed by a 2-year Asus Singapore warranty, it's perfect for work and play.",
            "__v": 0
        },
        {
            "_id": "8",
            "name": "MacBook Pro M4",
            "brand": "Laptop, Apple",
            "rating": 4.9,
            "reviews": 5671,
            "image": "/assets/products/macbooks-pro-m4.jpg",
            "price": 2499,
            "description": "MacBook Pro M4, featuring Apple’s most advanced M4 chip for unmatched speed and efficiency. Designed for professionals, it delivers groundbreaking performance for creative workflows, multitasking, and intensive applications. Experience stunning visuals with a vibrant Liquid Retina XDR display, offering remarkable color accuracy and brightness. With up to 32GB of unified memory and up to 8TB SSD storage, you get seamless performance and ample space for your projects. Engineered with macOS, a sleek design, and exceptional battery life, the MacBook Pro M4 is the ultimate tool for innovation.",
            "__v": 0
        }
    ]

    const brands = [
        {
            "name": "ALL",
            "image": "/assets/logo/new/all.png"
        },
        {
            "name": "Asus",
            "image": "/assets/logo/new/asus.png"
        },
        {
            "name": "Apple",
            "image": "/assets/logo/new/apple.png"
        },
        {
            "name": "Dell",
            "image": "/assets/logo/new/dell.png"
        },
        {
            "name": "Msi",
            "image": "/assets/logo/new/msi blk.png"
        },
    ]

    const [selectedBrand, setSelectBrand] = useState("ALL");

    const handleSelectBrand = (brand) => {
        setSelectBrand(brand);
    }
    
    const filterProducts = selectedBrand === "ALL" ? products : products.filter((product) => {
        return product.brand.toLowerCase().includes(selectedBrand.toLowerCase());
    })

    return (
        <section className="px-8 py-8 lg:py-16">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    What are you looking for?
                </h2>
                <p className="text-lg text-muted-foreground">
                    Shop by brand to find the latest trends and essentials.
                </p>
            </div>

            <div className="flex items-center gap-x-8 mb-6">
                {
                    brands.map((brand) => {
                        return <BrandTab selectedBrand={selectedBrand} key={brand.name} brand={brand} onClick={handleSelectBrand} />
                    })
                }
            </div>

            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Top trending Featured Products
                </h2>
                <p className="text-lg text-muted-foreground">
                    Explore the most trending products globally for an exceptional shopping experience with ShopZoneAI.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 cursor-pointer">

                {
                    filterProducts.map((product) => {
                        return <ProductCard product={product} key={product._id} />
                    })
                }

            </div>

        </section>
    )
}

export default ProductListings