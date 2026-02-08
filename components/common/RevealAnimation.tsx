'use client'

import { useInView } from 'react-intersection-observer'

interface RevealAnimationProps {
    children: React.ReactNode
    direction?: 'up' | 'down'
    delay?: number
    className?: string
    distance?: number
}

export default function RevealAnimation({
    children,
    direction = 'up',
    delay = 0,
    className = '',
    distance = 30
}: RevealAnimationProps) {
    const { ref, inView } = useInView({
        triggerOnce: true, // 允许重复触发
        threshold: 0.15,
    })

    const translateY = direction === 'up' ? `translateY(${distance}px)` : `translateY(-${distance}px)`

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : translateY,
                transition: `opacity 0.4s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`, // 减小动画时间到 0.5s
            }}
        >
            {children}
        </div>
    )
}
