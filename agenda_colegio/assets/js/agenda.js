$(document).ready(function () {
    let form = new Object()
    form.salon = ''
    form.curso = ''
    form.profesor = ''
    form.fecha = ''
    form.alumno = ''
    let input_id_agenda = $('#id_agenda');
    let tabla_agenda = $('#tabla_agenda');
    let hst_agenda = '';
    $("#btn_guardar_agenda").on("click", function (event) {
        event.preventDefault();
        if ($("#salon").val() == null) {
            alertify.alert("<h5>Debe seleccionar un salon.</h5>", function () {
                $("#salon").focus();
            });
        } else if ($("#curso").val() == null) {
            alertify.alert("<h5>Debe seleccionar un curso.</h5>", function () {
                $("#curso").focus();
            });
        } else if ($("#profesor").val() == null) {
            alertify.alert("<h5>Debe seleccionar un profesor.</h5>", function () {
                $("#profesor").focus();
            });
        } else if ($("#fecha_agenda").val() == '') {
            alertify.alert("<h5>Debe seleccionar la fecha de asiganacion.</h5>", function () {
                $("#fecha_agenda").focus();
            });
        // } else if ($("#alumno").val() == null) {
        //     alertify.alert("<h5>Debe seleccionar un alumno.</h5>", function () {
        //         $("#alumno").focus();
        //     });
        } else {
            sw_accion = 0;
            if (hst_agenda!='') {
                hst_agenda.forEach(element => {
                    if (element.fecha == $('#fecha_agenda').val()) {
                        sw_accion = 1;
                    }
                });   
            }
            if (sw_accion == 0) {
                form.salon = $("#salon").val()
                form.curso = $("#curso").val()
                form.profesor = $("#profesor").val()
                form.fecha = $("#fecha_agenda").val()
                form.alumno = $("#alumno").val()
                form_agenda = '';
                for (const key in form) {
                    form_agenda += `&${key}=${form[key]}`;
                }
                if ($('#btn_guardar_agenda').text() == 'Guardar') {
                    guardar_agenda(form_agenda);
                } else {
                    if ($('#btn_guardar_agenda').text() == 'Actualizar') {
                        // editar_cursos();
                    }
                }
                $("#salon").val('Elegir Salon')
                $("#curso").val('Elegir Curso')
                $("#profesor").val('Elegir Profesor')
                $("#fecha_agenda").val('')
                $("#alumno").val('Elegir Alumno')
            } else {
                alertify.alert("<h5>Debe seleccionar una fecha distinda de asignacion.</h5>", function () {
                    $("#fecha_agenda").focus();
                });
            }
        }
    });
    inicializar_modulo();

    function inicializar_modulo() {
        listar_combos();
        listar_agenda();
    }

    function listar_combos() {
        return $.ajax({
            url: "../controller/agenda_controller.php",
            type: "POST",
            data: `accion=listar_combos`,
            success: function (respuesta) {
                if (respuesta != 'null') {
                    let datos = JSON.parse(respuesta);
                    acum = 0;
                    for (const key in datos) {

                        if (key == 'salon') {

                            if (datos[key][0] != null) {
                                template = ''
                                template += `<option selected disabled>Elegir Salon</option>`
                                datos[key].forEach(element1 => {
                                    element1.forEach(element => {
                                        template += `<option value="${element.id_salon}">${element.descripcion} - ${element.edificio}</option>`
                                    });
                                });
                                $("#salon").html(template)
                            } else {
                                acum = acum + 1;
                            }
                        } else if (key == 'curso') {
                            if (datos[key][0] != null) {
                                template = ''
                                template += `<option selected disabled>Elegir Curso</option>`
                                datos[key].forEach(element1 => {
                                    element1.forEach(element => {
                                        template += `<option value="${element.id_curso}">${element.nombre}</option>`
                                    });
                                });
                                $("#curso").html(template)
                            } else {
                                acum = acum + 1;
                            }
                        } else if (key == 'profesor') {
                            if (datos[key][0] != null) {
                                template = ''
                                template += `<option selected disabled>Elegir Profesor</option>`
                                datos[key].forEach(element1 => {
                                    element1.forEach(element => {
                                        template += `<option value="${element.id_profesor}">${element.nombre}</option>`
                                    });
                                });
                                $("#profesor").html(template)
                            } else {
                                acum = acum + 1;
                            }
                        } else if (key == 'alumno') {
                            if (datos[key][0] != null) {
                                template = ''
                                template += `<option selected disabled>Elegir Alumno</option>`
                                datos[key].forEach(element1 => {
                                    element1.forEach(element => {
                                        template += `<option value="${element.id_alumno}">${element.nombre}</option>`
                                    });
                                });
                                $("#alumno").html(template)
                            } else {
                                acum = acum + 1;
                            }
                        }
                    }
                    if (acum != 0) {
                        disparar_alerta()
                    }
                } else {
                    disparar_alerta()
                }
            },
            error: function (e) {
                alertify.error('Fallo');
            }
        });
    }

    function disparar_alerta() {
        $('#alert').html(`
                        <div class="alert alert-danger" role="alert">
                            No hay suficientes Items parametrizados - (Salones, Cursos, Profesores o Alumnos)
                        </div>
                    `)
        $('#btn_guardar_agenda').attr('disabled', '')
    }

    function guardar_agenda(form_agenda) {
        return $.ajax({
            url: "../controller/agenda_controller.php",
            type: "POST",
            data: `accion=guardar_agenda${form_agenda}`,
            success: function (respuesta) {
                if (respuesta == 1) {
                    listar_agenda();
                    alertify.success('Creado');
                } else {
                    alertify.error('Fallo');
                }
            },
            error: function (e) {
                alertify.error('Fallo');
            }
        });
    }

    function listar_agenda() {
        return $.ajax({
            url: "../controller/agenda_controller.php",
            type: "POST",
            data: `accion=listar_agenda`,
            success: function (respuesta) {
                if (respuesta != 'null') {
                    let datos = JSON.parse(respuesta);
                    hst_agenda = datos;
                    tabla_agenda.html(template_tabla_agenda(datos));
                } else {
                    tabla_agenda.html('<tr><td colspan="4"> No hay datos para mostrar</td></tr>');
                }
            },
            error: function (e) {
                alertify.error('Fallo');
            }
        });
    }
    function eliminar_agenda(agenda_id) {
        return $.ajax({
            url: "../controller/agenda_controller.php",
            type: "POST",
            data: `accion=eliminar_agenda&id_agenda=${agenda_id}`,
            success: function (respuesta) {
                if (respuesta == 1) {
                    listar_agenda();
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
    function convertDateFormat(string) {
        var info = string.split('/').reverse().join('-');
        return info;
   }

    function template_tabla_agenda(datos) {
        template = '';
        datos.forEach(element => {
            fecha_actual = new Date()
            fecha_actual = fecha_actual.toLocaleDateString()
            fecha_actual = convertDateFormat(fecha_actual)
            if (element['fecha'] <= fecha_actual) {
                color = `style="background-color:#98fb98"`;
            }else{
                color = `style="background-color:#ff6347"`;
            }
            template += `<tr id="${element['id_agenda']}" ${color}>`;
            for (const key in element) {
                if (element['id_agenda'] != element[key]) {
                    template += `<td><div class="font-weight-bold">${element[key]}</div></td>`;
                }
            }
            template += `<td><button type="button" id="${element['id_agenda']}" class="elimina_agenda btn btn-primary">Eliminar</button></td>`;
            template += `</tr> `;
        });
        return template;
    }
    // function llenar_campos(id_agenda) {
    //     input_id_agenda.val(id_agenda);
    //     hst_agenda.forEach(element => {
    //         console.log(element['agenda'])
    //         if (id_agenda == element['id_agenda']) {
    //             $(`#curso > option[value="${element['curso']}"]`).attr('selected', 'selected');
    //             if ($('#btn_guardar_agenda').text() == 'Guardar') {
    //                 $('#btn_guardar_agenda').text('Actualizar');
    //             }
    //         }
    //     });
    // }
    // $(document).on('click', '.edita_agenda', (e) => {
    //     const element = $(this)[0].activeElement.parentElement.parentElement;
    //     llenar_campos(element.id);
    // });
    $(document).on('click', '.elimina_agenda', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        eliminar_agenda(element.id)
    });
});