import { motion } from 'framer-motion'

export const SlideBottom = ({ children, delay = 0, distance = 100, isInView = true, className }: {
  children: React.ReactNode,
  delay?: number,
  distance?: number,
  isInView?: boolean,
  className?: string,
}) => isInView ? <motion.span
  className={className}
  initial={{ opacity: 0, y: distance }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay }}
  exit={{ opacity: 0, y: distance }}
>
  {children}
</motion.span> : null

export const SlideRight = ({ children, delay = 0, distance = 100, isInView = true, className }: {
  children: React.ReactNode,
  delay?: number,
  distance?: number,
  isInView?: boolean,
  className?: string,
}) => isInView ? <motion.span
  className={className}
  initial={{ opacity: 0, x: distance }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay }}
  exit={{ opacity: 0, x: distance }}
>
  {children}
</motion.span> : null

export const LocationArrow = () => <svg xmlns="http://www.w3.org/2000/svg" height={14} width={14} style={{
  rotate: '45deg'
}} viewBox="0 0 24 24" id="location-arrow-alt"><path fill="#000" d="M21.68,17.65l-7-14a3,3,0,0,0-5.36,0l-7,14a3,3,0,0,0,3.9,4.08l5.37-2.4h0a1.06,1.06,0,0,1,.82,0l5.37,2.4a3,3,0,0,0,3.9-4.08Zm-2,2a1,1,0,0,1-1.13.22l-5.37-2.39a3,3,0,0,0-2.44,0L5.41,19.9a1,1,0,0,1-1.3-1.35l7-14a1,1,0,0,1,1.78,0l7,14A1,1,0,0,1,19.72,19.68Z" /></svg>

export const ClubButton = () => <a href='https://maps.google.com/?q=19.261909,-70.632469' target='_blank' rel="noreferrer">
  <button className='text-black !border-black flex flex-nowrap gap-2 items-center w-full justify-center'>
    <LocationArrow />
    Club
  </button>
</a>

export const CardWithFrame = ({ children, className }: {
  children: React.ReactNode,
  className?: string,
}) =>
  <div className="bg-white p-4 max-w-[800px] w-full">
    <div className={`border-2 border-solid border-[#CDA434] flex flex-col gap-10 px-6 py-10 ${className}`}>
      {children}
    </div>
  </div>