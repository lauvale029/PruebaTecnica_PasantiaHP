import React from 'react';
import './Pokeball3D.css';

interface Pokeball3DProps {
  size?: 'small' | 'medium' | 'large';
  speed?: 'slow' | 'normal' | 'fast';
}

const Pokeball3D: React.FC<Pokeball3DProps> = ({ 
  size = 'medium', 
  speed = 'normal' 
}) => {
  const sizeClasses = {
    small: 'pokeball-small',
    medium: 'pokeball-medium', 
    large: 'pokeball-large'
  };

  const speedClasses = {
    slow: 'pokeball-slow',
    normal: 'pokeball-normal',
    fast: 'pokeball-fast'
  };

  return (
    <div className={`pokeball-container ${sizeClasses[size]} ${speedClasses[speed]}`}>
      <div className="pokeball-3d">
        <div className="pokeball-hemisphere pokeball-top">
          <div className="pokeball-highlight"></div>
        </div>
        <div className="pokeball-hemisphere pokeball-bottom">
          <div className="pokeball-shadow"></div>
        </div>
        <div className="pokeball-band">
          <div className="pokeball-center">
            <div className="pokeball-button">
              <div className="pokeball-button-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokeball3D;