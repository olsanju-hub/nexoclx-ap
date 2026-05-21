window.NEXO_PROTOCOLS = [
  {
    id: 'hta',
    title: 'Hipertensión arterial en Atención Primaria',
    category: 'Cardiometabólico',
    type: 'Crónico',
    focus: 'diagnóstico / seguimiento crónico / tratamiento farmacológico',
    keywords: ['hipertensión', 'hta', 'tensión', 'presión arterial', 'AMPA', 'MAPA', 'enalapril', 'losartán', 'amlodipino'],
    synonyms: ['tensión alta', 'presión alta', 'elevated blood pressure'],
    reviewed: '2026-05-21',
    mainSource: '2024 ESC Guidelines for the management of elevated blood pressure and hypertension',
    confidence: 'alto',
    meds: ['enalapril', 'losartan', 'amlodipino', 'hidroclorotiazida'],
    calculators: ['cockcroft-gault'],
    bibliography: ['esc-hta-2024'],
    blocks: [
      {
        title: 'Qué hacer ahora',
        items: [
          'Medir PA con técnica correcta y repetir: reposo 5 min, manguito adecuado, 2-3 medidas separadas 1-2 min; usar la media de las últimas medidas.',
          'Clasificar ESC 2024: PA no elevada <120/70 mmHg; PA elevada 120-139/70-89 mmHg; hipertensión si consulta >=140/90 mmHg.',
          'Confirmar con AMPA/MAPA si es logísticamente posible antes de etiquetar HTA, salvo PA muy alta, daño orgánico, enfermedad cardiovascular o necesidad de tratamiento inmediato.',
          'Datos mínimos hoy: edad, fármacos y tóxicos, embarazo posible, síntomas, comorbilidad CV/renal/DM, exploración básica, creatinina/eGFR, sodio, potasio, glucosa/HbA1c si procede, perfil lipídico, orina con albuminuria, ECG.',
          'No perderse: dolor torácico, focalidad neurológica, disnea/edema agudo, cefalea brusca, confusión, pérdida visual, embarazo, deterioro renal agudo.'
        ]
      },
      {
        title: 'Tratamiento',
        items: []
      },
      {
        title: 'Seguimiento',
        items: [
          'Revisar a 2-4 semanas tras iniciar o cambiar fármaco; antes si PA muy alta, fragilidad o riesgo de hipotensión.',
          'Objetivo en tratamiento ESC 2024: PAS 120-129 mmHg si tolera; si >85 años, fragilidad, hipotensión ortostática o esperanza de vida limitada, buscar la PA más baja razonablemente tolerada.',
          'Control analítico 1-2 semanas tras IECA/ARA-II/diurético: creatinina/eGFR, sodio y potasio. Repetir tras cada cambio relevante.',
          'Cuando estable: PA/AMPA y adherencia cada 3-6 meses; analítica renal/electrolitos 6-12 meses o antes si ERC, diurético, IECA/ARA-II o cambios clínicos.',
          'Intensificar si AMPA media >=135/85 o consulta >=140/90 pese a adherencia; confirmar técnica, sal, AINE, descongestivos, alcohol, apnea del sueño y fármacos.'
        ]
      },
      {
        title: 'Derivar / urgencias',
        items: [
          'Urgencias: PA muy alta con daño agudo de órgano diana o síntomas compatibles: dolor torácico, disnea aguda, déficit neurológico, encefalopatía, edema agudo de pulmón, eclampsia/preeclampsia, lesión renal aguda.',
          'Valoración preferente: PA >=180/110 persistente sin daño agudo, especialmente si nueva, resistente o con alto riesgo; confirmar y revisar en días, no meses.',
          'Derivar a nefrología/cardiología/medicina interna según contexto si HTA resistente a 3 fármacos incluyendo diurético, sospecha secundaria, hipopotasemia espontánea, deterioro renal, albuminuria marcada o inicio <40 años con HTA grado alto.',
          'No derivar a urgencias una cifra aislada asintomática sin daño agudo si puede reevaluarse, confirmar medición e iniciar/ajustar tratamiento con seguimiento estrecho.'
        ]
      }
    ],
    treatmentRows: [
      {
        scenario: 'PA elevada 120-139/70-89 sin alto riesgo',
        action: 'Confirmar medidas, AMPA si dudas y medidas no farmacológicas intensivas.',
        drugClass: 'Sin fármaco inicial',
        medication: '-',
        dose: '-',
        frequency: '-',
        duration: '3 meses antes de decidir fármaco si no hay alto riesgo.',
        escalation: 'Si persiste >=130/80 con alto riesgo o progresa a >=140/90, pasar a fila de HTA.',
        followUp: 'Revisar PA/AMPA en 3 meses; antes si síntomas o cifras suben.',
        safety: 'No etiquetar HTA con una toma aislada.',
        cimaMedicationId: ''
      },
      {
        scenario: 'HTA confirmada >=140/90 y <160/100 sin daño orgánico',
        action: 'Estilo de vida + iniciar monoterapia si bajo riesgo o combinación a dosis bajas si lejos de objetivo.',
        drugClass: 'IECA o ARA-II; calcioantagonista si tos/contraindicación; asociar si no controla.',
        medication: 'enalapril',
        dose: '5 mg VO',
        frequency: 'Cada 24 h; titular a 10-20 mg/día en 1-2 tomas.',
        duration: 'Crónico si eficaz y tolerado.',
        escalation: 'Si AMPA media >=135/85 o consulta >=140/90 tras 4-6 semanas, subir dosis o añadir amlodipino 5 mg/24 h.',
        followUp: 'PA/AMPA y adherencia en 2-4 semanas. Creatinina, eGFR y K en 1-2 semanas.',
        safety: 'Evitar IECA en embarazo, angioedema, hiperpotasemia o estenosis renal bilateral.',
        cimaMedicationId: 'enalapril'
      },
      {
        scenario: 'HTA >=160/100 o PA claramente por encima de objetivo',
        action: 'Iniciar combinación desde el principio salvo fragilidad/hipotensión.',
        drugClass: 'IECA o ARA-II + calcioantagonista dihidropiridínico',
        medication: 'enalapril + amlodipino',
        dose: 'enalapril 5 mg + amlodipino 5 mg VO',
        frequency: 'Cada 24 h.',
        duration: 'Crónico; ajustar por respuesta.',
        escalation: 'Si no controla en 4 semanas, titular IECA/ARA-II o añadir tiazida: hidroclorotiazida 12,5 mg/24 h.',
        followUp: 'Revisión en 2-4 semanas; renal/electrolitos 1-2 semanas tras IECA/diurético.',
        safety: 'No combinar IECA + ARA-II. Vigilar edema con amlodipino e iones con diurético.',
        cimaMedicationId: 'amlodipino'
      },
      {
        scenario: 'HTA con diabetes, ERC, ECV o daño orgánico',
        action: 'Confirmar si no urgente, iniciar fármaco sin demoras y tratar riesgo global.',
        drugClass: 'IECA/ARA-II preferente; combinar con calcioantagonista o diurético si precisa.',
        medication: 'losartán',
        dose: '50 mg VO',
        frequency: 'Cada 24 h; habitual 50-100 mg/día.',
        duration: 'Crónico si eficaz y tolerado.',
        escalation: 'Si no controla en 4 semanas, añadir amlodipino 5 mg/24 h o tiazida si función renal lo permite.',
        followUp: 'PA/AMPA en 2-4 semanas; creatinina/eGFR/K en 1-2 semanas; albuminuria según contexto.',
        safety: 'Losartán monofármaco: enlace CIMA pendiente; confirmar ficha antes de prescribir.',
        cimaMedicationId: 'losartan'
      },
      {
        scenario: 'PA >=180/110 sin síntomas ni daño agudo',
        action: 'Repetir medida, descartar daño agudo, iniciar/ajustar fármaco y seguimiento estrecho.',
        drugClass: 'Combinación oral de primera línea',
        medication: 'amlodipino + enalapril',
        dose: 'amlodipino 5 mg + enalapril 5 mg VO',
        frequency: 'Cada 24 h.',
        duration: 'Crónico; no bajar bruscamente si no hay emergencia.',
        escalation: 'Revisar en 48-72 h o pocos días; intensificar si sigue >=180/110 o no baja claramente.',
        followUp: 'Exploración dirigida, ECG/orina/renal/electrolitos. Confirmar AMPA cuando sea seguro.',
        safety: 'Si aparece dolor torácico, focalidad, disnea, confusión, embarazo o lesión renal aguda: urgencias.',
        cimaMedicationId: 'amlodipino'
      },
      {
        scenario: 'Sospecha de emergencia hipertensiva',
        action: 'No manejar como ajuste ambulatorio. Enviar a urgencias.',
        drugClass: 'Tratamiento IV/hospitalario',
        medication: '-',
        dose: '-',
        frequency: '-',
        duration: 'Valoración inmediata.',
        escalation: 'Urgencias si daño agudo de órgano diana o síntomas compatibles.',
        followUp: 'Tras alta, revisar plan, adherencia y causas secundarias.',
        safety: 'No intentar normalizar PA rápidamente en consulta sin monitorización.',
        cimaMedicationId: ''
      },
      {
        scenario: 'Anciano, fragilidad u ortostatismo',
        action: 'Empezar bajo, comprobar bipedestación y priorizar tolerancia.',
        drugClass: 'Monoterapia a dosis baja',
        medication: 'amlodipino',
        dose: '5 mg VO; considerar 2,5 mg si disponible y fragilidad marcada.',
        frequency: 'Cada 24 h.',
        duration: 'Crónico si no hay caídas, hipotensión o edema limitante.',
        escalation: 'Subir o añadir fármaco solo si PA sigue alta y no hay ortostatismo/caídas.',
        followUp: 'Revisión en 2-4 semanas; PA sentado/de pie; revisar mareo, caídas y edema.',
        safety: 'Objetivo menos estricto si >85 años, fragilidad o hipotensión sintomática.',
        cimaMedicationId: 'amlodipino'
      },
      {
        scenario: 'Embarazo o sospecha de embarazo',
        action: 'No usar IECA/ARA-II. Confirmar embarazo y derivar según circuito obstétrico.',
        drugClass: 'Fármacos específicos de embarazo',
        medication: 'pendiente de verificación CIMA',
        dose: 'No pautar desde esta tabla.',
        frequency: '-',
        duration: '-',
        escalation: 'Si PA alta o síntomas: valoración obstétrica/urgencias.',
        followUp: 'Control preferente el mismo día si cifras altas o síntomas.',
        safety: 'IECA/ARA-II contraindicados.',
        cimaMedicationId: ''
      }
    ],
    secondary: [
      {
        title: 'Ajustes y seguridad',
        items: [
          'IECA/ARA-II: contraindicados en embarazo. Controlar potasio/creatinina; revisar si creatinina sube >30% o K >=5,5 mmol/l.',
          'Diuréticos tiazídicos: evitar ClCr <=30 ml/min si ficha lo contraindica; vigilar sodio, potasio, gota e hipotensión.',
          'Edad avanzada/fragilidad: buscar ortostatismo, caídas, ingesta hídrica y polifarmacia antes de intensificar.',
          'AINE, corticoides, descongestivos simpaticomiméticos, regaliz y exceso de alcohol pueden elevar PA o reducir eficacia.'
        ]
      },
      {
        title: 'Bibliografía',
        items: ['Fuente principal: ESC 2024. Aplicar circuitos locales si existen para MAPA, derivación o HTA resistente.']
      }
    ]
  },
  {
    id: 'dm2',
    title: 'Diabetes mellitus tipo 2',
    category: 'Cardiometabólico',
    type: 'Crónico',
    focus: 'seguimiento crónico / tratamiento farmacológico',
    keywords: ['diabetes', 'dm2', 'azúcar', 'glucosa', 'hba1c', 'metformina', 'insulina', 'iSGLT2', 'GLP-1'],
    synonyms: ['azúcar alta', 'diabetes tipo 2', 'insulinización'],
    reviewed: '2026-05-21',
    mainSource: 'ADA Standards of Care 2026; redGDPS 2026; redGDPS insulinización 2022',
    confidence: 'alto',
    meds: ['metformina', 'empagliflozina', 'sitagliptina', 'gliclazida', 'liraglutida', 'insulina-glargina'],
    calculators: ['insulina-basal', 'cockcroft-gault'],
    bibliography: ['ada-2026', 'redgdps-2026', 'redgdps-insulina-2022'],
    blocks: [
      {
        title: 'Qué hacer ahora',
        items: [
          'Confirmar diagnóstico si no estaba establecido: HbA1c, glucemia basal o glucemia al azar con síntomas; repetir si resultado no inequívoco.',
          'Datos mínimos antes de decidir: HbA1c, glucemias disponibles, peso/IMC, eGFR y albuminuria, ECV/IC/ERC, edad, fragilidad, hipoglucemias, embarazo posible, tratamiento actual, adherencia y preferencias.',
          'Objetivo HbA1c práctico: <7% si adulto no frágil; <7,5-8% si edad avanzada, comorbilidad o hipoglucemia relevante; hasta <8-8,5% si fragilidad marcada o esperanza de vida limitada.',
          'No perderse: pérdida de peso, cetosis, vómitos, deshidratación, respiración de Kussmaul, somnolencia, glucemia muy alta sintomática o sospecha de DM1/LADA.'
        ]
      },
      {
        title: 'Tratamiento',
        items: []
      },
      {
        title: 'Seguimiento',
        items: [
          'Revisar inicio/cambio oral en 4-12 semanas según riesgo; HbA1c cada 3 meses hasta objetivo, luego cada 6 meses si estable.',
          'Tras iniciar insulina basal: contacto en 3-7 días para glucemias/técnica; revisión en 1-2 semanas; ajustar hasta glucemia basal pactada sin hipoglucemia.',
          'Controles: eGFR y albuminuria al menos anual; cada 3-6 meses si ERC o fármacos con límites renales. Perfil lipídico anual o tras cambios.',
          'Intensificar si HbA1c fuera de objetivo tras 3 meses de adherencia y dosis eficaces; desintensificar si hipoglucemia, fragilidad, pérdida de peso no buscada o objetivo demasiado estricto.'
        ]
      },
      {
        title: 'Derivar / urgencias',
        items: [
          'Urgencias: cetosis/cetonemia positiva con síntomas, sospecha de CAD/EHH, vómitos/deshidratación, alteración del nivel de conciencia, glucemia muy elevada con clínica grave o infección/descompensación sistémica.',
          'Endocrinología preferente: sospecha DM1/LADA, fracaso de insulinización basal con HbA1c alta pese a basal optimizada, hipoglucemias graves/recurrentes, necesidad de pauta bolo-basal compleja, embarazo o planificación gestacional.',
          'Nefrología si eGFR cae rápidamente, albuminuria muy elevada persistente o dudas de etiología no diabética.'
        ]
      }
    ],
    treatmentRows: [
      {
        scenario: 'Diagnóstico reciente, sin síntomas graves, HbA1c cerca de objetivo',
        action: 'Plan alimentario/actividad + iniciar metformina si eGFR lo permite.',
        drugClass: 'Biguanida',
        medication: 'metformina',
        dose: '500-850 mg VO con comida',
        frequency: 'Cada 24 h al inicio; titular a cada 12 h según tolerancia.',
        duration: 'Crónico si eficaz y tolerado.',
        escalation: 'Si HbA1c fuera de objetivo a 3 meses, titular o añadir segundo fármaco según comorbilidad.',
        followUp: 'HbA1c en 3 meses; eGFR al inicio y al menos anual.',
        safety: 'No iniciar si eGFR <45; contraindicada habitualmente si eGFR <30.',
        cimaMedicationId: 'metformina'
      },
      {
        scenario: 'HbA1c claramente elevada (>8,5%) sin descompensación',
        action: 'Iniciar terapia combinada desde el principio.',
        drugClass: 'Metformina + iSGLT2 o arGLP-1 según perfil',
        medication: 'metformina + empagliflozina',
        dose: 'metformina 500-850 mg + empagliflozina 10 mg VO',
        frequency: 'Cada 24 h; metformina con comida.',
        duration: 'Crónico si objetivo y tolerancia adecuados.',
        escalation: 'Si HbA1c sigue fuera de objetivo a 3 meses, añadir arGLP-1 o basal si síntomas/catabolismo.',
        followUp: 'HbA1c 3 meses; revisar síntomas, peso, eGFR y eventos adversos en 4-12 semanas.',
        safety: 'Pausar iSGLT2 en ayuno, cirugía o enfermedad aguda grave.',
        cimaMedicationId: 'empagliflozina'
      },
      {
        scenario: 'ECV establecida, insuficiencia cardiaca o ERC',
        action: 'Priorizar fármaco con beneficio cardiorrenal aunque HbA1c esté cerca de objetivo.',
        drugClass: 'iSGLT2; arGLP-1 si predominio aterosclerótico/obesidad',
        medication: 'empagliflozina',
        dose: '10 mg VO',
        frequency: 'Cada 24 h.',
        duration: 'Crónico si indicación cardiorrenal y tolerancia.',
        escalation: 'Si control glucémico insuficiente, añadir metformina si procede, arGLP-1 o iDPP4 según objetivo.',
        followUp: 'eGFR/volemia al inicio y según ERC; HbA1c en 3 meses.',
        safety: 'Riesgo de depleción de volumen y cetoacidosis euglucémica; educar señales de alarma.',
        cimaMedicationId: 'empagliflozina'
      },
      {
        scenario: 'Obesidad o necesidad de pérdida ponderal',
        action: 'Preferir arGLP-1 si no contraindicado y accesible.',
        drugClass: 'Agonista receptor GLP-1',
        medication: 'liraglutida',
        dose: '0,6 mg SC',
        frequency: 'Cada 24 h 1 semana; después 1,2 mg/24 h.',
        duration: 'Crónico si reduce HbA1c/peso y se tolera.',
        escalation: 'Subir a 1,8 mg/24 h si precisa y tolera.',
        followUp: 'Revisar tolerancia gastrointestinal en 2-4 semanas; HbA1c y peso a 3 meses.',
        safety: 'No usar si sospecha pancreatitis; precaución con vómitos/deshidratación.',
        cimaMedicationId: 'liraglutida'
      },
      {
        scenario: 'Anciano/frágil o alto riesgo de hipoglucemia',
        action: 'Evitar hipoglucemias; objetivo HbA1c menos estricto.',
        drugClass: 'iDPP4 si se necesita fármaco con bajo riesgo de hipoglucemia',
        medication: 'sitagliptina',
        dose: '100 mg VO si función renal conservada',
        frequency: 'Cada 24 h.',
        duration: 'Crónico si eficaz.',
        escalation: 'Si no controla en 3 meses, ajustar por eGFR y añadir opción sin hipoglucemia; evitar sulfonilurea si fragilidad.',
        followUp: 'HbA1c en 3 meses; eGFR para ajustar dosis.',
        safety: 'Dosis renal pendiente de verificación por ficha concreta antes de prescribir.',
        cimaMedicationId: 'sitagliptina'
      },
      {
        scenario: 'Coste bajo, sin fragilidad y bajo riesgo de hipoglucemia',
        action: 'Usar solo si se acepta riesgo de hipoglucemia y hay comidas regulares.',
        drugClass: 'Sulfonilurea',
        medication: 'gliclazida liberación modificada',
        dose: '30 mg VO',
        frequency: 'Cada 24 h con desayuno.',
        duration: 'Crónico si eficaz y sin hipoglucemias.',
        escalation: 'Ajustar por respuesta hasta 120 mg/día; suspender/reducir si hipoglucemia.',
        followUp: 'Glucemias si síntomas o riesgo; HbA1c a 3 meses.',
        safety: 'Evitar en ingesta irregular, hipoglucemias previas o fragilidad.',
        cimaMedicationId: 'gliclazida'
      },
      {
        scenario: 'Hiperglucemia sintomática/catabólica o criterio de insulinización',
        action: 'Iniciar insulina basal y educación; no plantear bolo-basal desde AP si complejo.',
        drugClass: 'Insulina basal',
        medication: 'insulina glargina U100',
        dose: '10 UI SC o 0,1-0,2 UI/kg/día',
        frequency: 'Cada 24 h, horario fijo.',
        duration: 'Crónico; reevaluar al alcanzar control.',
        escalation: '+2 UI cada 3 días si mediana de glucemia basal sobre objetivo y sin hipoglucemia; reducir 10-20% si <70 mg/dl.',
        followUp: 'Contacto 3-7 días; revisión 1-2 semanas; HbA1c 3 meses.',
        safety: 'Derivar/urgencias si cetosis, vómitos, deshidratación, alteración conciencia o sospecha DM1.',
        cimaMedicationId: 'insulina-glargina'
      }
    ],
    secondary: [
      {
        title: 'Ajustes y seguridad',
        items: [
          'Metformina: no iniciar si eGFR <45 y contraindicada habitualmente si eGFR <30; suspender temporalmente en enfermedad aguda con hipoxia/deshidratación.',
          'iSGLT2: educar sobre cetoacidosis euglucémica; pausar ante ayuno, cirugía o enfermedad grave.',
          'Sulfonilureas e insulina: revisar conducción, comidas, alcohol y plan de hipoglucemia.',
          'Embarazo: no aplicar algoritmo general; derivar y priorizar manejo específico.'
        ]
      },
      {
        title: 'Bibliografía',
        items: ['Fuentes principales: ADA 2026 y redGDPS 2026. Insulinización basal apoyada en algoritmo redGDPS 2022.']
      }
    ]
  },
  {
    id: 'dislipemia',
    title: 'Dislipemia / riesgo cardiovascular',
    category: 'Cardiometabólico',
    type: 'Crónico',
    focus: 'diagnóstico / tratamiento farmacológico',
    keywords: ['dislipemia', 'colesterol', 'ldl', 'estatinas', 'atorvastatina', 'rosuvastatina', 'ezetimiba', 'riesgo cardiovascular', 'score2'],
    synonyms: ['colesterol alto', 'hipercolesterolemia', 'riesgo CV'],
    reviewed: '2026-05-21',
    mainSource: '2025 ESC/EAS Focused Update; 2021 ESC Prevention',
    confidence: 'alto',
    meds: ['atorvastatina', 'rosuvastatina', 'ezetimiba'],
    calculators: ['score2-link', 'cockcroft-gault'],
    bibliography: ['esc-eas-2025', 'esc-prevention-2021', 'heartscore'],
    blocks: [
      {
        title: 'Qué hacer ahora',
        items: [
          'Datos mínimos: perfil lipídico completo, PA, tabaco, diabetes, ERC/eGFR, albuminuria si procede, ECV previa, antecedentes familiares, IMC, fármacos, TSH si sospecha hipotiroidismo.',
          'No calcular SCORE2 si ya es alto/muy alto por ECV establecida, diabetes con daño orgánico o larga evolución, ERC moderada-grave, hipercolesterolemia familiar o LDL muy elevado persistente.',
          'Si prevención primaria sin alto riesgo automático: calcular SCORE2 (<70 años) o SCORE2-OP (>=70 años) con herramienta oficial ESC; no usar fórmula local en esta V1.',
          'No perderse: LDL >=190 mg/dl, TG >=500 mg/dl, xantomas, pancreatitis, dolor muscular con estatinas, transaminasas elevadas persistentes.'
        ]
      },
      {
        title: 'Tratamiento',
        items: []
      },
      {
        title: 'Seguimiento',
        items: [
          'Pedir ALT basal si se inicia estatina; CK basal solo si antecedentes musculares, interacciones o riesgo de miopatía.',
          'Control LDL a 4-6 semanas tras inicio o intensificación; ajustar potencia/adherencia. Cuando estable, cada 6-12 meses.',
          'Mialgias: comprobar relación temporal, CK si síntomas importantes, hipotiroidismo/interacciones. Si CK >4x LSN o síntomas intensos, suspender y reevaluar; reintroducir otra estatina/dosis baja cuando resuelva si seguro.',
          'Transaminasas: si ALT/AST >3x LSN persistente, suspender o reducir y estudiar otras causas.'
        ]
      },
      {
        title: 'Derivar / urgencias',
        items: [
          'Derivar a unidad lipídica/cardiología/endocrino si sospecha hipercolesterolemia familiar, LDL >=190 mg/dl persistente, objetivo no alcanzado con estatina alta + ezetimiba, intolerancia a múltiples estatinas o TG >=500-1000 mg/dl.',
          'Urgencias si rabdomiólisis sospechada: dolor/debilidad muscular marcada, orina oscura, CK muy elevada o deterioro renal.',
          'Preferente si pancreatitis o dolor abdominal compatible con TG muy elevados.'
        ]
      }
    ],
    treatmentRows: [
      {
        scenario: 'Prevención primaria sin alto riesgo automático',
        action: 'Calcular SCORE2/SCORE2-OP en HeartScore y tratar según riesgo.',
        drugClass: 'Medidas no farmacológicas; estatina si riesgo/LDL lo indica',
        medication: 'atorvastatina',
        dose: '10-20 mg VO si riesgo moderado/alto y se decide iniciar',
        frequency: 'Cada 24 h.',
        duration: 'Crónico si objetivo y tolerancia.',
        escalation: 'Si LDL no alcanza objetivo a 4-6 semanas, subir intensidad.',
        followUp: 'Perfil lipídico y adherencia a 4-6 semanas.',
        safety: 'No calcular SCORE2 local; usar herramienta oficial.',
        cimaMedicationId: 'atorvastatina'
      },
      {
        scenario: 'Riesgo alto',
        action: 'Objetivo LDL <70 mg/dl y reducción >=50% si procede.',
        drugClass: 'Estatina alta intensidad si tolera',
        medication: 'atorvastatina',
        dose: '40 mg VO',
        frequency: 'Cada 24 h.',
        duration: 'Crónico.',
        escalation: 'Subir a 80 mg o cambiar a rosuvastatina 20 mg; añadir ezetimiba si no objetivo a 4-6 semanas.',
        followUp: 'LDL, ALT si clínica o criterio local, adherencia en 4-6 semanas.',
        safety: 'Revisar interacciones y hepatopatía activa.',
        cimaMedicationId: 'atorvastatina'
      },
      {
        scenario: 'Muy alto riesgo o prevención secundaria',
        action: 'Objetivo LDL <55 mg/dl y reducción >=50%.',
        drugClass: 'Estatina alta intensidad + intensificación precoz',
        medication: 'rosuvastatina',
        dose: '20 mg VO',
        frequency: 'Cada 24 h.',
        duration: 'Crónico.',
        escalation: 'Si no objetivo a 4-6 semanas, añadir ezetimiba 10 mg/24 h; derivar si sigue fuera de objetivo.',
        followUp: 'Perfil lipídico a 4-6 semanas y tras cada cambio.',
        safety: 'Revisar función renal antes de dosis altas; evitar en embarazo/lactancia.',
        cimaMedicationId: 'rosuvastatina'
      },
      {
        scenario: 'LDL no objetivo con estatina máxima tolerada',
        action: 'Añadir ezetimiba.',
        drugClass: 'Inhibidor absorción colesterol',
        medication: 'ezetimiba',
        dose: '10 mg VO',
        frequency: 'Cada 24 h.',
        duration: 'Crónico si eficaz y tolerado.',
        escalation: 'Si muy alto riesgo y no objetivo con estatina + ezetimiba, derivar para PCSK9/u otras opciones.',
        followUp: 'LDL a 4-6 semanas.',
        safety: 'Vigilar transaminasas si combinación; evitar hepatopatía moderada-grave sin revisar ficha.',
        cimaMedicationId: 'ezetimiba'
      },
      {
        scenario: 'Sospecha hipercolesterolemia familiar o LDL >=190 persistente',
        action: 'Iniciar alta intensidad y derivar a unidad lipídica/cardiología/endocrino.',
        drugClass: 'Estatina alta intensidad',
        medication: 'atorvastatina',
        dose: '40-80 mg VO',
        frequency: 'Cada 24 h.',
        duration: 'Crónico.',
        escalation: 'Añadir ezetimiba si no objetivo; valorar familia y tratamiento especializado.',
        followUp: 'LDL a 4-6 semanas; documentar antecedentes familiares.',
        safety: 'Descartar causas secundarias: hipotiroidismo, nefrosis, colestasis, fármacos.',
        cimaMedicationId: 'atorvastatina'
      },
      {
        scenario: 'Mialgias o intolerancia a estatina',
        action: 'No abandonar objetivo: pausar si síntomas relevantes, comprobar CK y reintroducir estrategia tolerable.',
        drugClass: 'Estatina baja/intermitente o ezetimiba',
        medication: 'rosuvastatina o ezetimiba',
        dose: 'rosuvastatina 5 mg VO o ezetimiba 10 mg VO',
        frequency: 'Cada 24 h; pauta intermitente solo si protocolo local lo avala.',
        duration: 'Reevaluar tras resolución de síntomas.',
        escalation: 'Si CK >4x LSN o síntomas intensos, suspender y reevaluar; derivar si intolerancia múltiple.',
        followUp: 'CK si síntomas importantes; LDL 4-6 semanas tras reintroducción.',
        safety: 'Buscar hipotiroidismo, interacciones, alcohol y ejercicio intenso.',
        cimaMedicationId: 'ezetimiba'
      },
      {
        scenario: 'ALT/AST >3x LSN persistente o hepatopatía activa',
        action: 'No iniciar o suspender estatina/ezetimiba hasta aclarar.',
        drugClass: 'Evitar hipolipemiante hepatotóxico hasta estudio',
        medication: '-',
        dose: '-',
        frequency: '-',
        duration: 'Hasta resolver o aclarar causa.',
        escalation: 'Reintroducir con control si normaliza y beneficio supera riesgo; derivar si duda.',
        followUp: 'Repetir analítica y estudiar causa hepática.',
        safety: 'Embarazo/lactancia: estatinas contraindicadas.',
        cimaMedicationId: ''
      }
    ],
    secondary: [
      {
        title: 'Ajustes y seguridad',
        items: [
          'Embarazo/lactancia: estatinas contraindicadas; no aplicar protocolo habitual.',
          'Hepatopatía activa: evitar estatinas/ezetimiba hasta aclarar. Alcohol alto aumenta riesgo hepático.',
          'Rosuvastatina: revisar función renal antes de dosis altas; 40 mg no es opción inicial en riesgo de miopatía.',
          'Interacciones: macrólidos, azoles, ciclosporina, antivirales y fibratos aumentan riesgo de miopatía según estatina.'
        ]
      },
      {
        title: 'Bibliografía',
        items: ['Fuentes principales: ESC/EAS 2025 Focused Update y ESC prevención 2021. SCORE2/SCORE2-OP debe calcularse en HeartScore oficial.']
      }
    ]
  },
  {
    id: 'nac',
    title: 'Neumonía adquirida en la comunidad en Atención Primaria',
    category: 'Respiratorio',
    type: 'Agudo',
    focus: 'diagnóstico / tratamiento antimicrobiano',
    keywords: ['neumonía', 'nac', 'infección respiratoria', 'tos', 'fiebre', 'disnea', 'saturación', 'antibiótico', 'amoxicilina', 'macrólido', 'radiografía', 'rx tórax', 'crepitantes'],
    synonyms: ['neumonia adquirida comunidad', 'cap', 'community acquired pneumonia', 'infección respiratoria baja', 'neumonía comunitaria'],
    reviewed: '2026-05-21',
    mainSource: 'NICE NG250: Pneumonia in adults: diagnosis and management',
    confidence: 'alto',
    meds: ['amoxicilina', 'doxiciclina', 'claritromicina', 'amoxicilina-clavulanico'],
    calculators: [],
    bibliography: ['nice-ng250-nac', 'separ-nac-2020'],
    blocks: [
      {
        title: 'Qué hacer ahora',
        items: [
          'Sospechar NAC si tos aguda con fiebre, disnea, dolor pleurítico, taquipnea, crepitantes/foco auscultatorio o deterioro general sin otra causa clara.',
          'Datos mínimos antes de decidir: temperatura, FR, FC, PA, SatO2, nivel de conciencia, hidratación, comorbilidad, fragilidad, alergias, función renal/hepática si consta, embarazo/inmunosupresión y posibilidad real de revisión.',
          'Estratificar gravedad en AP con CRB65: confusión, FR >=30/min, PAS <90 o PAD <=60 mmHg, edad >=65 años. CRB65 0 suele permitir manejo ambulatorio si SatO2 y seguimiento son adecuados; CRB65 >=2 requiere valoración urgente.',
          'Pedir Rx tórax si diagnóstico incierto, SatO2 baja, foco auscultatorio dudoso, comorbilidad/fragilidad, mala evolución, sospecha de complicación o necesidad de confirmar antes de tratar; no retrasar urgencias si hay gravedad.'
        ]
      },
      {
        title: 'Tratamiento',
        items: []
      },
      {
        title: 'Seguimiento',
        items: [
          'Si manejo ambulatorio: contacto o revisión clínica a las 48-72 h; en anciano/frágil o comorbilidad relevante, 24-48 h.',
          'En la revisión: temperatura, FR, SatO2, PA, disnea, estado general, tolerancia oral, adherencia, alergia/diarrea/QT/interacciones y necesidad de Rx si no se hizo.',
          'Si mejora y está estable: completar 5 días. No prolongar antibiótico de rutina; valorar más duración solo si no hay estabilidad, complicación o patógeno no habitual.',
          'Fracaso terapéutico: fiebre persistente, aumento de disnea, SatO2 peor, hipotensión, confusión, intolerancia oral, deterioro a 48-72 h o nueva focalidad. Revalorar diagnóstico, adherencia, Rx/analítica y derivar si hay gravedad.',
          'Rx de control no rutinaria si recuperación completa. Valorar a unas 6 semanas si síntomas persistentes, fumador, edad avanzada o sospecha de neoplasia/complicación.'
        ]
      },
      {
        title: 'Derivar / urgencias',
        items: [
          'Urgencias: SatO2 baja, disnea importante, FR >=30/min, confusión, PAS <90 o PAD <=60 mmHg, sepsis, cianosis, dolor torácico intenso, hemoptisis relevante o mal estado general.',
          'Derivar o valorar preferente: CRB65 >=2, comorbilidad descompensada, fragilidad sin soporte, imposibilidad de seguimiento, embarazo, inmunosupresión, sospecha de tuberculosis/aspiración grave o complicación.',
          'Urgencias si no mejora o empeora a las 48-72 h, o si se sospecha derrame pleural, empiema, absceso, neumonía extensa, neumonía posgripal grave o deterioro clínico.'
        ]
      }
    ],
    treatmentRows: [
      {
        scenario: 'NAC leve, estable, CRB65 0 y seguimiento posible',
        action: 'Manejo en AP si tolera vía oral, SatO2 aceptable, sin sepsis y revisión 48-72 h garantizada.',
        drugClass: 'Betalactámico oral',
        medication: 'amoxicilina',
        dose: '500 mg VO',
        frequency: 'Cada 8 h.',
        duration: '5 días.',
        escalation: 'Si alergia a penicilina o amoxicilina no adecuada: doxiciclina o claritromicina. Si no mejora en 48-72 h, revalorar y no escalar a ciegas.',
        followUp: 'Revisión o contacto en 48-72 h.',
        safety: 'Verificar alergia a penicilina y ajuste renal. No usar antibiótico sin sospecha clínica de NAC.',
        cimaMedicationId: 'amoxicilina'
      },
      {
        scenario: 'NAC leve con alergia a penicilina o sospecha de atípicos',
        action: 'Tratamiento ambulatorio solo si no hay criterios de gravedad y hay seguimiento.',
        drugClass: 'Tetraciclina o macrólido',
        medication: 'doxiciclina',
        dose: '200 mg VO el día 1; luego 100 mg VO',
        frequency: 'Cada 24 h.',
        duration: '5 días en total.',
        escalation: 'Si doxiciclina contraindicada, claritromicina 500 mg VO cada 12 h durante 5 días si no hay QT/interacciones relevantes.',
        followUp: 'Revisión 48-72 h; antes si fiebre alta persistente, disnea o mala tolerancia.',
        safety: 'Evitar doxiciclina en embarazo. Con macrólidos revisar QT, estatinas, anticoagulantes y antiarrítmicos.',
        cimaMedicationId: 'doxiciclina'
      },
      {
        scenario: 'NAC con comorbilidad relevante pero estable',
        action: 'Confirmar gravedad, SatO2 y soporte. Manejo ambulatorio solo si estable y con bajo umbral de derivación.',
        drugClass: 'Betalactámico; añadir macrólido solo si sospecha de atípicos',
        medication: 'amoxicilina',
        dose: '500 mg VO',
        frequency: 'Cada 8 h.',
        duration: '5 días si estabilidad clínica.',
        escalation: 'Si sospecha de atípicos: claritromicina 500 mg VO cada 12 h 5 días, revisando interacciones. Si comorbilidad descompensada, urgencias.',
        followUp: 'Revisión en 24-48 h.',
        safety: 'Revisar ERC, hepatopatía, EPOC avanzada, insuficiencia cardiaca, anticoagulación e interacciones.',
        cimaMedicationId: 'amoxicilina'
      },
      {
        scenario: 'NAC en paciente mayor o frágil',
        action: 'Valorar CRB65, SatO2, hidratación, delirium, soporte domiciliario y tolerancia oral antes de decidir AP.',
        drugClass: 'Betalactámico oral si manejo domiciliario es seguro',
        medication: 'amoxicilina',
        dose: '500 mg VO',
        frequency: 'Cada 8 h.',
        duration: '5 días si estabilidad clínica.',
        escalation: 'Derivar si fragilidad impide seguimiento, hay caída funcional, confusión, deshidratación, SatO2 baja o mala tolerancia oral.',
        followUp: '24-48 h; control más precoz si vive solo o alto riesgo.',
        safety: 'Evitar sedantes antitusivos. Revisar función renal para dosificación y riesgo de diarrea/deshidratación.',
        cimaMedicationId: 'amoxicilina'
      },
      {
        scenario: 'SatO2 baja, disnea importante o mal estado general',
        action: 'Enviar a urgencias. No convertir en manejo domiciliario por iniciar antibiótico oral.',
        drugClass: 'Antibiótico hospitalario según gravedad',
        medication: '-',
        dose: '-',
        frequency: '-',
        duration: 'Inmediato: derivación.',
        escalation: 'Oxígeno/soporte según recursos y traslado. Si demora inevitable, contactar con urgencias/microbiología local.',
        followUp: 'Seguimiento AP tras alta o plan hospitalario.',
        safety: 'Riesgo de hipoxemia, sepsis o fracaso respiratorio.',
        cimaMedicationId: ''
      },
      {
        scenario: 'Sepsis, confusión, hipotensión o FR >=30/min',
        action: 'Urgencias/emergencias. CRB65 elevado o sepsis probable.',
        drugClass: 'No iniciar pauta AP como sustituto de valoración urgente',
        medication: 'amoxicilina/ácido clavulánico',
        dose: '500/125 mg VO o 1,2 g IV en esquemas hospitalarios NICE',
        frequency: 'Cada 8 h, asociado a macrólido si alta gravedad según guía.',
        duration: '5 días y reevaluación; hospital decide vía y duración.',
        escalation: 'Derivación inmediata; hemocultivos/analítica/imagen y tratamiento IV si procede.',
        followUp: 'AP tras alta; no seguimiento diferido en domicilio.',
        safety: 'Quinolonas no son rutina; reservar a indicación especializada/alergia grave según guía y seguridad.',
        cimaMedicationId: 'amoxicilina-clavulanico'
      },
      {
        scenario: 'Sospecha de NAC sin seguimiento domiciliario fiable',
        action: 'No tratar como ambulatoria si no puede revisarse o no hay soporte seguro.',
        drugClass: 'Valoración urgente o preferente',
        medication: '-',
        dose: '-',
        frequency: '-',
        duration: 'Hasta asegurar circuito de control.',
        escalation: 'Derivar si vive solo frágil, barrera de comunicación, deterioro cognitivo, mala adherencia probable o acceso difícil.',
        followUp: 'Confirmar revisión en 24-48 h si finalmente queda en domicilio.',
        safety: 'El antibiótico no compensa una mala capacidad de vigilancia clínica.',
        cimaMedicationId: ''
      },
      {
        scenario: 'Falta de mejoría tras 48-72 h de antibiótico',
        action: 'Reevaluar presencialmente: constantes, SatO2, adherencia, alergia, diagnóstico alternativo y complicación.',
        drugClass: 'No cambiar antibiótico sin nueva valoración',
        medication: '-',
        dose: '-',
        frequency: '-',
        duration: 'Revisión inmediata si deterioro.',
        escalation: 'Pedir Rx tórax si no se hizo; derivar si hipoxemia, sepsis, derrame, neumonía extensa o imposibilidad de control.',
        followUp: 'Decidir en la visita: completar, cambiar con criterio o derivar.',
        safety: 'Buscar TEP, IC, COVID/gripe, tuberculosis, cáncer, aspiración o resistencia.',
        cimaMedicationId: ''
      },
      {
        scenario: 'Sospecha de derrame, empiema, absceso, neumonía extensa o deterioro',
        action: 'Derivación urgente para imagen, analítica y manejo especializado.',
        drugClass: 'Tratamiento especializado',
        medication: '-',
        dose: '-',
        frequency: '-',
        duration: 'Inmediato.',
        escalation: 'No ampliar duración ni añadir antibióticos en AP sin confirmar complicación y gravedad.',
        followUp: 'Revisión AP tras alta o indicación hospitalaria.',
        safety: 'Complicación pleural o necrosante requiere circuito hospitalario.',
        cimaMedicationId: ''
      }
    ],
    secondary: [
      {
        title: 'Ajustes y seguridad',
        items: [
          'Insuficiencia renal: amoxicilina requiere límite de dosis en GFR 10-30 ml/min y <10 ml/min según ficha CIMA; claritromicina reduce dosis si ClCr <30 ml/min. No calcular ajuste no documentado.',
          'Insuficiencia hepática: evitar amoxicilina/clavulánico si antecedente de ictericia o lesión hepática asociada; precaución con macrólidos y hepatopatía.',
          'Alergia a betalactámicos: doxiciclina o claritromicina son alternativas para NAC leve; si reacción grave, comorbilidad o alta gravedad, derivar/consultar.',
          'Anticoagulación/interacciones: macrólidos pueden potenciar anticoagulantes e interactuar con estatinas, antiarrítmicos y fármacos que prolongan QT.',
          'Embarazo/lactancia: no usar doxiciclina; macrólido alternativo según guía y ficha técnica. Valorar derivación si gravedad, comorbilidad o duda.',
          'Uso prudente PROA: antibiótico solo con sospecha clínica de NAC; duración corta de 5 días si estabilidad; revisar a 48-72 h y desescalar/suspender si el diagnóstico cambia.'
        ]
      },
      {
        title: 'Bibliografía',
        items: [
          'Fuente principal: NICE NG250 (2025) para diagnóstico, gravedad y antibióticos en adultos.',
          'Fuente de apoyo española: normativa SEPAR NAC 2020 para criterios de estabilidad, duración mínima de 5 días y prudencia antimicrobiana.',
          'CIMA/AEMPS: fichas técnicas de amoxicilina, doxiciclina, claritromicina y amoxicilina/ácido clavulánico registradas en medicamentos.'
        ]
      }
    ]
  }
];
