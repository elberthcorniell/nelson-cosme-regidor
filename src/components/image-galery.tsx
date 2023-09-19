"use client"
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

export const ImageGalery = ({ images }: {
    images: {
        url: string,
    }[]
}) => (
    <div className="h-[50vh] relative max-w-[800px]">
            <Carousel
                dynamicHeight={true}
            >
                {images.map(i => <div key={i.url}>
                    <img src={i.url} alt="Wedding image" className='galery' />
                    {/* <p className="legend">Legend 1</p> */}
                </div>)}
            </Carousel>
    </div>
        );
