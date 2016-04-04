#version 330 core

const float RM_MAX_ITER = 100;
const float DISTANCE = 8;
const float EPS = 0.05;
const float AMBIENT = 0.1;

uniform vec2 iResolution;
uniform float iGlobalTime;

out vec4 result;

float scene(in vec3 p)
{
//	mat4 matrix = mat4(
//		vec4(cos(iGlobalTime), 0, sin(iGlobalTime), 0),
//		vec4(0, 1, 0, 0),
//		vec4(-sin(iGlobalTime), 0, cos(iGlobalTime), 0),
//		vec4(0, 0, 0, 1)
//	);

	return min(
		length(max(abs(vec4(p, 0)) - 1.0, 0)) - 0.1,
		min(
			length(max(abs(vec4(p - vec3(-3, 0, -iGlobalTime), 0)) - 1.0, 0)) - 0.1,
			length(max(abs(vec4(p - vec3(3, 0, -iGlobalTime), 0)) - 1.0, 0)) - 0.1
			)
		);
}

vec3 getNormal(in vec3 p)
{
	vec3 normal;
	vec3 ep = vec3(EPS, 0, 0);

	normal.x = scene(p + ep.xyz) - scene(p - ep.xyz);
	normal.y = scene(p + ep.yxz) - scene(p - ep.yxz);
	normal.z = scene(p + ep.yzx) - scene(p - ep.yzx);

	return normalize(normal);
}

vec4 getSample(in vec2 uv)
{
	vec3 rayStart = vec3(uv, DISTANCE);
	vec3 rayDir = vec3(uv, -1);
	vec3 p;

	float t = 0.0;

	for (int i = 0; i < RM_MAX_ITER; i++)
	{
		p = rayStart + rayDir * t;

		t += scene(p);
	}

	float value = 1.0 - (t * (t / 2)) * 0.01;

	vec3 normal = getNormal(p);
	vec3 light = vec3(0, 5, 10);
	vec3 color = vec3(0.5, 0.1, 0.1);

	vec3 N = normalize(normal);
	vec3 V = normalize(rayDir);
	vec3 R = reflect(V, N);
	vec3 L = normalize(light);

	vec3 ambient = color * vec3(value) * AMBIENT;
	vec3 diffuse = color * value * max(dot(L, N), 0.0);
	vec3 specular = vec3(value) * pow(max(dot(R, L), 0.0), 5.0) * 0.3;

	return vec4(ambient + diffuse + specular, 1.0);
}

void main()
{
	vec2 uv = (gl_FragCoord.xy - (iResolution.xy * 0.5)) / iResolution.yy;

	result = getSample(uv);
}
