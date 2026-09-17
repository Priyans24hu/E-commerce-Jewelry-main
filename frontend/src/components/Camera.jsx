import React, { useRef, useState, useCallback } from 'react';
import { Camera as CameraIcon, Upload, RefreshCw, Sparkles } from 'lucide-react';
import useFaceMesh from '../hooks/useFaceMesh';
import useHandTracking from '../hooks/useHandTracking';
import TryOnCanvas from './TryOnCanvas';

const Camera = ({ 
  selectedProduct, 
  customization, 
  onCapture,
  faceData,
  handData,
  onFaceData,
  onHandData,
  feedbackMessage
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCamera, setHasCamera] = useState(false);
  const [useLiveCamera, setUseLiveCamera] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [videoDimensions, setVideoDimensions] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Initialize MediaPipe
  const { isReady: faceReady } = useFaceMesh(
    videoRef, 
    null, 
    onFaceData, 
    useLiveCamera
  );
  
  const { isReady: handsReady } = useHandTracking(
    videoRef, 
    onHandData, 
    useLiveCamera
  );

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setVideoDimensions({
        width: video.videoWidth,
        height: video.videoHeight
      });
      setIsLoading(false);
      setHasCamera(true);
    }
  }, []);

  const handleCameraError = useCallback(() => {
    setIsLoading(false);
    setHasCamera(false);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setUseLiveCamera(false);
        
        // Create temporary image to get dimensions
        const img = new Image();
        img.onload = () => {
          setVideoDimensions({
            width: img.width,
            height: img.height
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const switchToCamera = () => {
    setUseLiveCamera(true);
    setUploadedImage(null);
    setIsLoading(true);
  };

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (useLiveCamera && videoRef.current) {
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Draw the AR overlay canvas
      const arCanvas = containerRef.current?.querySelector('.ar-canvas');
      if (arCanvas) {
        ctx.drawImage(arCanvas, 0, 0, canvas.width, canvas.height);
      }
    } else if (uploadedImage) {
      const img = new Image();
      img.src = uploadedImage;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const arCanvas = containerRef.current?.querySelector('.ar-canvas');
      if (arCanvas) {
        ctx.drawImage(arCanvas, 0, 0, canvas.width, canvas.height);
      }
    }
    
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    onCapture(dataUrl);
  };

  // Loading state
  if (isLoading && useLiveCamera) {
    return (
      <div className="camera-container bg-gray-900 flex items-center justify-center" 
           style={{ aspectRatio: '4/3' }}>
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white/80 text-sm">Initializing camera...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Flash overlay */}
      <div id="flash-overlay" className="flash-overlay"></div>
      
      <div 
        ref={containerRef}
        className="camera-container bg-gray-900 relative"
        style={{ aspectRatio: useLiveCamera ? 'auto' : videoDimensions ? 
          `${videoDimensions.width}/${videoDimensions.height}` : '4/3' }}
      >
        {/* Video or Image */}
        {useLiveCamera ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleCameraError}
          />
        ) : (
          uploadedImage && (
            <img 
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          )
        )}

        {/* AR Overlay Canvas */}
        <TryOnCanvas
          faceData={faceData}
          handData={handData}
          selectedProduct={selectedProduct}
          customization={customization}
          size={customization.size}
          videoDimensions={videoDimensions}
        />

        {/* Model loading indicator */}
        {(isLoading || (!faceReady && !handsReady)) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center">
              <div className="spinner mx-auto mb-3"></div>
              <p className="text-white/80 text-sm">Loading AR models...</p>
            </div>
          </div>
        )}

        {/* Feedback message */}
        {feedbackMessage && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 feedback-message">
            <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-roshni-gold" />
              <span className="text-sm font-medium text-gray-800">
                {feedbackMessage.text}
              </span>
            </div>
          </div>
        )}

        {/* Capture button */}
        <button
          onClick={handleCapture}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 
                     w-16 h-16 rounded-full bg-white shadow-lg
                     flex items-center justify-center
                     hover:scale-105 transition-transform duration-200
                     border-4 border-roshni-gold/30"
        >
          <div className="w-12 h-12 rounded-full bg-roshni-gold"></div>
        </button>

        {/* Upload / Camera toggle */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          {useLiveCamera ? (
            <button
              onClick={handleUploadClick}
              className="glass px-4 py-2 rounded-full flex items-center gap-2
                         text-sm font-medium text-gray-700 hover:bg-white/90 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </button>
          ) : (
            <button
              onClick={switchToCamera}
              className="glass px-4 py-2 rounded-full flex items-center gap-2
                         text-sm font-medium text-gray-700 hover:bg-white/90 transition-colors"
            >
              <CameraIcon className="w-4 h-4" />
              Use Camera
            </button>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* AR tracking indicator */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            faceData?.faceDetected || handData?.handsDetected 
              ? 'bg-green-500 animate-pulse' 
              : 'bg-red-500'
          }`}></div>
          <span className="text-xs text-white/80 font-medium">
            {faceData?.faceDetected || handData?.handsDetected 
              ? 'AR Active' 
              : 'Searching...'}
          </span>
        </div>

        {/* No camera warning */}
        {!hasCamera && useLiveCamera && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="text-center text-white p-6">
              <CameraIcon className="w-12 h-12 mx-auto mb-4 text-white/60" />
              <p className="text-lg font-medium mb-2">Camera Access Required</p>
              <p className="text-sm text-white/70 mb-4">
                Please allow camera access or upload a photo to try on jewelry
              </p>
              <button
                onClick={handleUploadClick}
                className="btn-primary"
              >
                Upload Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
