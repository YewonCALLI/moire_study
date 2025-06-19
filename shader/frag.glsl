precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  vec3 color = vec3(uv, 0.5 + 0.5 * sin(u_time));
  gl_FragColor = vec4(color, 1.0);
}
