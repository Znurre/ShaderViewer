CONFIG += c++11

SOURCES += \
    main.cpp \
    Window.cpp

HEADERS += \
    Window.h

DISTFILES += \
    shader.frag \
    shader.vert

LIBS += -lGL
