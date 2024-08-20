import { Navbar } from "@/components/navbar";
import { ThoughtBox } from "@/components/thoughtbox";

const HomePage=()=>{
    return (
        <div className="fixed inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            <div>
                <Navbar/>
            </div>
            <div className="relative mt-20 flex justify-center items-center">
                <ThoughtBox/>
            </div>
        </div>
    )
}

export default HomePage;