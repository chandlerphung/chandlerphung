import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  carousels: Record<string, number> = {};

  ngAfterViewInit() {
    setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.0 });
      reveals.forEach(el => observer.observe(el));

      this.initCarousels();
    }, 0);
  }

  initCarousels() {
    document.querySelectorAll('.carousel-track').forEach((track: any) => {
      const id = track.id;
      const total = track.children.length;
      this.carousels[id] = 0;
      const dotsEl = document.getElementById(id.replace('track', 'dots'));
      if (!dotsEl) return;
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => this.goToSlide(id, i, total);
        dotsEl.appendChild(dot);
      }
    });
  }

  moveCarousel(id: string, dir: number) {
    const track = document.getElementById(id) as HTMLElement;
    const total = track.children.length;
    this.carousels[id] = (this.carousels[id] + dir + total) % total;
    track.style.transform = `translateX(-${this.carousels[id] * 100}%)`;
    this.updateDots(id, total);
  }

  goToSlide(id: string, index: number, total: number) {
    this.carousels[id] = index;
    const track = document.getElementById(id) as HTMLElement;
    track.style.transform = `translateX(-${index * 100}%)`;
    this.updateDots(id, total);
  }

  updateDots(id: string, total: number) {
    const dotsEl = document.getElementById(id.replace('track', 'dots'));
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === this.carousels[id]);
    });
  }

  openLightbox(event: MouseEvent) {
  const src = (event.target as HTMLImageElement).src;
  const lightbox = document.getElementById('lightbox') as HTMLElement;
  const img = document.getElementById('lightbox-img') as HTMLImageElement;
  img.src = src;
  lightbox.classList.add('open');
}

  closeLightbox() {
    const lightbox = document.getElementById('lightbox') as HTMLElement;
    lightbox.classList.remove('open');
  }
}