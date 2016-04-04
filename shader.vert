#version 330 core

in vec2 vertex;

void main()
{
	gl_Position = vec4(vertex.xy, 0, 1);
}
