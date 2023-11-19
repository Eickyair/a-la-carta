-- ORDEN_DETALLE

-- Buscar todos los artículos de una orden

create index
    orden_detalle_orden_general_id_ix on orden_detalle(orden_general_id);

-- CLIENTE

-- Inicio rápido de sesión

create index cliente_email_ix on cliente(email);

-- EMPLEADO

-- Inicio rápido de sesión

create index empleado_email_ix on empleado(email);