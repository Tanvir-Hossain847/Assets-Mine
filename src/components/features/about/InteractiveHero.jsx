"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveHero() {
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let scene, camera, renderer, particles, animationId;
    let shapes = [];
    let mouseX = 0;
    let mouseY = 0;

    const initScene = async () => {
      try {
        // Dynamic imports
        const THREE = (await import('three')).default || await import('three');
        const gsap = (await import('gsap')).default || await import('gsap');

        if (!canvasRef.current) return;

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 50;

        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 800;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute(
          'position',
          new THREE.BufferAttribute(posArray, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.4,
          color: 0xa78bfa,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
        });

        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Create floating geometric shapes
        const geometries = [
          new THREE.BoxGeometry(2, 2, 2),
          new THREE.OctahedronGeometry(1.5),
          new THREE.TetrahedronGeometry(1.5),
          new THREE.TorusGeometry(1, 0.4, 16, 100),
        ];

        const material = new THREE.MeshBasicMaterial({
          color: 0xa78bfa,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        });

        geometries.forEach((geometry, index) => {
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 20
          );
          scene.add(mesh);
          shapes.push(mesh);
        });

        // Mouse movement handler
        const handleMouseMove = (event) => {
          mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);

          // Rotate particles
          particles.rotation.y += 0.001;
          particles.rotation.x += 0.0005;

          // Animate shapes
          shapes.forEach((shape, index) => {
            shape.rotation.x += 0.01 * (index + 1);
            shape.rotation.y += 0.01 * (index + 1);
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
          });

          // Camera follows mouse smoothly
          camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
          camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
          camera.lookAt(scene.position);

          renderer.render(scene, camera);
        };

        animate();

        // GSAP Animations
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              delay: 0.2,
            }
          );
        }

        if (subtitleRef.current) {
          gsap.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              delay: 0.6,
            }
          );
        }

        if (containerRef.current) {
          gsap.to(containerRef.current, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          });
        }

        // Handle resize
        const handleResize = () => {
          if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          }
        };

        window.addEventListener('resize', handleResize);

        setIsLoaded(true);

        // Cleanup function
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
          if (animationId) cancelAnimationFrame(animationId);
          if (renderer) {
            renderer.dispose();
          }
          shapes = [];
        };
      } catch (error) {
        console.error('Error initializing 3D scene:', error);
      }
    };

    const cleanup = initScene();

    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(cleanupFn => {
          if (cleanupFn) cleanupFn();
        });
      }
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Content */}
      <div ref={containerRef} className="relative z-10 mx-auto w-11/12 text-center px-4">
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gradient mb-6"
          style={{ opacity: 0 }}
        >
          About AssetsMine
        </h1>
        <p
          ref={subtitleRef}
          className="mt-4 text-xl text-muted-foreground mx-auto max-w-2xl leading-relaxed"
          style={{ opacity: 0 }}
        >
          We are building the world's most comprehensive and accessible marketplace for premium digital assets, empowering creators to build incredible things faster.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
    </section>
  );
}
