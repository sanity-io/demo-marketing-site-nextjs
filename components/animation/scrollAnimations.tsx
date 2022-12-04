import { AnimeParams } from 'animejs'

export const inFade: AnimeParams = {
  opacity: [0, 1],
  easing: 'linear',
}

export const outFade: AnimeParams = {
  opacity: [1, 0],
  easing: 'linear',
}

export const inElasticLeft: AnimeParams = {
  translateX: [300, 0],
  easing: 'easeInBounce',
}

export const inSoftBottom: AnimeParams = {
  translateY: [105, 0],
  opacity: [0, 1],
  easing: 'easeOutCubic',
}

export const outSofTop: AnimeParams = {
  translateY: [0, -20],
  opacity: [1, 0],
  easing: 'easeOutCubic',
}

export const popin: AnimeParams = {
  scaleX: [0, 1],
  scaleY: [0, 1],
  opacity: [0, 1],
  easing: 'easeOutElastic',
}

export const inSoftScale: AnimeParams = {
  scaleX: [0.9, 1],
  scaleY: [0.9, 1],
  opacity: [0, 1],
  easing: 'linear',
}

export const inElasticBottom: AnimeParams = {
  translateY: [105, 0],
  opacity: [0, 1],
  easing: 'easeOutElastic',
}

export const inHardTop: AnimeParams = {
  translateY: [-400, 0],
  opacity: [0, 1],
  easing: 'easeOutCubic',
}

export const inHardBottom: AnimeParams = {
  translateY: [150, 0],
  easing: 'easeOutCubic',
}

export const inLeft: AnimeParams = {
  translateX: [-50, 0],
  opacity: [0, 1],
  easing: 'easeOutCubic',
}
export const inRight: AnimeParams = {
  translateX: [50, 0],
  opacity: [0, 1],
  easing: 'easeOutCubic',
}

export const fakeBrighten: AnimeParams = {
  opacity: [0.5, 1],
  easing: 'easeOutQuad',
}

export const fakeDarken: AnimeParams = {
  opacity: [1, 0.5],
  easing: 'easeOutQuad',
}

export const colorGrey: AnimeParams = {
  color: ['white', 'gray'],
  easing: 'easeOutCubic',
}

export const outright: AnimeParams = {
  translateX: [0, 20],
  opacity: [1, 0],
  easing: 'easeOutCubic',
}

export const floatLoop: AnimeParams = {
  translateY: [-40, 40],
  duration: 4000,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutCubic',
}
