export const htaSources = [
  {
    label: 'ESC. 2024 Guidelines for the management of elevated blood pressure and hypertension.',
    url: 'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/elevated-blood-pressure-and-hypertension/',
    supports: 'Clasificación, objetivo terapéutico, enfoque de tratamiento combinado y excepciones de fragilidad.',
  },
  {
    label: 'NICE NG136. Hypertension in adults: diagnosis and management.',
    url: 'https://www.nice.org.uk/guidance/ng136/chapter/recommendations',
    supports: 'Confirmación diagnóstica, escalones terapéuticos, monitorización, objetivos y seguimiento.',
  },
  {
    label: 'AEMPS CIMA. Fichas técnicas de enalapril, ramipril, losartán, valsartán, candesartán, telmisartán, amlodipino, lercanidipino, indapamida, clortalidona, hidroclorotiazida, espironolactona y atenolol.',
    url: 'https://cima.aemps.es/cima/publico/home.html',
    supports: 'Dosis, frecuencia, máximos, precauciones y seguridad farmacológica.',
  },
];

export const treatmentSteps = [
  {
    title: 'Confirmar y medir bien',
    condition: 'Si no hay alarma y es nuevo diagnóstico',
    action: 'Confirmar con mediciones repetidas y AMPA/MAPA cuando sea posible antes de etiquetar HTA estable.',
  },
  {
    title: 'Medidas no farmacológicas',
    condition: 'En toda TA elevada o HTA',
    action: 'Reducir sal, peso si procede, alcohol, sedentarismo y revisar fármacos que suben TA.',
  },
  {
    title: 'Inicio farmacológico',
    condition: 'HTA confirmada o cifras claramente hipertensivas con riesgo alto',
    action: 'En la mayoría: SRAA + calcioantagonista o SRAA + diurético tiazídico/tiazida-like. En fragilidad: iniciar monoterapia y titular.',
  },
  {
    title: 'Doble terapia',
    condition: 'No control o inicio con necesidad de combinación',
    action: 'IECA o ARA-II + calcioantagonista dihidropiridínico; alternativa IECA/ARA-II + diurético tiazídico/tiazida-like.',
  },
  {
    title: 'Triple terapia',
    condition: 'No control con doble terapia a dosis toleradas',
    action: 'IECA o ARA-II + calcioantagonista + diurético tiazídico/tiazida-like.',
  },
  {
    title: 'HTA resistente',
    condition: 'TA no controlada con triple terapia optimizada',
    action: 'Confirmar adherencia, técnica y AMPA/MAPA; revisar causas secundarias. Si función renal y potasio lo permiten, considerar espironolactona y derivación.',
  },
];

export const drugGroups = [
  {
    group: 'IECA',
    role: 'Primera línea. Útil si diabetes, ERC con albuminuria o perfil cardiovascular compatible. No combinar con ARA-II.',
    drugs: [
      { name: 'Enalapril', start: '5 mg/24 h', usual: '10-20 mg/día', max: '40 mg/día', frequency: '1-2 tomas', notes: 'Controlar creatinina y potasio. Evitar en embarazo. Vigilar tos, hiperpotasemia y deterioro renal.' },
      { name: 'Ramipril', start: '1,25-2,5 mg/24 h', usual: '2,5-10 mg/día', max: '10 mg/día', frequency: '1 toma', notes: 'Titular según tolerancia. Control renal y potasio tras inicio o aumento.' },
    ],
  },
  {
    group: 'ARA-II',
    role: 'Alternativa a IECA si tos/intolerancia. No combinar con IECA.',
    drugs: [
      { name: 'Losartán', start: '50 mg/24 h', usual: '50-100 mg/día', max: '100 mg/día', frequency: '1 toma', notes: 'Opción tras tos por IECA. Control renal y potasio.' },
      { name: 'Valsartán', start: '80 mg/24 h', usual: '80-160 mg/día', max: '320 mg/día', frequency: '1 toma', notes: 'Puede titularse si no hay control suficiente.' },
      { name: 'Candesartán', start: '8 mg/24 h', usual: '8-16 mg/día', max: '32 mg/día', frequency: '1 toma', notes: 'Titular a 16 mg y hasta 32 mg si precisa.' },
      { name: 'Telmisartán', start: '40 mg/24 h', usual: '40-80 mg/día', max: '80 mg/día', frequency: '1 toma', notes: 'Puede iniciarse en 20 mg en perfiles seleccionados según ficha técnica.' },
    ],
  },
  {
    group: 'Calcioantagonista dihidropiridínico',
    role: 'Primera línea y combinación habitual con SRAA. Vigilar edema maleolar.',
    drugs: [
      { name: 'Amlodipino', start: '5 mg/24 h', usual: '5-10 mg/día', max: '10 mg/día', frequency: '1 toma', notes: 'Edema maleolar dosis-dependiente; considerar reducción o cambio si limita.' },
      { name: 'Lercanidipino', start: '10 mg/24 h', usual: '10-20 mg/día', max: '20 mg/día', frequency: '1 toma', notes: 'Tomar al menos 15 min antes de comidas. Alternativa si edema con amlodipino.' },
    ],
  },
  {
    group: 'Diurético tiazídico / tiazida-like',
    role: 'Primera línea en combinación. Revisar sodio, potasio, urato y función renal.',
    drugs: [
      { name: 'Indapamida', start: '1,5 mg LP o 2,5 mg/24 h', usual: '1,5 mg LP o 2,5 mg/día', max: '2,5 mg/día', frequency: 'mañana', notes: 'A dosis más altas no aumenta efecto antihipertensivo y sí diurético.' },
      { name: 'Clortalidona', start: '12,5 mg/24 h', usual: '12,5-25 mg/día', max: '50 mg/día en HTA', frequency: 'mañana', notes: 'Vigilar hipopotasemia, hiponatremia, gota e insuficiencia renal.' },
      { name: 'Hidroclorotiazida', start: '12,5 mg/24 h', usual: '12,5-25 mg/día', max: '25 mg/día habitual en combinaciones', frequency: 'mañana', notes: 'Vigilar sodio, potasio, urato y función renal.' },
    ],
  },
  {
    group: 'Antagonista de aldosterona',
    role: 'Añadir en HTA resistente seleccionada si potasio y función renal lo permiten.',
    drugs: [
      { name: 'Espironolactona', start: '25 mg/24 h', usual: '25-50 mg/día', max: '50 mg/día en HTA resistente práctica', frequency: '1 toma', notes: 'Alto riesgo de hiperpotasemia con SRAA/ERC. Control renal y potasio estrecho.' },
    ],
  },
  {
    group: 'Betabloqueante',
    role: 'No primera línea general; reservar si indicación específica como cardiopatía isquémica, arritmia o insuficiencia cardiaca.',
    drugs: [
      { name: 'Atenolol', start: '50 mg/24 h', usual: '50-100 mg/día', max: '100 mg/día', frequency: '1 toma', notes: 'Vigilar bradicardia, broncoespasmo, fatiga e interrupción brusca.' },
    ],
  },
];

export const adverseEvents = [
  {
    id: 'ace-cough',
    label: 'Tos con IECA',
    suspicion: 'Tos relacionada con IECA.',
    check: 'Temporalidad, otras causas respiratorias, fármacos concomitantes y signos de alarma.',
    action: 'Suspender IECA si la sospecha es consistente.',
    alternative: 'Cambiar a ARA-II, sin periodo de lavado salvo otra razón clínica.',
    followUp: 'Reevaluar tos y TA tras el cambio.',
    urgent: 'Derivar/urgencias si hay angioedema, disnea, estridor o edema facial/lingual.',
  },
  {
    id: 'angioedema',
    label: 'Angioedema con IECA/ARA-II',
    suspicion: 'Angioedema potencialmente grave.',
    check: 'Edema facial, lingual, laríngeo, disnea, estridor, urticaria y estabilidad respiratoria.',
    action: 'Suspender el fármaco sospechoso. No reintroducir IECA si angioedema por IECA.',
    alternative: 'Replantear familia antihipertensiva cuando el cuadro esté resuelto y documentado.',
    followUp: 'Registrar reacción y revisar tratamiento de base.',
    urgent: 'Urgencias si afecta vía aérea, lengua, cara, voz, respiración o progresa.',
  },
  {
    id: 'ccb-edema',
    label: 'Edema maleolar con calcioantagonista',
    suspicion: 'Edema periférico por calcioantagonista dihidropiridínico.',
    check: 'Dosis, bilateralidad, insuficiencia cardiaca, renal, venosa y otros fármacos.',
    action: 'Reducir dosis o cambiar a otro calcioantagonista; valorar combinación con IECA/ARA-II si procede.',
    alternative: 'Lercanidipino o cambio a otra familia según perfil y TA.',
    followUp: 'Revisar edema y TA en 2-4 semanas.',
    urgent: 'Urgencias si disnea, ortopnea, dolor torácico, edema brusco unilateral o signos de insuficiencia cardiaca.',
  },
  {
    id: 'hyperkalemia',
    label: 'Hiperpotasemia con SRAA/espironolactona',
    suspicion: 'Hiperpotasemia inducida o agravada por IECA, ARA-II o espironolactona.',
    check: 'Potasio, eGFR/creatinina, suplementos de potasio, AINE, deshidratación y doble bloqueo SRAA.',
    action: 'Revisar y suspender/reducir el fármaco implicado según gravedad y analítica.',
    alternative: 'Usar calcioantagonista o diurético adecuado si precisa control de TA.',
    followUp: 'Repetir potasio y función renal en plazo corto según cifra y contexto.',
    urgent: 'Urgencias si potasio muy elevado, cambios ECG, debilidad marcada, arritmia o deterioro renal agudo.',
  },
  {
    id: 'renal-drop',
    label: 'Deterioro renal tras SRAA',
    suspicion: 'Deterioro de función renal tras IECA/ARA-II.',
    check: 'Creatinina/eGFR basal y actual, potasio, volemia, AINE, diuréticos y estenosis renal si sospecha.',
    action: 'Si el deterioro es relevante o progresivo, reducir/suspender temporalmente y corregir factores precipitantes.',
    alternative: 'Calcioantagonista si no tolera SRAA.',
    followUp: 'Repetir función renal y electrolitos tras el ajuste.',
    urgent: 'Urgencias si oliguria, deshidratación grave, hiperpotasemia relevante o deterioro rápido.',
  },
  {
    id: 'hyponatremia',
    label: 'Hiponatremia por diuréticos',
    suspicion: 'Hiponatremia asociada a tiazida/tiazida-like.',
    check: 'Sodio, síntomas neurológicos, ingesta hídrica, edad, otros fármacos y función renal.',
    action: 'Suspender o reducir diurético según gravedad; evitar reexposición si fue significativa.',
    alternative: 'Calcioantagonista o SRAA según perfil.',
    followUp: 'Repetir sodio tras cambio y revisar síntomas.',
    urgent: 'Urgencias si confusión, convulsiones, caídas, vómitos persistentes o sodio muy bajo.',
  },
  {
    id: 'hypokalemia',
    label: 'Hipopotasemia por diuréticos',
    suspicion: 'Hipopotasemia por tiazida/tiazida-like.',
    check: 'Potasio, magnesio, dosis, pérdidas digestivas y arritmias.',
    action: 'Reducir/suspender diurético o corregir potasio según gravedad.',
    alternative: 'Asociar SRAA si está indicado y es seguro; revisar necesidad de diurético.',
    followUp: 'Repetir potasio tras intervención.',
    urgent: 'Urgencias si debilidad marcada, arritmia, cambios ECG o potasio muy bajo.',
  },
  {
    id: 'symptomatic-hypotension',
    label: 'Hipotensión sintomática',
    suspicion: 'Exceso de tratamiento, depleción de volumen o hipotensión ortostática.',
    check: 'TA sentado/de pie, frecuencia cardiaca, caídas, mareo, ingesta, diuréticos y objetivos individualizados.',
    action: 'Reducir dosis o retirar el último fármaco añadido; corregir depleción si existe.',
    alternative: 'Objetivo menos estricto en fragilidad, >85 años o síntomas ortostáticos.',
    followUp: 'Revisar TA domiciliaria y síntomas tras ajuste.',
    urgent: 'Urgencias si síncope, caída con lesión, dolor torácico, focalidad o shock.',
  },
  {
    id: 'beta-brady',
    label: 'Bradicardia con betabloqueante',
    suspicion: 'Bradicardia inducida o agravada por betabloqueante.',
    check: 'FC, síntomas, ECG si procede, otros cronotropos y motivo de betabloqueante.',
    action: 'Reducir o suspender gradualmente si no hay indicación imprescindible; evitar retirada brusca si cardiopatía isquémica.',
    alternative: 'Usar otra familia antihipertensiva si no hay indicación específica.',
    followUp: 'Revisar FC, síntomas y TA.',
    urgent: 'Urgencias si síncope, bloqueo, dolor torácico, disnea o inestabilidad.',
  },
  {
    id: 'gout',
    label: 'Gota / hiperuricemia con diuréticos',
    suspicion: 'Hiperuricemia o gota favorecida por tiazida/tiazida-like.',
    check: 'Crisis de gota, urato, dosis, alternativas y riesgo cardiovascular/renal.',
    action: 'Reducir o cambiar diurético si el problema es relevante.',
    alternative: 'ARA-II como losartán puede ser útil si encaja con el perfil y no hay contraindicación.',
    followUp: 'Revisar TA y recurrencia de síntomas.',
    urgent: 'Urgencias solo si fiebre, monoartritis séptica sospechada o afectación sistémica.',
  },
  {
    id: 'adherence',
    label: 'Mala adherencia o intolerancia inespecífica',
    suspicion: 'Fallo terapéutico por adherencia, complejidad o intolerancia.',
    check: 'Toma real, horario, efectos adversos, coste, combinaciones fijas y automedida.',
    action: 'Simplificar pauta, usar toma diaria y combinación fija si procede.',
    alternative: 'Cambiar a familia mejor tolerada según efecto adverso predominante.',
    followUp: 'Revisar TA, adherencia y tolerancia en 2-4 semanas.',
    urgent: 'Urgencias si aparecen síntomas de daño agudo o cifras muy elevadas con clínica.',
  },
];
