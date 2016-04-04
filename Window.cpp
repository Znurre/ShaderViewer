#include "Window.h"

Window::Window()
{
	QSurfaceFormat format;
	format.setSamples(4);
	format.setVersion(4, 1);
	format.setProfile(QSurfaceFormat::CoreProfile);

	setFormat(format);
}

void Window::initializeGL()
{
	static const GLfloat vertices[] =
	{
		-1.0f, -1.0f,
		 1.0f, -1.0f,
		 1.0f,  1.0f,

		 1.0f,  1.0f,
		-1.0f,  1.0f,
		-1.0f, -1.0f
	};

	m_timer.start();

	m_vao.create();
	m_vao.bind();

	m_vbo.create();
	m_vbo.bind();
	m_vbo.allocate(vertices, 6 * 2 * sizeof(GLfloat));
	m_vbo.release();

	m_vao.release();

	m_shader.addShaderFromSourceFile(QOpenGLShader::Vertex, "shader.vert");
	m_shader.addShaderFromSourceFile(QOpenGLShader::Fragment, "shader.frag");
	m_shader.link();
}

void Window::resizeGL(int w, int h)
{
	glViewport(0, 0, w, h);
}

void Window::paintGL()
{
	m_shader.bind();
	m_vao.bind();
	m_vbo.bind();

	m_shader.setAttributeBuffer("vertex", GL_FLOAT, 0, 2);
	m_shader.enableAttributeArray("vertex");

	m_shader.setUniformValue("iResolution", size());
	m_shader.setUniformValue("iGlobalTime", m_timer.elapsed() / 1000.0f);

	glDrawArrays(GL_TRIANGLES, 0, 6);

	m_shader.disableAttributeArray("vertex");

	m_vbo.release();
	m_vao.release();
	m_shader.release();

	update();
}
