document.addEventListener('DOMContentLoaded', function() {
    // Datos de la malla curricular actualizados
    const curriculumData = [
        {
            semester: 1,
            courses: [
                { name: "Geometría analítica", opens: [], status: "pending" },
                { name: "Algebra I", opens: ["Estructuras discretas", "Algebra lineal"], status: "pending" },
                { name: "Calculo I", opens: ["Calculo II"], status: "pending" },
                { name: "Computación I", opens: ["Computación II"], status: "pending" },
                { name: "Ingles I", opens: ["Ingles II"], status: "pending" }
            ]
        },
        {
            semester: 2,
            courses: [
                { name: "Estructuras discretas", opens: ["Teoría axiomática"], status: "pending" },
                { name: "Algebra lineal", opens: ["Geometría I", "Algebra lineal avanzada"], status: "pending" },
                { name: "Calculo II", opens: ["Análisis I"], status: "pending" },
                { name: "Computación II", opens: [], status: "pending" },
                { name: "Ingles II", opens: [], status: "pending" }
            ]
        },
        {
            semester: 3,
            courses: [
                { name: "Teoría axiomática", opens: ["Algebra abstracta I"], status: "pending" },
                { name: "Geometría I", opens: ["Geometría II"], status: "pending" },
                { name: "Análisis I", opens: ["Análisis II", "Análisis numérico I"], status: "pending" },
                { name: "Probabilidad y estadística I", opens: ["Probabilidad y estadística II"], status: "pending" },
                { name: "Física I", opens: ["Física II"], status: "pending" }
            ]
        },
        {
            semester: 4,
            courses: [
                { name: "Geometría II", opens: ["Geometría III"], status: "pending" },
                { name: "Algebra lineal avanzada", opens: [], status: "pending" },
                { name: "Análisis II", opens: ["Análisis III"], status: "pending" },
                { name: "Probabilidad y estadística II", opens: [], status: "pending" },
                { name: "Física II", opens: [], status: "pending" }
            ]
        },
        {
            semester: 5,
            courses: [
                { name: "Algebra abstracta I", opens: ["Algebra abstracta II"], status: "pending" },
                { name: "Geometría III", opens: ["Geometría IV", "Teoría algebraica", "Teoría medida", "Análisis funcional"], status: "pending" },
                { name: "Análisis III", opens: ["Análisis IV"], status: "pending" }, // Actualizado
                { name: "Análisis numérico I", opens: ["Análisis numérico II"], status: "pending" }
            ]
        },
        {
            semester: 6,
            courses: [
                { name: "Algebra abstracta II", opens: ["Algebra abstracta III"], status: "pending" },
                { name: "Geometría IV", opens: [], status: "pending" },
                { name: "Análisis IV", opens: [], status: "pending" },
                { name: "Análisis numérico II", opens: [], status: "pending" }
            ]
        },
        {
            semester: 7,
            courses: [
                { name: "Algebra abstracta III", opens: [], status: "pending" },
                { name: "Análisis funcional", opens: [], status: "pending" },
                { name: "Electiva", opens: [], status: "pending" },
                { name: "Electiva", opens: [], status: "pending" }
            ]
        },
        {
            semester: 8,
            courses: [
                { name: "Teoría algebraica", opens: [], status: "pending" },
                { name: "Teoría medida", opens: [], status: "pending" },
                { name: "Electiva", opens: [], status: "pending" }
            ]
        },
        {
            semester: 9,
            courses: [
                { name: "Seminario de grado", opens: [], status: "pending" },
                { name: "Electiva", opens: [], status: "pending" },
                { name: "Electiva", opens: [], status: "pending" }
            ]
        },
        {
            semester: 10,
            courses: [
                { name: "Trabajo de grado", opens: [], status: "pending" },
                { name: "Electiva", opens: [], status: "pending" }
            ]
        }
    ];

    const semestersContainer = document.getElementById('semesters');
    const resetBtn = document.getElementById('reset-btn');

    // Renderizar la malla curricular horizontal
    function renderCurriculum() {
        semestersContainer.innerHTML = '';
        
        curriculumData.forEach(semesterData => {
            const semesterElement = document.createElement('div');
            semesterElement.className = 'semester';
            
            const semesterTitle = document.createElement('h2');
            semesterTitle.className = 'semester-title';
            semesterTitle.textContent = `Semestre ${semesterData.semester}`;
            
            const coursesContainer = document.createElement('div');
            coursesContainer.className = 'courses-container';
            
            semesterData.courses.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.className = `course ${course.status}`;
                courseElement.dataset.name = course.name;
                
                if (course.opens.length > 0) {
                    courseElement.classList.add('has-requirements');
                }
                
                const courseName = document.createElement('div');
                courseName.className = 'course-name';
                courseName.textContent = course.name;
                
                const courseRequirements = document.createElement('div');
                courseRequirements.className = 'course-requirements';
                
                if (course.opens.length > 0) {
                    courseRequirements.textContent = `Abre: ${course.opens.join(', ')}`;
                } else {
                    courseRequirements.textContent = 'No abre materias';
                }
                
                courseElement.appendChild(courseName);
                courseElement.appendChild(courseRequirements);
                
                // Solo agregar evento click si no está bloqueada
                if (course.status !== 'locked') {
                    courseElement.addEventListener('click', () => toggleCourseStatus(courseElement));
                }
                
                coursesContainer.appendChild(courseElement);
            });
            
            semesterElement.appendChild(semesterTitle);
            semesterElement.appendChild(coursesContainer);
            semestersContainer.appendChild(semesterElement);
        });
        
        updateCourseAvailability();
    }

    // Cambiar el estado de un curso
    function toggleCourseStatus(courseElement) {
        const courseName = courseElement.dataset.name;
        
        // Encontrar el curso en los datos
        for (const semester of curriculumData) {
            const course = semester.courses.find(c => c.name === courseName);
            if (course) {
                if (course.status === 'pending' || course.status === 'available') {
                    course.status = 'approved';
                } else if (course.status === 'approved') {
                    course.status = 'pending';
                }
                break;
            }
        }
        
        renderCurriculum();
    }

    // Actualizar la disponibilidad de los cursos basado en los requisitos
    function updateCourseAvailability() {
        // Obtener todas las materias aprobadas
        const approvedCourses = [];
        curriculumData.forEach(semester => {
            semester.courses.forEach(course => {
                if (course.status === 'approved') {
                    approvedCourses.push(course.name);
                }
            });
        });
        
        // Actualizar el estado de disponibilidad
        curriculumData.forEach(semester => {
            semester.courses.forEach(course => {
                if (course.status !== 'approved') {
                    // Verificar si este curso abre otras materias que ya están aprobadas
                    const opensApproved = course.opens.some(openedCourse => 
                        approvedCourses.includes(openedCourse));
                    
                    if (opensApproved) {
                        // Si abre materias ya aprobadas, no puede ser pending
                        course.status = 'approved';
                    } else {
                        // Verificar requisitos para materias que abren este curso
                        let isLocked = false;
                        
                        // Buscar en todos los semestres anteriores
                        for (let i = 0; i < semester.semester - 1; i++) {
                            const prevSemester = curriculumData[i];
                            const requiredCourse = prevSemester.courses.find(c => 
                                c.opens.includes(course.name));
                            
                            if (requiredCourse && requiredCourse.status !== 'approved') {
                                isLocked = true;
                                break;
                            }
                        }
                        
                        if (isLocked) {
                            course.status = 'locked';
                        } else {
                            course.status = approvedCourses.length > 0 ? 'available' : 'pending';
                        }
                    }
                }
            });
        });
    }

    // Reiniciar todo
    resetBtn.addEventListener('click', () => {
        curriculumData.forEach(semester => {
            semester.courses.forEach(course => {
                course.status = 'pending';
            });
        });
        renderCurriculum();
    });

    // Renderizar inicialmente
    renderCurriculum();
});
