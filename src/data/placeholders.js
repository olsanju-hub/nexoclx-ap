export const placeholderSources = [
  'ACC/AHA/ASE/CHEST/SAEM/SCCT/SCMR. 2021 Guideline for the Evaluation and Diagnosis of Chest Pain. Circulation. https://www.ahajournals.org/doi/10.1161/CIR.0000000000001029',
  'NICE. Recent-onset chest pain of suspected cardiac origin: assessment and diagnosis, CG95. https://www.nice.org.uk/guidance/cg95',
  'ESC. 2023 Guidelines for the management of acute coronary syndromes. https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/acute-coronary-syndromes/',
  'ACC/AHA/ACEP/NAEMSP/SCAI. 2025 Guideline for the Management of Patients With Acute Coronary Syndromes. https://professional.heart.org/en/science-news/2025-guideline-for-the-management-of-patients-with-acute-coronary-syndromes',
  'ESC/ERS. 2019 Guidelines for the diagnosis and management of acute pulmonary embolism. https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/acute-pulmonary-embolism/',
  'ACC/AHA. 2022 Guideline for the Diagnosis and Management of Aortic Disease. https://www.ahajournals.org/doi/10.1161/CIR.0000000000001106',
];

export const hypertensionSources = [
  'ESC. 2024 Guidelines for the management of elevated blood pressure and hypertension. https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/elevated-blood-pressure-and-hypertension/',
  'European Society of Hypertension. 2023 ESH Guidelines for the management of arterial hypertension. Journal of Hypertension. https://journals.lww.com/jhypertension/fulltext/2023/12000/2023_esh_guidelines_for_the_management_of_arterial.2.aspx',
  'NICE. Hypertension in adults: diagnosis and management, NG136. https://www.nice.org.uk/guidance/ng136/chapter/recommendations',
  'NICE. Hypertension in adults: diagnosis and management, visual summary. https://www.nice.org.uk/guidance/ng136/resources/visual-summary-pdf-6899919517',
  'BNF/NICE. Amlodipine. https://bnf.nice.org.uk/drugs/amlodipine/',
  'BNF/NICE. Ramipril. https://bnf.nice.org.uk/drugs/ramipril/',
  'BNF/NICE. Losartan potassium. https://bnf.nice.org.uk/drugs/losartan-potassium/',
  'BNF/NICE. Indapamide. https://bnf.nice.org.uk/drugs/indapamide/',
  'BNF/NICE. Spironolactone. https://bnf.nice.org.uk/drugs/spironolactone/',
  'BNF/NICE. Doxazosin. https://bnf.nice.org.uk/drugs/doxazosin/',
];

export const placeholderProtocols = [
  {
    id: 'dolor-toracico',
    title: 'Dolor torácico',
    description: 'Evaluación inicial, signos de alarma y derivación desde Atención Primaria.',
    status: 'Guía clínica',
    sections: [
      {
        step: '01',
        title: 'Primera valoración en consulta',
        body: 'Prioriza estabilidad clínica, constantes, saturación, exploración cardiopulmonar y caracterización del dolor o equivalente anginoso.',
        items: [
          'Valora inestabilidad hemodinámica, síncope, disnea intensa, sudoración, palidez, confusión o dolor persistente.',
          'Registra hora de inicio, desencadenantes, irradiación, duración, factores de riesgo cardiovascular y antecedentes coronarios.',
          'Si el paciente está inestable o la sospecha de síndrome coronario agudo es alta, activa traslado urgente sin esperar pruebas no disponibles.',
        ],
      },
      {
        step: '02',
        title: 'ECG si está disponible',
        body: 'El ECG de 12 derivaciones debe obtenerse y revisarse de forma temprana cuando no retrase la derivación.',
        items: [
          'Un ECG normal no excluye síndrome coronario agudo si la clínica mantiene sospecha.',
          'Elevación del ST, cambios isquémicos nuevos, arritmia relevante o dolor persistente requieren derivación urgente.',
          'Evita retrasar el traslado para troponina u otras pruebas que no puedan integrarse en un circuito validado.',
        ],
      },
      {
        step: '03',
        title: 'Diagnóstico diferencial grave',
        body: 'Mantén una búsqueda activa de causas tiempo-dependientes antes de asumir origen no cardiaco.',
        items: [
          'Síndrome coronario agudo: dolor opresivo, equivalente anginoso, factores de riesgo o cambios ECG.',
          'Embolia pulmonar: disnea, síncope, hemoptisis, taquicardia, hipoxemia o factores tromboembólicos.',
          'Síndrome aórtico agudo, neumotórax, pericarditis o miocarditis si la presentación lo sugiere.',
        ],
      },
      {
        step: '04',
        title: 'Derivación urgente',
        body: 'Deriva o activa recurso urgente ante sospecha de causa grave, inestabilidad o imposibilidad de descartar riesgo relevante en AP.',
        items: [
          'Comunica motivo de derivación, hora de inicio, ECG si existe, constantes, antecedentes y medicación relevante.',
          'Indica destino a urgencias hospitalarias cuando se requiere ECG seriado, troponina, imagen o monitorización.',
          'Mantén vigilancia clínica hasta la transferencia asistencial.',
        ],
      },
      {
        step: '05',
        title: 'Manejo no urgente',
        body: 'Solo considera manejo ambulatorio si la valoración clínica no sugiere causa tiempo-dependiente y existe plan de seguimiento claro.',
        items: [
          'Documenta exploración, ECG si se realizó, razonamiento clínico y señales de reconsulta urgente.',
          'Organiza seguimiento y prevención cardiovascular según riesgo global y guías aplicables.',
          'No uses una única prueba aislada para cerrar el episodio si la clínica no es concordante.',
        ],
      },
    ],
    tools: [
      'ECG de 12 derivaciones si está disponible sin retrasar la derivación.',
      'Registro estructurado de constantes, hora de inicio y síntomas acompañantes.',
      'Circuito de derivación urgente o activación 061 según estabilidad y sospecha.',
    ],
    interactive: {
      title: 'Decisión rápida en AP',
      intro: 'Marca los datos presentes.',
      checks: [
        'Inestabilidad hemodinámica, síncope, disnea intensa, sudoración, palidez, confusión o dolor persistente.',
        'Sospecha alta de síndrome coronario agudo o ECG con elevación del ST, cambios isquémicos nuevos o arritmia relevante.',
        'Sospecha de TEP, síndrome aórtico agudo, neumotórax, pericarditis o miocarditis.',
        'Necesidad de ECG seriado, troponina, imagen o monitorización no disponible en AP.',
      ],
      positiveTitle: 'Derivar o activar recurso urgente',
      positiveBody: 'Con cualquiera de estos datos, prioriza transferencia asistencial, comunicación estructurada y vigilancia hasta el traslado.',
      negativeTitle: 'Valorar manejo no urgente',
      negativeBody: 'Solo si no hay datos de alarma, la exploración es concordante y existe seguimiento claro, documenta razonamiento y señales de reconsulta urgente.',
      copyPrefix: 'Dolor torácico AP',
    },
    assessment: {
      title: 'Herramienta de actuación en AP',
      intro: 'Introduce los datos mínimos para orientar derivación o manejo no urgente.',
      copyPrefix: 'Dolor torácico AP',
      fields: [
        { id: 'onsetMinutes', type: 'number', label: 'Minutos desde el inicio del episodio', min: 0, max: 10080, unit: 'min' },
        { id: 'persistentPain', type: 'checkbox', label: 'Dolor persistente o equivalente anginoso activo' },
        { id: 'unstable', type: 'checkbox', label: 'Inestabilidad, síncope, disnea intensa, sudoración, palidez o confusión' },
        {
          id: 'ecg',
          type: 'select',
          label: 'ECG disponible',
          options: [
            { value: 'not-available', label: 'No disponible o retrasa traslado' },
            { value: 'normal', label: 'Sin cambios agudos' },
            { value: 'ischemic', label: 'Cambios isquémicos nuevos o arritmia relevante' },
            { value: 'stemi', label: 'Elevación ST o equivalente' },
          ],
        },
        { id: 'criticalDifferential', type: 'checkbox', label: 'Sospecha de TEP, síndrome aórtico, neumotórax, pericarditis o miocarditis' },
        { id: 'needsHospitalTests', type: 'checkbox', label: 'Necesita troponina, ECG seriado, imagen o monitorización no disponible en AP' },
      ],
      outcomes: [
        {
          any: ['unstable', 'persistentPain', 'criticalDifferential', 'needsHospitalTests', { id: 'ecg', equals: 'ischemic' }, { id: 'ecg', equals: 'stemi' }],
          status: 'Derivar',
          tone: 'alert',
          title: 'Derivación urgente o activación de recurso',
          body: 'Los datos introducidos son compatibles con causa tiempo-dependiente o necesidad de evaluación hospitalaria.',
          actions: [
            'Activar traslado urgente o recurso emergente según estabilidad.',
            'Comunicar hora de inicio, constantes, ECG si existe, antecedentes y medicación.',
            'Mantener vigilancia clínica hasta la transferencia asistencial.',
          ],
        },
      ],
      defaultOutcome: {
        status: 'Seguimiento',
        title: 'Manejo no urgente solo si la valoración es concordante',
        body: 'Sin datos de alarma marcados, puede plantearse manejo ambulatorio con documentación y seguimiento claro.',
        actions: [
          'Documentar exploración, razonamiento y ECG si se realizó.',
          'Entregar señales de reconsulta urgente.',
          'Planificar seguimiento y prevención cardiovascular.',
        ],
      },
    },
    sources: placeholderSources,
  },
  {
    id: 'hta',
    title: 'HTA',
    description: 'Diagnóstico, riesgo, tratamiento escalonado y derivación en Atención Primaria.',
    status: 'Guía clínica',
    sections: [
      {
        step: '01',
        title: 'Confirmar antes de etiquetar',
        body: 'Verifica técnica de medida, repetición de tomas y confirmación fuera de consulta cuando proceda.',
        items: [
          'Usa medición estandarizada, manguito adecuado y reposo previo antes de tomar decisiones.',
          'Confirma con AMPA o MAPA si la situación clínica lo permite.',
          'Clasifica las cifras junto al riesgo cardiovascular, comorbilidad y posible lesión de órgano diana.',
        ],
      },
      {
        step: '02',
        title: 'Separar control ambulatorio de urgencia',
        body: 'La prioridad en AP es detectar daño agudo o sospecha de emergencia hipertensiva y no demorar la transferencia.',
        items: [
          'Busca dolor torácico, disnea, focalidad neurológica, confusión, alteración visual, edema agudo de pulmón o datos de disección aórtica.',
          'Si hay síntomas o signos de daño agudo, activa derivación urgente o recurso emergente.',
          'Si no hay daño agudo, decide confirmación, inicio o intensificación terapéutica y seguimiento programado.',
        ],
      },
      {
        step: '03',
        title: 'Tratamiento ambulatorio escalonado',
        body: 'Combina medidas no farmacológicas con fármacos de primera línea y escala según respuesta, tolerancia y perfil clínico.',
        items: [
          'Prioriza IECA/ARA-II, calcioantagonista o diurético tiazídico-like según edad, origen familiar, diabetes y tolerancia.',
          'Escala a doble y triple combinación antes de etiquetar HTA resistente.',
          'En aparente resistencia, confirma con AMPA/MAPA, revisa adherencia, interacciones, hipotensión postural y causas secundarias.',
        ],
      },
      {
        step: '04',
        title: 'Seguimiento y derivación',
        body: 'El seguimiento debe comprobar respuesta, seguridad, adherencia y necesidad de derivación.',
        items: [
          'Controla función renal y potasio cuando uses IECA, ARA-II, diuréticos o antagonistas mineralocorticoides.',
          'Revisa adherencia, automedida, sal, alcohol, peso, actividad física y fármacos que elevan la presión arterial.',
          'Deriva si hay sospecha secundaria, daño de órgano diana, embarazo, mala respuesta persistente o emergencia hipertensiva.',
        ],
      },
    ],
    tools: [
      'Checklist de confirmación diagnóstica con AMPA/MAPA cuando proceda.',
      'Selector de alarma por daño agudo y necesidad de derivación urgente.',
      'Panel de escalones farmacológicos con dosis trazables.',
    ],
    treatment: [
      {
        title: 'Paso 1',
        body: 'Inicio farmacológico orientado por perfil clínico y tolerancia.',
        items: [
          'IECA/ARA-II: ramipril 1,25-2,5 mg cada 24 h, titular hasta 10 mg cada 24 h; losartán 50 mg cada 24 h, titular hasta 100 mg cada 24 h.',
          'Calcioantagonista: amlodipino 5 mg cada 24 h, titular hasta 10 mg cada 24 h.',
          'Diurético tiazídico-like: indapamida 2,5 mg cada 24 h o liberación modificada 1,5 mg cada 24 h.',
        ],
      },
      {
        title: 'Paso 2-3',
        body: 'Escalada combinada cuando no se alcanza control suficiente.',
        items: [
          'Paso 2: IECA o ARA-II asociado a calcioantagonista o diurético tiazídico-like.',
          'Paso 3: IECA o ARA-II más calcioantagonista más diurético tiazídico-like.',
          'Evita combinar IECA y ARA-II de forma sistemática.',
        ],
      },
      {
        title: 'HTA resistente',
        body: 'Confirmar resistencia real antes de añadir cuarto fármaco.',
        items: [
          'Si el potasio lo permite: espironolactona 25 mg cada 24 h, ajustar hasta 50 mg cada 24 h.',
          'Si no procede antagonista mineralocorticoide: considerar doxazosina 1 mg cada 24 h con titulación gradual.',
          'Revisar adherencia, AMPA/MAPA, interacciones, función renal, potasio y necesidad de derivación.',
        ],
      },
      {
        title: 'Medidas coadyuvantes',
        body: 'Aplicarlas desde el diagnóstico y reforzarlas en cada escalón.',
        items: [
          'Reducir sal, moderar alcohol, pérdida ponderal si procede y actividad física regular.',
          'Dieta cardiosaludable, abandono de tabaco y revisión de fármacos que puedan elevar la presión arterial.',
        ],
      },
    ],
    interactive: {
      title: 'Decisión rápida HTA AP',
      intro: 'Marca los datos presentes.',
      checks: [
        'Síntomas o signos compatibles con daño agudo de órgano diana.',
        'Cifras elevadas no confirmadas con AMPA/MAPA y paciente estable.',
        'Riesgo cardiovascular alto, diabetes, enfermedad renal crónica o lesión de órgano diana.',
        'Mala respuesta pese a triple terapia con adherencia y medición revisadas.',
      ],
      positiveTitle: 'Priorizar alarma, confirmación o escalada',
      positiveBody: 'Si hay daño agudo, deriva urgente. Si no, confirma diagnóstico, estratifica riesgo e inicia o escala tratamiento con seguimiento de seguridad.',
      negativeTitle: 'Seguimiento estructurado',
      negativeBody: 'Mantén automedida, medidas coadyuvantes, revisión de adherencia y control programado antes de intensificar.',
      copyPrefix: 'HTA AP',
    },
    assessment: {
      title: 'Herramienta HTA en AP',
      intro: 'Introduce cifras y contexto para decidir confirmación, derivación o escalada terapéutica.',
      copyPrefix: 'HTA AP',
      fields: [
        { id: 'sbp', type: 'number', label: 'Presión sistólica', min: 70, max: 300, unit: 'mmHg' },
        { id: 'dbp', type: 'number', label: 'Presión diastólica', min: 40, max: 180, unit: 'mmHg' },
        {
          id: 'confirmed',
          type: 'select',
          label: 'Confirmación fuera de consulta',
          options: [
            { value: 'no', label: 'No confirmada con AMPA/MAPA' },
            { value: 'yes', label: 'Confirmada con AMPA/MAPA' },
          ],
        },
        { id: 'acuteDamage', type: 'checkbox', label: 'Síntomas o signos de daño agudo de órgano diana' },
        { id: 'highRisk', type: 'checkbox', label: 'Riesgo alto, diabetes, ERC, ECV o lesión de órgano diana' },
        { id: 'tripleTherapy', type: 'checkbox', label: 'Mal control pese a triple terapia y adherencia revisada' },
      ],
      outcomes: [
        {
          any: ['acuteDamage'],
          status: 'Urgente',
          tone: 'alert',
          title: 'Derivar o activar recurso urgente',
          body: 'La presencia de daño agudo cambia el objetivo: no manejar como HTA ambulatoria.',
          actions: [
            'Activar derivación urgente o 061 según estabilidad.',
            'Comunicar cifras repetidas, síntomas, antecedentes, medicación y exploración.',
            'No retrasar transferencia por completar confirmación ambulatoria.',
          ],
        },
        {
          any: [{ id: 'sbp', gte: 180 }, { id: 'dbp', gte: 120 }],
          status: 'Alarma',
          tone: 'alert',
          title: 'Descartar daño agudo antes de manejo ambulatorio',
          body: 'Cifras muy elevadas requieren búsqueda activa de daño de órgano y seguridad del plan.',
          actions: [
            'Repetir medida con técnica correcta.',
            'Buscar síntomas neurológicos, torácicos, respiratorios, visuales, renales o aórticos.',
            'Si no hay daño agudo, ajustar tratamiento y asegurar seguimiento estrecho.',
          ],
        },
        {
          any: ['tripleTherapy'],
          status: 'Resistente',
          title: 'Evaluar HTA resistente',
          body: 'Antes de cuarto fármaco, confirmar resistencia real y revisar causas corregibles.',
          actions: [
            'Confirmar con AMPA/MAPA.',
            'Revisar adherencia, interacciones, hipotensión postural, función renal y potasio.',
            'Considerar escalón de HTA resistente o derivación según perfil.',
          ],
        },
        {
          any: ['highRisk', { id: 'confirmed', equals: 'yes' }],
          status: 'Tratar',
          title: 'Iniciar o escalar tratamiento estructurado',
          body: 'La HTA confirmada o el riesgo alto justifican intervención activa y seguimiento de seguridad.',
          actions: [
            'Aplicar medidas coadyuvantes.',
            'Elegir escalón farmacológico según perfil y tolerancia.',
            'Controlar función renal y potasio si se usan IECA, ARA-II, diuréticos o MRA.',
          ],
        },
      ],
      defaultOutcome: {
        status: 'Confirmar',
        title: 'Confirmar diagnóstico antes de intensificar',
        body: 'Sin alarma ni confirmación, la salida prioritaria es medir bien y confirmar fuera de consulta si procede.',
        actions: [
          'Repetir medida con técnica correcta.',
          'Planificar AMPA/MAPA cuando sea apropiado.',
          'Reforzar medidas coadyuvantes y revisión de factores modificables.',
        ],
      },
    },
    sources: hypertensionSources,
  },
];
