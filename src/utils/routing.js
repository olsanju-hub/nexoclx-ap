export function parseRoute(hash = window.location.hash) {
  const value = hash.replace(/^#\/?/, '') || 'inicio';
  const [path, queryString = ''] = value.split('?');
  const [name, id] = path.split('/');
  return {
    name: name || 'inicio',
    id: id || null,
    params: new URLSearchParams(queryString),
  };
}

export const routes = {
  home: '#/inicio',
  protocols: '#/protocolos',
  protocol: (id) => `#/protocolos/${id}`,
  tools: '#/herramientas',
  tool: (id, from) => `#/herramientas/${id}${from ? `?from=${from}` : ''}`,
  bibliography: '#/bibliografia',
};
