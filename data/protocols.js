window.NEXO_PROTOCOLS = [
  {
    id: 'hta',
    title: 'Hipertensión arterial en Atención Primaria',
    category: 'Cardiometabólico',
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
        items: [
          'PA elevada sin alto riesgo: intervención de estilo de vida 3 meses: sal <5 g/día, dieta mediterránea/DASH, pérdida ponderal si sobrepeso, actividad aeróbica y fuerza, alcohol mínimo, dejar tabaco.',
          'PA elevada con alto riesgo CV, diabetes, ERC, ECV, daño orgánico o PA >=130/80 persistente tras 3 meses: iniciar fármaco si balance beneficio/riesgo favorable.',
          'HTA confirmada >=140/90: iniciar tratamiento farmacológico junto a medidas no farmacológicas. En la mayoría, preferir combinación inicial a dosis bajas si PA claramente por encima de objetivo.',
          'Primera línea: IECA o ARA-II + calcioantagonista dihidropiridínico o tiazida/tiazida-like. No combinar IECA + ARA-II.',
          'Ejemplos: enalapril 5 mg/24 h y titular; amlodipino 5 mg/24 h; hidroclorotiazida 12,5 mg/24 h; losartán 50 mg/24 h si IECA no tolerado.',
          'Cambiar o intensificar si tras 4-6 semanas de adherencia y AMPA válida no alcanza objetivo o si efectos adversos: tos por IECA -> ARA-II; edema por amlodipino -> bajar dosis/asociar IECA/ARA-II o cambiar.'
        ]
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
        items: [
          'Siempre: plan alimentario realista, actividad física adaptada, sueño, tabaco, vacunas, cuidado del pie y educación sobre hipoglucemia si usa insulina/sulfonilurea.',
          'Si no hay ECV/IC/ERC predominante: metformina si tolerada y eGFR lo permite; titular desde 500-850 mg con comida hasta dosis eficaz tolerada.',
          'Si ECV, insuficiencia cardiaca o ERC: priorizar iSGLT2 y/o arGLP-1 con beneficio cardiorrenal, independientemente de metformina cuando esté indicado por guía y ficha.',
          'Si HbA1c >8,5% o glucemia media estimada >200 mg/dl, iniciar tratamiento combinado desde el principio si no hay contraindicación.',
          'Si coste, bajo riesgo de hipoglucemia y necesidad moderada: iDPP4 como sitagliptina; si coste bajo y se acepta hipoglucemia: gliclazida LM con desayuno, evitar en fragilidad o ingesta irregular.',
          'Insulina basal: indicada si hiperglucemia sintomática/catabólica, HbA1c muy elevada pese a terapia, fracaso de combinaciones o contraindicación/intolerancia a alternativas. Inicio orientativo: 10 UI SC nocturna o 0,1-0,2 UI/kg/día; extremo bajo si fragilidad o hipoglucemia.',
          'Titulación basal: autocontrol basal diario al inicio; si mediana de 3 días por encima de objetivo y sin hipoglucemia, subir 2 UI cada 3 días. Si hipoglucemia <70 mg/dl o nocturna, reducir 10-20% y revisar causa.'
        ]
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
        items: [
          'Base no farmacológica: patrón mediterráneo, reducir grasas saturadas/trans, fibra, pérdida ponderal si procede, ejercicio, tabaco cero y tratar causas secundarias.',
          'Objetivos LDL ESC/EAS 2019 mantenidos por actualización 2025: muy alto riesgo <55 mg/dl y reducción >=50%; alto riesgo <70 mg/dl y reducción >=50%; moderado <100 mg/dl; bajo <116 mg/dl.',
          'Alta intensidad si alto/muy alto riesgo o LDL muy elevado: atorvastatina 40-80 mg/24 h o rosuvastatina 20-40 mg/24 h si no contraindicación.',
          'Intensidad moderada si riesgo moderado, edad avanzada/frágil o interacciones: atorvastatina 10-20 mg/24 h o rosuvastatina 5-10 mg/24 h.',
          'Añadir ezetimiba 10 mg/24 h si no alcanza objetivo con estatina máxima tolerada a 4-6 semanas o si solo tolera estatina parcial.',
          'Si sigue fuera de objetivo con estatina + ezetimiba en muy alto riesgo, hipercolesterolemia familiar o intolerancia compleja: derivar/valorar PCSK9, ácido bempedoico u otras opciones según circuito.'
        ]
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
    id: 'tos',
    title: 'Tos en Atención Primaria',
    category: 'Respiratorio',
    focus: 'síndrome',
    keywords: ['tos', 'bronquitis', 'asma', 'EPOC', 'IECA', 'reflujo', 'rinitis', 'neumonía', 'hemoptisis'],
    synonyms: ['tos aguda', 'tos crónica', 'tos postinfecciosa'],
    reviewed: '2026-05-21',
    mainSource: 'NICE NG120; ERS chronic cough guidelines',
    confidence: 'alto',
    meds: ['doxiciclina', 'amoxicilina'],
    calculators: [],
    bibliography: ['nice-ng120', 'ers-cough-2019'],
    blocks: [
      {
        title: 'Qué hacer ahora',
        items: [
          'Empezar como síntoma, no como infección: duración, características, fiebre, disnea, dolor torácico, hemoptisis, saturación, tabaquismo, fármacos IECA, exposición laboral, reflujo/rinitis, asma/EPOC e inmunosupresión.',
          'Clasificar: aguda <3 semanas; subaguda 3-8 semanas; crónica >8 semanas en adultos.',
          'Alarmas inmediatas: disnea importante, SatO2 baja, dolor torácico, hemoptisis, fiebre persistente o mal estado general, pérdida de peso, sospecha neumonía, TEP, insuficiencia cardiaca, inmunosupresión o tabaquismo con síntomas persistentes.',
          'Exploración mínima: constantes, SatO2, auscultación, ORL si rinorrea/goteo, signos de IC/TEP, medicación y exposición.'
        ]
      },
      {
        title: 'Tratamiento',
        items: [
          'Tos aguda por catarro/bronquitis sin alarma: explicar curso habitual hasta 3-4 semanas, hidratación, evitar humo, miel si >1 año. No antibiótico de rutina.',
          'NICE NG120: no ofrecer broncodilatador ni corticoide oral/inhalado para tos aguda por IVRA/bronquitis salvo enfermedad aérea subyacente como asma.',
          'No ofrecer mucolítico como acetilcisteína/carbocisteína para tos aguda por IVRA/bronquitis.',
          'Antibiótico solo si sistémicamente muy afectado o alto riesgo de complicaciones: doxiciclina 200 mg día 1 y 100 mg/24 h 4 días más; alternativas NICE: amoxicilina 500 mg/8 h 5 días o claritromicina/eritromicina según embarazo/alergia. Verificar ficha CIMA antes de prescribir.',
          'Tos por IECA: suspender IECA si clínicamente plausible y cambiar a ARA-II; esperar mejoría en 1-4 semanas, a veces hasta 3 meses.',
          'Tos crónica: orientar por causa probable: asma/hiperreactividad, EPOC, rinitis/goteo posterior, reflujo, fármacos, ocupacional, bronquiectasias/neoplasia. Tratar causa, no encadenar antitusivos.'
        ]
      },
      {
        title: 'Seguimiento',
        items: [
          'Tos aguda sin alarma: revisión si empeora rápida o significativamente, aparece fiebre/disnea/dolor torácico/hemoptisis, o no mejora en 3-4 semanas.',
          'Subaguda postinfecciosa: revisar a 4-8 semanas; si persiste, hacer radiografía de tórax si no realizada, revisar IECA, asma, rinitis, reflujo y tabaquismo.',
          'Crónica >8 semanas: radiografía de tórax y espirometría con broncodilatación si sospecha asma/EPOC; considerar FeNO/eosinófilos si disponible y útil.',
          'Si se inicia tratamiento etiológico, fijar respuesta esperada: rinitis 2-4 semanas, asma 2-8 semanas, reflujo solo si síntomas típicos y reevaluar 4-8 semanas.'
        ]
      },
      {
        title: 'Derivar / urgencias',
        items: [
          'Urgencias: SatO2 baja, disnea moderada-grave, hemoptisis relevante, dolor torácico, sospecha TEP, sepsis, neumonía grave, IC aguda o inmunosupresión con afectación sistémica.',
          'Radiografía urgente/preferente si sospecha neumonía, hemoptisis, pérdida de peso, tabaquismo con tos persistente, exploración focal, fiebre persistente o fracaso clínico.',
          'Neumología: tos crónica >8 semanas con Rx anormal, espirometría alterada no explicada, sospecha asma difícil/EPOC, bronquiectasias, tos refractaria tras abordaje inicial o hemoptisis.',
          'ORL si clínica dominante de vía aérea superior refractaria; digestivo si reflujo con alarma digestiva o refractario con sospecha objetiva.'
        ]
      }
    ],
    secondary: [
      {
        title: 'Ajustes y seguridad',
        items: [
          'No aplicar protocolo simple en inmunosupresión, embarazo complejo, sospecha tuberculosis, cáncer, TEP, IC o neumonía grave.',
          'Antitusivos de venta libre tienen beneficio limitado; evitar sedantes en fragilidad, conducción o riesgo de caídas.',
          'Antibióticos: verificar alergias, embarazo, interacciones y ficha CIMA antes de prescribir.'
        ]
      },
      {
        title: 'Bibliografía',
        items: ['Fuentes principales: NICE NG120 para tos aguda infecciosa/bronquitis y ERS 2019 para tos crónica.']
      }
    ]
  }
];
