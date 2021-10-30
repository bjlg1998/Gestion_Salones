$(document).ready(function() {
    let tabla_prof = $('#tabla_prof');
    let input_id_profesor = $('#id_prof');
    let hst_profesor = '';
    $( "#btn_guardar_prof" ).on("click",function(event) {
        event.preventDefault();
        if ($("#nombre_profesor").val() == ""){
            alertify.alert("<h5>Debe ingresar el nombre del profesor.</h5>", function(){
                $("#nombre_profesor").focus();
            });
        }else if ($("#especialidad").val() == ""){
            alertify.alert("<h5>Debe ingresar la descripcion en el profesor.</h5>", function(){
                $("#especialidad").focus();
            });
        }else{
            if ($('#btn_guardar_prof').text() == 'Guardar') {
                guardar_profesores();
            }else{
                if ($('#btn_guardar_prof').text() == 'Actualizar') {
                    editar_profesores();
                }
            }
            $("#nombre_profesor").val('')
            $("#especialidad").val('')
        }
    });

    iniciar_modulo();

    function iniciar_modulo() {
        listar_profesores();
    }
    
    function template_tabla_profesor(datos) {
        template = '';
        datos.forEach(element => {
            template += `<tr id="${element['id_profesor']}">`;
            for (const key in element) {
                template += `<td>${element[key]}</td>`;
            }
            template += `<td><button type="button" id="${element['id_profesor']}" class="edita_prof btn btn-link">Editar</button><button type="button" id="${element['id_profesor']}" class="elimina_prof btn btn-link">Eliminar</button></td>`;
            template += `</tr> `; 
        });
        return template;
    }


    function guardar_profesores() {
        let form_cur = $("#frm_profesores").serialize();
        return $.ajax({
            url:"../controller/profesor_controller.php",
            type: "POST",
            data: `accion=guardar_profesor&${form_cur}`,
            success:function(respuesta){
                if (respuesta == 1){
                    listar_profesores();
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
    function editar_profesores() {
        let form_cur = $("#frm_profesores").serialize();
        let profesor_id_inp = input_id_profesor.val();
        console.log(profesor_id_inp)
        return $.ajax({
            url:"../controller/profesor_controller.php",
            type: "POST",
            data: `accion=editar_profesor&${form_cur}&id_profesor=${profesor_id_inp}`,
            success:function(respuesta){
                if (respuesta == 1){
                    listar_profesores();
                    alertify.success('Actualizado');
                    $('#btn_guardar_prof').text('Guardar');
                    $('#nombre_profesor').val('');
                    $('#especialidad').val('');
                }else{
                    alertify.error('No Actualizado');
                }
            },
            error: function(e) {
            alertify.error('Fallo');
            }
            });
    }
    function listar_profesores() {
        return $.ajax({
            url:"../controller/profesor_controller.php",
            type: "POST",
            data: `accion=listar_profesor`,
            success:function(respuesta){
                if (respuesta!='null') {
                    let datos = JSON.parse(respuesta);
                    hst_profesor = datos; 
                    tabla_prof.html(template_tabla_profesor(datos));   
                }else{
                    tabla_prof.html('<tr><td colspan="3"> No hay datos para mostrar</td></tr>');
                }
            },
            error: function(e) {
            alertify.error('Fallo');
            }
            });
    }
    function eliminar_profesores(profesor_id) {
        return $.ajax({
            url:"../controller/profesor_controller.php",
            type: "POST",
            data: `accion=eliminar_profesor&id_profesor=${profesor_id}`,
            success:function(respuesta){
                if (respuesta == 1){
                    listar_profesores();
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
    function llenar_campos(id_profesor) {
        input_id_profesor.val(id_profesor);
        console.log(input_id_profesor.val())
        hst_profesor.forEach(element => {
            if (id_profesor == element['id_profesor']) {
                for (const key in element) {
                    $('#nombre_profesor').val(element['nombre']);
                    $('#especialidad').val(element['especialidad']);
                }
                if ($('#btn_guardar_prof').text() == 'Guardar') {
                    $('#btn_guardar_prof').text('Actualizar');
                }
            }
        });
    }

    $(document).on('click','.edita_prof', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        llenar_campos(element.id);
    });
    $(document).on('click','.elimina_prof', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        eliminar_profesores(element.id)
    });
});