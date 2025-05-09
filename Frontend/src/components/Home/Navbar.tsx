import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { useLayoutEffect } from "react";

const navItems = [
    { label: "Dashboard", href: "/home" },
    { label: "Profile", href: "/profile" },
    { label: "Exercises", href: "/exercises" },
    { label: "Progress", href: "/progress" },
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);
    const bubbleRef = useRef<HTMLSpanElement>(null);
    const refs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [activeHref, setActiveHref] = useState(location.pathname);

    // On first load or location change (fallback)
    useLayoutEffect(() => {
        setActiveHref(location.pathname);
        updateBubble(location.pathname);
    }, [location.pathname]);


    const updateBubble = (href: string) => {
        const el = refs.current[href];
        if (!el || !containerRef.current || !bubbleRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const left = elRect.left - containerRect.left;
        const width = elRect.width;

        const bubble = bubbleRef.current;
        bubble.style.transform = `translateX(${left}px)`;
        bubble.style.width = `${width}px`;
    };

    const handleClick = (href: string) => {
        setActiveHref(href); // animate immediately
        updateBubble(href);  // preemptively move the bubble
        navigate(href);      // then navigate
    };

    return (
        <header className="w-full px-6 py-4 border-b border-[#1A1A1A] flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-[#E6AC00]">FitBud</div>

            {/* Center Nav with Animated Bubble */}
            <div
                ref={containerRef}
                className="relative flex items-center gap-6 py-2 rounded-full border border-[#2A2A2A] bg-[#1A1A1A]/70"
            >
        <span
            ref={bubbleRef}
            className="absolute top-0 left-0 h-full bg-[#E6AC00] rounded-full transition-all duration-300 ease-in-out z-0"
            style={{ width: "0px" }}
        />
                {navItems.map(({ label, href }) => {
                    const isActive = activeHref.startsWith(href);
                    return (
                        <button
                            key={href}
                            ref={(el) => (refs.current[href] = el)}
                            onClick={() => handleClick(href)}
                            className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                isActive ? "text-black" : "text-white hover:text-[#E6AC00]"}`
                            }
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Sign Out */}
            <button
                onClick={() => {
                    localStorage.setItem("authenticated", "false");
                    localStorage.setItem("user", "{}");
                    navigate("/");
                }}
                className="text-[#B52230] text-sm hover:underline"
            >
                Sign out
            </button>
        </header>
    );
};

export default Navbar;
