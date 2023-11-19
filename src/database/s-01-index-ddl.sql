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

-- Crear una función que verifica la existencia del correo en la tabla empleado
CREATE OR REPLACE FUNCTION verificar_email_existente()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar si el correo ya existe en la tabla empleado
    IF EXISTS (SELECT 1 FROM empleado WHERE email = NEW.email) THEN
        -- Si existe, lanzar un error y abortar la operación
        RAISE EXCEPTION 'El correo ya existe en la tabla empleado';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger que se dispara antes del INSERT o UPDATE en la tabla cliente
CREATE TRIGGER before_insert_update_cliente
BEFORE INSERT OR UPDATE
ON cliente
FOR EACH ROW
EXECUTE FUNCTION verificar_email_existente();


-- Crear una función que verifica la existencia del correo en la tabla cliente
CREATE OR REPLACE FUNCTION verificar_email_en_cliente()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar si el correo ya existe en la tabla cliente
    IF EXISTS (SELECT 1 FROM cliente WHERE email = NEW.email) THEN
        -- Si existe, lanzar un error y abortar la operación
        RAISE EXCEPTION 'El correo ya existe en la tabla cliente';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger que se dispara antes del INSERT o UPDATE en la tabla empleado
CREATE TRIGGER before_insert_update_empleado
BEFORE INSERT OR UPDATE
ON empleado
FOR EACH ROW
EXECUTE FUNCTION verificar_email_en_cliente();

