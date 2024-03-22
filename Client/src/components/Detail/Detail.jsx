import chroma from 'chroma-js';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import heart from '../../img/heart.png'


const Detail = () => {

    const { id } = useParams();
    const ENDPOINT = `http://localhost:3001/products/${id}`;
    const [showedImage, setShowedImage] = useState('');
    const [counter, setCounter] = useState(1);
    const [item, setItem] = useState({
        name: '',
        price: '',
        description: '',
        images: [],
        colours: [],
        material: ''
    });


    const cleaner = ({name, price, images, colour, material}) => {

        const arr = name.split(' ');
        const itemName = arr.slice(-3).join(' ');
        const colours = colour.split(", ");

        setItem(
            {
                name: itemName,
                price: price,
                description: name,
                images: images,
                colours: colours,
                material: material
            }
        )
        
    }

    const handleImage = (image) => {
        setShowedImage(image)
    }

    const handleCounter = (op) => {

        if(op === '-'){
            counter > 1 && setCounter(counter - 1)
        }
        else{
            setCounter( counter + 1)
        }
    }

    

    useEffect( () => {

        const fetchData = async () => {
            try {
                const {data}  = await axios.get(ENDPOINT);    
                
                if(data){
                    cleaner(data);  
                    setShowedImage(data.images[0])
                }
                else{
                    alert(`Doesn't exist any product with this id: ${id}`);
                }   
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
        
        
    }, [id])


    return (

        <div className=" w-11/12 h-auto pt-20 mx-auto lg:w-3/5 lg:mt-10 font-RedHat">

            <div className="bg-primary/10 rounded-2xl flex flex-col items-center md:gap-4 md:px-4 lg:flex-row lg:justify-around  lg:items-center">

                <picture>
                    <img src={showedImage} alt="item"
                        className="max-w-64 mt-4 lg:mt-0 rounded-2xl"
                    />
                </picture>

                <div className="lg:max-w-96 bg-primary/20 my-10 rounded-2xl flex flex-col p-4">

                    <div className="flex justify-between">
                        <h1 className="font-semibold text-sm tracking-widest">{item.name}</h1>
                        <img src={heart} alt="heart" 
                            className="max-w-6 max-h-6"
                        />
                    </div>
                    
                    
                    <div className="mt-5 flex justify-between">
                        <p className="font-semibold text-2xl tracking-widest">${item.price}</p>
                        <div className="flex gap-4 text-lg">
                            <span className="bg-primary/50 hover:bg-primary rounded-2xl py-0.5 px-4" 
                            onClick={() => handleCounter('-')}>-</span>
                            <span>{counter}</span>
                            <span className="bg-primary/50 hover:bg-primary rounded-2xl py-0.5 px-4" 
                                onClick={() => handleCounter('+')}
                            >+</span>
                        </div>
                    </div>

                    <p className="mt-2 text-sm"><span className="font-semibold">Description:</span> {item.description}</p>
                    <p className="mt-2 text-sm"><span className="font-semibold">Material:</span> {item.material}</p>

                    <div className="mt-2 flex flex-col gap-2 md:flex-row">

                        <div className="flex flex-col gap-2 mx-auto" id='colors'>
                            
                            <p className="text-center font-semibold text-lg">Color</p>
                            <div className="flex gap-2 mx-auto justify-center">

                                {
                                    
                                     item.colours?.map(  (color, index) => {
                                  
                                         const hexColor =  chroma(color.toLowerCase()).hex();
                                         console.log(hexColor);
                                         const clas = `w-4 h-4 bg-[${hexColor}] rounded-full`
                                         console.log(clas);
                                         return (
                                             <span 
                                                 key={index}
                                                 className={clas}
                                             ></span>
                                         )
                                     })
                                }
                            
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mx-auto">

                            <p className="text-center font-semibold text-lg">Size</p>
                            <div className="flex mx-auto justify-center text-md">
                                <span className=" hover:bg-primary rounded-2xl py-0.5 px-2 cursor-pointer">XS</span>
                                <span className="hover:bg-primary rounded-2xl py-0.5 px-2 cursor-pointer">S</span>
                                <span className="hover:bg-primary rounded-2xl py-0.5 px-2 cursor-pointer">M</span>
                                <span className="hover:bg-primary rounded-2xl py-0.5 px-2 cursor-pointer">L</span>
                                <span className="hover:bg-primary rounded-2xl py-0.5 px-2 cursor-pointer">XL</span>
                            </div>
                        </div>


                    </div>
                    
                </div>
            </div>

            <div className="flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-around pr-8">

                <div className="mt-5 flex flex-wrap justify-center gap-4">

                    {
                        item.images?.map( (image) => {
                            return (
                                <img src={image} alt="item" 
                                className="max-w-20 rounded-2xl"    
                                onClick={ () => handleImage(image)}
                            />
                            )
                        })
                    }
                            {/* <img src="https://images.pexels.com/photos/1502216/pexels-photo-1502216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="item" 
                                className="max-w-20 rounded-2xl"    
                            />
                            <img src="https://images.pexels.com/photos/1502216/pexels-photo-1502216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="item" 
                                className="max-w-20 rounded-2xl"
                            />
                            <img src="https://images.pexels.com/photos/1502216/pexels-photo-1502216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="item" 
                                className="max-w-20 rounded-2xl"
                            /> */}
                </div>

                <div className="w-1/5 flex">
                    <button 
                    className="mt-10 w-full h-8 bg-primary/70 hover:bg-primary rounded-2xl py-2 text-black">Go</button>
                </div>

             </div>

        </div>

    )

}

export default Detail;