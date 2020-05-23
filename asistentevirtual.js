window.onload = function(){
    if(annyang){
        var voices;

        var utter = new SpeechSynthesisUtterance();
        utter.rate = 1;
        utter.pitch = 0.5;
        utter.lang = 'es-GT';

        //utilizamos las voces de windows
         window.speechSynthesis.onvoiceschanged = function (){
            voices = window.speechSynthesis.getVoices();
            console.log(voices);
        };

        //Definimos los comandos a utilizar.
        var commands = {
            'Hola Ersa': function () {
                utter.text = 'Hola a Todos';
                //Setea la voz que queremos usar en base a nuestra lista.
                utter.voice = voices[0];
                window.speechSynthesis.speak(utter);
            },
            'Como estas': function () {
                utter.text = 'Excelente';
                utter.voice = voices[0];
                window.speechSynthesis.speak(utter);
            },
            'Hola': function () {
                utter.text = 'Hola, cual es tu nombre?';
                utter.voice = voices[0];
                window.speechSynthesis.speak(utter);
                //Guarda el nombre que le decimos por voz.
                annyang.addCallback('result', function (phrases) {
                    //Imprime el nombre por consola.
                    console.log("Nombre: ", phrases[0]);
                    //Para el evento result.
                    annyang.removeCallback('result');
                    //Nos dice hola + el nombre que le digamos por voz.
                    utter.text = 'Hola, ' + phrases[0];
                    window.speechSynthesis.speak(utter);
                });
            },
            //Array que devuelve aleatoriamente un elemento del array, en este caso un chiste.
            'cuentame un chiste': function () {
                chistes = ['Por qué las focas del circo miran siempre hacia arriba?   Porque es donde están los focos.',
                    'Estas obsesionado con la comida!   No se a que te refieres croquetamente.',
                    'Por que estás hablando con esas zapatillas?   Porque pone "converse"',
                    'Buenos dias, me gustaria alquilar "Batman Forever".   No es posible, tiene que devolverla tomorrow.'
                ];
                utter.text = chistes[Math.floor(Math.random() * chistes.length)]
                utter.voice = voices[0];
                window.speechSynthesis.speak(utter);
            },
    
            'quiero buscar *valor': function(valor){
                window.open('https://www.google.com/search?sxsrf=ALeKk00joHDFFwin70L2y_UQRLB63REXpQ%3A1589984152130&source=hp&ei=mDvFXri2BYWw_Qago6iwDQ&q='+valor)
            }
        };





        //Sumamos todos los comandos a annyang.
        annyang.addCommands(commands);

        //Annyang comienza a escuchar.
        annyang.start({ autoRestart: false, continuous: true });

    }
}