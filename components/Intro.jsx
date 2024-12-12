'use client'

import styles from '@/styles/Intro.module.scss'
import { useEffect, useState } from 'react'
import Graph from "@/components/Graph";

export default function Intro() {
    const [shouldPlay, setShouldPlay] = useState(false);
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);

    useEffect(() => {
        const isVideoPlayed = sessionStorage.getItem('isVideoPlayed');
        if (!isVideoPlayed && !alreadyPlayed) {
            setShouldPlay(true);
        }
        if (shouldPlay) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [shouldPlay]);

    const handleVideoEnd = () => {
        setShouldPlay(false);
        setAlreadyPlayed(true);
        sessionStorage.setItem('isVideoPlayed', 'true');
    };

    return (
        <div className={styles.container}>
            {shouldPlay && (
                <div className={styles.videoContainer}>
                    <div className={styles.videoBox}>
                        <video
                            autoPlay
                            muted
                            onEnded={handleVideoEnd}
                        >
                            <source src="/intro.webm" type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
            <div style={{
                filter: shouldPlay ? 'blur(8px)' : 'none',
                pointerEvents: shouldPlay ? 'none' : 'auto',
                transition: 'filter 0.5s ease'
            }}>
                <Graph />
            </div>
        </div>
    );
}
