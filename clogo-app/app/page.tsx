import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Pro from "@/components/pro";
import Footer from "@/components/footer";

export default function HomePage() {
    return (
        <main className="flex min-h-screen w-full justify-center overflow-x-hidden bg-[#fbf9da]">
            {/*
                Container-query wrapper: todo el diseño se mide en `cqw`
                (1cqw = 1% del ancho de este contenedor), por lo que escala
                proporcionalmente según el ancho disponible.
                - En móviles <412px: el contenedor es 100vw y se reduce.
                - Entre 412 y 480px: crece junto con la pantalla.
                - En desktops >480px: se limita a 480px y queda centrado.
            */}
            <div
                className="relative w-full max-w-[480px] bg-[#fbf9da]"
                style={{ containerType: "inline-size" }}
            >
                <Navbar />
                <Hero />
                <About />
                <Pro />
                <Footer />
            </div>
        </main>
    );
}
