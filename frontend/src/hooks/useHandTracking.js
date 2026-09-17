import { useEffect, useRef, useCallback } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

const useHandTracking = (videoRef, onHandLandmarksDetected, isActive = true) => {
  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const smoothingRef = useRef({
    leftHand: null,
    rightHand: null,
    alpha: 0.6
  });

  const smoothLandmark = useCallback((newPoint, prevPoint, alpha = 0.6) => {
    if (!prevPoint) return newPoint;
    return {
      x: prevPoint.x * (1 - alpha) + newPoint.x * alpha,
      y: prevPoint.y * (1 - alpha) + newPoint.y * alpha,
      z: prevPoint.z * (1 - alpha) + newPoint.z * alpha
    };
  }, []);

  const getFingerPosition = useCallback((landmarks, fingerBaseIdx, fingerTipIdx) => {
    const base = landmarks[fingerBaseIdx];
    const tip = landmarks[fingerTipIdx];
    
    return {
      x: (base.x + tip.x) / 2,
      y: (base.y + tip.y) / 2,
      z: (base.z + tip.z) / 2,
      angle: Math.atan2(tip.y - base.y, tip.x - base.x) * (180 / Math.PI)
    };
  }, []);

  const getWristPosition = useCallback((landmarks) => {
    const wrist = landmarks[0];
    const indexBase = landmarks[5];
    const pinkyBase = landmarks[17];
    
    const centerX = (wrist.x + indexBase.x + pinkyBase.x) / 3;
    const centerY = (wrist.y + indexBase.y + pinkyBase.y) / 3;
    
    // Calculate wrist angle
    const angle = Math.atan2(
      indexBase.y - pinkyBase.y,
      indexBase.x - pinkyBase.x
    ) * (180 / Math.PI);
    
    return {
      x: centerX,
      y: centerY,
      z: wrist.z,
      angle: angle - 90 // Adjust for bangle orientation
    };
  }, []);

  const calculateHandScale = useCallback((landmarks) => {
    const wrist = landmarks[0];
    const middleTip = landmarks[12];
    
    const distance = Math.sqrt(
      Math.pow(middleTip.x - wrist.x, 2) + 
      Math.pow(middleTip.y - wrist.y, 2)
    );
    
    return distance;
  }, []);

  const onResults = useCallback((results) => {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      return;
    }

    const handsData = {
      rings: [],
      bangles: [],
      handsDetected: true
    };

    const smooth = smoothingRef.current;

    results.multiHandLandmarks.forEach((landmarks, index) => {
      const handScale = calculateHandScale(landmarks);
      const handedness = results.multiHandedness?.[index]?.label || 'Right';
      const isLeftHand = handedness === 'Left';

      // Ring positions (fingers)
      const fingers = [
        { name: 'thumb', base: 2, tip: 4 },
        { name: 'index', base: 5, tip: 8 },
        { name: 'middle', base: 9, tip: 12 },
        { name: 'ring', base: 13, tip: 16 },
        { name: 'pinky', base: 17, tip: 20 }
      ];

      fingers.forEach(finger => {
        const pos = getFingerPosition(landmarks, finger.base, finger.tip);
        const smoothedPos = smoothLandmark(
          pos, 
          smooth[isLeftHand ? 'leftHand' : 'rightHand']?.[finger.name],
          0.6
        );
        
        if (!smooth[isLeftHand ? 'leftHand' : 'rightHand']) {
          smooth[isLeftHand ? 'leftHand' : 'rightHand'] = {};
        }
        smooth[isLeftHand ? 'leftHand' : 'rightHand'][finger.name] = smoothedPos;

        handsData.rings.push({
          finger: finger.name,
          hand: isLeftHand ? 'left' : 'right',
          position: smoothedPos,
          scale: handScale * 0.15,
          angle: pos.angle
        });
      });

      // Bangle position (wrist)
      const wristPos = getWristPosition(landmarks);
      const smoothedWrist = smoothLandmark(
        wristPos,
        smooth[isLeftHand ? 'leftHand' : 'rightHand']?.wrist,
        0.5
      );
      
      smooth[isLeftHand ? 'leftHand' : 'rightHand'].wrist = smoothedWrist;

      handsData.bangles.push({
        hand: isLeftHand ? 'left' : 'right',
        position: smoothedWrist,
        scale: handScale * 0.35,
        angle: wristPos.angle
      });
    });

    if (onHandLandmarksDetected) {
      onHandLandmarksDetected(handsData);
    }
  }, [onHandLandmarksDetected, getFingerPosition, getWristPosition, calculateHandScale, smoothLandmark]);

  useEffect(() => {
    if (!videoRef.current || !isActive) return;

    const video = videoRef.current;

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults(onResults);
    handsRef.current = hands;

    const camera = new Camera(video, {
      onFrame: async () => {
        if (video.readyState === 4) {
          await hands.send({ image: video });
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
      if (handsRef.current) {
        handsRef.current.close?.();
      }
    };
  }, [videoRef, onResults, isActive]);

  return {
    isReady: !!handsRef.current
  };
};

export default useHandTracking;
