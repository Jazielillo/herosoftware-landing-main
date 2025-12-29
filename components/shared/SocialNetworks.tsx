'use client'

import React, { useRef, useState, useEffect } from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { RiSnapchatFill } from "react-icons/ri";
import { FaYahoo } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { DiBootstrap } from "react-icons/di";
import { FaTiktok } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function SocialNetworks() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const icons = [
        <svg key="premium" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M27.9 14.64C27.5449 14.1396 27.2715 13.5861 27.09 13C26.9701 12.3978 26.9398 11.7811 27 11.17C27.073 10.6898 27.0284 10.1991 26.87 9.74001C26.5462 9.36889 26.1381 9.08084 25.68 8.90001C25.1227 8.64541 24.6069 8.30829 24.15 7.90001C23.7417 7.44313 23.4046 6.92734 23.15 6.37001C22.9692 5.91189 22.6811 5.50381 22.31 5.18001C21.8397 4.99643 21.3306 4.93452 20.83 5.00001C20.2188 5.05537 19.6028 5.02508 19 4.91001C18.4244 4.72555 17.8812 4.45225 17.39 4.10001C16.9856 3.78068 16.5078 3.56755 16 3.48001C15.5027 3.57227 15.0357 3.78517 14.64 4.10001C14.1396 4.45505 13.586 4.72845 13 4.91001C12.3977 5.02989 11.7811 5.06022 11.17 5.00001C10.6898 4.92695 10.1991 4.97156 9.73998 5.13001C9.36491 5.46229 9.07657 5.88107 8.89998 6.35001C8.64538 6.90734 8.30826 7.42313 7.89998 7.88001C7.4431 8.28829 6.92731 8.62541 6.36998 8.88001C5.91186 9.06084 5.50378 9.34889 5.17998 9.72001C5.0014 10.1811 4.93956 10.6792 4.99998 11.17C5.06019 11.7811 5.02986 12.3978 4.90998 13C4.72552 13.5756 4.45222 14.1188 4.09998 14.61C3.78065 15.0144 3.56752 15.4922 3.47998 16C3.57224 16.4973 3.78514 16.9642 4.09998 17.36C4.45502 17.8604 4.72842 18.4139 4.90998 19C5.02986 19.6023 5.06019 20.2189 4.99998 20.83C4.92692 21.3102 4.97153 21.8009 5.12998 22.26C5.45378 22.6311 5.86186 22.9192 6.31998 23.1C6.87731 23.3546 7.3931 23.6917 7.84998 24.1C8.25826 24.5569 8.59538 25.0727 8.84998 25.63C9.03081 26.0881 9.31886 26.4962 9.68998 26.82C10.1491 26.9785 10.6398 27.0231 11.12 26.95H11.77C12.1773 26.9387 12.5843 26.9825 12.98 27.08C13.5556 27.2645 14.0988 27.5378 14.59 27.89C14.9857 28.2049 15.4527 28.4178 15.95 28.51C16.4472 28.4178 16.9142 28.2049 17.31 27.89C17.8263 27.5337 18.3971 27.2635 19 27.09C19.6022 26.9701 20.2189 26.9398 20.83 27C21.3101 27.0731 21.8009 27.0285 22.26 26.87C22.6311 26.5462 22.9192 26.1381 23.1 25.68C23.3546 25.1227 23.6917 24.6069 24.1 24.15C24.5569 23.7417 25.0727 23.4046 25.63 23.15C26.0881 22.9692 26.4962 22.6811 26.82 22.31C27.0036 21.8397 27.0655 21.3306 27 20.83C26.9398 20.2189 26.9701 19.6023 27.09 19C27.2744 18.4244 27.5477 17.8812 27.9 17.39C28.2193 16.9856 28.4324 16.5078 28.52 16C28.4277 15.5028 28.2148 15.0358 27.9 14.64ZM19 17.55L19.69 21.6L16 19.69L12.36 21.6L13.05 17.55L10.11 14.68L14.18 14.09L16 10.4L17.82 14.09L21.89 14.68L19 17.55Z" fill="#A3A3A3" />
        </svg>,
        <FaFacebookSquare key="facebook" size={32} color="#A3A3A3" />,
        <RiSnapchatFill key="snapchat" size={32} color="#A3A3A3" />,
        <FaYahoo key="yahoo" size={32} color="#A3A3A3" />,
        <FaTwitter key="twitter" size={32} color="#A3A3A3" />,
        <svg key="logo" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 32 32" fill="none">
            <path d="M16.0001 14.6185L9.97057 11.685L16.0001 8.74999L22.0296 11.685L16.0001 14.6185ZM2.59007 20.65L4.39557 22.4765C4.4863 22.5681 4.5381 22.6913 4.54015 22.8203C4.5422 22.9492 4.49434 23.074 4.40657 23.1685L2.53857 25.182H6.18857V20.65H2.59007ZM16.0001 25.432C11.9781 25.432 8.84357 24.214 7.18757 22.0985V25.5985C8.26057 28.6045 12.1276 28.858 16.0001 28.858C19.8726 28.858 23.7396 28.6045 24.8126 25.5985V22.0985C23.1561 24.214 20.0221 25.432 16.0001 25.432ZM29.4616 25.182L27.5936 23.169C27.5058 23.0745 27.4579 22.9497 27.46 22.8208C27.462 22.6918 27.5138 22.5686 27.6046 22.477L29.4101 20.65H25.8126V25.1815L29.4616 25.182ZM9.32807 19.192L15.5001 22.1945V15.4875L9.32807 12.4845V19.192ZM22.6721 12.4845L16.5001 15.4875V22.1945L22.6721 19.192V12.4845ZM16.0001 6.76249C16.1327 6.76249 16.2599 6.70981 16.3536 6.61604C16.4474 6.52227 16.5001 6.39509 16.5001 6.26249V3.64249C16.5001 3.50988 16.4474 3.3827 16.3536 3.28893C16.2599 3.19517 16.1327 3.14249 16.0001 3.14249C15.8675 3.14249 15.7403 3.19517 15.6465 3.28893C15.5528 3.3827 15.5001 3.50988 15.5001 3.64249V6.26249C15.5001 6.39509 15.5528 6.52227 15.6465 6.61604C15.7403 6.70981 15.8675 6.76249 16.0001 6.76249ZM21.2816 8.94999C21.3473 8.95004 21.4124 8.93713 21.4732 8.91199C21.5339 8.88685 21.5891 8.84998 21.6356 8.80349L23.4856 6.95349C23.5767 6.85919 23.6271 6.73288 23.6259 6.60179C23.6248 6.47069 23.5722 6.34528 23.4795 6.25258C23.3868 6.15987 23.2614 6.10729 23.1303 6.10615C22.9992 6.10501 22.8729 6.15541 22.7786 6.24649L20.9286 8.09649C20.8587 8.16641 20.8111 8.25549 20.7918 8.35247C20.7725 8.44945 20.7824 8.54996 20.8202 8.64131C20.8581 8.73266 20.9221 8.81075 21.0043 8.86569C21.0865 8.92063 21.1827 8.94997 21.2816 8.94999ZM10.3646 8.80349C10.4583 8.89731 10.5855 8.95004 10.7181 8.95009C10.8508 8.95013 10.978 8.89749 11.0718 8.80374C11.1656 8.70998 11.2184 8.5828 11.2184 8.45016C11.2185 8.31753 11.1658 8.19031 11.0721 8.09649L9.22207 6.24649C9.12752 6.15867 9.00267 6.11082 8.87365 6.11293C8.74463 6.11504 8.62141 6.16696 8.52978 6.25781C8.43815 6.34867 8.38519 6.47144 8.38198 6.60044C8.37878 6.72944 8.42557 6.85469 8.51257 6.94999L10.3646 8.80349Z" fill="#A3A3A3" />
        </svg>,
        <DiBootstrap key="bootstrap" size={32} color="#A3A3A3" />,
        <FaTiktok key="tiktok" size={28} color="#A3A3A3" />,
        <IoLogoWhatsapp key="whatsapp" size={32} color="#A3A3A3" />
    ];

    // Repetir los iconos suficientes veces para llenar el ancho
    const repeatedIcons = [...icons, ...icons, ...icons, ...icons, ...icons, ...icons];

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setIsPaused(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setIsPaused(true);
        setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setTimeout(() => setIsPaused(false), 2000);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            setTimeout(() => setIsPaused(false), 2000);
        }
    };

    // Auto-scroll infinito
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || isPaused) return;

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                scrollContainer.scrollLeft += 1;

                // Reset cuando llega al medio
                const maxScroll = scrollContainer.scrollWidth / 2;
                if (scrollContainer.scrollLeft >= maxScroll) {
                    scrollContainer.scrollLeft = 0;
                }
            }
        };

        const interval = setInterval(scroll, 30);
        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div className="flex-1 overflow-hidden relative">
            <div
                ref={scrollRef}
                className="flex items-center h-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
            >
                <div className="flex gap-x-10 px-5">
                    {repeatedIcons.map((icon, index) => (
                        <div key={index} className="flex-shrink-0">
                            {icon}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}