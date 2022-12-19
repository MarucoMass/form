document.addEventListener('DOMContentLoaded', () => {

    const email = {
        email: '',
        asunto:'',
        mensaje:''
    }


    // variables
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputCc = document.querySelector('#Cc');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // eventos
    inputEmail.addEventListener('input', validar);
    inputCc.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', (e) => {
        e.preventDefault();

        resetFormulario();
    })
// ////////////////////////////
    // funciones
    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return
        } 

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarError(`El email no es válido`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if (e.target.id === 'destExtra' && !validarEmail(e.target.value)) {
            mostrarError(`El email no es válido`, e.target.parentElement);
            email[e.target.name] = '';
            return;
        }

        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();
    }

// ////////////////////////////

    function mostrarError(mensaje, referencia) {

        limpiarAlerta(referencia)
      
        const error = document.createElement('P');
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        referencia.appendChild(error);
    }

// ////////////////////////////

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

// ////////////////////////////

    function comprobarEmail(){
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        };
    }

    // ////////////////////////////

    function resetFormulario(){
           // reiniciar el objeto
           email.email = '';
           email.asunto = '';
           email.mensaje = '';
   
           comprobarEmail();
           formulario.reset();
    }
    // ////////////////////////////

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.add('hidden')

            resetFormulario();

            const mensajeExito = document.createElement('P');
            mensajeExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
                                        'font-bold', 'text-sm', 'uppercase');
            mensajeExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(mensajeExito);
    
            setTimeout(() => {
                mensajeExito.remove();
            }, 2000);

        }, 3000);


    }

});