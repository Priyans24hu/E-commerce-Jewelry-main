import { useEffect, useRef, useCallback } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

const useFaceMesh = (videoRef, canvasRef, onLandmarksDetected, isActive = true) => {
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);
  const landmarksRef = useRef(null);
  const rafRef = useRef(null);
  const smoothingRef = useRef({
    leftEar: null,
    rightEar: null,
    neck: null,
    alpha: 0.7
  });

  const smoothLandmark = useCallback((newPoint, prevPoint, alpha = 0.7) => {
    if (!prevPoint) return newPoint;
    return {
      x: prevPoint.x * (1 - alpha) + newPoint.x * alpha,
      y: prevPoint.y * (1 - alpha) + newPoint.y * alpha,
      z: prevPoint.z * (1 - alpha) + newPoint.z * alpha
    };
  }, []);

  const calculateEarringPosition = useCallback((landmarks, side) => {
    const keyPoints = side === 'left' 
      ? [234, 93, 132, 58]  // Left ear landmarks
      : [454, 323, 361, 288]; // Right ear landmarks
    
    let x = 0, y = 0, z = 0;
    keyPoints.forEach(idx => {
      x += landmarks[idx].x;
      y += landmarks[idx].y;
      z += landmarks[idx].z;
    });
    
    return {
      x: x / keyPoints.length,
      y: y / keyPoints.length,
      z: z / keyPoints.length
    };
  }, []);

  const calculateNeckPosition = useCallback((landmarks) => {
    const neckPoints = [200, 199, 175, 152]; // Neck/collarbone area
    
    let x = 0, y = 0, z = 0;
    neckPoints.forEach(idx => {
      x += landmarks[idx].x;
      y += landmarks[idx].y;
      z += landmarks[idx].z;
    });
    
    return {
      x: x / neckPoints.length,
      y: y / neckPoints.length + 0.15, // Slightly lower for pendant
      z: z / neckPoints.length
    };
  }, []);

  const calculateHeadTilt = useCallback((landmarks) => {
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    const nose = landmarks[1];
    
    const eyeAngle = Math.atan2(
      rightEye.y - leftEye.y,
      rightEye.x - leftEye.x
    );
    
    const tilt = eyeAngle * (180 / Math.PI);
    return tilt;
  }, []);

  const onResults = useCallback((results) => {
    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
      return;
    }

    const landmarks = results.multiFaceLandmarks[0];
    landmarksRef.current = landmarks;

    const leftEar = calculateEarringPosition(landmarks, 'left');
    const rightEar = calculateEarringPosition(landmarks, 'right');
    const neck = calculateNeckPosition(landmarks);
    const headTilt = calculateHeadTilt(landmarks);

    // Apply smoothing
    const smooth = smoothingRef.current;
    smooth.leftEar = smoothLandmark(leftEar, smooth.leftEar, smooth.alpha);
    smooth.rightEar = smoothLandmark(rightEar, smooth.rightEar, smooth.alpha);
    smooth.neck = smoothLandmark(neck, smooth.neck, smooth.alpha);

    const faceData = {
      leftEar: smooth.leftEar,
      rightEar: smooth.rightEar,
      neck: smooth.neck,
      headTilt,
      landmarks,
      faceDetected: true
    };

    if (onLandmarksDetected) {
      onLandmarksDetected(faceData);
    }
  }, [onLandmarksDetected, calculateEarringPosition, calculateNeckPosition, calculateHeadTilt, smoothLandmark]);

  useEffect(() => {
    if (!videoRef.current || !isActive) return;

    const video = videoRef.current;
    const canvas = canvasRef?.current;

    // Initialize FaceMesh
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults(onResults);
    faceMeshRef.current = faceMesh;

    // Initialize Camera
    const camera = new Camera(video, {
      onFrame: async () => {
        if (video.readyState === 4) {
          await faceMesh.send({ image: video });
        }
      },
      width: 1280,
      height: 720
    });

    cameraRef.current = camera;
    camera.start();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop?.();
      }
      if (faceMeshRef.current) {
        faceMeshRef.current.close?.();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [videoRef, canvasRef, onResults, isActive]);

  return {
    landmarks: landmarksRef.current,
    isReady: !!faceMeshRef.current
  };
};

export default useFaceMesh;
