"use client"
import { CardWithFrame, SlideBottom } from '@/components'
import { useSearchParams } from 'next/navigation'
const Page = () => {
    const searchParams = useSearchParams()
    return <section className=' snap-start bg-slate-50 bg-cover' id="confirm" style={{
        backgroundImage: 'url(/static/images/IMG_8258.jpg)',
        backgroundPosition: 'center top',
    }}>
        <div className='flex items-center justify-center fullscreen p-4 h-full'>
            <SlideBottom delay={0.1}>
                <CardWithFrame>
                    <SlideBottom delay={0.3} className='w-full'>
                        <img src="/icon.png" alt="" className='md:h-[200px] md:w-[200px] h-[100px] w-[100px] m-auto' />
                    </SlideBottom>
                    <SlideBottom delay={0.5} className='w-full'>
                        <p className=' text-black text-center -mt-10'>
                            <i>
                                Querido/a <strong>{searchParams.get('name')}</strong>,<br />
                                {searchParams.get('answer') === 'si' ?
                                    '¡Enhorabuena! Nos complace saber que nos estarás acompañando.' :
                                    '¡Lástima que no nos puedas acompañar! Pero recuerda que si cambias de opinión, puedes volver a este link hasta el 1ro de noviembre'}
                            </i>
                        </p>
                        <br />
                        {searchParams.get('answer') === 'si' && <>
                            <h2 className=' text-black text-xl'>Recuerda</h2>
                            <ul className=' list-decimal  pl-10'>
                                <li className=' text-black'>
                                    El código de vestimenta es <b><i>negro</i></b>
                                </li>
                                <li className=' text-black'>
                                    La ceremonia inicia a las <b><i>5:00pm</i></b>
                                </li>
                                <li className=' text-black'>
                                    La celebración inicia a las <b><i>6:00pm</i></b>
                                </li>
                            </ul>
                            <br />
                        </>}
                        <br />
                        <p className=' text-black text-center'>
                            <i>
                                <strong>Para nosotros el regalo Perfecto es contar con tu presencia, pero por si deseas agradarnos con algún detalle, aquí te dejamos el link de nuestra lista de regalos en Amazon.</strong>
                            </i>
                        </p>
                    </SlideBottom>
                    <SlideBottom delay={0.7} className='w-full'>
                        <a href="https://www.amazon.com/wedding/ismaldy-santana-william-jose-sanchez--december-2023/registry/1KBW21LL99LB0" target="_blank" rel="noreferrer"><button className='text-black !border-black flex flex-nowrap gap-2 items-center w-full justify-center'>Lista de regalos</button></a>
                    </SlideBottom>
                    <p className=' text-black text-center'>
                        <i>
                            <strong>Lista de regalos en Casa Cuesta Santiago disponible a partir del mes de noviembre.</strong>
                        </i>
                    </p>
                </CardWithFrame>
            </SlideBottom>
        </div>
    </section>
}

export default Page