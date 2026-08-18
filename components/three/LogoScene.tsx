"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";

/**
 * Vanilla three.js "eye" emblem — a crescent (disc with an offset circular
 * bite) plus a 5-point star — that rotates on its Y axis as the About section
 * scrolls. Written without react-three-fiber for reliability. Swap the crescent
 * meshes for a loaded .glb later to match the exact logo model.
 */
export default function LogoScene({
  rotationRef,
}: {
  rotationRef: RefObject<number>;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    const el = renderer.domElement;
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.display = "block";
    mount.appendChild(el);

    // Lighting for a white-stone read.
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 5, 6);
    const fill = new THREE.DirectionalLight(0xffffff, 0.55);
    fill.position.set(-5, -2, -3);
    const rim = new THREE.DirectionalLight(0xffd9c9, 0.45);
    rim.position.set(-3, 4, 2);
    scene.add(key, fill, rim);

    const extrude: THREE.ExtrudeGeometryOptions = {
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 4,
      curveSegments: 64,
    };

    // Crescent: outer disc with an offset hole kept inside it (valid extrude).
    const crescent = new THREE.Shape();
    crescent.absarc(0, 0, 1.1, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0.44, 0, 0.63, 0, Math.PI * 2, true);
    crescent.holes.push(hole);
    const crescentGeo = new THREE.ExtrudeGeometry(crescent, extrude);
    crescentGeo.center();

    // Star.
    const star = new THREE.Shape();
    const spikes = 5;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? 0.34 : 0.15;
      const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) star.moveTo(x, y);
      else star.lineTo(x, y);
    }
    star.closePath();
    const starGeo = new THREE.ExtrudeGeometry(star, { ...extrude, depth: 0.34 });
    starGeo.center();

    const stone = new THREE.MeshStandardMaterial({
      color: 0xededed,
      roughness: 0.62,
      metalness: 0.16,
    });
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xf2f2f2,
      roughness: 0.5,
      metalness: 0.2,
    });

    const group = new THREE.Group();
    group.add(new THREE.Mesh(crescentGeo, stone));
    const starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.position.set(0.62, 0.42, 0);
    group.add(starMesh);
    group.scale.setScalar(1.15);
    scene.add(group);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const dt = clock.getDelta();
      const p = rotationRef.current || 0;
      const target = p * Math.PI * 2 * 1.25 + 0.3;
      group.rotation.y += (target - group.rotation.y) * Math.min(1, dt * 3.5);
      group.rotation.z = Math.sin(p * Math.PI) * 0.12;
      group.rotation.x = -0.12 + Math.sin(p * Math.PI * 2) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      crescentGeo.dispose();
      starGeo.dispose();
      stone.dispose();
      starMat.dispose();
      renderer.dispose();
      if (el.parentNode === mount) mount.removeChild(el);
    };
  }, [rotationRef]);

  return <div ref={mountRef} className="h-full w-full" />;
}
