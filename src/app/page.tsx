"use client"
import { ImageGalery } from '@/components/image-galery'
import { images } from '@/components/images'
import { CardWithFrame, ClubButton, SlideBottom } from '@/components'
import { useInView } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export default function Home() {
  const container = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLDivElement>(null)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const { width } = useScreenSize()
  const [timeMissing, setTimeMissing] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const isLocationInView = useInView(locationRef, {
    root: container,
    margin: '-100px',
  })
  const isHeroInView = useInView(heroRef, {
    root: container,
    margin: '-100px',
  })
  const isConfirmInView = useInView(confirmRef, {
    root: container,
    margin: '-100px',
  })

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
      <div style={{
        transition: 'opacity 1s ease-in-out',
      }}>
        <nav className={`absolute flex justify-center gap-4 top-0 w-screen z-50 p-5 bg-gradient-to-t from-transparent ${(isLocationInView || isConfirmInView) ? 'to-[#FFF4]' : 'to-[#0003]'} flex-wrap`}>
          <a className={`${(isLocationInView || isConfirmInView) ? 'text-black' : 'text-white'}`} href='#location'>Ubicacion</a>
          <a className={`${(isLocationInView || isConfirmInView) ? 'text-black' : 'text-white'}`} href='#photos'>Fotos</a>
          <a className={`${(isLocationInView || isConfirmInView) ? 'text-black' : 'text-white'}`} href='#confirm'>Confirmacion</a>
        </nav>
        <div className='scroller snap-y fullscreen overflow-y-auto overflow-x-hidden w-screen' ref={container} style={{
          scrollBehavior: 'smooth',
        }}>
          <section className=' bg-cover relative' ref={heroRef} style={{
            backgroundImage: 'url(/static/images/IMG_8317.jpg)',
            backgroundPosition: 'center top',
          }}>
            <div className='flex flex-col items-center justify-center fullscreen bg-gray-900 bg-opacity-30 z-10'>
              <div />
              <div>
                <SlideBottom isInView={isHeroInView} distance={30} className='m-auto'>
                  <img src="/icon.png" alt="" style={{ filter: 'invert(1)' }} className='md:h-[200px] md:w-[200px] h-[100px] w-[100px] m-auto' />
                </SlideBottom>
                <SlideBottom isInView={isHeroInView} delay={0.3} distance={30}>
                  <h1 className='text-white leading-none lg:leading-snug home-name p-3 text-center'>
                    Ismaldy & William José
                  </h1>
                </SlideBottom>
              </div>
              <SlideBottom isInView={isHeroInView} delay={0.5} distance={30}>
                <p className=' mt-10 text-white'>
                  <b className=' !text-xl'>Save the date, 17 Dic. 23.</b>
                </p>
              </SlideBottom>
            </div>
            <div className='grid grid-cols-3 absolute bottom-0 w-screen align-middle items-center bg-gradient-to-b from-transparent to-[#000a] py-3'>
              <div className=' flex items-center flex-col'>
                <svg xmlns="http://www.w3.org/2000/svg" width={width < 768 ? 25 : 40} height={width < 768 ? 25 : 40} viewBox="0 0 24 24" id="user"><path fill="#FFF" d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"/></svg>
                <p className=' text-center'>Negro {width < 768 && <br />} Formal</p>
              </div>
              <div className=' flex items-center flex-col'>
                <svg xmlns="http://www.w3.org/2000/svg" width={width < 768 ? 25 : 40} height={width < 768 ? 25 : 40} id="clock" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#FFF" d="M15.09814,12.63379,13,11.42285V7a1,1,0,0,0-2,0v5a.99985.99985,0,0,0,.5.86621l2.59814,1.5a1.00016,1.00016,0,1,0,1-1.73242ZM12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"/></svg>
                <p className=' text-center'>Ser {width < 768 && <br />} Puntual</p>
              </div>
              <div className=' flex items-center flex-col'>
                <svg xmlns="http://www.w3.org/2000/svg" width={width < 768 ? 25 : 40} height={width < 768 ? 25 : 40} viewBox="0 0 24 24" id="check"><path fill="#FFF" d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"/></svg>
                <p className=' text-center'>Confirmar {width < 768 && <br />} Asistencia</p>
              </div>
            </div>
            {/* <p className=' text-white absolute bottom-0 italic w-screen text-center opacity-50 blend shadow-md text-[6rem] md:text-[12rem] z-0' style={{
              left: '50%',
              transform: 'translateX(-50%)',
            }}>17.12.23</p> */}
          </section>
          <section className=' bg-slate-50 relative' id="location" ref={locationRef}>
            <div className=' fullscreen flex items-center justify-center p-2 flex-col gap-4 max-w-[800px] m-auto'>
              <h2 className=' text-black'>Nuestra Boda</h2>
              <SlideBottom isInView={isLocationInView}>
                <p className='text-black text-center'>17 de diciembre del 2023</p>
              </SlideBottom>
              <div className=' grid grid-cols-2 gap-2 w-full px-2'>
                <div>
                  <SlideBottom isInView={isLocationInView} delay={0.2}>
                    <h2 className=' text-black text-xl text-center'>Ceremonia</h2>
                  </SlideBottom>
                  <SlideBottom isInView={isLocationInView} delay={0.4} className='w-full'>
                    <button className='text-black !border-black w-full'>5:00 PM</button>
                  </SlideBottom>
                </div>
                <div>
                  <SlideBottom delay={0.6} isInView={isLocationInView}>
                    <h2 className=' text-black text-xl text-center'>Celebración</h2>
                  </SlideBottom>
                  <SlideBottom isInView={isLocationInView} delay={0.8} className='w-full'>
                    <button className='text-black !border-black w-full'>6:30 PM</button>
                  </SlideBottom>
                </div>
              </div>
              <SlideBottom isInView={isLocationInView} className='px-4 w-full' delay={1}>
                <div className=' flex flex-col bg-black rounded-lg w-full p-4'>
                  <div className='grid grid-cols-7 content-center'>
                    <strong className=' text-center'>{timeMissing.days}</strong>
                    <strong className=' text-center'>:</strong>
                    <strong className=' text-center'>{timeMissing.hours}</strong>
                    <strong className=' text-center'>:</strong>
                    <strong className=' text-center'>{timeMissing.minutes}</strong>
                    <strong className=' text-center'>:</strong>
                    <strong className=' text-center'>{timeMissing.seconds}</strong>
                  </div>
                  <div className='grid grid-cols-7 content-center'>
                    <strong className=' text-center'>D</strong>
                    <strong className=' text-center'></strong>
                    <strong className=' text-center'>H</strong>
                    <strong className=' text-center'></strong>
                    <strong className=' text-center'>M</strong>
                    <strong className=' text-center'></strong>
                    <strong className=' text-center'>S</strong>
                  </div>
                </div>
              </SlideBottom>
              <CardWithFrame className=' items-center !gap-4'>
                <p className=' text-black'>
                  <i>
                    &quot;Así que, no son ya más dos, sino una sola carne; por tanto, lo que Dios ha unido, no lo separe el hombre.&quot;
                  </i>
                  <br />
                  <span className=' float-right'>
                    - Mateo 19:6
                  </span>
                </p>
              </CardWithFrame>
              <SlideBottom isInView={isLocationInView} delay={1.2} className='w-full px-2'>
                <ClubButton />
              </SlideBottom>
              {/* <div className=' pt-10 w-full absolute bottom-0 map' style={{
                opacity: isLocationInView ? 1 : 0,
                transitionDuration: '2s',
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d511.77064741929485!2d-70.63270044926479!3d19.26197335293151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDE1JzQyLjkiTiA3MMKwMzcnNTYuOSJX!5e0!3m2!1ses!2sdo!4v1693939466185!5m2!1ses!2sdo"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div> */}
            </div>
          </section>
          <section className=' relative flex items-center justify-center flex-col' id="photos" >
            <ImageGalery images={images} />
            <p className=' text-white w-screen text-center mt-[150px]'>
              <i>
                ¡Nos casamos! Y nos encantaría que nos acompañaras en nuestro día especial, bajo la bendición de Dios y nuestros padres✨
              </i>
            </p>
          </section>
          <section className=' bg-slate-50 bg-cover' id="confirm" ref={confirmRef} style={{
            backgroundImage: 'url(/static/images/IMG_8258.jpg)',
            backgroundPosition: 'center top',
          }}>
            <div className='flex items-center justify-center fullscreen p-4 h-full'>
              <SlideBottom isInView={isConfirmInView} delay={0.1}>
                <form className='' onSubmit={(e) => {
                  setIsFormLoading(true)
                  e.preventDefault()
                  const body = new FormData(e.target as HTMLFormElement)
                  if (!body.get('answer') || !body.get('name')) return alert('Por favor llene todos los campos')
                  body.set('date', new Date().toISOString())
                  fetch('https://script.google.com/macros/s/AKfycbx-Och5n3_zDq895O9gvdZ_reclg1kxjLzsaZHT46dNkopgMJQMbKKsT01yhtUi1ucs/exec', {
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
                    <SlideBottom isInView={isConfirmInView} delay={0.3} className='w-full'>
                      <img src="/icon.png" alt="" className='md:h-[200px] md:w-[200px] h-[100px] w-[100px] m-auto' />
                    </SlideBottom>
                    <SlideBottom isInView={isConfirmInView} delay={0.5} className='w-full'>
                      <p className=' text-black text-center -mt-10'>
                        <i>
                          Queremos que nos acompañes en el día más importante de nuestras vidas ya que has formado parte importante de nuestra historia de amor
                        </i>
                      </p>
                    </SlideBottom>
                    <SlideBottom isInView={isConfirmInView} delay={0.7} className='w-full'>
                      <input name="name" placeholder='Nombre' className=' text-black p-2 border-gray border-2  rounded-full px-4 w-full md:!h-[60px] !h-10' />
                    </SlideBottom>
                    <SlideBottom isInView={isConfirmInView} delay={0.9} className='w-full'>
                      <select name="answer" placeholder='Asistiras?' className='!bg-transparent text-black p-2 border-gray border-2  rounded-full px-4 w-full md:!h-[60px] !h-10'>
                        <option selected disabled value={""}>Asistiras?</option>
                        <option value="si">Si</option>
                        <option value="no">No</option>
                      </select>
                    </SlideBottom>
                    <SlideBottom isInView={isConfirmInView} delay={1.1} className='w-full'>
                      <button className='text-black !border-black w-full' disabled={isFormLoading}>{isFormLoading ? 'Enviando...' : 'Enviar'}</button>
                    </SlideBottom>
                  </CardWithFrame>
                </form>
              </SlideBottom>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

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
