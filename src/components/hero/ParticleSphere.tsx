'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSphereProps {
  count?: number;
  radius?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export default function ParticleSphere({
  count = 4000,
  radius = 2.5,
  reducedMotion = false,
  isMobile = false,
}: ParticleSphereProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const smoothPointer = useRef(new THREE.Vector2(0, 0));
  const targetPointer = useRef(new THREE.Vector2(0, 0));
  const interactionStrength = useRef(0);
  const isTouchDevice = useRef(false);
  const pointerActive = useRef(false);

  // Track window-level mouse movement to bypass any overlay blocking pointer events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDevice = () => {
      isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
    };

    checkDevice();

    const handlePointerMove = (e: PointerEvent) => {
      if (isTouchDevice.current) return;

      // Normalize screen client coordinates to R3F standard space [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      targetPointer.current.set(x, y);
      pointerActive.current = true;
    };

    const handlePointerLeave = () => {
      pointerActive.current = false;
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (isTouchDevice.current) return;
      pointerActive.current = true;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetPointer.current.set(x, y);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerenter', handlePointerEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerenter', handlePointerEnter);
    };
  }, []);

  // Generate positions, base colors, sizes and response weights using Fibonacci sphere
  const { positions, colors, baseColors, basePositions, sizes, goldWeights } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const weights = new Float32Array(count);

    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    const goldColor = new THREE.Color('#c9a84c');
    const goldLight = new THREE.Color('#d4b85c');
    const warmWhite = new THREE.Color('#f0ece4');

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const jitter = 0.05;
      pos[i * 3] = x + (Math.random() - 0.5) * jitter;
      pos[i * 3 + 1] = y + (Math.random() - 0.5) * jitter;
      pos[i * 3 + 2] = z + (Math.random() - 0.5) * jitter;

      base[i * 3] = pos[i * 3];
      base[i * 3 + 1] = pos[i * 3 + 1];
      base[i * 3 + 2] = pos[i * 3 + 2];

      // Color distribution: 85% gold variations, 15% warm white
      const isWhite = Math.random() > 0.85;
      const color = isWhite
        ? warmWhite
        : Math.random() > 0.5
        ? goldColor
        : goldLight;

      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      // Gold particles respond more strongly (weight = 1.0) than white particles (weight = 0.35)
      weights[i] = isWhite ? 0.35 : 1.0;

      siz[i] = isWhite
        ? 1.5 + Math.random() * 1.0
        : 2.0 + Math.random() * 1.5;
    }

    const baseCol = new Float32Array(col);

    return {
      positions: pos,
      colors: col,
      baseColors: baseCol,
      basePositions: base,
      sizes: siz,
      goldWeights: weights
    };
  }, [count, radius]);

  // Animation & Interaction frame loop
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;

    const colorAttr = geometry.attributes.color;
    const colArray = colorAttr.array as Float32Array;

    if (reducedMotion) {
      pointsRef.current.rotation.y = 0.2;
      return;
    }

    // 1. Target & Spring-interpolated Pointer (simplified on touch devices)
    if (isTouchDevice.current) {
      targetPointer.current.set(0, 0);
    }

    // Smooth lerp avoids sudden snaps
    smoothPointer.current.lerp(targetPointer.current, 0.05);

    // 2. Parallax rotation overlaying autonomous rotation
    const autonomousRotationY = time * 0.065;
    const autonomousRotationX = Math.sin(time * 0.035) * 0.07;

    const parallaxX = smoothPointer.current.y * 0.12;
    const parallaxY = smoothPointer.current.x * 0.12;

    pointsRef.current.rotation.x = autonomousRotationX - parallaxX;
    pointsRef.current.rotation.y = autonomousRotationY + parallaxY;

    // 3. Local cursor calculations for magnetic displacement
    const targetStrength = pointerActive.current && !isTouchDevice.current ? 1.0 : 0.0;
    interactionStrength.current = THREE.MathUtils.lerp(interactionStrength.current, targetStrength, 0.08);

    const strength = interactionStrength.current;
    const hasInteraction = strength > 0.001;

    // Cache trigonometric values for fast coordinate conversions
    const ry = pointsRef.current.rotation.y;
    const rx = pointsRef.current.rotation.x;

    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);

    const cosNegY = cosY;
    const sinNegY = -sinY;
    const cosNegX = cosX;
    const sinNegX = -sinX;

    // World cursor coordinates
    const x3d = smoothPointer.current.x * (state.viewport.width / 2);
    const y3d = smoothPointer.current.y * (state.viewport.height / 2);
    const cursorZ = Math.sqrt(Math.max(0, radius * radius - x3d * x3d - y3d * y3d));

    // Breathing parameters
    const speed = 0.3;
    const amplitude = 0.04;

    // Interaction parameters
    const influenceRadius = 1.5;
    const maxDisplacement = 0.28;

    // Loop through positions and dynamically offset based on cursor proximity
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      const offset = i * 0.01;

      // Base breathing position in local space
      const xAnim = bx + Math.sin(time * speed + offset) * amplitude;
      const yAnim = by + Math.cos(time * speed * 0.8 + offset * 1.3) * amplitude;
      const zAnim = bz + Math.sin(time * speed * 0.6 + offset * 0.7) * amplitude * 0.5;

      const baseR = baseColors[i3];
      const baseG = baseColors[i3 + 1];
      const baseB = baseColors[i3 + 2];

      if (hasInteraction) {
        // Rotate local breathing coordinate into world space
        const yRotX = yAnim * cosX - zAnim * sinX;
        const zRotX = yAnim * sinX + zAnim * cosX;
        const worldX = xAnim * cosY + zRotX * sinY;
        const worldY = yRotX;
        const worldZ = -xAnim * sinY + zRotX * cosY;

        // Calculate distance to projected world cursor position
        const dx = worldX - x3d;
        const dy = worldY - y3d;
        const dz = worldZ - cursorZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < influenceRadius) {
          const weight = goldWeights[i];
          const pullStrength = 1.0 - dist / influenceRadius;
          const ease = pullStrength * pullStrength;

          // Outward displacement (repulsion field) scaled by proximity, strength and particle weight
          const displacement = maxDisplacement * ease * weight * strength;
          const dSafe = dist < 0.001 ? 0.001 : dist;

          const worldXDisp = worldX + (dx / dSafe) * displacement;
          const worldYDisp = worldY + (dy / dSafe) * displacement;
          const worldZDisp = worldZ + (dz / dSafe) * displacement;

          // Convert displaced world coordinates back to local coordinates
          const xLoc = worldXDisp * cosNegY + worldZDisp * sinNegY;
          const zRotNegY = -worldXDisp * sinNegY + worldZDisp * cosNegY;
          const yLoc = worldYDisp * cosNegX - zRotNegY * sinNegX;
          const zLoc = worldYDisp * sinNegX + zRotNegY * cosNegX;

          posArray[i3] = xLoc;
          posArray[i3 + 1] = yLoc;
          posArray[i3 + 2] = zLoc;

          // Gently brighten particles (glowing magnetic field trail)
          const brighten = 1.0 + 0.6 * ease * weight * strength;
          colArray[i3] = Math.min(1.0, baseR * brighten);
          colArray[i3 + 1] = Math.min(1.0, baseG * brighten);
          colArray[i3 + 2] = Math.min(1.0, baseB * brighten);
          continue;
        }
      }

      // Revert to baseline values if outside the interaction bubble
      posArray[i3] = xAnim;
      posArray[i3 + 1] = yAnim;
      posArray[i3 + 2] = zAnim;

      colArray[i3] = baseR;
      colArray[i3 + 1] = baseG;
      colArray[i3 + 2] = baseB;
    }

    positionAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef} position={[isMobile ? 0 : 1.5, isMobile ? -0.4 : 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.028}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient and point lighting setups */}
      <ambientLight intensity={0.3} color="#c9a84c" />
      <pointLight
        position={[3, 2, 4]}
        intensity={0.5}
        color="#c9a84c"
        distance={12}
      />
      <pointLight
        position={[-3, -1, -2]}
        intensity={0.2}
        color="#f0ece4"
        distance={10}
      />
    </group>
  );
}
