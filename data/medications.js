window.NEXO_MEDICATIONS = [
  {
    id: 'enalapril',
    generic: 'enalapril',
    protocols: ['hta'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/63258/FichaTecnica_63258.html',
    dose: '5 mg VO cada 24 h; habitual 10-20 mg/día en 1-2 tomas; máximo 40 mg/día.',
    duration: 'Crónico. Revisar a 2-4 semanas tras inicio o cambio.',
    safety: 'Controlar creatinina y potasio a 1-2 semanas. Evitar en embarazo, antecedente de angioedema por IECA, hiperpotasemia significativa o estenosis bilateral de arteria renal.',
    renal: 'Si ClCr 30-80 ml/min iniciar 5-10 mg/día; si ClCr 10-30 ml/min iniciar 2,5 mg/día; revisar ficha técnica.',
    hepatic: 'No hay pauta concreta en ficha técnica consultada; usar con prudencia si hepatopatía clínicamente relevante.'
  },
  {
    id: 'losartan',
    generic: 'losartán',
    protocols: ['hta'],
    cima: 'enlace CIMA pendiente para monofármaco; combinación verificada: https://cima.aemps.es/cima/dochtml/ft/69057/FichaTecnica_69057.html',
    dose: '50 mg VO cada 24 h; habitual 50-100 mg/día en 1-2 tomas.',
    duration: 'Crónico. Revisar a 2-4 semanas tras inicio o cambio.',
    safety: 'Controlar creatinina y potasio a 1-2 semanas. Evitar en embarazo, hiperpotasemia significativa o estenosis bilateral de arteria renal.',
    renal: 'Sin ajuste inicial habitual en insuficiencia renal moderada en ficha de combinación; confirmar monofármaco antes de pauta fina.',
    hepatic: 'Usar dosis menor o alternativa si hepatopatía relevante; ajuste concreto pendiente de verificación en monofármaco.'
  },
  {
    id: 'amlodipino',
    generic: 'amlodipino',
    protocols: ['hta'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/65460/FichaTecnica_65460.html',
    dose: '5 mg VO cada 24 h; aumentar a 10 mg cada 24 h si no control y buena tolerancia.',
    duration: 'Crónico. Reevaluar edema, hipotensión y respuesta a 2-4 semanas.',
    safety: 'Precaución en insuficiencia cardiaca avanzada, hipotensión marcada o estenosis aórtica grave.',
    renal: 'No requiere ajuste de dosis por función renal según ficha técnica consultada.',
    hepatic: 'Iniciar con precaución; semivida prolongada. Pauta concreta en hepatopatía: pendiente de verificación.'
  },
  {
    id: 'hidroclorotiazida',
    generic: 'hidroclorotiazida',
    protocols: ['hta'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/86487/FT_86487.html',
    dose: '12,5-25 mg VO cada 24 h por la mañana.',
    duration: 'Crónico si eficaz y tolerado. Control iónico y renal tras inicio/cambio.',
    safety: 'Riesgo de hiponatremia, hipopotasemia, hiperuricemia, fotosensibilidad y deterioro renal.',
    renal: 'Contraindicada en insuficiencia renal grave, por ejemplo ClCr <=30 ml/min en ficha técnica consultada.',
    hepatic: 'Contraindicada en insuficiencia hepática grave.'
  },
  {
    id: 'metformina',
    generic: 'metformina',
    protocols: ['dm2'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/68167/FichaTecnica_68167.html',
    dose: '500-850 mg VO con comida cada 24 h; titular cada 1-2 semanas. Habitual 850-1000 mg cada 12 h; máximo según ficha técnica y tolerancia.',
    duration: 'Crónico si eficaz y tolerado.',
    safety: 'Evitar en acidosis, hipoxia, deshidratación grave o consumo alcohólico agudo. Suspender temporalmente en enfermedad aguda con riesgo de deshidratación o contraste yodado según contexto.',
    renal: 'No iniciar si eGFR <45 ml/min/1,73 m2; contraindicación habitual si eGFR <30. Ajuste exacto por preparado y ficha: verificar antes de prescribir.',
    hepatic: 'Evitar si insuficiencia hepática con riesgo de acidosis láctica.'
  },
  {
    id: 'empagliflozina',
    generic: 'empagliflozina',
    protocols: ['dm2'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/114930014',
    dose: '10 mg VO cada 24 h; en control glucémico puede subirse a 25 mg si eGFR y tolerancia lo permiten.',
    duration: 'Crónico si beneficio cardiorrenal/metabólico y tolerancia.',
    safety: 'Advertir infecciones genitales, depleción de volumen y cetoacidosis euglucémica. Pausar en ayuno prolongado, cirugía o enfermedad aguda grave.',
    renal: 'En ficha consultada, si TFG <60 ml/min/1,73 m2 la dosis diaria es 10 mg. Indicaciones cardiorrenales y límites de inicio dependen de ficha vigente.',
    hepatic: 'No hay ajuste concreto operativo registrado; verificar ficha si hepatopatía moderada-grave.'
  },
  {
    id: 'sitagliptina',
    generic: 'sitagliptina',
    protocols: ['dm2'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/84682/FT_84682.html',
    dose: '100 mg VO cada 24 h si función renal conservada.',
    duration: 'Crónico si eficaz y tolerado.',
    safety: 'Bajo riesgo de hipoglucemia salvo combinación con insulina o sulfonilurea. Vigilar pancreatitis si dolor abdominal persistente.',
    renal: 'Requiere ajuste por función renal; dosis concretas por eGFR pendientes de verificación en la ficha seleccionada dentro de esta V1.',
    hepatic: 'Sin pauta concreta registrada; verificar ficha si hepatopatía relevante.'
  },
  {
    id: 'gliclazida',
    generic: 'gliclazida liberación modificada',
    protocols: ['dm2'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/78439/FT_78439.html',
    dose: '30 mg VO cada 24 h con desayuno; ajustar por respuesta hasta 120 mg/día.',
    duration: 'Crónico si eficaz y sin hipoglucemias.',
    safety: 'Evitar si alto riesgo de hipoglucemia, ingesta irregular o fragilidad marcada. Educar en hipoglucemia.',
    renal: 'Ficha consultada: insuficiencia renal leve-moderada puede usar misma pauta con monitorización cuidadosa.',
    hepatic: 'Evitar en insuficiencia hepática grave; ajuste concreto pendiente de verificación.'
  },
  {
    id: 'liraglutida',
    generic: 'liraglutida',
    protocols: ['dm2'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/90096/FT_90096.html',
    dose: '0,6 mg SC cada 24 h 1 semana; después 1,2 mg cada 24 h; puede aumentarse a 1,8 mg cada 24 h.',
    duration: 'Crónico si eficacia ponderal/glucémica y tolerancia gastrointestinal.',
    safety: 'Náuseas frecuentes al inicio. No usar si sospecha de pancreatitis. Precaución si enfermedad gastrointestinal grave.',
    renal: 'Precaución por efectos gastrointestinales y deshidratación; pauta exacta por eGFR pendiente de verificación en ficha seleccionada.',
    hepatic: 'Verificar ficha si hepatopatía moderada-grave; no registrar ajuste inventado.'
  },
  {
    id: 'insulina-glargina',
    generic: 'insulina glargina U100',
    protocols: ['dm2'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/00134033/FichaTecnica_00134033.html',
    dose: 'Inicio orientativo DM2: 10 UI SC cada 24 h o 0,1-0,2 UI/kg/día si respaldado por guía y contexto; titular por glucemia basal.',
    duration: 'Crónico; revisar en 3-7 días al iniciar/titular y presencial o telefónico en 1-2 semanas.',
    safety: 'Riesgo de hipoglucemia y ganancia ponderal. Enseñar técnica, rotación, conservación y plan ante hipoglucemia.',
    renal: 'Menor requerimiento posible si deterioro renal; no aplicar fórmula automática de reducción sin revisión clínica.',
    hepatic: 'Menor requerimiento posible si insuficiencia hepática; ajustar por glucemias y seguridad.'
  },
  {
    id: 'atorvastatina',
    generic: 'atorvastatina',
    protocols: ['dislipemia'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/76510/FichaTecnica_76510.html',
    dose: '10-80 mg VO cada 24 h. Alta intensidad: 40-80 mg cada 24 h.',
    duration: 'Crónico. Control lipídico 4-6 semanas tras inicio o intensificación.',
    safety: 'Contraindicada en enfermedad hepática activa, embarazo y lactancia. Revisar interacciones CYP3A4 y síntomas musculares.',
    renal: 'No suele requerir ajuste por función renal; verificar si combinación o situación especial.',
    hepatic: 'Contraindicada en enfermedad hepática activa o elevación persistente injustificada de transaminasas.'
  },
  {
    id: 'rosuvastatina',
    generic: 'rosuvastatina',
    protocols: ['dislipemia'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/83907/FT_83907.html',
    dose: '5-40 mg VO cada 24 h. Alta intensidad: 20-40 mg cada 24 h.',
    duration: 'Crónico. Control lipídico 4-6 semanas tras inicio o intensificación.',
    safety: 'Contraindicada en embarazo/lactancia y enfermedad hepática activa. Vigilar miopatía, interacciones y alcohol/hepatopatía.',
    renal: 'En insuficiencia renal moderada algunos preparados recomiendan inicio 5 mg; no usar 40 mg en insuficiencia renal moderada-grave sin verificar ficha.',
    hepatic: 'Contraindicada en enfermedad hepática activa.'
  },
  {
    id: 'ezetimiba',
    generic: 'ezetimiba',
    protocols: ['dislipemia'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/80305/FT_80305.html',
    dose: '10 mg VO cada 24 h.',
    duration: 'Crónico si reduce LDL y se tolera.',
    safety: 'Usar como añadido a estatina si no se alcanza objetivo o en intolerancia parcial. Vigilar transaminasas si combinación.',
    renal: 'Sin ajuste concreto registrado en esta V1.',
    hepatic: 'No recomendada en insuficiencia hepática moderada o grave según fichas habituales; verificar ficha seleccionada.'
  },
  {
    id: 'doxiciclina',
    generic: 'doxiciclina',
    protocols: ['nac'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/50404/FichaTecnica_50404.html',
    dose: 'NAC leve si alergia a penicilina o amoxicilina no adecuada: 200 mg VO día 1, luego 100 mg VO cada 24 h.',
    duration: '5 días en total si estable clínicamente.',
    safety: 'Evitar en embarazo y niños pequeños. Fotosensibilidad, esofagitis; tomar con agua y no acostarse inmediatamente.',
    renal: 'No registrar ajuste concreto automático; revisar ficha si insuficiencia renal avanzada.',
    hepatic: 'Precaución en hepatopatía; revisar ficha si insuficiencia hepática relevante.'
  },
  {
    id: 'amoxicilina',
    generic: 'amoxicilina',
    protocols: ['nac'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/62586/FT_62586.html',
    dose: 'NAC leve: 500 mg VO cada 8 h; en infecciones graves la ficha permite 750 mg-1 g cada 8 h según indicación.',
    duration: '5 días si estabilidad clínica.',
    safety: 'Evitar si alergia a penicilinas. Vigilar exantema, diarrea y anafilaxia.',
    renal: 'Ficha CIMA: si GFR 10-30 ml/min, máximo 500 mg cada 12 h; si GFR <10 ml/min, máximo 500 mg/día.',
    hepatic: 'Dosificar con precaución y monitorizar función hepática a intervalos regulares.'
  },
  {
    id: 'claritromicina',
    generic: 'claritromicina',
    protocols: ['nac'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/79006/ft_79006.html',
    dose: 'NAC si alergia a penicilina o sospecha de atípicos: 500 mg VO cada 12 h.',
    duration: '5 días si estabilidad clínica.',
    safety: 'Riesgo de prolongación QT e interacciones CYP3A4; revisar anticoagulación, antiarrítmicos, estatinas y otros fármacos.',
    renal: 'Ficha CIMA: si ClCr <30 ml/min reducir dosis a la mitad; no prolongar más de 14 días en estos pacientes.',
    hepatic: 'Usar con precaución en insuficiencia hepática; evitar si hepatopatía grave o interacciones relevantes.'
  },
  {
    id: 'amoxicilina-clavulanico',
    generic: 'amoxicilina/ácido clavulánico',
    protocols: ['nac'],
    cima: 'https://cima.aemps.es/cima/dochtml/ft/72246/FT_72246.html',
    dose: 'NAC de alta gravedad según NICE requiere valoración hospitalaria; si se usa VO por indicación especializada: 500/125 mg VO cada 8 h en guía NICE.',
    duration: '5 días y revisar; uso ambulatorio no rutinario en este protocolo.',
    safety: 'Evitar si antecedente de ictericia o disfunción hepática por amoxicilina/clavulánico. Riesgo de diarrea y hepatotoxicidad colestásica.',
    renal: 'Requiere ajuste en insuficiencia renal; verificar ficha antes de prescribir.',
    hepatic: 'Usar con precaución y monitorizar función hepática; evitar si antecedente de lesión hepática asociada.'
  }
];
