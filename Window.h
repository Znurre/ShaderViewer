#ifndef WINDOW_H
#define WINDOW_H

#include <QElapsedTimer>
#include <QOpenGLBuffer>
#include <QOpenGLShaderProgram>
#include <QOpenGLVertexArrayObject>
#include <QOpenGLWindow>

class Window : public QOpenGLWindow
{
	public:
		Window();

	protected:
		void initializeGL() override;
		void resizeGL(int w, int h) override;
		void paintGL() override;

	private:
		QOpenGLShaderProgram m_shader;
		QOpenGLVertexArrayObject m_vao;
		QOpenGLBuffer m_vbo;
		QElapsedTimer m_timer;
};

#endif // WINDOW_H
