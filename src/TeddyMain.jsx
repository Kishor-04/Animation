import { useState } from 'react';
import TeddyDay from './TeddyDay.jsx';
import TeddyJigsaw from './TeddyJigsaw.jsx';
import TeddyComplete from './TeddyComplete.jsx';

const TeddyMain = () => {
  const [stage, setStage] = useState('selection'); // 'selection', 'jigsaw', 'complete'
  const [selectedImage, setSelectedImage] = useState({ src: null, name: '' });

  const handleImageSelect = (imageSrc, imageName) => {
    setSelectedImage({ src: imageSrc, name: imageName });
    setStage('jigsaw');
  };

  const handleJigsawComplete = (imageSrc, imageName) => {
    setSelectedImage({ src: imageSrc, name: imageName });
    setStage('complete');
  };

  const handlePlayAgain = () => {
    setSelectedImage({ src: null, name: '' });
    setStage('selection');
  };

  return (
    <>
      {stage === 'selection' && (
        <TeddyDay onImageSelect={handleImageSelect} />
      )}
      {stage === 'jigsaw' && (
        <TeddyJigsaw 
          imageSrc={selectedImage.src} 
          imageName={selectedImage.name}
          onComplete={handleJigsawComplete}
        />
      )}
      {stage === 'complete' && (
        <TeddyComplete 
          imageSrc={selectedImage.src}
          imageName={selectedImage.name}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
};

export default TeddyMain;
