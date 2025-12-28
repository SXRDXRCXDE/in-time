import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useTheme } from '../theme-provider';
import { useIsMobile } from '../../hooks/use-mobile';

const HeroBackgroundAnimation: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!containerRef.current) return;

        const sketch = (p: p5) => {
            let particles: Particle[] = [];
            const numParticles = isMobile ? 20 : 50;
            const maxDistance = isMobile ? 80 : 120;
            const isDark = theme === "dark";

            class Particle {
                pos: p5.Vector;
                vel: p5.Vector;
                size: number;

                constructor() {
                    this.pos = p.createVector(p.random(p.width), p.random(p.height));
                    this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
                    this.size = p.random(2, 4);
                }

                update() {
                    this.pos.add(this.vel);

                    // Only apply mouse repulsion on non-mobile devices
                    if (!isMobile) {
                        let mouse = p.createVector(p.mouseX, p.mouseY);
                        let d = p.dist(this.pos.x, this.pos.y, mouse.x, mouse.y);

                        if (d < 100) {
                            let force = p5.Vector.sub(this.pos, mouse);
                            force.setMag(0.5);
                            this.pos.add(force);
                        }
                    }

                    if (this.pos.x < 0 || this.pos.x > p.width) this.vel.x *= -1;
                    if (this.pos.y < 0 || this.pos.y > p.height) this.vel.y *= -1;
                }

                display() {
                    p.noStroke();
                    p.fill(isDark ? 255 : 0, 100);
                    p.circle(this.pos.x, this.pos.y, this.size);
                }
            }

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                if (isMobile) {
                    p.pixelDensity(1);
                }
                for (let i = 0; i < numParticles; i++) {
                    particles.push(new Particle());
                }
            };

            p.draw = () => {
                p.clear(0, 0, 0, 0);

                let colorVal = isDark ? 255 : 0;
                let mousePos = p.createVector(p.mouseX, p.mouseY);

                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].display();

                    if (!isMobile) {
                        let dMouse = p.dist(mousePos.x, mousePos.y, particles[i].pos.x, particles[i].pos.y);
                        if (dMouse < maxDistance + 50) {
                            p.stroke(colorVal, p.map(dMouse, 0, maxDistance + 50, 80, 0));
                            p.line(mousePos.x, mousePos.y, particles[i].pos.x, particles[i].pos.y);
                        }
                    }

                    for (let j = i + 1; j < particles.length; j++) {
                        let d = p.dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
                        if (d < maxDistance) {
                            let alpha = p.map(d, 0, maxDistance, 80, 0);
                            p.stroke(colorVal, alpha);
                            p.strokeWeight(1);
                            p.line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
                        }
                    }
                }
            };

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        };

        const p5Instance = new p5(sketch, containerRef.current);

        return () => {
            p5Instance.remove();
        };
    }, [theme, isMobile]);

    return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1] opacity-40" />;
};

export default HeroBackgroundAnimation;
