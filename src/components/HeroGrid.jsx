function HeroGrid() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-16 min-h-[60vh] md:min-h-[80vh] gap-4 mt-4">
            <div className="relative col-span-1 lg:col-span-2 rounded-2xl">
                <img
                    src={
                        "https://www.shutterstock.com/image-illustration/macbook-pro-2023-m2-chip-600nw-2328203513.jpg"
                    }
                    className="rounded-2xl w-full h-full object-cover"
                    alt="hero"
                />
                <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                        Find your <br /> Perfect <br /> Laptop
                    </h1>
                    <p className="text-white text-base sm:text-lg md:text-xl mt-2 sm:mt-4">
                        Top-rated picks for work, <br /> play & everything in between. <br />
                        Shop 100+ models now.
                    </p>
                </div>
            </div>
            <div className="col-span-1 grid grid-rows-1 md:grid-rows-2 gap-4">
                <div className="rounded-2xl relative h-40 md:h-auto">
                    <img
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/dd5a2696843823.5eb7d53e75418.gif"
                        alt="Featured product"
                        className="rounded-2xl w-full h-full object-cover"
                    />
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
                            Ready for  <br /> the Outdoors
                        </h1>
                    </div>
                </div>
                <div className="rounded-2xl relative h-40 md:h-auto">
                    <img
                        src="https://media.giphy.com/media/23g5TbXG6KxCRSPX9z/giphy.gif"
                        alt="Featured product"
                        className="rounded-2xl w-full h-full object-cover"
                    />
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black">
                            Effortless <br /> Comfort
                        </h1>
                    </div>
                </div>
            </div>
            <br /><br />
        </section>
    );
}

export default HeroGrid;