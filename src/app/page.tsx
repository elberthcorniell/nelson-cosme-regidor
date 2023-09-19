"use client"
import { ImageGalery } from '@/components/image-galery'
import { images } from '@/components/images'
import { CardWithFrame, ClubButton, SlideBottom } from '@/components'
import { useInView } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

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
          <section className=' bg-cover relative' ref={heroRef} style={{
            backgroundColor: 'blue',
            backgroundPosition: 'center top',
          }}>
            <div className='grid grid-cols-2 fullscreen p-5 !pb-0 max-w-[1444px] m-auto'>
              <Side>
                <div className='mt-10'>
                  <p>Dale al botón y únete a nuestro equipo</p>
                  <button className=' w-fit my-2' onClick={() => {
                    container.current?.scrollTo(0, document.body.scrollHeight);
                  }}>Regístrate aquí</button>
                  <p>¡Contamos con tu apoyo!</p>
                </div>
              </Side>
              <div style={{
                backgroundImage: 'url("/static/images/nelson.png")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom'
              }} />
            </div>
          </section>
          <section className=' bg-cover relative' ref={confirmRef} style={{
            backgroundColor: 'blue',
            backgroundPosition: 'center top',
          }}>
            <div className='grid grid-cols-2 fullscreen !pb-0 max-w-[1444px] m-auto'>
              <Side />
              <div className=' bg-white flex items-center fullscreen w-full'>
                <div className=' flex-grow'>
                  <SlideBottom isInView={isConfirmInView} delay={0.1}>
                    <form className=' w-full' onSubmit={(e) => {
                      setIsFormLoading(true)
                      e.preventDefault()
                      const body = new FormData(e.target as HTMLFormElement)
                      // if (!body.get('answer') || !body.get('name')) return alert('Por favor llene todos los campos')
                      body.set('date', new Date().toISOString())
                      body.set('name', voterData && voterData.status !== 404 ?
                        `${voterData.nombres} ${voterData.apellido1} ${voterData.apellido2}` :
                        body.get('name') || '')
                      fetch('https://script.google.com/macros/s/AKfycbxh6LNSFbau3WCd9Sm36o7Ev9kbQxFS9VVHK5K9LrzZ-BYbIGGme4n7bUC6Aj-ozS-B/exec', {
                        method: 'POST',
                        body,
                      })
                        .then(() => {
                          window.location.href = `http://${window.location.host}/confirm?answer=${body.get('answer')}&name=${body.get('name')}`
                        })
                        .catch(() => {
                          alert('Ha ocurrido un error, por favor intente de nuevo')
                        })
                        .finally(() => {
                          setIsFormLoading(false)
                        })
                    }}>
                      <CardWithFrame>
                        <div>
                          <h2 className=' text-blue'>Registrate aqui</h2>
                          <p className=' text-orange'>¡Contamos con tu apoyo!</p>
                        </div>
                        <SlideBottom isInView={isConfirmInView} delay={0.7} className='w-full'>
                          <input name="id" placeholder='Cedula' className=' text-black p-2 border-gray border-2 rounded-lg px-4 w-full md:!h-[60px] !h-10' onChange={({
                            target: {
                              value
                            }
                          }) => {
                            if (value.length !== 11) return
                            setVoterDataLoading(true)
                            fetch(`https://backendconsulta.prm.org.do/api/padron/${value}`)
                              .then(res => res.json())
                              .then(setVoterData)
                              .catch(() => {
                                setVoterData({
                                  status: 404
                                })
                              })
                              .finally(() => setVoterDataLoading(false))
                          }} />
                        </SlideBottom>
                        {voterDataLoading ?
                          <SlideBottom isInView={isConfirmInView} delay={0} className='w-full'>
                            <p className=' text-black'>Cargando...</p>
                          </SlideBottom> :
                          voterData?.status === 404 ? <SlideBottom isInView={isConfirmInView} delay={0} className='w-full'>
                            <p className=' text-black'>Usted no esta habilitado para participar en las primarias</p>
                          </SlideBottom> :
                            voterData ?  <SlideBottom isInView={isConfirmInView} delay={0} className='w-full'>
                              <div className='flex gap-2 items-center'>
                                <div>
                                  <img src={`data:image/png;base64,${voterData.imagen}`} />
                                </div>
                                <div>
                                  <label className=' text-black text-sm'>Nombre:</label>
                                  <p className=' text-black'>{voterData.nombres} {voterData.apellido1} {voterData.apellido2}</p>
                                  <label className=' text-black text-sm'>Colegio:</label>
                                  <p className=' text-black'>{voterData.colegio} - {voterData.descripcion}</p>
                                </div>
                              </div>
                            </SlideBottom> : <></>}
                        {voterData?.status === 404 && <SlideBottom isInView={isConfirmInView} delay={0} className='w-full'>
                          <input name="name" placeholder='Nombre' type="tel" className=' text-black p-2 border-gray border-2 rounded-lg px-4 w-full md:!h-[60px] !h-10' />
                        </SlideBottom>}
                        <SlideBottom isInView={isConfirmInView} delay={0.9} className='w-full'>
                          <input name="phone" placeholder='Telefono' type="tel" className=' text-black p-2 border-gray border-2 rounded-lg px-4 w-full md:!h-[60px] !h-10' />
                        </SlideBottom>
                        <SlideBottom isInView={isConfirmInView} delay={0.9} className='w-full'>
                          <input name="email" placeholder='Email' type='email' className=' text-black p-2 border-gray border-2 rounded-lg px-4 w-full md:!h-[60px] !h-10' />
                        </SlideBottom>
                        <SlideBottom isInView={isConfirmInView} delay={1.1} className='w-full'>
                          <button className='w-full' disabled={isFormLoading}>{isFormLoading ? 'Enviando...' : 'Enviar'}</button>
                        </SlideBottom>
                      </CardWithFrame>
                    </form>
                  </SlideBottom>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

const Side = ({ children }: {
  children?: React.ReactNode
}) => <div className='flex  justify-center'>
  <div className=' flex flex-col gap-5 justify-between p-5'>
    <img src="/static/images/prm.png" alt="" className='h-20 w-20 object-cover' />
    <div>
    <div>
      <span style={{
        fontFamily: 'Kenyan',
        fontSize: 140,
        lineHeight: 1
      }}>Nelson</span>
      <br />
      <span className=' uppercase' style={{
        fontFamily: 'Kenyan',
        fontSize: 70,
        lineHeight: 1,
        color: "#DD9C3F",
        transform: "translateY(-40px)"
      }}>
        Cosme Hijo
      </span>
    </div>
    {children}
    </div>
    <div>
      <h2 className='flex items-center' style={{
        fontSize: 120
      }}>REG
        <img src="/static/images/hand.svg" alt="" className='h-20' />
        DOR</h2>
      <img src="/static/images/2024.png" alt="" className=' h-8 w-auto object-cover' />
    </div>
  </div>
  </div>

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', updateScreenSize)
    updateScreenSize()
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])
  return screenSize
}
