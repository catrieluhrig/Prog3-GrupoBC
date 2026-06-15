Stored Procedure utilizado: 
BEGIN

    SELECT COUNT(*) AS total_turnos
    FROM turnos_reservas;

    SELECT
        SUM(atentido = 1) AS atendidos,
        SUM(atentido = 0) AS pendientes
    FROM turnos_reservas;

    SELECT
        e.nombre,
        COUNT(*) AS cantidad
    FROM turnos_reservas tr
    INNER JOIN medicos m
        ON m.id_medico = tr.id_medico
    INNER JOIN especialidades e
        ON e.id_especialidad = m.id_especialidad
    GROUP BY e.id_especialidad;

END
