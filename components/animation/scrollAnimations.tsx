import { AnimeParams } from 'animejs'

export const fadeIn: AnimeParams = {
  opacity: [0, 1],
  easing: 'linear',
}

export const enterElasticLeft: AnimeParams = {
  translateX: [300, 0],
  easing: 'easeInBounce',
}

export const enterSoftBottom: AnimeParams = {
  translateY: [105, 0],
  opacity: [0, 1],
  easing: 'easeOutCubic',
}

export const popin: AnimeParams = {
  scaleX: [0, 1],
  scaleY: [0, 1],
  opacity: [0, 1],
  easing: 'easeOutElastic',
}

export const enterElasticBottom: AnimeParams = {
  translateY: [105, 0],
  opacity: [0, 1],
  easing: 'easeOutElastic',
}

export const enterLeft: AnimeParams = {
  translateX: [-200, 0],
  opacity: [0, 1],
  easing: 'easeOutCubic',
}

export const float: AnimeParams = {
  translateY: [-4, 4],
  duration: 4000,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutCubic',
}
