// Função helper para criar snippets de uma pasta específica
const createSnippets = (folderPath: string) => {
  // Pega todos os códigos fonte como string (?raw)
  const rawCodes = import.meta.glob('/src/**/*.jsx', { 
    query: '?raw', 
    import: 'default', 
    eager: true 
  });

  // Pega os componentes reais para serem renderizados
  const components = import.meta.glob('/src/**/*.jsx', { 
    import: 'default', 
    eager: true 
  });

  // Filtra apenas os arquivos da pasta especificada
  const filteredPaths = Object.keys(rawCodes).filter(path => 
    path.includes(folderPath)
  );

  // Transforma em array de objetos limpo
  return filteredPaths.map((path) => {
    const fileName = path.split('/').pop()?.replace('.jsx', '');
    return {
      id: fileName,
      code: rawCodes[path],
      component: components[path],
      title: fileName?.replace(/-/g, ' ')
    };
  });
};

// Exporta snippets de diferentes pastas
export const topHeaders = createSnippets('/topHeaders/');
export const Headers = createSnippets('/Headers/');
export const Plans = createSnippets('/Plans/');
export const About = createSnippets('/About/');
export const Footers = createSnippets('/Footers/');
export const Features = createSnippets('/Features/');
// Export padrão para compatibilidade (topHeaders)
export const allSnippets = topHeaders;