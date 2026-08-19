'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientFieldProps {
  count?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export default function AmbientField({
  count = 350,
  reducedMotion = false,
  isMobile = false,
}: AmbientFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? 180 : count;

  const { positions, colors, offsets, basePositions } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const base = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const offs = new Float32Array(particleCount);

    const goldColor = new THREE.Color('#e0bc5c');
    const goldLight = new THREE.Color('#f5d97a');
    const warmWhite = new THREE.Color('#ffffff');

    const xRange = isMobile ? 12 : 22;
    const yRange = isMobile ? 14 : 14;
    const zRange = 6;

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * xRange;
      const y = (Math.random() - 0.5) * yRange;
      const z = (Math.random() - 0.5) * zRange - 0.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      offs[i] = Math.random() * Math.PI * 2;

      // Color variation: luminous gold & brilliant white
      const isWhite = Math.random() > 0.7;
      const color = isWhite
        ? warmWhite
        : Math.random() > 0.5
        ? goldLight
        : goldColor;

      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return {
      positions: pos,
      colors: col,
      offsets: offs,
      basePositions: base,
    };
  }, [particleCount, isMobile]);

  // Generate glowing circular particle texture
  const glowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(255, 235, 180, 0.85)');
    gradient.addColorStop(0.55, 'rgba(201, 168, 76, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;

    const time = state.clock.elapsedTime;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const offset = offsets[i];

      // Organic wandering movement across the full screen space
      posArr[i3] = basePositions[i3] + Math.sin(time * 0.28 + offset) * 0.7;
      posArr[i3 + 1] = basePositions[i3 + 1] + Math.cos(time * 0.22 + offset * 1.3) * 0.6;
      posArr[i3 + 2] = basePositions[i3 + 2] + Math.sin(time * 0.18 + offset * 0.7) * 0.4;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        map={glowTexture ?? undefined}
        size={isMobile ? 0.048 : 0.065}
        sizeAttenuation
        transparent
        opacity={0.88}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
