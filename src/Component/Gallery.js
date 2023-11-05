import React, { useState } from 'react';
import image1 from "../Component/images/image-1.webp"
import image2 from "../Component/images/image-2.webp"
import image3 from "../Component/images/image-3.webp"
import image4 from "../Component/images/image-4.webp"
import image5 from "../Component/images/image-5.webp"
import image6 from "../Component/images/image-6.webp"
import image7 from "../Component/images/image-7.webp"
import image8 from "../Component/images/image-8.webp"
import image9 from "../Component/images/image-9.webp"
import image10 from "../Component/images/image-10.jpeg"
import image11 from "../Component/images/image-11.jpeg"
import imageAdd from "../Component/images/image-12.png"


const Gallery = () => {
  // Define the initial state with an array of image objects
  const [images, setImages] = useState([
    { id: 1, url: image1 },
    { id: 2, url: image2 },
    { id: 3, url: image3 },
    { id: 4, url: image4 },
    { id: 5, url: image5 },
    { id: 6, url: image6 },
    { id: 7, url: image7 },
    { id: 8, url: image8 },
    { id: 9, url: image9 },
    { id: 10, url: image10 },
    { id: 11, url: image11 }
  ]);

  // Maintain the state of selected images
  const [selectedImages, setSelectedImages] = useState([]);
  const handleDragEnd = (e) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('dragIndex');
    const dropIndex = e.target.dataset.index;
    if (dragIndex !== dropIndex) {
      const updatedImages = [...images];
      const [draggedImage] = updatedImages.splice(dragIndex, 1);
      updatedImages.splice(dropIndex, 0, draggedImage);

      setImages(updatedImages);
    }
  };
  // Toggle image selection
  const toggleSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };
  // delete image from all images
  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
  };
  const UploadImage=(e)=>{
    const selectedFiles = e.target.files;

    // Create an array of new image objects
    const newImages = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      // You can generate a unique ID for each new image or use an existing method
      const newImage = {
        id: images.length + i + 1,
        url: URL.createObjectURL(file), 
        isFeatured: false,
      };
      newImages.push(newImage);
    }
  
    // Add the new images to the existing images array
    setImages((prevImages) => [...prevImages, ...newImages]);
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
    
    <div className="xl:w-[56%] lg:w-[70%] md:w-[90%] sm:w-[95%] w-[90%] overflow-y-auto mb-14 overflow-x-hidden [&::-webkit-scrollbar]:hidden   h-[80%] rounded-md border border-[whitesmoke] bg-white shadow-1">
    <div className=' border-b px-5 py-3 w-full flex items-center justify-between '>
      <div>
       {
        selectedImages.length>0?(
          <div className='flex flex-row items-center justify-center'>
            <input
              type="checkbox"
              checked={selectedImages.length>0}
              onChange={() =>setSelectedImages([])}
              className='w-6 h-6 mr-2 '
            />
            <p className='font-serif font-semibold text-xl'>{selectedImages.length} files selected</p>
          </div>
        ):
        <p className='font-serif font-semibold text-xl'>Gallery</p>
       }
      </div>
      {
        selectedImages.length>0&&(
          <button className='font-serif font-medium underline text-[red] text-lg' onClick={deleteSelectedImages}>Delete files</button>
        )
      }
    </div>
      <div className="grid  px-3 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-1 grid-cols-1  gap-1 ">
        {images.map((image, index) => ( 
          <div
            key={image.id}
            data-index={index}
            className={`${
              index === 0 &&'col-span-2 row-span-2' 
            } relative cursor-move  m-3  group   transition-transform transform hover:scale-105 `}
            draggable="true"
            onDragStart={(e) => e.dataTransfer.setData('dragIndex', index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragEnd}
          >
            <div className=' group relative'>
            <div className='group-hover:bg-black/50 opacity-0  transition-opacity duration-400 ease-in-out group-hover:opacity-60 rounded-md absolute top-0 bottom-0 left-0 w-full h-full'/>
            <input
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              onChange={() => toggleSelection(image.id)}
              className='w-6 cursor-pointer h-6 absolute top-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out'
            />
            <img
              src={image.url}
              alt={`Image ${image.id}`}
      
                className={`${
                  index === 0 ?'col-span-2 row-span-2' : ''
                } ${
                  image.isFeatured ? 'border border-[gray]  ' : 'border  rounded-md border-[gray]'
                } object-contain`}
            />
            </div>
           
          </div>
        ))}
        <div className="relative border-2 xl:w-[135px] xl:h-[135px] lg:w-[135px] lg:h-[135px] md:w-[135px]  sm:w-[600px] 
        w-[300px] ml-3  mt-3  mb-5 border-dashed rounded-lg p-4 hover:bg-gray-100 cursor-pointer ">
       <input
        type="file"
        multiple
        id="images"
        name='images'
        accept='image/*'
        className="absolute top-0 left-0 h-full w-full  opacity-0 cursor-pointer"
        onChange={UploadImage}
        
      />
      <div className="h-full w-full flex flex-col justify-center items-center gap-y-4">
        <img
          src={imageAdd}
          alt="add"
          height={25}
          width={25}
          priority
        />
        <span className="whitespace-nowrap font-serif font-medium text-lg text-black">Add Images</span>
      </div>
    </div>
    </div>
        <div>
      </div>
    </div>
    </div>
  );
};

export default Gallery;
