$(document).ready(function () {
    let tabla_curso = $('#tabla_curso');
    let input_id_curso = $('#id_curso');
    let hst_curso = '';
    $("#btn_guardar_cur").on("click", function (event) {
        event.preventDefault();
        if ($("#nombre_curso").val() == "") {
            alertify.alert("<h5>Debe ingresar el nombre en el curso.</h5>", function () {
                $("#nombre_curso").focus();
            });
        } else {
            if ($('#btn_guardar_cur').text() == 'Guardar') {
                guardar_cursos();
            } else {
                if ($('#btn_guardar_cur').text() == 'Actualizar') {
                    editar_cursos();
                }
            }
            $("#nombre_curso").val('')

        }
    });

    iniciar_modulo();

    function iniciar_modulo() {
        listar_cursos();
    }

    function template_tabla_curso(datos) {
        template = '';
        datos.forEach(element => {
            template += `<tr id="${element['id_curso']}">`;
            for (const key in element) {
                template += `<td>${element[key]}</td>`;
            }
            template += `<td><button type="button" id="${element['id_curso']}" class="edita_cur btn btn-link">Editar</button><button type="button" id="${element['id_curso']}" class="elimina_cur btn btn-link">Eliminar</button></td>`;
            template += `</tr> `;
        });
        return template;
    }


    function guardar_cursos() {
        let form_cur = $("#frm_cursos").serialize();
        return $.ajax({
            url: "../controller/curso_controller.php",
            type: "POST",
            data: `accion=guardar_curso&${form_cur}`,
            success: function (respuesta) {
                if (respuesta == 1) {
                    listar_cursos();
                    alertify.success('Creado');
                } else {
                    alertify.error('Fallo');
                }
            },
            error: function (e) {
                alertify.error('Error');
            }
        });
    }

    function editar_cursos() {
        let form_cur = $("#frm_cursos").serialize();
        let curso_id_inp = input_id_curso.val();
        console.log(curso_id_inp)
        return $.ajax({
            url: "../controller/curso_controller.php",
            type: "POST",
            data: `accion=editar_curso&${form_cur}&id_curso=${curso_id_inp}`,
            success: function (respuesta) {
                if (respuesta == 1) {
                    listar_cursos();
                    alertify.success('Actualizado');
                    $('#btn_guardar_cur').text('Guardar');
                    $('#nombre_curso').val('');
                } else {
                    alertify.error('No Actualizado');
                }
            },
            error: function (e) {
                alertify.error('Fallo');
            }
        });
    }

    function listar_cursos() {
        return $.ajax({
            url: "../controller/curso_controller.php",
            type: "POST",
            data: `accion=listar_curso`,
            success: function (respuesta) {
                if (respuesta != 'null') {
                    let datos = JSON.parse(respuesta);
                    hst_curso = datos;
                    tabla_curso.html(template_tabla_curso(datos));
                } else {
                    tabla_curso.html('<tr><td colspan="3"> No hay datos para mostrar</td></tr>');
                }
            },
            error: function (e) {
                alertify.error('Fallo');
            }
        });
    }

    function eliminar_cursos(curso_id) {
        return $.ajax({
            url: "../controller/curso_controller.php",
            type: "POST",
            data: `accion=eliminar_curso&id_curso=${curso_id}`,
            success: function (respuesta) {
                if (respuesta == 1) {
                    listar_cursos();
                    alertify.success('Eliminado');
                } else {
                    alertify.error('Fallo');
                }
            },
            error: function (e) {
                alertify.error('Fallo total');
            }
        });
    }

    function llenar_campos(id_curso) {
        input_id_curso.val(id_curso);
        hst_curso.forEach(element => {
            if (id_curso == element['id_curso']) {
                for (const key in element) {
                    $('#nombre_curso').val(element['nombre']);
                }
                if ($('#btn_guardar_cur').text() == 'Guardar') {
                    $('#btn_guardar_cur').text('Actualizar');
                }
            }
        });
    }

    $(document).on('click', '.edita_cur', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        llenar_campos(element.id);
    });
    $(document).on('click', '.elimina_cur', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        eliminar_cursos(element.id)
    });
});