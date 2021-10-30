$(document).ready(function() {
    let tabla_salon = $('#tabla_salon');
    let input_id_salon = $('#id_salon');
    let hst_salon = '';
    $( "#btn_guardar_sln" ).on("click",function(event) {
        event.preventDefault();
        if ($("#edificio_salon").val() == ""){
            alertify.alert("<h5>Debe ingresar el edificio en el salon.</h5>", function(){
                $("#edificio_salon").focus();
            });
        }else if ($("#descripcion_salon").val() == ""){
            alertify.alert("<h5>Debe ingresar la descripcion en el salon.</h5>", function(){
                $("#descripcion_salon").focus();
            });
        }
        else if ($("#fecha_salon").val() == ""){
            alertify.alert("<h5>Debe ingresar la fecha de registro.</h5>", function(){
                $("#fecha_salon").focus();
            });
        }else{
            if ($('#btn_guardar_sln').text() == 'Guardar') {
                guardar_salones();
            }else{
                if ($('#btn_guardar_sln').text() == 'Actualizar') {
                    editar_salones();
                }
            }
            
        }
    });

    iniciar_modulo();

    function iniciar_modulo() {
        listar_salones();
    }
    
    function template_tabla_salon(datos) {
        template = '';
        datos.forEach(element => {
            template += `<tr id="${element['id_salon']}">`;
            for (const key in element) {
                template += `<td>${element[key]}</td>`;
            }
            template += `<td><button type="button" id="${element['id_salon']}" class="edita_sln btn btn-link">Editar</button><button type="button" id="${element['id_salon']}" class="elimina_sln btn btn-link">Eliminar</button></td>`;
            template += `</tr> `; 
        });
        return template;
    }


    function guardar_salones() {
        let form_sln = $("#frm_salones").serialize();
        return $.ajax({
            url:"../controller/salon_controller.php",
            type: "POST",
            data: `accion=guardar_salon&${form_sln}`,
            success:function(respuesta){
                if (respuesta == 1){
                    listar_salones();
                    alertify.success('Creado');
                }else{
                    alertify.error('Fallo');
                }
            },
            error: function(e) {
            alertify.error('Error');
            }
            });
    }
    function editar_salones() {
        let form_sln = $("#frm_salones").serialize();
        let salon_id_inp = input_id_salon.val();
        return $.ajax({
            url:"../controller/salon_controller.php",
            type: "POST",
            data: `accion=editar_salon&${form_sln}&id_salon=${salon_id_inp}`,
            success:function(respuesta){
                if (respuesta == 1){
                    listar_salones();
                    alertify.success('Actualizado');
                    $('#btn_guardar_sln').text('Guardar');
                    $('#edificio_salon').val();
                    $('#descripcion_salon').val('');
                    $('#fecha_salon').val('');
                }else{
                    alertify.error('No Actualizado');
                }
            },
            error: function(e) {
            alertify.error('Fallo');
            }
            });
    }
    function listar_salones() {
        return $.ajax({
            url:"../controller/salon_controller.php",
            type: "POST",
            data: `accion=listar_salon`,
            success:function(respuesta){
                if (respuesta!='null') {
                    let datos = JSON.parse(respuesta);
                    hst_salon = datos; 
                    tabla_salon.html(template_tabla_salon(datos));   
                }else
                    tabla_salon.html('<tr><td colspan="4"> No hay datos para mostrar</td></tr>');
            },
            error: function(e) {
            alertify.error('Fallo');
            }
            });
    }
    function eliminar_salones(salon_id) {
        return $.ajax({
            url:"../controller/salon_controller.php",
            type: "POST",
            data: `accion=eliminar_salon&id_salon=${salon_id}`,
            success:function(respuesta){
                if (respuesta == 1){
                    listar_salones();
                    alertify.success('Eliminado');
                }else{
                    alertify.error('Fallo');
                }
            },
            error: function(e) {
            alertify.error('Fallo total');
            }
            });
    }
    function llenar_campos(id_salon) {
        input_id_salon.val(id_salon);
        hst_salon.forEach(element => {
            if (id_salon == element['id_salon']) {
                for (const key in element) {
                    $('#edificio_salon').val(element['edificio']);
                    $('#descripcion_salon').val(element['descripcion']);
                    $('#fecha_salon').val(element['fecha_registro']);
                }
                if ($('#btn_guardar_sln').text() == 'Guardar') {
                    $('#btn_guardar_sln').text('Actualizar');
                }
            }
        });
    }

    $(document).on('click','.edita_sln', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        llenar_campos(element.id);
    });
    $(document).on('click','.elimina_sln', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        eliminar_salones(element.id)
    });
});