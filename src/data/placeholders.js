export const placeholderSources = [
  'ACC/AHA/ASE/CHEST/SAEM/SCCT/SCMR. 2021 Guideline for the Evaluation and Diagnosis of Chest Pain. Circulation. https://www.ahajournals.org/doi/10.1161/CIR.0000000000001029',
  'NICE. Recent-onset chest pain of suspected cardiac origin: assessment and diagnosis, CG95. https://www.nice.org.uk/guidance/cg95',
  'ESC. 2023 Guidelines for the management of acute coronary syndromes. https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/acute-coronary-syndromes/',
  'ACC/AHA/ACEP/NAEMSP/SCAI. 2025 Guideline for the Management of Patients With Acute Coronary Syndromes. https://professional.heart.org/en/science-news/2025-guideline-for-the-management-of-patients-with-acute-coronary-syndromes',
  'ESC/ERS. 2019 Guidelines for the diagnosis and management of acute pulmonary embolism. https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/acute-pulmonary-embolism/',
  'ACC/AHA. 2022 Guideline for the Diagnosis and Management of Aortic Disease. https://www.ahajournals.org/doi/10.1161/CIR.0000000000001106',
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
      intro: 'Marca los datos presentes para obtener una salida operativa basada en el protocolo.',
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
    sources: placeholderSources,
  },
];
