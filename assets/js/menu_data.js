var menu_data = [
    {
        nombre: 'Módulo 1. Generalidades', carpeta: '1_tema_generalidades', tipo: 'subtemas', subtemas: [
            {nombre: 'Propósito', carpeta: '1_proposito', tipo: 'video', icon: 1, cc: true},
            {nombre: 'Valores', carpeta: '2_valores', tipo: 'html', icon: 2, autocomplete: true},
            {nombre: 'Política de sustentabilidad', carpeta: '3_politica', tipo: 'video', icon: 1, cc: true},
            {nombre: 'Sistemas de Gestión', carpeta: '4_sistemas', tipo: 'video', icon: 1, cc: true}
        ]
    },
    {
        nombre: 'Módulo 2. Seguridad y salud en el trabajo', carpeta: '2_tema_salud_y_seguridad', tipo: 'subtemas', subtemas: [
            {nombre: 'Peligros, riesgos y controles', carpeta: '1_peligros', tipo: 'video', icon: 1, cc: true},
            {nombre: '¿Qué es un acto y una condición subestándar?', carpeta: '2_acto', tipo: 'video', icon: 1, cc: true},
            {nombre: 'Jerarquía de los controles', carpeta: '3_1_introduccion', tipo: 'html', icon: 2, autocomplete: true},
            {nombre: 'Aplicación de los controles', carpeta: '3_2_aplicacion', tipo: 'video', icon: 1, cc: true},
            {nombre: 'Incidente y enfermedad laboral', carpeta: '4_incidente', tipo: 'video', icon: 1, cc: true},
            {
                nombre: 'Riesgo Químico', carpeta: '4_1_riesgo', tipo: 'submodulos', submodulos: [
                    {nombre: '¿Qué es el riesgo químico?', carpeta: '1_quees', tipo: 'video', icon: 1, cc: true},
                    {nombre: 'Almacenamiento y manejo de productos químicos', carpeta: '2_almacenamiento', tipo: 'video', icon: 1, cc: true},
                    {nombre: 'Sistemas de clasificación de sustancias químicas', carpeta: '3_sistemas', tipo: 'video', icon: 1, cc: true},
                    {nombre: 'Ficha de datos de seguridad', carpeta: '4_ficha', tipo: 'video', icon: 1, cc: true},
                    {nombre: 'Etiquetas de productos químicos', carpeta: '5_etiquetas', tipo: 'video', icon: 1, cc: false},
                    {nombre: 'Productos químicos de mayor uso', carpeta: '6_productos', tipo: 'html', icon: 2, autocomplete: false}
                ]
            },
            {
                nombre: 'Reglas y permisos de trabajo', carpeta: '5_1_reglas', tipo: 'submodulos', submodulos: [
                    //{nombre:'Reglas para salvar vidas, Reglas generales y Reglas específicas por área',carpeta:'1_0_especificas',tipo:'video',icon:1,cc:true},
                    {nombre: 'Reglas para salvar vidas', carpeta: '1_1_salvar', tipo: 'video', icon: 1, cc: false},
                    {nombre: 'Reglas generales de control de pérdidas', carpeta: '1_2_generales', tipo: 'html', icon: 2, autocomplete: true},
                    //{nombre:'Reglas específicas de control de pérdidas en Plantas de Producción',carpeta:'1_3_plantas',tipo:'video',icon:1,cc:true},
                    //{nombre:'Reglas específicas de control de pérdidas en Laboratorios',carpeta:'1_4_laboratorios',tipo:'video',icon:1,cc:true},
                    {nombre: 'Reglas específicas de control de pérdidas en Talleres de Mantenimiento', carpeta: '1_5_talleres', tipo: 'html', icon: 2, autocomplete: true},
                    {nombre: 'Reglas específicas de control de pérdidas en Bodegas', carpeta: '1_6_bodegas', tipo: 'html', icon: 2, autocomplete: true},
                    {nombre: 'Sistema de permiso de trabajo', carpeta: '2_sistema', tipo: 'video', icon: 1, cc: true},
                    {nombre: 'Roles, funciones y responsabilidades', carpeta: '3_roles', tipo: 'html', icon: 2, autocomplete: true}
                    //{nombre:'Gestión de Permisos de trabajo seguro',carpeta:'4_gestion',tipo:'html',icon:2,autocomplete:false}
                ]
            }
            /*{nombre:'Elementos de protección personal',carpeta:'6_1_elementos',tipo:'submodulos',submodulos:[
                {nombre:'EPPs: la “última línea de defensa”',carpeta:'6_0_epp',tipo:'video',icon:1,cc:true},
                {nombre:'Elementos de Protección Personal básicos',carpeta:'6_1_basicos',tipo:'video',icon:1,cc:false},
                {nombre:'Elementos de Protección personal para emergencia',carpeta:'6_2_emergencia',tipo:'html',icon:2,autocomplete:true},
                {nombre:'Elementos de Protección personal de bioseguridad',carpeta:'6_3_bioseguridad',tipo:'video',icon:1,cc:true},
            ]},
            {nombre:'Gestión de Emergencias',carpeta:'7_1_gestion',tipo:'submodulos',submodulos:[
                {nombre:'Identificación y valoración de amenazas',carpeta:'7_0_identificacion',tipo:'video',icon:1,cc:true},
                {nombre:'Activación del plan de emergencias',carpeta:'7_1_activacion',tipo:'video',icon:1,cc:false},
                {nombre:'Roles en una emergencia',carpeta:'7_2_roles',tipo:'html',icon:2,autocomplete:true},
                {nombre:'Brigadas de Emergencia',carpeta:'7_3_brigadas',tipo:'video',icon:1,cc:true},
     {nombre:'Clasificación de Emergencias',carpeta:'7_4_clasificacion',tipo:'html',icon:2,autocomplete:true},
                {nombre:'Salud ocupacional',carpeta:'7_5_salud',tipo:'video',icon:1,cc:true}
            ]}*/
        ]
    }
]

var documentos_data = [
    //{nombre:'Formato Plan de Entrenamiento',url:'formato.xlsx',icon:'excel'},
    //{nombre:'Modelo de Competencias',url:'modelo.pptx',icon:'ppt'}
]

//{nombre:'Doc 1',url:'doc1.pdf',icon:'pdf'},
//{nombre:'Doc 2',url:'doc1.pdf',icon:'word'},
//{nombre:'Doc 3',url:'doc1.pdf',icon:'excel'}
//normal => bloquea solo la linea de tiempo
//full => bloquea todo
//no => no bloquea ni la linea de tiempo ni el menú
var restrict = 'no'
/*format:'mp4',cc:true*/