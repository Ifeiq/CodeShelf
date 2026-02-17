// Função helper para criar snippets de uma pasta específica
const createSnippets = (folderPath: string) => {
  // Pega todos os códigos fonte .tsx como string (?raw)
  const rawCodesTsx = import.meta.glob('../UI/**/*.tsx', { 
    query: '?raw', 
    import: 'default', 
    eager: true 
  });

  // Pega todos os códigos fonte .ts como string (?raw)
  const rawCodesTs = import.meta.glob('../UI/**/*.ts', { 
    query: '?raw', 
    import: 'default', 
    eager: true 
  });

  // Mescla os dois objetos
  const rawCodes = { ...rawCodesTsx, ...rawCodesTs };

  // Pega os componentes reais para serem renderizados (apenas .tsx tem componentes)
  const components = import.meta.glob('../UI/**/*.tsx', { 
    import: 'default', 
    eager: true 
  });

  // Filtra apenas os arquivos da pasta especificada
  const filteredPaths = Object.keys(rawCodes).filter(path => 
    path.includes(folderPath)
  );

  // Transforma em array de objetos limpo
  return filteredPaths.map((path) => {
    const fileName = path.split('/').pop()?.replace(/\.(tsx|ts)$/, '');
    const isTsxFile = path.endsWith('.tsx');
    
    return {
      id: fileName,
      code: rawCodes[path],
      component: isTsxFile ? components[path] : null, // Apenas .tsx tem componente
      title: fileName?.replace(/-/g, ' '),
      fileType: path.endsWith('.tsx') ? 'tsx' : 'ts' // Indica o tipo do arquivo
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