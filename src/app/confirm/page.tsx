"use client"
import { useInView } from 'framer-motion'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'

const NelsonBg: HTMLAttributes<HTMLDivElement>['style'] = {
    backgroundImage: 'url("/static/images/nelson.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'bottom',
    backgroundSize: 'contain'
}

export default function Home() {
    const container = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const confirmRef = useRef<HTMLDivElement>(null)
    const [isFormLoading, setIsFormLoading] = useState(false)
    const [timeMissing, setTimeMissing] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const isConfirmInView = useInView(confirmRef, {
        root: container,
        margin: '-100px',
    })
    const [voterData, setVoterData] = useState<any>(null)
    const [voterDataLoading, setVoterDataLoading] = useState(false)
    const size = useScreenSize()
    const isMedium = (size?.width || 0) < 768
    const isSmallHeight = (size?.height || 0) < 900

    useEffect(() => {
        const date = new Date()
        date.setDate(17)
        date.setFullYear(2023)
        date.setMonth(11)
        date.setHours(17, 0, 0)
        let remainer = date.getTime() - Date.now()
        const dayInMs = 1000 * 60 * 60 * 24
        const hourInMs = 1000 * 60 * 60
        const minInMs = 1000 * 60
        const secInMs = 1000

        const days = Math.floor(remainer / dayInMs)
        remainer -= dayInMs * days
        const hours = Math.floor(remainer / hourInMs)
        remainer -= hourInMs * hours
        const minutes = Math.floor(remainer / minInMs)
        remainer -= minInMs * minutes
        const seconds = Math.floor(remainer / secInMs)
        remainer -= secInMs * seconds
        setTimeout(() => {
            setTimeMissing({
                days, hours, minutes, seconds
            })
        }, 1_000)
    }, [timeMissing])

    return (
        <main>
            <title>Nelson Coseme - Regidor</title>
            <div style={{
                transition: 'opacity 1s ease-in-out',
            }}>
                <div className='scroller snap-y fullscreen overflow-y-auto overflow-x-hidden w-screen' ref={container} style={{
                    scrollBehavior: 'smooth',
                }}>
                    <section className=' bg-cover relative' ref={heroRef}>
                        <div className='grid md:grid-cols-2 grid-cols-1 fullscreen p-5 !pb-0 max-w-[1444px] m-auto'>
                            <Side />
                            <div className='md:block hidden' style={NelsonBg} />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

const FollowUs = () => {
    return <div className=' w-fit flex items-center gap-2 mt-2'>
        <strong>Siguenos en:</strong>
        <a href="https://www.instagram.com/nelsoncosme" target='_blank' rel="noreferrer" className='button'>Instagram</a>
    </div>
}

const Side = ({ children, className }: {
    children?: React.ReactNode
    className?: string
}) => {
    const size = useScreenSize()
    const isMedium = (size?.width || 768) < 768
    const isSmallHeight = (size?.height || 0) < 900

    return <div className={`flex justify-center ${className || ''}`} style={isMedium ? {
        ...NelsonBg,
        marginLeft: -20,
        marginRight: -20,
    } : {}}>
        <div className={`flex flex-col ${isMedium ? "" : "gap-5"} justify-between p-5 md:w-auto w-full`}>
            <div>
                <img src="/static/images/prm.png" alt="" className='md:h-20 md:w-20 w-10 h-10 object-cover' />
                <div className='flex flex-col mt-10'>
                    <span className=' uppercase' style={{
                        fontFamily: 'Kenyan',
                        fontSize: isSmallHeight ? 80 : 100,
                        lineHeight: 1,
                        width: 'fit-content'
                    }}>Gracias por el apoyo</span>
                    <FollowUs />
                </div>
            </div>
            <div className='md:mx-0 mx-auto'>
                <button onClick={() => {
                    const shareData = {
                        url: `https://${window.location.host}`,
                        text: "Verifica si estás habilitado para votar en las Elecciones Primarias del 1 de octubre del 2023 y si tú intención del voto es a favor de Nelson Cosme Hijo - REG👍🏼DOR, llena el formulario y regístrate en nuestra base de datos.\n\n¡Contamos con tu apoyo!"
                    }
                    if (navigator.share && navigator.canShare(shareData)) {
                        navigator.share(shareData)
                    } else {
                        navigator.clipboard.writeText(shareData.url)
                        alert("Link copiado")
                    }
                }} className=' flex items-center gap-2'>Compartir con otros <img src="/static/images/share.svg" width={20} height={20} /></button>
            </div>
        </div>
    </div>
}

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<{
        width: number,
        height: number
    }>()
    useEffect(() => {
        const updateScreenSize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        updateScreenSize()
        window.addEventListener('resize', updateScreenSize)
        return () => window.removeEventListener('resize', updateScreenSize)
    }, [])
    return screenSize
}
