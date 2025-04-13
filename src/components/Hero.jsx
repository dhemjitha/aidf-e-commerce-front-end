import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import { submit } from '@/lib/feature/searchSlice'
import { useDispatch } from "react-redux";

function Hero() {

    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;
        console.log(searchQuery);

        dispatch(submit(searchQuery));

    };

    return (
        <div className="relative min-h-screen">

            <div className="relative z-10 flex flex-col items-center text-white justify-center px-8 pt-32 pb-32">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                    Find Your Best Deal
                </h1>
                <p className="text-xl mb-12 text-center max-w-2xl">
                    Describe your dream laptop and experience,
                    and we'll find you the perfect and well-matched item.
                </p>

                <form
                    onSubmit={handleSearch}
                    className="w-full max-w-3xl bg-black/40 backdrop-blur-md lg:h-16 rounded-full p-2 flex items-center"
                >
                    <Input
                        type="text"
                        name="search"
                        placeholder="Describe your item, experience, or laptop..."
                        className="flex-grow  bg-transparent lg:text-lg  text-white placeholder:text-white/60 border-none outline-none ring-0 ring-offset-0 focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
                    />
                    <Button
                        type="submit"
                        className="rounded-full w-48 flex items-center gap-x-2 lg:h-12"
                    >
                        <Sparkles
                            style={{ width: "20px", height: "20px" }}
                            className="mr-2 animate-pulse text-sky-400"
                        />
                        <span className="lg:text-lg">AI Search</span>
                    </Button>
                </form>
            </div>

        </div>
    )
}

export default Hero