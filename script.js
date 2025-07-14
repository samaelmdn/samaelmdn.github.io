// script.js
document.querySelectorAll('.materia button').forEach(button => {
    button.addEventListener('click', () => {
        aprobarMateria(button);
    });
});

function aprobarMateria(button) {
    button.disabled = true;
    button.classList.add('aprobado');
    button.textContent += ' ✅';

    const materiaId = button.parentElement.getAttribute('data-id');
    desbloquearMaterias(materiaId);
}

function desbloquearMaterias(materiaAprobada) {
    document.querySelectorAll('.materia').forEach(materia => {
        const requisitos = materia.getAttribute('data-requisitos').split(',').filter(r => r);

        if (requisitos.includes(materiaAprobada)) {
            const todosAprobados = requisitos.every(req => {
                const btn = document.querySelector(`.materia[data-id="${req}"] button`);
                return btn && btn.classList.contains('aprobado');
            });

            if (todosAprobados) {
                const btn = materia.querySelector('button');
                if (btn.disabled) {
                    btn.disabled = false;
                }
            }
        }
    });
}
