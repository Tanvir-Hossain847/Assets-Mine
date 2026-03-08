"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
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
        const particlesCount = 1200;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 120;
        }

        particlesGeometry.setAttribute(
          'position',
          new THREE.BufferAttribute(posArray, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.6,
          color: 0xfdc700,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
        });

        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Create floating geometric shapes
        const geometries = [
          new THREE.BoxGeometry(3, 3, 3),
          new THREE.OctahedronGeometry(2),
          new THREE.TetrahedronGeometry(2),
          new THREE.TorusGeometry(1.5, 0.5, 16, 100),
          new THREE.IcosahedronGeometry(1.8),
        ];

        const material = new THREE.MeshBasicMaterial({
          color: 0xfdc700,
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        });

        geometries.forEach((geometry, index) => {
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 30
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
          particles.rotation.y += 0.0008;
          particles.rotation.x += 0.0004;

          // Animate shapes
          shapes.forEach((shape, index) => {
            shape.rotation.x += 0.008 * (index + 1);
            shape.rotation.y += 0.008 * (index + 1);
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.015;
          });

          // Camera follows mouse smoothly
          camera.position.x += (mouseX * 8 - camera.position.x) * 0.05;
          camera.position.y += (mouseY * 8 - camera.position.y) * 0.05;
          camera.lookAt(scene.position);

          renderer.render(scene, camera);
        };

        animate();

        // GSAP Animations
        if (badgeRef.current) {
          gsap.fromTo(
            badgeRef.current,
            { opacity: 0, scale: 0.8, y: -20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
              delay: 0.1,
            }
          );
        }

        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current.children,
            { opacity: 0, y: 60, rotationX: -15 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.2,
              ease: 'power3.out',
              stagger: 0.15,
              delay: 0.3,
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
              delay: 0.8,
            }
          );
        }

        if (buttonsRef.current) {
          gsap.fromTo(
            buttonsRef.current.children,
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
              stagger: 0.1,
              delay: 1.1,
            }
          );
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
    <section className="relative flex min-h-[700px] items-center justify-center overflow-hidden py-20 lg:pb-32">
      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
        style={{ background: 'transparent' }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/60 to-background -z-10" />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6">
        <div 
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full border bg-background/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md"
          style={{ opacity: 0 }}
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-foreground">New Assets Every Week</span>
        </div>

        <h1 
          ref={titleRef}
          className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl"
        >
          <span style={{ display: 'inline-block', opacity: 0 }}>Build Faster with</span>
          <br />
          <span className="text-gradient" style={{ display: 'inline-block', opacity: 0 }}>Premium Digital Assets</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl drop-shadow-md"
          style={{ opacity: 0 }}
        >
          Discover high-quality UI kits, 3D models, and Unity assets curated by experts. 
          Everything you need to launch your next big project.
        </p>

        <div 
          ref={buttonsRef}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
           <Button 
             size="lg" 
             className="rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-all duration-200 hover:bg-primary/90 active:scale-95"
             style={{ opacity: 0 }}
           >
             Explore All Assets
             <ArrowRight className="ml-2 h-4 w-4" />
           </Button>
           <Button 
             size="lg" 
             variant="outline" 
             className="rounded-full border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 active:scale-95"
             style={{ opacity: 0 }}
           >
             Sell Your Assets
           </Button>
         </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#fdc700]/20 blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#fdc700]/20 blur-3xl animate-pulse -z-10" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-[#fdc700]/15 blur-3xl animate-pulse -z-10" style={{ animationDelay: '2s' }} />

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
    </section>
  );
}
